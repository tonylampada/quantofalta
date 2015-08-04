angular.module('quantofalta', ['popup_gasto']);

angular.module('quantofalta').factory('QFModel', function(GastoPopupModel, $ionicPopup){
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
        edit_gasto: edit_gasto,
        remove_gasto: remove_gasto,
        add_fixo: add_fixo,
        change_fixo_pago: change_fixo_pago,
        edit_fixo: edit_fixo,
        remove_fixo: remove_fixo,
        save: save,
        _now: _now,
    });

    function _now(){
        return new Date();
    }

    function _this_day(){
        return m._now().getDate();
    }

    function _ja_fechou_fatura(){
        return _this_day() > m.fechamento_fatura || _this_day() <= m.dia_pagamento;
    }

    function _venc_prox_fatura(){
        var today = m._now();
        if(_this_day() < m.fechamento_fatura){
            return new Date(1900 + today.getYear(), today.getMonth(), m.fechamento_fatura);
        } else {
            return new Date(1900 + today.getYear(), today.getMonth()+1, m.fechamento_fatura);
        }
    }

    function _prox_pagamento(){
        var today = m._now();
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
        if(_ja_fechou_fatura() && !m.fatura_paga){
            prox_fatura -= m.fatura_fechada;
        }
        return prox_fatura;
    }

    function meta_fatura_hoje(){
        var today = m._now();
        var venc_fatura = _venc_prox_fatura();
        var venc_fatura_anterior = _venc_fatura_anterior();
        var dias_ate_venc = Math.ceil((venc_fatura - today)/_1diamilis);
        var dias_totais = Math.ceil((venc_fatura - venc_fatura_anterior)/_1diamilis);
        var meta = ((dias_totais - dias_ate_venc)/dias_totais) * m.meta_fatura;
        return meta;
    }

    function dias_ate_pagamento(){
        var today = m._now();
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

        if(_ja_fechou_fatura()){
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

    // salario - custofixopago - gastos = 6000 - 1100 - 200 = 4700
    // salario - custofixopago - gastos = 6000 - 1300 - 220 = 4480
    // salario - custofixopago - gastos - fatura_fechada = 6000 - 1300 - 390 - 1850 = 2460
    // salario - custofixopago - gastos - fatura_fechada = 6000 - 2000 - 890 - 1850 = 1260


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
        GastoPopupModel.open({
            title: 'Novo gasto',
            show_date: true,
        }).then(function(g){
            if(!m.gastos){
                m.gastos = [];
            }
            m.gastos.push({descricao: g.desc, valor: parseFloat(g.valor), data: g.data});
            m.save();
        });
    }

    function edit_gasto(gasto){
        GastoPopupModel.open({
            title: 'Editar gasto',
            show_date: true,
            data: gasto.data,
            desc: gasto.descricao,
            valor: gasto.valor,
        }).then(function(g){
            angular.extend(gasto, {descricao: g.desc, valor: parseFloat(g.valor), data: g.data});
            m.save();
        });
    }

    function remove_gasto(gasto){
        $ionicPopup.confirm({
            title: 'Remover gasto ('+gasto.valor+')',
            template: 'Certeza?'
        }).then(function(sim){
            if(sim){
                var idx = m.gastos.indexOf(gasto);
                m.gastos.splice(idx, 1);
                m.save();
            }
        });
    }

    function add_fixo(){
        GastoPopupModel.open({
            title: 'Novo custo fixo',
            show_date: true,
        }).then(function(f){
            if(!m.fixos){
                m.fixos = [];
            }
            m.fixos.push({descricao: f.desc, valor: f.valor, data: f.data, pago:false});
            m.save();
        });
    }

    function change_fixo_pago(f){
        if(f.pago){
            f.data = m._now().getTime();
        }
        m.save();
    }

    function edit_fixo(fixo){
        GastoPopupModel.open({
            title: 'Editar custo fixo',
            show_date: true,
            desc: fixo.descricao,
            valor: fixo.valor,
            data: fixo.data,
        }).then(function(f){
            angular.extend(fixo, {descricao: f.desc, valor: f.valor, data: f.data})
            m.save();
        });
    }

    function remove_fixo(fixo){
        $ionicPopup.confirm({
            title: 'Remover custo fixo ('+fixo.valor+')',
            template: 'Certeza?'
        }).then(function(sim){
            if(sim){
                var idx = m.fixos.indexOf(fixo);
                m.fixos.splice(idx, 1);
                m.save();
            }
        });
    }

    function save(){
        localStorage.setItem('quantofalta', angular.toJson(m));
    }

    return m;
});

angular.module('quantofalta').factory('QFExtratoModel', function(QFModel, $filter){
    var em = {
        saldoinicial: 0,
        items: [],
    };

    angular.extend(em, {
        update: update,
    });

    function update(){
        em.saldoinicial = QFModel.saldoinicial;
        em.faturapaga = QFModel.fatura_paga ? QFModel.fatura_fechada : 0;
        var gastos = angular.copy(QFModel.gastos);
        var fixos = angular.copy(QFModel.fixos);
        fixos = fixos.filter(function(f){return f.pago});
        gastos.map(function(g){g.prefix = 'G'});
        fixos.map(function(f){f.prefix = 'F'});
        var items = $filter('orderBy')(gastos.concat(fixos), 'data');
        var saldo = em.saldoinicial - em.faturapaga;
        items.map(function(item){
            item.saldo = saldo - item.valor;
            saldo = item.saldo;
        });
        em.items = items;
    }

    return em;
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

angular.module('quantofalta').controller('NowCtrl', function($scope, QFModel, $ionicPopup){
    $scope.m = QFModel;
});

angular.module('quantofalta').controller('FixoCtrl', function($scope, QFModel){
    $scope.m = QFModel;
});

angular.module('quantofalta').controller('ExtratoCtrl', function($scope, QFExtratoModel, $rootScope){
    var em = $scope.em = QFExtratoModel;
    em.update();
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        if(toState.name == 'tab.extrato'){
            em.update();
        }
    })
});

angular.module('quantofalta').filter('diames', function(){
    var meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return function(t){
        if(t){
            d = new Date(t);
            return d.getDate() + '/' + meses[d.getMonth()];
        }
        return '';
    }
})
