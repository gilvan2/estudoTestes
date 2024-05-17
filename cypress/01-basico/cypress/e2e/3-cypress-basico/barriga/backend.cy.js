/// <reference types="cypress" />

describe('Testanado em nível funcional',()=>{
    
    beforeEach(()=>{
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
        .then(token =>{
            cy.request({
                method: 'POST',
                url: 'https://barrigarest.wcaquino.me/contas',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'Conta via rest'
                }
            }).as('resposta')
            //}).then(res => console.log(res))
        })

        cy.get('@resposta').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
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