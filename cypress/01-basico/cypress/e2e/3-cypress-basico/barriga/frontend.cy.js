/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'
import buildEnv from '../../../support/buildEnv'

describe('Testanado em nível funcional',()=>{
    
    beforeEach(()=>{

        buildEnv()
        cy.login('gilvan.silva@gmail.com','senhaerrada@')
    })

    it('Deve cadastrar uma conta',()=>{
        
        cy.intercept({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas'
        },
        {id: 3, nome:'Conta de testes', visivel: true, usuario_id: 1}
        ).as('salvarContas')
        
        cy.acessarMenuConta()

        cy.intercept({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas'
        },[
            {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
            {id: 2, nome: 'Banco', visivel: true, usuario_id: 1},
            {id: 3, nome:'Conta de testes', visivel: true, usuario_id: 1}
        ]
        ).as('contasSalvas')
        cy.inserirConta('Conta de testes')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso')
    })

    after(()=>{
        cy.clearLocalStorage //Ou qualquer outro tipo de clear, depende da necessidade
    })

    it('Deve alterar uma conta', ()=>{
        cy.intercept({
            method: 'PUT',
            url: 'https://barrigarest.wcaquino.me/contas/**'
        },{id: 2, nome: 'Conta para alterar alterada', visivel: true, usuario_id: 1}
        )
        
        cy.acessarMenuConta()
        cy.contains('tr', 'Banco')
        .find(loc.CONTA.LOCATOR_BTN_ALTERAR)
        .click()
        cy.get(loc.CONTA.NOME).clear().type('Conta para alterar alterada')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')

    })

    it('não deve inserir conta com nome repetido',()=>{
        //cy.acessarMenuConta()
        cy.intercept({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas'
        }, { 
            statusCode: 400,
            body: {"error": "Já existe uma conta com esse nome!" }
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain','code 400')
    })

    it.only('Deve cadastrar uma movimentação', ()=>{

        let movimentacoesNoExtrato;
//Registros para leitura do extrato
//-------------------------------------------------------------------------------------
        cy.intercept({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/extrato/**'
        },[
            { conta: "Conta para saldo", id: 2011776,descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "3500.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
            { conta: "Conta com movimentacao", id: 2011775,descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 2145230, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
            { conta: "Conta para saldo", id: 2011777,descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
            { conta: "Conta para saldo", id: 2011778,descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
            { conta: "Conta para extrato", id: 2011779,descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 2145232, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
            { conta: "Conta para movimentacoes", id: 2011780, descricao: "desc", envolvido: "inter", observacao: null, tipo: "REC" , data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-06-01T03:00:00.000Z", valor: "123.00", status: true, conta_id: 2145229, usuario_id: 99999, transferencia_id: null, parcelamento_id: null }
        ]
        ).as('estrato_com_6_registros')
//-------------------------------------------------------------------------------------

        cy.get(loc.MENU.EXTRATO).click()
        cy.get('.list-group')
        .find('li')
        .its('length')
        .then((length) => {
            movimentacoesNoExtrato = length 
        })
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('interessado')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
        //Garante que foi adicionada uma movimentação desde o inicio do processo
//Registros para leitura do extrato        
//------------------------------------------------------------------------------------        
cy.intercept({
    method: 'GET',
    url: 'https://barrigarest.wcaquino.me/extrato/**'
},[
    { conta: "Conta para saldo", id: 2011776,descricao: "Movimentacao 1, calculo saldo", envolvido: "CCC", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "3500.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
    { conta: "Conta com movimentacao", id: 2011775,descricao: "Movimentacao de conta", envolvido: "BBB", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1500.00", status: true, conta_id: 2145230, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
    { conta: "Conta para saldo", id: 2011777,descricao: "Movimentacao 2, calculo saldo", envolvido: "DDD", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-1000.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
    { conta: "Conta para saldo", id: 2011778,descricao: "Movimentacao 3, calculo saldo", envolvido: "EEE", observacao: null ,tipo: "REC", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "1534.00", status: true, conta_id: 2145231, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
    { conta: "Conta para extrato", id: 2011779,descricao: "Movimentacao para extrato", envolvido: "FFF", observacao: null ,tipo: "DESP", data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-05-31T03:00:00.000Z", valor: "-220.00", status: true, conta_id: 2145232, usuario_id: 99999, transferencia_id: null, parcelamento_id: null},
    { conta: "Conta para movimentacoes", id: 2011780, descricao: "desc", envolvido: "inter", observacao: null, tipo: "REC" , data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-06-01T03:00:00.000Z", valor: "123.00", status: true, conta_id: 2145229, usuario_id: 99999, transferencia_id: null, parcelamento_id: null },
    { conta: "Conta para movimentacoes", id: 2011780, descricao: "Descrição", envolvido: "interessado", observacao: null, tipo: "REC" , data_transacao: "2024-05-31T03:00:00.000Z", data_pagamento: "2024-06-01T03:00:00.000Z", valor: "123.00", status: true, conta_id: 2145229, usuario_id: 99999, transferencia_id: null, parcelamento_id: null }
]
).as('estrato_com_7_registros')
//------------------------------------------------------------------------------------
        //TODO - Realizar essa calidação com os 7 registros adicionados
   /*     
        cy.get('.list-group')
        .find('li')
        .its('length')
        .then((length) => {
            expect(movimentacoesNoExtrato + 1 ).to.be.equal(length);
        });

        //Garante que no extrato irá encontar alguma movimentação com os valores solicitados de descrição e valor
        cy.get('.list-group') 
        .contains('li', 'Descrição') 
        .should('have.descendants', 'span') 
        .contains('span', 'Descrição') 
        .parent() 
        .find('small') 
        .contains('123')*/
    })

    it("Deve remover a movimentação inserida",()=>{

        let movimentacoesNoExtrato;
        cy.get(loc.MENU.EXTRATO).click()
        cy.get('.list-group')
        .find('li')
        .its('length')
        .then((length) => {
            movimentacoesNoExtrato = length 
        });

        cy.get('.list-group-item')
        .contains('span', 'Descrição')
        .parent()
        .parent()
        .parent()
        .find('.far.fa-trash-alt')
        .click()

        //Garante que foi removida uma movimentação desde o inicio do processo
        //TODO - Validar esse trecho      
        cy.get('.list-group')
        .find('li')
        .its('length')
        .then((length) => {
            expect(movimentacoesNoExtrato ).to.be.equal(length);
        });
    })
})