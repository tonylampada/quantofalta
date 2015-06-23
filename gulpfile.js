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
var argv = require('yargs').argv; 

////////// variables
var mock = argv.mock == 'true' || argv.mock === undefined;
var prod = argv.prod == 'true';

var settingsjs = prod ? './settings/prod.js' : './settings/dev.js';

var src = {
    js: function(env){
        var apijs = mock ? './src/api/api_mock.js' : './src/api/api.js';
        var settingsjs = env == 'prod' ? './settings/prod.js' : './settings/dev.js';
        return [
            settingsjs,
            './src/fs_global.js',
            './src/commons/jsutils.js',
            './src/commons/fsngutils.js',
            './src/*.js',
            './src/!(api)/**/*.js',
            apijs,
            '!./src/**/docs/**/*.js',
        ];
    },
    docssamples: ['./src/**/docs/**/*.*'],
    jsdist: './dist/js/fs.js',
    html: [
        './src/**/*.html',
        '!./src/**/docs**/*.html',
    ],
};

var docs = {
    js: [
        './docs_src/docs_global.js',
        './docs_src/component_catalog/component_catalog.js',
        './src/**/docs/**/*.js',
        '!./src/**/docs/**/test_*.js',
        './docs_src/docs_main.js',
    ],
    html: [
        './docs_src/**/**/*.html',
    ],
}

var lib = {
    js: [
        './lib/angular-1.4.0/angular.js',
        './lib/angular-1.4.0/angular-aria.js',
        './lib/angular-1.4.0/angular-animate.js',
        './lib/angular-material-0.9.8/angular-material.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.js',
    ],
    jsmin: [
        './lib/angular-1.4.0/angular.min.js',
        './lib/angular-1.4.0/angular-aria.min.js',
        './lib/angular-1.4.0/angular-animate.min.js',
        './lib/angular-material-0.9.8/angular-material.min.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.min.js',
    ],
    css: ['./lib/angular-material-0.9.8/angular-material.css'],
    cssmin: ['./lib/angular-material-0.9.8/angular-material.min.css'],
}

////////// Big tasks

var commontasks = ['concatjslib', 'concatjslibmin', 'concatcsslib', 'concatcsslibmin', 'sass'];
gulp.task('dev', commontasks.concat(['linkjsdev']));
gulp.task('prod', commontasks.concat(['concatjssrc', 'concatjsdocs', 'copydocssamples', 'linkjsprod']));

////////// Common tasks
concattask('concatjslib', {src: lib.js, dest: 'lib.js'});
concattask('concatjslibmin', {src: lib.jsmin, dest: 'lib.min.js'});
concattask('concatcsslib', {src: lib.css, dest: '../css/lib.css'});
concattask('concatcsslibmin', {src: lib.cssmin, dest: '../css/lib.min.css'});
sasstask('sass');

////////// Dev tasks
linktaskdev('linkjsdev');
webservertask('runserver');

////////// Prod tasks
concattask('concatjssrc', {src: src.js('prod'), html: src.html, ngmodule: 'fstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'fs.js'});
concattask('concatjsdocs', {src: docs.js, html: docs.html, ngmodule: 'docstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'docs.js'});
copytask('copydocssamples', src.docssamples, 'docs_samples/', {prefix: 1});
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
            .pipe(gulp.dest('./dist/js/'));
    });
}

function sasstask(id){
    gulp.task('sass', function () {
        gulp.src('./src/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/css'));
    });

}

function linktaskdev(id){
    gulp.task(id, function() {
        return gulp.src('./src/pages/*.html')
            .pipe(linker(linker_params(src.js('dev'), 'SRCJS', '.')))
            .pipe(linker(linker_params(docs.js, 'DOCSJS', '.')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linktaskprod(id){
    gulp.task(id, ['concatjssrc', 'concatjsdocs'], function() {
        return gulp.src('./src/pages/*.html')
            .pipe(linker(linker_params('./dist/js/fs.js', 'SRCJS', 'dist/')))
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
