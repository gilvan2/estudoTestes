const buildEnv = () =>{

    //cy.server() e cy.route até versão 12, da versão 13 em diante usar cy.intercept 
/*
    cy.server()

    cy.route({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        response: {
            id: 99999,
            nome: "Usuário Falso",
            token: "Uma string muit, muito, muito longa que não deveria ser aceita, mas é"
        }
    }).as('sigin')

    cy.route({
        method: 'GET',
        url:'https://barrigarest.wcaquino.me/saldo',
        response:[
            {
                conta_id: 999,
                conta: "Carteira",
                saldo: "100.00"},
            {
                conta_id: 99909,
                conta: "Banco",
                saldo: "10000000.00"
            }
        ]
    }).as('saldo')        
*/

    cy.intercept({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin'
    },
    {id: 99999, nome: "Usuário Falso", token: "Uma string muit, muito, muito longa que não deveria ser aceita, mas é"}
    ).as('sigin')

    cy.intercept({
        method: 'GET',
        url:'https://barrigarest.wcaquino.me/saldo'
    },
    [
        {conta_id: 999, conta: "Carteira", saldo: "100.00"},
        {conta_id: 99909, conta: "Banco", saldo: "10000000.00"}
    ]
    ).as('saldo')

    cy.intercept({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas'
    },[
        {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
        {id: 2, nome: 'Banco', visivel: true, usuario_id: 1}
    ]
    ).as('contas')

    cy.intercept({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/transacoes'
    },{
        conta: "Conta para saldo",
        id: 2011776,
        descricao: "Movimentacao 1, calculo saldo",
        envolvido: "CCC",
        observacao: null,
        tipo: "REC",
        data_transacao: "2024-05-31T03:00:00.000Z",
        data_pagamento: "2024-05-31T03:00:00.000Z",
        valor: "3500.00",
        status: true,
        conta_id: 2145231,
        usuario_id: 50833,
        transferencia_id: null,
        parcelamento_id: null
    }
    ).as('transacoes')

    /*cy.intercept({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/extrato/**'
    },[
        { conta: "Conta para saldo", id: 2011776,descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "3500.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
        { conta: "Conta com movimentacao", id: 2011775,descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 2145230, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
        { conta: "Conta para saldo", id: 2011777,descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
        { conta: "Conta para saldo", id: 2011778,descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
        { conta: "Conta para extrato", id: 2011779,descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 2145232, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
        { conta: "Conta para movimentacoes", id: 2011780, descricao: "desc", envolvido: "inter", observacao: null, tipo: "REC" , data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-06-01T03:00:00.000Z", valor: "123.00", status: true, conta_id: 2145229, usuario_id: 99999, transferencia_id: null, parcelamento_id: null }
    ]
    ).as('estrato_com_6_registros')*/

}

export default buildEnv