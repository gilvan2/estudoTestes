/// <reference types="cypress" />

import loc from '../../../support/locators'

describe('Testanado em nível funcional',()=>{
    beforeEach(()=>{

        cy.login('gilvan.silva.junior@gmail.com','Fisi123c@')

    })

    it('Deve cadastrar uma conta',()=>{

        cy.resetApp()

        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTA.NOME).type('Conta de testes')
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta inserida com sucesso')
    })

    it('Deve alterar uma conta', ()=>{
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()

        cy.contains('tr', 'Conta de testes') // Localize a linha que contém o texto "Conta de testes"
        .find(loc.CONTA.LOCATOR_BTN_ALTERAR)//.find('i.far.fa-edit') // Encontre o elemento <i> com as classes "far" e "fa-edit" dentro da linha
        .click(); // Clique no botão "far fa-edit"

        cy.get(loc.CONTA.NOME).clear().type('Conta de testes alterada')

        //cy.get('button.btn').click()
        cy.get(loc.CONTA.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain','Conta atualizada com sucesso')

    })
    

})