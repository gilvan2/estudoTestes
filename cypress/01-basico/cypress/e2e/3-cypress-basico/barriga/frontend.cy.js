/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'

describe('Testanado em nível funcional',()=>{
    
    beforeEach(()=>{
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
        cy.login('gilvan.silva@gmail.com','senhaerrada@')
        cy.resetApp()
    })

    it('Deve cadastrar uma conta',()=>{
        cy.acessarMenuConta()
        cy.inserirConta('Conta de testes')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso')
    })

    after(()=>{
        cy.clearLocalStorage //Ou qualquer outro tipo de clear, depende da necessidade
    })

    it('Deve alterar uma conta', ()=>{
        cy.acessarMenuConta()
        cy.contains('tr', 'Conta para alterar')
        .find(loc.CONTA.LOCATOR_BTN_ALTERAR)
        .click()
        cy.get(loc.CONTA.NOME).clear().type('Conta para alterar alterada')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')

    })

    it('não deve inserir conta com nome repetido',()=>{
        cy.acessarMenuConta()
        cy.acessarMenuConta()
        cy.inserirConta('Conta mesmo nome')
        cy.get(loc.MESSAGE).should('contain','code 400')
    })

    it('Deve cadastrar uma movimentação', ()=>{

        let movimentacoesNoExtrato;
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
        .contains('123')
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