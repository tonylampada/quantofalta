angular.module('popup_gasto', ['ionic']);

angular.module('popup_gasto').factory('GastoPopupModel', function($ionicPopup, $rootScope){
    var m = {
        show_date: false,
        data: new Date(),
        desc: '',
        valor: '',
    }

    angular.extend(m, {
        open: open,
    });

    function open(options){
        m.show_date = options.show_date;
        m.data = options.data ? new Date(options.data) : new Date();
        m.desc = options.desc || '';
        m.valor = options.valor || '';

        return $ionicPopup.show({
            templateUrl: FS.BASE_URL+'quantofalta/popup_gasto.html',
            title: options.title,
            scope: angular.extend($rootScope.$new(), {m:m}),
            buttons: [
                { text: 'Cancel' },
                {
                    text: 'OK',
                    type: 'button-positive',
                    onTap: function(e) {
                        var result = {
                            desc: m.desc,
                            valor: m.valor,
                        };
                        if(options.show_date){
                            result.data = m.data.getTime();
                        }
                        return result;
                    }
                },
            ]
        });

    }

    return m;
});
