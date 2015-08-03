(function(){
	var deps = [
		'ui.router',
		'quantofalta',
		'qfapi',
        'ionic'
	];
	if(FS.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('main3', deps);

    angular.module('main3').run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });
    });

    angular.module('main3').config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: FS.BASE_URL+'quantofalta/tabs.html'
        })
        .state('tab.now', {
            url: '/now',
            views: {
                'tab-now': {
                    templateUrl: FS.BASE_URL+'quantofalta/tab_now.html',
                    controller: 'NowCtrl'
                }
            }
        })
		.state('tab.fixo', {
            url: '/fixo',
            views: {
                'tab-fixo': {
                    templateUrl: FS.BASE_URL+'quantofalta/tab_fixo.html',
                    controller: 'FixoCtrl'
                }
            }
        })
		.state('tab.extrato', {
            url: '/extrato',
            views: {
                'tab-extrato': {
                    templateUrl: FS.BASE_URL+'quantofalta/tab_extrato.html',
                    controller: 'ExtratoCtrl'
                }
            }
        });
        $urlRouterProvider.otherwise('/tab/now');

    });
})();
