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

    it.only('Usando o find para buscas compostas',()=>{

        cy.get('#buttonList').click()
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 1')
        cy.get('#lista li')
            .find('span')
            .should('contain','Item 2')

            cy.get('#lista li span')//Caso o cypress se perca no contexto, deixar o find e usar a chamada completa do elemento
            .should('contain','Item 2')
    })

    
    }
)