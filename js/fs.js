angular.module("fstemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("TEMPLATE_CACHE/pages/docs.html","<html><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--><script>DOCS.angular_dependencies = [\'fsdocs\'];\n            FSDOCS.angular_dependencies = [];\n            if(FS.USE_TEAMPLE_CACHE){\n                DOCS.angular_dependencies.push(\'fstemplates\');\n                DOCS.angular_dependencies.push(\'docstemplates\');\n            }</script><!--DOCSJS--><!--DOCSJS END--><!--FSDOCSJS--><!--FSDOCSJS END--><script>angular.module(\'fsdocs\', FSDOCS.angular_dependencies);</script></head><body ng-app=\"docs_main\" layout=\"column\"><div layout=\"row\" flex><md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"true\"><component-catalog-tree group=\"fs\"></component-catalog-tree></md-sidenav><div layout=\"column\" flex id=\"content\"><div ui-view></div></div></div></body></html>");
$templateCache.put("TEMPLATE_CACHE/pages/index.html","<html manifest=\"cache.manifest\"><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--></head><body ng-app=\"fs_main\"><quantofalta></quantofalta></body></html>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/quantofalta.html","<div layout=\"column\"><md-list><md-list-item><label>Disponivel esse mes: {{m.disponivel()}}</label></md-list-item><md-list-item><label>Proxima fatura: {{m.proxima_fatura()}}</label></md-list-item></md-list><md-input-container><label>Limite atual</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_atual\"></md-input-container><md-input-container><label>Saldo inicial</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.saldoinicial\"></md-input-container><md-input-container><label>Custo fixo previsto</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.custofixo\"></md-input-container><md-input-container><label>Limite total</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_total\"></md-input-container><md-input-container><label>Parcelado restante</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.parcelado_restante\"></md-input-container></div>");
$templateCache.put("TEMPLATE_CACHE/components/todo_example/todo.html","<div><md-content layout=\"row\" layout-sm=\"column\"><md-input-container><label>New task</label><input ng-model=\"m.newtodo\"></md-input-container><md-button class=\"md-raised md-primary\" ng-click=\"m.add()\">Add</md-button><md-progress-circular ng-if=\"m.adding\" md-mode=\"indeterminate\"></md-progress-circular></md-content><ul class=\"todo\"><li ng-repeat=\"todo in m.todos\"><span>{[{todo.description}]}</span><md-button class=\"md-raised\" ng-click=\"m.remove(todo)\">Remove</md-button></li></ul></div>");
$templateCache.put("TEMPLATE_CACHE/components/toolbar/fstoolbar.html","<div class=\"md-toolbar-tools\"><h1><a ui-sref=\"home\">FreedomSponsors</a></h1><a class=\"md-button\" ui-sref=\"listprojects\">Projects</a> <a class=\"md-button\" ui-sref=\"search\">Search</a> <a class=\"md-button\" href>etc</a> <span flex></span> <a class=\"md-button\" ui-sref=\"viewuser({login: auth.user.username})\" ng-if=\"auth.authenticated()\">{[{auth.user.username}]} <a><a class=\"md-button\" hreff ng-click=\"auth.logout()\" ng-if=\"auth.authenticated()\">Logout <a><a class=\"md-button\" ui-sref=\"login\" ng-if=\"!auth.authenticated()\">Login</a></a></a></a></a></div>");}]);
if(!window.FS){
    window.FS = {};
}
FS.BASE_URL = 'TEMPLATE_CACHE/';
FS.USE_TEAMPLE_CACHE = true;

if(!window.DOCS){
    window.DOCS = {};
}
DOCS.BASE_URL = 'TEMPLATE_CACHE/';
DOCS.SAMPLE_BASE_URL = './docs_samples/';

if(!window.FSDOCS){
    window.FSDOCS = {};
}
if(!FSDOCS.angular_dependencies){
	FSDOCS.angular_dependencies = [];
}

if(!window.FS){
	window.FS = {};
}

window.jsutils = {};

