/// <reference types="cypress" />

describe('Basico do cypress',()=>{
    it('Visitando uma página e fazer uma acertiva no titulo',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.title().should('be.equal','Campo de Treinamento')
        cy.title().should('contains','Campo')

        cy.title()
            .should('be.equal','Campo de Treinamento')
            .and('contain','Campo')

        let syncTile

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTile = title
        })

        cy.get('[data-cy="dataSobrenome"]').then($el =>{
            $el.val=syncTile
        })

        cy.get('#elementosForm\\:sugestoes').then($el =>{//Não esquecer de colocar o segundo \ para escapar do :
            cy.wrap($el).type(syncTile)
        })

    })

    it('Encontrar e interagir com um elemento',()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value','Obrigado!')
    })
})