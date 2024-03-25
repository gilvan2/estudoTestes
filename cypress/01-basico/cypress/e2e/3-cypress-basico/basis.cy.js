/// <reference types="cypress" />

describe('Basico do cypress',()=>{
    it('Visitando uma página e fazer uma acertiva no titulo',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().should('contains','Campo')

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo')

            //TODO imprimir o log no console
            //TODO escrever o site em um campo texto
    })

    it('Encontrar e interagir com um elemento',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value','Obrigado!')
    })
})