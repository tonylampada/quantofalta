angular.module('quantofalta', []);

angular.module('quantofalta').factory('QFModel', function(){
    var s = localStorage.getItem('quantofalta');
    var m = s ? JSON.parse(s) : {
        saldoinicial: '',
        custofixo: '',
        parcelado_restante: '',
        lim_total: '',
        lim_atual: '',
        gastos: [],
        novogasto: '',
        novovalor: '',
    };

    angular.extend(m, {
        proxima_fatura: proxima_fatura,
        disponivel: disponivel,
        add_gasto: add_gasto,
        remove_gasto: remove_gasto,
        save: save,
    });

    function proxima_fatura(){
        return m.lim_total - m.parcelado_restante - m.lim_atual;
    }

    function disponivel(){
        var somagastos = 0;
        m.gastos.map(function(g){
            somagastos += g.valor;
        })
        return m.saldoinicial - m.custofixo - m.proxima_fatura() - somagastos;
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
