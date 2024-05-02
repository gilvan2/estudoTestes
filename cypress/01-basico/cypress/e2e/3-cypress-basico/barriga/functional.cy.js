/// <reference types="cypress" />

describe('Testanado em nível funcional',()=>{
    beforeEach(()=>{
        /*
        gilvan.silva
        gilvan.silva.junior@gmail.com
        Fisi123c@
        */
        cy.visit('https://barrigareact.wcaquino.me/')
        cy.get('[data-test="email"]').type('gilvan.silva.junior@gmail.com')
        cy.get('[data-test="passwd"]').type('Fisi123c@')
        cy.get('.btn').click()
        cy.get('.toast').should('contain','Bem vindo')
    })

    it('Deve cadastrar uma conta',()=>{

        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta de testes')
        cy.get('button.btn').click()
        cy.get('.toast').should('contain','Conta inserida com sucesso')
    })

    it.only('Deve alterar uma conta', ()=>{
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()

        cy.contains('tr', 'Conta de testes') // Localize a linha que contém o texto "Conta de testes"
        .find('i.far.fa-edit') // Encontre o elemento <i> com as classes "far" e "fa-edit" dentro da linha
        .click(); // Clique no botão "far fa-edit"

        cy.get('[data-test="nome"]').clear().type('Conta de testes alterada')

        cy.get('button.btn').click()
        cy.get('.toast').should('contain','Conta atualizada com sucesso')


    })

})