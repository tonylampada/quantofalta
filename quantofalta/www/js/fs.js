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
angular.module('fsauth', ['qfapi']);

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
(function(){
	var deps = [
		'ngMaterial',
		'ui.router',
		'quantofalta',
		'qfapi',
	];
	if(FS.USE_TEAMPLE_CACHE){
		deps.push('fstemplates');
	}
	angular.module('main', deps);

})();

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
	angular.module('main2', deps);

    angular.module('main2').run(function($ionicPlatform) {
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

    angular.module('main2').config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: FS.BASE_URL+'templates/tabs.html'
        })
        .state('tab.dash', {
            url: '/dash',
            views: {
                'tab-dash': {
                    templateUrl: FS.BASE_URL+'templates/tab-dash.html',
                    controller: 'DashCtrl'
                }
            }
        })
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: FS.BASE_URL+'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: FS.BASE_URL+'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: FS.BASE_URL+'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        });

        $urlRouterProvider.otherwise('/tab/dash');
    });


    angular.module('main2').controller('DashCtrl', function($scope) {})

    angular.module('main2').controller('ChatsCtrl', function($scope, Chats) {
      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
        Chats.remove(chat);
      };
    })

    angular.module('main2').controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
    })

    angular.module('main2').controller('AccountCtrl', function($scope) {
      $scope.settings = {
        enableFriends: true
      };
    });


    angular.module('main2').factory('Chats', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
      }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
      }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
      }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
      }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
      }];

      return {
        all: function() {
          return chats;
        },
        remove: function(chat) {
          chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
          for (var i = 0; i < chats.length; i++) {
            if (chats[i].id === parseInt(chatId)) {
              return chats[i];
            }
          }
          return null;
        }
      };
    });



})();

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
        });
        $urlRouterProvider.otherwise('/tab/now');

    });
})();

// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      // Swap it in and reload the page to get the new hotness.
      window.applicationCache.swapCache();
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

angular.module('quantofalta', []);

