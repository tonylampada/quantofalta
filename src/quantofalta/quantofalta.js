angular.module('quantofalta', []);

angular.module('quantofalta').factory('QFModel', function(){
    var m = {
        saldoinicial: 0,
        custofixo: 0,
        parcelado_restante: 0,
        lim_total: 0,
        lim_atual: 0,
    };

    angular.extend(m, {
        proxima_fatura: proxima_fatura,
        disponivel: disponivel,
    });

    function proxima_fatura(){
        return m.lim_total - m.parcelado_restante - m.lim_atual;
    }

    function disponivel(){
        return m.saldoinicial - m.custofixo - m.proxima_fatura();
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
