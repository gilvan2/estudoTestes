/// <reference types="cypress" />
describe('Esperas e sincronizações',()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Deve aguardar elemento estar disponível',()=>{
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')
    })
    }
)