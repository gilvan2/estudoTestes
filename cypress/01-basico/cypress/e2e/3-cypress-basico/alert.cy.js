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

    //TO DO alert com stub não funciona, mesmo colando a resposta do repositório
    /*it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })      */ 
})
