/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'

describe('Testanado em nível funcional',()=>{
    beforeEach(()=>{
        cy.login('gilvan.silva.junior@gmail.com','Fisi123c@')
    })

    it('Deve cadastrar uma conta',()=>{

        cy.resetApp()
        cy.acessarMenuConta()
        cy.inserirConta('Conta de testes')
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso')
    })

    it('Deve alterar uma conta', ()=>{
        
        cy.acessarMenuConta()
        cy.contains('tr', 'Conta de testes')
        .find(loc.CONTA.LOCATOR_BTN_ALTERAR)
        .click();

        cy.get(loc.CONTA.NOME).clear().type('Conta de testes alterada')

        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')

    })

    it('não deve inserir conta com nome repetido',()=>{
        cy.acessarMenuConta()
        cy.acessarMenuConta()
        cy.inserirConta('Conta de testes alterada')
        cy.get(loc.MESSAGE).should('contain','code 400')
    })

    it('Deve cadastrar uma movimentação', ()=>{

        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Descrição')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('interessado')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Movimentação inserida com sucesso!')
    })

})