/// <reference types="cypress" />

describe('Trabalhando com elementos básicos',()=>{
    it('Textos',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('span').should('contain','Cuidado onde clica, ')//Uma tag
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')//Uma classe -> busca exatamente o elemento
    })
})