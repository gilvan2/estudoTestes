/// <reference types="cypress" />

describe('Testanado em nível funcional',()=>{
    
    beforeEach(()=>{
        //cy.login('gilvan.silva.junior@gmail.com','Fisi123c@')
        //cy.resetApp()
    })

    it('Deve cadastrar uma conta',()=>{
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body : {
                    "email": "gilvan.silva.junior@gmail.com",
                    "senha": "Fisi123c@",
                    "redirecionar": false
            }
        //}).then(res => console.log(res)) -> Para ver o que veio da requisição
        }).its('body.token').should('not.be.empty')
    })

    it('Deve alterar uma conta', ()=>{
    })

    it('não deve inserir conta com nome repetido',()=>{
    })

    it('Deve cadastrar uma movimentação', ()=>{
    })

    it("Deve remover a movimentação inserida",()=>{
    })
})