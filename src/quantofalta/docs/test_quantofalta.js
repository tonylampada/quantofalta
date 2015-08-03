describe("[audyujhsmb] quantofalta test", function() {

    beforeEach(angular.mock.module('teste_quantofalta'));

    // Joao recebeu o salario de 6000 em 5/ago/2015
    // Ele quer chegar em 5/set com 500 sobrando.
    // Ele tem um custo fixo de 2000 e quer deixar sua fatura abaixo de 2000

    it('[jgafjdsdyt] comeco do periodo', inject(function(QFModelTester, QFModel){
        var now = new Date(2015, 7, 7);
        QFModelTester.init({
            lim_atual: 5700,
            fatura_fechada: 0,
            fatura_paga: false,
        }, now);

        QFModelTester.add_gasto('café', 15);
        QFModelTester.add_gasto('padaria', 35);
        QFModelTester.add_gasto('saque', 150); //total gastos = 200
        QFModelTester.add_fixo('Aluguel', 1100, true);
        QFModelTester.add_fixo('Água', 700, false);
        QFModelTester.add_fixo('Telefone', 200, false); //fixo pago/total = 1100 / 2000

        // fatura aberta:
        // lim_total - parcelado_restante - lim_atual = 8000 - 500 - 5700 = 1800

        // quanto devera ter disponivel antes do pagamento:
        // salario - custofixo - gastos - fatura_aberta = 6000 - 2000 - 200 - 1800 = 2000

        // quanto ele deve ter no banco hoje
        // salario - custofixopago - gastos = 6000 - 1100 - 200 = 4700

        expect(QFModel.fixo_pago()).equal(1100);
        expect(QFModel.fixo()).equal(2000);
        expect(QFModel.dias_ate_pagamento()).equal(29);
        expect(QFModel.proxima_fatura()).equal(1800);
        expect(QFModel.disponivel()).equal(2000);
        expect(QFModel.saldo_estimado()).equal(4700);
        expect(QFModel.meta_fatura_hoje()).equal((29/31) * QFModel.meta_fatura);
    }));

    it('[jgafjdsdyt] meio do periodo. fatura fechou, mas ele nao pagou ainda', inject(function(QFModelTester, QFModel){
        var now = new Date(2015, 7, 13);
        QFModelTester.init({
            lim_atual: 5400,
            fatura_fechada: 1850,
            fatura_paga: false,
        }, now);

        QFModelTester.add_gasto('café', 15);
        QFModelTester.add_gasto('padaria', 35);
        QFModelTester.add_gasto('saque', 150);
        QFModelTester.add_gasto('almoço no debito', 20); //total gastos = 220
        QFModelTester.add_fixo('Aluguel', 1100, true);
        QFModelTester.add_fixo('Água', 700, false);
        QFModelTester.add_fixo('Telefone', 200, true); //fixo pago/total = 1300 / 2000

        // fatura aberta:
        // lim_total - parcelado_restante - lim_atual - fatura_fechada = 8000 - 500 - 5400 - 1850 = 250

        // quanto devera ter disponivel antes do pagamento:
        // salario - custofixo - gastos - fatura_fechada = 6000 - 2000 - 220 - 1850 = 1930

        // quanto ele deve ter no banco hoje
        // salario - custofixopago - gastos = 6000 - 1300 - 220 = 4480

        expect(QFModel.fixo_pago()).equal(1300);
        expect(QFModel.fixo()).equal(2000);
        expect(QFModel.dias_ate_pagamento()).equal(23);
        expect(QFModel.proxima_fatura()).equal(250);
        expect(QFModel.disponivel()).equal(1930);
        expect(QFModel.saldo_estimado()).equal(4480);
        expect(QFModel.meta_fatura_hoje()).equal((4/31) * QFModel.meta_fatura);
    }));

    it('[jgafjdsdyt] meio do periodo. fatura fechou, e ele ja pagou', inject(function(QFModelTester, QFModel){
        var now = new Date(2015, 7, 18);
        QFModelTester.init({
            lim_atual: 6900,
            fatura_fechada: 1850,
            fatura_paga: true,
        }, now);

        QFModelTester.add_gasto('café', 15);
        QFModelTester.add_gasto('padaria', 35);
        QFModelTester.add_gasto('saque', 150);
        QFModelTester.add_gasto('almoço no debito', 20);
        QFModelTester.add_gasto('saque', 170); //total gastos = 390
        QFModelTester.add_fixo('Aluguel', 1100, true);
        QFModelTester.add_fixo('Água', 700, false);
        QFModelTester.add_fixo('Telefone', 200, true); //fixo pago/total = 1300 / 2000

        // fatura aberta:
        // lim_total - parcelado_restante - lim_atual = 8000 - 500 - 6900 = 600

        // quanto devera ter disponivel antes do pagamento:
        // salario - custofixo - gastos - fatura_fechada = 6000 - 2000 - 390 - 1850 = 1760

        // quanto ele deve ter no banco hoje
        // salario - custofixopago - gastos - fatura_fechada = 6000 - 1300 - 390 - 1850 = 2460

        expect(QFModel.fixo_pago()).equal(1300);
        expect(QFModel.fixo()).equal(2000);
        expect(QFModel.dias_ate_pagamento()).equal(18);
        expect(QFModel.proxima_fatura()).equal(600);
        expect(QFModel.disponivel()).equal(1760);
        expect(QFModel.saldo_estimado()).equal(2460);
        expect(QFModel.meta_fatura_hoje()).equal((9/31) * QFModel.meta_fatura);
    }));

    it('[jhfdhg] final do periodo, perto de receber', inject(function(QFModelTester, QFModel){
        var now = new Date(2015, 8, 2);
        QFModelTester.init({
            lim_atual: 5200,
            fatura_fechada: 1850,
            fatura_paga: true,
        }, now);

        QFModelTester.add_gasto('café', 15);
        QFModelTester.add_gasto('padaria', 35);
        QFModelTester.add_gasto('saque', 150);
        QFModelTester.add_gasto('almoço no debito', 20);
        QFModelTester.add_gasto('saque', 170);
        QFModelTester.add_gasto('médico', 500); //total gastos = 890
        QFModelTester.add_fixo('Aluguel', 1100, true);
        QFModelTester.add_fixo('Água', 700, true);
        QFModelTester.add_fixo('Telefone', 200, true); //fixo pago/total = 2000 / 2000

        // fatura aberta:
        // lim_total - parcelado_restante - lim_atual = 8000 - 500 - 5200 = 2300

        // quanto devera ter disponivel antes do pagamento:
        // salario - custofixo - gastos - fatura_fechada = 6000 - 2000 - 890 - 1850 = 1260

        // quanto ele deve ter no banco hoje
        // salario - custofixopago - gastos - fatura_fechada = 6000 - 2000 - 890 - 1850 = 1260

        expect(QFModel.fixo_pago()).equal(2000);
        expect(QFModel.fixo()).equal(2000);
        expect(QFModel.dias_ate_pagamento()).equal(3);
        expect(QFModel.proxima_fatura()).equal(2300);
        expect(QFModel.disponivel()).equal(1260);
        expect(QFModel.saldo_estimado()).equal(1260);
        expect(QFModel.meta_fatura_hoje()).equal((24/31) * QFModel.meta_fatura);
    }));

});

angular.module('teste_quantofalta', ['quantofalta']);

angular.module('teste_quantofalta').factory('QFModelTester', function(QFModel){
    return {
        init: init,
        add_gasto: add_gasto,
        add_fixo: add_fixo,
    };

    function init(options, now){
        QFModel.saldoinicial = 6000;
        QFModel.fechamento_fatura = 9;
        QFModel.dia_pagamento = 5;
        QFModel.meta_fatura = 2000;
        QFModel.parcelado_restante = 500;
        QFModel.lim_total = 8000;
        QFModel.fixos = [];
        QFModel.gastos = [];

        QFModel.lim_atual = 5300;
        QFModel.fatura_fechada = 0;
        QFModel.fatura_paga = false;

        QFModel._now = function(){
            return now;
        }
        angular.extend(QFModel, options);
    }

    function add_gasto(desc, valor){
        QFModel.gastos.push({descricao:desc, valor: valor})
    }

    function add_fixo(desc, valor, pago){
        QFModel.fixos.push({descricao:desc, valor: valor, pago:pago})
    }
})
