////////// requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var linker = require('gulp-linker');
var webserver = require('gulp-webserver');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var argv = require('yargs').argv;

////////// parameters
var mock = argv.mock == 'true' || argv.mock === undefined;
var prod = argv.prod == 'true';

////////// code location
var fs = {
    js: function(env){
        var apijs = mock ? './src/api/api_mock.js' : './src/api/api.js';
        var settingsjs = env == 'prod' ? './settings/prod.js' : './settings/dev.js';
        return [
            settingsjs,
            './src/global.js',
            './src/commons/jsutils.js',
            './src/*.js',
            './src/!(api)/**/*.js',
            apijs,
            '!./src/**/docs/**/*.js',
        ];
    },
    jstests: [
        './settings/dev.js',
        './src/global.js',
        './src/commons/jsutils.js',
        './src/*.js',
        './src/!(api)/**/*.js',
        './src/api/api_mock.js',
    ],
    scss : [
        './src/**/*.scss',
    ],
    html: [
        './src/**/*.html',
        '!./src/**/docs**/*.html',
    ],
};

var fsdocs = {
    js: [
        './src/**/docs/**/*.js',
        '!./src/**/docs/**/test_*.js',
    ],
    html: [
        './src/**/docs**/*.html',
    ],
    samples: ['./src/**/docs/**/*.*'],
};

var docs = {
    js: [
        './docs_src/**/*.js',
    ],
    html: [
        './docs_src/**/*.html',
    ]
}

var lib = {
    js: [
        './lib/angular-1.4.0/angular.js',
        './lib/angular-1.4.0/angular-aria.js',
        './lib/angular-1.4.0/angular-animate.js',
        './lib/angular-1.4.0/angular-sanitize.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.js',
        './lib/ionic/js/ionic.js',
        './lib/ionic/js/ionic-angular.js',
        './lib/angular-material-0.9.8/angular-material.js',
    ],
    jsmin: [
        './lib/angular-1.4.0/angular.min.js',
        './lib/angular-1.4.0/angular-aria.min.js',
        './lib/angular-1.4.0/angular-animate.min.js',
        './lib/angular-material-0.9.8/angular-material.min.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.min.js',
    ],
    css: [
        // './lib/angular-material-0.9.8/angular-material.css',
        './lib/ionic/css/ionic.css',
    ],
    cssmin: ['./lib/angular-material-0.9.8/angular-material.min.css'],
    tocopy: [
        './lib/ionic/fonts/**',
    ],
}

var testlib = {
    js: [
        './lib/angular-1.4.0/angular-mocks.js',
        './testlib/chai/chai.js',
        './testlib/sinon/sinon.js',
        './testlib/setup_globals.js',
    ],
};

////////// Big tasks

var commontasks = ['concatjslib', 'concatjslibmin', 'concatcsslib', 'concatcsslibmin', 'sass', 'copylibfiles'];
var concatjstasks = ['concatjsfs', 'concatjsfsdocs', 'concatjsdocs']
gulp.task('dev', commontasks.concat(['linkjsdev']));
gulp.task('prod', commontasks.concat(concatjstasks).concat(['copydocssamples', 'linkjsprod']));

////////// Common tasks
concattask('concatjslib', {src: lib.js, dest: 'js/lib.js'});
concattask('concatjslibmin', {src: lib.jsmin, dest: 'js/lib.min.js'});
concattask('concatcsslib', {src: lib.css, dest: 'css/lib.css'});
concattask('concatcsslibmin', {src: lib.cssmin, dest: 'css/lib.min.css'});
copytask('copylibfiles', lib.tocopy, '', {prefix: 2});
jshinttask('jshintall')
sasstask('sass');

////////// Dev tasks
linktaskdev('linkjsdev');
webservertask('runserver');
jstesttask('test')

////////// Prod tasks
concattask('concatjsfs', {src: fs.js('prod'), html: fs.html, ngmodule: 'fstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/fs.js'});
concattask('concatjsfsdocs', {src: fsdocs.js, dest: 'js/fsdocs.js'});
concattask('concatjsdocs', {src: docs.js, html: docs.html, ngmodule: 'docstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/docs.js'});
copytask('copydocssamples', fsdocs.samples, 'docs_samples/', {prefix: 1});
linktaskprod('linkjsprod');

////////// Helper functions
function concattask(id, options){
    gulp.task(id, function() {
        var stream_concat = gulp
            .src(options.src)
            .pipe(concat(options.dest));
        if(options.html){
            var stream_ngtemplates = gulp.src(options.html)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(ngTemplates({
                    filename: 'zzz.js',
                    module: options.ngmodule,
                    path: function (path, base) {
                        var result = options.tmplprefix + path.replace(base, '');
                        // console.log(result);
                        return result;
                    },
                }));
            stream_concat = merge(stream_concat);
            stream_concat.add(stream_ngtemplates);
            stream_concat = stream_concat.pipe(concat(options.dest))
        }
        return stream_concat
            .pipe(gulp.dest('./dist/'));
    });
}

function jstesttask(id){
    var singleRun = argv.singleRun == 'true';
    var coverage = argv.coverage == 'true';

    var karmacfg = {
        basePath: './',
        frameworks: ['mocha'],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        autoWatch: true,
        singleRun: singleRun,
        colors: true,
        files : concatall([
            lib.js,
            testlib.js,
            docs.js,
            fs.jstests,
        ]),
    }
    if(coverage){
        karmacfg.reporters = ['progress', 'coverage'];
        karmacfg.preprocessors = {
            './src/**/!(docs)/*.js': ['coverage']
        };
        karmacfg.coverageReporter = {
            reporters: [
                { type : 'html', dir : 'coverage/' },
                { type : 'cobertura'},
            ]
        };
    }

    gulp.task(id, function (done) {
        karma.start(karmacfg, done);
    });
}

function concatall(arrays){
    var result = [];
    arrays.map(function(arr){
        result = result.concat(arr);
    });
    return result;
}

function sasstask(id){
    gulp.task('sass', function () {
        gulp.src(fs.scss)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/css'));
    });
}

function jshinttask(id){
    gulp.task(id, function() {
        return gulp.src(['./src/**/*.js', './docs_src/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
        return stream;
    });
}

function linktaskdev(id){
    gulp.task(id, function() {
        return gulp.src('./src/pages/*')
            .pipe(linker(linker_params(fsdocs.js, 'FSDOCSJS', '.')))
            .pipe(linker(linker_params(fs.js('dev'), 'FSJS', '.')))
            .pipe(linker(linker_params(docs.js, 'DOCSJS', '.')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linktaskprod(id){
    gulp.task(id, ['concatjsfs', 'concatjsfsdocs', 'concatjsdocs'], function() {
        return gulp.src('./src/pages/*')
            .pipe(linker(linker_params('./dist/js/fs.js', 'FSJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/fsdocs.js', 'FSDOCSJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/docs.js', 'DOCSJS', 'dist/')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linker_params(src, marker, approot){
    return {
        scripts: src,
        startTag: '<!--'+marker+'-->',
        endTag: '<!--'+marker+' END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: approot,
    };
}

function webservertask(id){
    gulp.task(id, function() {
        return gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: false,
            port: 9001,
        }));
    });
}

function copytask(id, from, to, options){
    gulp.task(id, function() {
        return gulp.src(from)
        .pipe(copy('./dist/'+to, options));
    });
}
