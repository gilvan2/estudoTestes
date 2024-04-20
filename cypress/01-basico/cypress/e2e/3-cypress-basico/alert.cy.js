/// <reference types="cypress" />

describe('Trabalhando com alert', ()=>{
    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html#')
    })

    beforeEach(()=>{
        cy.reload()
    })

    it('Alert',()=>{
        cy.get('#alert').click()
        cy.on('windown:alert', msg =>{ //cy.on pega eventos que acontecam na tela
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })
})
