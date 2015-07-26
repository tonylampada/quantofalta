angular.module("fstemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("TEMPLATE_CACHE/pages/docs.html","<html><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--><script>DOCS.angular_dependencies = [\'fsdocs\'];\n            FSDOCS.angular_dependencies = [];\n            if(FS.USE_TEAMPLE_CACHE){\n                DOCS.angular_dependencies.push(\'fstemplates\');\n                DOCS.angular_dependencies.push(\'docstemplates\');\n            }</script><!--DOCSJS--><!--DOCSJS END--><!--FSDOCSJS--><!--FSDOCSJS END--><script>angular.module(\'fsdocs\', FSDOCS.angular_dependencies);</script></head><body ng-app=\"docs_main\" layout=\"column\"><div layout=\"row\" flex><md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"true\"><component-catalog-tree group=\"fs\"></component-catalog-tree></md-sidenav><div layout=\"column\" flex id=\"content\"><div ui-view></div></div></div></body></html>");
$templateCache.put("TEMPLATE_CACHE/pages/index.html","<html manifest=\"cache.manifest\"><head><meta name=\"viewport\" content=\"initial-scale=1\"><link rel=\"stylesheet\" href=\"./css/lib.css\"><link rel=\"stylesheet\" href=\"./css/fs.css\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic\"><script src=\"./js/lib.js\"></script><!--FSJS--><!--FSJS END--></head><body ng-app=\"main\"><quantofalta></quantofalta></body></html>");
$templateCache.put("TEMPLATE_CACHE/quantofalta/quantofalta.html","<div layout=\"column\" flex style=\"height: 100%\"><md-tabs flex md-border-bottom md-autoselect><md-tab label=\"Now\" layout=\"column\"><h4>Resumo</h4><div layout=\"column\"><div layout=\"row\" layout-margin><div flex>$disp/dias faltando:</div><div layout-margin>{{m.disponivel()}} / {{m.dias_ate_pagamento()}}</div></div><div layout=\"row\" layout-margin><div flex>Custo fixo (pago/total):</div><div layout-padding>{{m.fixo_pago()}} / {{m.fixo()}}</div></div><div layout=\"row\" layout-margin><div flex>Proxima fatura:</div><div layout-padding><span class=\"{{m.proxima_fatura() > m.meta_fatura_hoje() ? \'mau\' : \'bom\'}}\">{{m.proxima_fatura()}}</span> / {{m.meta_fatura_hoje() | number : 0}}</div></div><div layout=\"row\" layout-margin><div flex>Saldo estimado:</div><div layout-padding>{{m.saldo_estimado()}}</div></div></div><md-divider></md-divider><h4>Fatura</h4><md-container layout=\"row\"><md-input-container><label>Limite atual</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_atual\"></md-input-container><md-input-container><label>Limite total</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.lim_total\"></md-input-container><md-input-container><label>Fechamento</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fechamento_fatura\"></md-input-container><md-input-container><label>Parcelado restante</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.parcelado_restante\"></md-input-container></md-container><md-container layout=\"row\"><md-input-container><label>Meta</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.meta_fatura\"></md-input-container><md-input-container><label>Fatura fechada</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.fatura_fechada\"></md-input-container><md-input-container><input type=\"checkbox\" ng-change=\"m.save()\" ng-model=\"m.fatura_paga\"><label>Pago</label></md-input-container></md-container><h4>Conta corrente</h4><md-container layout=\"row\"><md-input-container><label>Saldo inicial</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.saldoinicial\"></md-input-container><md-input-container><label>Dia pagamento</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"m.dia_pagamento\"></md-input-container></md-container><div layout=\"row\"><md-input-container><label>Novo gasto</label><input ng-model=\"m.novogasto\"></md-input-container><md-input-container><label>Valor</label><input type=\"number\" ng-model=\"m.novovalor\"></md-input-container><md-button ng-click=\"m.add_gasto()\" class=\"md-raised md-primary\">+</md-button></div><md-list><md-list-item ng-repeat=\"g in m.gastos\"><span>{{g.descricao}}</span> <span flex></span> <span>{{g.valor}}</span><md-button ng-click=\"m.remove_gasto(g)\" class=\"md-raised\">-<md-raised></md-raised></md-button></md-list-item></md-list></md-tab><md-tab label=\"Fixo\"><md-list><md-list-item><label>Custo fixo: {{m.fixo()}}</label></md-list-item></md-list><div layout=\"row\"><md-input-container><label>Novo Fixo</label><input ng-model=\"m.novofixo\"></md-input-container><md-button ng-click=\"m.add_fixo()\" class=\"md-raised md-primary\">+</md-button></div><md-container layout=\"row\" ng-repeat=\"f in m.fixos\"><md-input-container><label>{{f.descricao}}</label><input type=\"number\" ng-change=\"m.save()\" ng-model=\"f.valor\"></md-input-container><md-input-container><input type=\"checkbox\" ng-change=\"m.save()\" ng-model=\"f.pago\"></md-input-container><md-button ng-click=\"m.remove_fixo(f)\" class=\"md-raised\">-<md-raised></md-raised></md-button></md-container></md-tab></md-tabs></div>");}]);
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