jsutils.has_ng_module = function(name){
	try{
		angular.module(name);
		return true;
	} catch(ex){
		return false;
	}
};
angular.module('fsngutils', []);
(function(){
	var deps = [
		'ngMaterial',
		'ui.router',
		'fsngutils',
		'quantofalta',
		'fsapi',
	];
	if(FS.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('fs_main', deps);

})();

angular.module('fsauth', ['fsapi']);

angular.module('fsauth').factory('FSAuth', function(FSApi){
	var auth = {
		user: null,
		authenticated: authenticated,
		set_user: set_user,
		logout: logout,
	};

	function authenticated(){
		return auth.user !== null && auth.user !== undefined;
	}

	function set_user(user){
		auth.user = user;
	}

	function logout(){
		FSApi.logout().then(function(){
			auth.user = null;
		});
	}

	function _check_for_authentication(){
		FSApi.whoami().then(function(result){
			var _who = result.data;
			if(_who.authenticated){
				auth.user = _who.user;
			} else {
				auth.user = null;
			}
		});
	}

	_check_for_authentication();

	return auth;
});
angular.module('quantofalta', []);

angular.module('quantofalta').factory('QFModel', function(){
    var s = localStorage.getItem('quantofalta');
    var m = s ? JSON.parse(s) : {
        saldoinicial: 0,
        custofixo: 0,
        parcelado_restante: 0,
        lim_total: 0,
        lim_atual: 0,
    };

    angular.extend(m, {
        proxima_fatura: proxima_fatura,
        disponivel: disponivel,
        save: save,
    });

    function proxima_fatura(){
        return m.lim_total - m.parcelado_restante - m.lim_atual;
    }

    function disponivel(){
        return m.saldoinicial - m.custofixo - m.proxima_fatura();
    }

    function save(){
        localStorage.setItem('quantofalta', JSON.stringify(m));
    }

    return m;
});

angular.module('quantofalta').directive('quantofalta', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'quantofalta/quantofalta.html',
		controller: function($scope, QFModel){
            $scope.m = QFModel;
		}
	};
});

angular.module('ng_bind_html_unsafe', []);
angular.module('ng_bind_html_unsafe').directive('ngBindHtmlUnsafe', ['$sce', function ($sce) {
    return function (scope, element, attr) {
        element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
        scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
        });
    };
}]);


//This is a toy component to demonstrate how to make them

angular.module('todo', ['fsapi']);

angular.module('todo').factory('TODOModel', function(FSApi){
    var m = {
        newtodo: '',
        adding: false,
        todos: [],
    };

    angular.extend(m, {
        add: add,
        remove: remove,
    });

    function add(){
        var todo = {description: m.newtodo};
        m.adding = true;
        FSApi.add(todo).then(function(result){
            var saved_todo = result.data;
            m.todos.push(saved_todo);
        }).finally(function(){
            m.adding = false;
        });
        m.newtodo = '';
    }

    function remove(todo){
        var idx = m.todos.indexOf(todo);
        m.todos.splice(idx, 1);
        //TODO: remove the todo using an API
    }

    return m;
});

angular.module('todo').directive('todo', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: FS.BASE_URL+'components/todo_example/todo.html',
        controller: function($scope, TODOModel){
            var m = $scope.m = TODOModel;
        }
    };
});
angular.module('fstoolbar', ['fsauth']);

angular.module('fstoolbar').directive('fstoolbar', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'components/toolbar/fstoolbar.html',
		controller: function($scope, FSAuth){
			$scope.auth = FSAuth;
		}
	};
});

angular.module('fsapi', []);
angular.module('fsapi').factory('FSApi', function($q, $timeout, $log){
	var fsapi = {
		add: _mockasync(add),
		login: _mockasync(login),
		logout: _mockasync(logout),
		whoami: _mockasync(whoami),
		get_user_details: _mockasync(get_user_details),
	};

	var who = {
		authenticated: true,
		user: {
			username: 'johndoe',
			name: 'Fake User',
		},
	};

	function add(todo){
		var newtodo = angular.copy(todo);
		newtodo.id = Math.floor(Math.random() * 1E9);
		return newtodo;
	}

	function login(username, password){
		var fakeuser = {
			username: username,
			name: 'Fake User',
		};
		who = {
			authenticated: true,
			user: fakeuser,
		};
		return fakeuser;
	}

	function logout(){
		who = {
			authenticated: false
		};
	}

	function whoami(){
		return who;
	}

	function get_user_details(username){
		var fakeuser = {
			username: username,
			name: 'Fake User',
			has_paypal: true,
			has_bitcoin: false,
		};
		return fakeuser;
	}

	function _mockasync(f){
		return function(){
			var _arguments = arguments;
			var _this = this;
			if(!FS.MOCK){
				FS.MOCK = {};
			}
			if(FS.MOCK.timeout === undefined){
				FS.MOCK.timeout = 500;
			}
			var deferred = $q.defer();
			$timeout(function(){
				try{
					var result = f.apply(_this, _arguments);
					deferred.resolve({data: result});
				} catch(ex){
					$log.error(ex);
					deferred.reject(ex); //TODO: simulate http stuff
				}
			}, FS.MOCK.timeout);
			return deferred.promise;
		};
	}

	return fsapi;
});