angular.module('quantofalta').factory('QFModel', function(){
    var _1diamilis = 24*60*60*1000;
    var s = localStorage.getItem('quantofalta');
    var m = s ? angular.fromJson(s) : {
        saldoinicial: '',
        fechamento_fatura: '1',
        fatura_fechada: '',
        dia_pagamento: '1',
        meta_fatura: '',
        fatura_paga: false,
        // custofixo: '',
        parcelado_restante: '',
        lim_total: '',
        lim_atual: '',
        gastos: [],
        novogasto: '',
        novovalor: '',
        fixos: [],
        novofixo: '',
    };
    window.m = m;

    angular.extend(m, {
        proxima_fatura: proxima_fatura,
        meta_fatura_hoje: meta_fatura_hoje,
        dias_ate_pagamento: dias_ate_pagamento,
        disponivel: disponivel,
        saldo_estimado: saldo_estimado,
        fixo: fixo,
        fixo_pago: fixo_pago,
        add_gasto: add_gasto,
        remove_gasto: remove_gasto,
        add_fixo: add_fixo,
        remove_fixo: remove_fixo,
        save: save,
    });

    function _this_day(){
        return new Date().getDate();
    }

    function _venc_prox_fatura(){
        var today = new Date();
        if(_this_day() < m.fechamento_fatura){
            return new Date(1900 + today.getYear(), today.getMonth(), m.fechamento_fatura);
        } else {
            return new Date(1900 + today.getYear(), today.getMonth()+1, m.fechamento_fatura);
        }
    }

    function _prox_pagamento(){
        var today = new Date();
        if(_this_day() < m.dia_pagamento){
            return new Date(1900 + today.getYear(), today.getMonth(), m.dia_pagamento);
        } else {
            return new Date(1900 + today.getYear(), today.getMonth()+1, m.dia_pagamento);
        }
    }

    function _venc_fatura_anterior(){
        var venc_fatura = _venc_prox_fatura();
        var venc_anterior = new Date(1900 + venc_fatura.getYear(), venc_fatura.getMonth() - 1, venc_fatura.getDate());
        return venc_anterior;
    }

    function proxima_fatura(){
        var prox_fatura = m.lim_total - m.parcelado_restante - m.lim_atual;
        if(_this_day() > m.fechamento_fatura && !m.fatura_paga){
            prox_fatura -= m.fatura_fechada;
        }
        return prox_fatura;
    }

    function meta_fatura_hoje(){
        var today = new Date();
        var venc_fatura = _venc_prox_fatura();
        var venc_fatura_anterior = _venc_fatura_anterior();
        var dias_ate_venc = Math.ceil((venc_fatura - today)/_1diamilis);
        var dias_totais = Math.ceil((venc_fatura - venc_fatura_anterior)/_1diamilis);
        var meta = ((dias_totais - dias_ate_venc)/dias_totais) * m.meta_fatura;
        return meta;
    }

    function dias_ate_pagamento(){
        var today = new Date();
        var dia_pagamento = _prox_pagamento();
        var dias_ate_pag = Math.ceil((dia_pagamento - today)/_1diamilis);
        return dias_ate_pag;
    }

    function _soma_gastos(){
        var somagastos = 0;
        m.gastos.map(function(g){
            somagastos += g.valor;
        });
        return somagastos;
    }

    function disponivel(){
        var disp = m.saldoinicial - m.fixo() - _soma_gastos();

        if(_this_day() > m.fechamento_fatura){
            disp -= m.fatura_fechada;
        } else {
            disp -= m.proxima_fatura();
        }
        return disp;
    }

    function saldo_estimado(){
        var saldo = m.saldoinicial - m.fixo_pago() - _soma_gastos();
        if(m.fatura_paga){
            saldo -= m.fatura_fechada;
        }
        return saldo;
    }

    function fixo(){
        var soma = 0;
        m.fixos.map(function(f){
            soma += f.valor;
        });
        return soma;
    }

    function fixo_pago(){
        var soma = 0;
        m.fixos.map(function(f){
            if(f.pago){
                soma += f.valor;
            }
        });
        return soma;
    }

    function add_gasto(){
        if(!m.gastos){
            m.gastos = [];
        }
        m.gastos.push({descricao: m.novogasto, valor: parseFloat(m.novovalor)});
        m.novogasto = '';
        m.novovalor = '';
        m.save();
    }

    function remove_gasto(gasto){
        var idx = m.gastos.indexOf(gasto);
        m.gastos.splice(idx, 1);
        m.save();
    }

    function add_fixo(){
        if(!m.fixos){
            m.fixos = [];
        }
        m.fixos.push({descricao: m.novofixo, valor: 0, pago:false});
        m.novofixo = '';
        m.save();
    }

    function remove_fixo(fixo){
        var idx = m.fixos.indexOf(fixo);
        m.fixos.splice(idx, 1);
        m.save();
    }

    function save(){
        localStorage.setItem('quantofalta', angular.toJson(m));
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

angular.module('quantofalta').controller('NowCtrl', function($scope, QFModel){
    $scope.m = QFModel;
});

angular.module('quantofalta').controller('FixoCtrl', function($scope, QFModel){
    $scope.m = QFModel;
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

angular.module('qfapi', []);
angular.module('qfapi').factory('qfapi', function($q, $timeout, $log){
	var fsapi = {
	};

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

angular.module("fstemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("TEMPLATE_CACHE/pages/docs.html","<html><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--><script>DOCS.angular_dependencies = [\'fsdocs\'];\n            FSDOCS.angular_dependencies = [];\n            if(FS.USE_TEAMPLE_CACHE){\n                DOCS.angular_dependencies.push(\'fstemplates\');\n                DOCS.angular_dependencies.push(\'docstemplates\');\n            }</script><!--DOCSJS--><!--DOCSJS END--><!--FSDOCSJS--><!--FSDOCSJS END--><script>angular.module(\'fsdocs\', FSDOCS.angular_dependencies);</script></head><body ng-app=\"docs_main\" layout=\"column\"><div layout=\"row\" flex><md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"true\"><component-catalog-tree group=\"fs\"></component-catalog-tree></md-sidenav><div layout=\"column\" flex id=\"content\"><div ui-view></div></div></div></body></html>");
$templateCache.put("TEMPLATE_CACHE/pages/index.html","<!-- aplicacao q eu fiz usando cordova --><html manifest=\"cache.manifest\"><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--></head><body ng-app=\"main\"><quantofalta></quantofalta></body></html>");
$templateCache.put("TEMPLATE_CACHE/pages/index2.html","<!-- aplicacao exemplo do ionic, q eu adaptei pra rodar sozinha no browser --><!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width\"><title>QuantoFalta</title><!-- cordova script (this will be a 404 during development) --><script src=\"cordova.js\"></script><script src=\"./js/lib.js\"></script><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><!--FSJS--><!--FSJS END--></head><body ng-app=\"main2\"><ion-nav-bar class=\"bar-stable\"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view></ion-nav-view></body></html>");
$templateCache.put("TEMPLATE_CACHE/pages/index3.html","<!-- aplicacao exemplo do ionic, q eu adaptei pra rodar sozinha no browser --><!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"initial-scale=1,maximum-scale=1,user-scalable=no,width=device-width\"><title>QuantoFalta</title><!-- cordova script (this will be a 404 during development) --><script src=\"cordova.js\"></script><script src=\"./js/lib.js\"></script><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><!--FSJS--><!--FSJS END--></head><body ng-app=\"main3\"><ion-nav-bar class=\"bar-stable\"><ion-nav-back-button></ion-nav-back-button></ion-nav-bar><ion-nav-view></ion-nav-view></body></html>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/quantofalta.html","<div layout=\"column\" flex style=\"height: 100%\"><md-tabs flex md-border-bottom md-autoselect><md-tab label=\"Now\" layout=\"column\"><h4>Resumo</h4><div layout=\"column\"><div layout=\"row\" layout-margin><div flex>$disp/dias faltando:</div><div layout-margin>{{m.disponivel()}} / {{m.dias_ate_pagamento()}}</div></div><div layout=\"row\" layout-margin><div flex>Custo fixo (pago/total):</div><div layout-padding>{{m.fixo_pago()}} / {{m.fixo()}}</div></div><div layout=\"row\" layout-margin><div flex>Proxima fatura:</div><div layout-padding><span class=\"{{m.proxima_fatura() > m.meta_fatura_hoje() ? \'mau\' : \'bom\'}}\">{{m.proxima_fatura()}}</span> / {{m.meta_fatura_hoje() | number : 0}}</div></div><div layout=\"row\" layout-margin><div flex>Saldo estimado:</div><div layout-padding>{{m.saldo_estimado()}}</div></div></div><md-divider></md-divider><h4>Fatura</h4><md-container layout=\"row\"><md-input-container><label>Limite atual</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_atual\"></md-input-container><md-input-container><label>Limite total</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_total\"></md-input-container><md-input-container><label>Fechamento</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fechamento_fatura\"></md-input-container><md-input-container><label>Parcelado restante</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.parcelado_restante\"></md-input-container></md-container><md-container layout=\"row\"><md-input-container><label>Meta</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.meta_fatura\"></md-input-container><md-input-container><label>Fatura fechada</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fatura_fechada\"></md-input-container><md-input-container><input type=\"checkbox\" ng-change=\"m.save()\" ng-model=\"m.fatura_paga\"><label>Pago</label></md-input-container></md-container><h4>Conta corrente</h4><md-container layout=\"row\"><md-input-container><label>Saldo inicial</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.saldoinicial\"></md-input-container><md-input-container><label>Dia pagamento</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.dia_pagamento\"></md-input-container></md-container><div layout=\"row\"><md-input-container><label>Novo gasto</label><input ng-model=\"m.novogasto\"></md-input-container><md-input-container><label>Valor</label><input type=\"number\" ng-model=\"m.novovalor\"></md-input-container><md-button ng-click=\"m.add_gasto()\" class=\"md-raised md-primary\">+</md-button></div><md-list><md-list-item ng-repeat=\"g in m.gastos\"><span>{{g.descricao}}</span> <span flex></span> <span>{{g.valor}}</span><md-button ng-click=\"m.remove_gasto(g)\" class=\"md-raised\">-<md-raised></md-raised></md-button></md-list-item></md-list></md-tab><md-tab label=\"Fixo\"><md-list><md-list-item><label>Custo fixo: {{m.fixo()}}</label></md-list-item></md-list><div layout=\"row\"><md-input-container><label>Novo Fixo</label><input ng-model=\"m.novofixo\"></md-input-container><md-button ng-click=\"m.add_fixo()\" class=\"md-raised md-primary\">+</md-button></div><md-container layout=\"row\" ng-repeat=\"f in m.fixos\"><md-input-container><label>{{f.descricao}}</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"f.valor\"></md-input-container><md-input-container><input type=\"checkbox\" ng-change=\"m.save()\" ng-model=\"f.pago\"></md-input-container><md-button ng-click=\"m.remove_fixo(f)\" class=\"md-raised\">-<md-raised></md-raised></md-button></md-container></md-tab></md-tabs></div>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/tab_fixo.html","<ion-view view-title=\"Fixo\"><ion-content class=\"padding\"><div class=\"list card\"><div class=\"item item-divider\">Resumo</div></div></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/tab_now.html","<ion-view view-title=\"Now\"><ion-content class=\"padding\"><div class=\"list card\"><div class=\"item item-divider\">Resumo</div><div class=\"item item-body row\"><div class=\"col\">$disp/dias faltando:</div><div class=\"col u-align-right\">{{m.disponivel()}} / {{m.dias_ate_pagamento()}}</div></div><div class=\"item item-body row\"><div class=\"col\">Custo fixo (pago/total):</div><div class=\"col u-align-right\">{{m.fixo_pago()}} / {{m.fixo()}}</div></div><div class=\"item item-body row\"><div class=\"col\">Proxima fatura:</div><div class=\"col u-align-right\"><span class=\"{{m.proxima_fatura() > m.meta_fatura_hoje() ? \'mau\' : \'bom\'}}\">{{m.proxima_fatura()}}</span> / {{m.meta_fatura_hoje() | number : 0}}</div></div><div class=\"item item-body row\"><div class=\"col\">Saldo estimado:</div><div class=\"col u-align-right\">{{m.saldo_estimado()}}</div></div></div><div class=\"list card\"><div class=\"item item-divider\">Fatura</div><div class=\"item item-body row\"><label class=\"col item item-input\"><span class=\"input-label\">Lim. atual</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_atual\"></label><label class=\"col item item-input\"><span class=\"input-label\">Lim. total</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_total\"></label></div><div class=\"item item-body row\"><label class=\"col item item-input\"><span class=\"input-label\">Fechamento</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fechamento_fatura\"></label><label class=\"col item item-input\"><span class=\"input-label\">Parcelado restante</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.parcelado_restante\"></label></div><div class=\"item item-body row\"><label class=\"col item item-input\"><span class=\"input-label\">Fatura fechada</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fatura_fechada\"></label><div class=\"col\"><ion-toggle ng-change=\"m.save()\" ng-model=\"m.fatura_paga\">Pago</ion-toggle></div></div><div class=\"item item-body row\"><label class=\"col item item-input\"><span class=\"input-label\">Meta</span> <input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.meta_fatura\"></label></div></div><div class=\"list card\"><div class=\"item item-divider\">Conta corrente</div><div class=\"item item-body\"><div>You have <b>29</b> meetings on your calendar tomorrow.</div></div></div></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/tabs.html","<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\"><ion-tab title=\"Now\" icon-off=\"ion-ios-paper-outline\" icon-on=\"ion-ios-paper\" href=\"#/tab/now\"><ion-nav-view name=\"tab-now\"></ion-nav-view></ion-tab><ion-tab title=\"Fixo\" icon-off=\"ion-ios-bookmarks-outline\" icon-on=\"ion-ios-bookmarks\" href=\"#/tab/fixo\"><ion-nav-view name=\"tab-fixo\"></ion-nav-view></ion-tab></ion-tabs>");
$templateCache.put("TEMPLATE_CACHE/templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n--><ion-view view-title=\"{{chat.name}}\"><ion-content class=\"padding\"><img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\"><p>{{chat.lastText}}</p></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/templates/tab-account.html","<ion-view view-title=\"Account\"><ion-content><ion-list><ion-toggle ng-model=\"settings.enableFriends\">Enable Friends</ion-toggle></ion-list></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/templates/tab-chats.html","<ion-view view-title=\"Chats\"><ion-content><ion-list><!--item-remove-animate--><ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\"><img ng-src=\"{{chat.face}}\"><h2>{{chat.name}}</h2><p>{{chat.lastText}}</p><i class=\"icon ion-chevron-right icon-accessory\"></i><ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">Delete</ion-option-button></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/templates/tab-dash.html","<ion-view view-title=\"Dashboard\"><ion-content class=\"padding\"><div class=\"list card\"><div class=\"item item-divider\">Recent Updates</div><div class=\"item item-body\"><div>There is a fire in <b>sector 3</b></div></div></div><div class=\"list card\"><div class=\"item item-divider\">Health</div><div class=\"item item-body\"><div>You ate an apple today!</div></div></div><div class=\"list card\"><div class=\"item item-divider\">Upcoming</div><div class=\"item item-body\"><div>You have <b>29</b> meetings on your calendar tomorrow.</div></div></div></ion-content></ion-view>");
$templateCache.put("TEMPLATE_CACHE/templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n--><ion-tabs class=\"tabs-icon-top tabs-color-active-positive\"><!-- Dashboard Tab --><ion-tab title=\"Status\" icon-off=\"ion-ios-pulse\" icon-on=\"ion-ios-pulse-strong\" href=\"#/tab/dash\"><ion-nav-view name=\"tab-dash\"></ion-nav-view></ion-tab><!-- Chats Tab --><ion-tab title=\"Chats\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\"><ion-nav-view name=\"tab-chats\"></ion-nav-view></ion-tab><!-- Account Tab --><ion-tab title=\"Account\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\"><ion-nav-view name=\"tab-account\"></ion-nav-view></ion-tab></ion-tabs>");}]);