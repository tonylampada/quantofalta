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

    function _ja_fechou_fatura(){
        return _this_day() > m.fechamento_fatura || _this_day() <= m.dia_pagamento;
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
        if(_ja_fechou_fatura() && !m.fatura_paga){
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
