/// <reference types="cypress" />

describe('Trabalhando com elementos básicos',()=>{
    it('Textos',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('span').should('contain','Cuidado onde clica, ')//Uma classe css(tag)
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')//Uma classe -> busca exatamente o elemento
    })

    it('Links',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text','Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')



    })
})