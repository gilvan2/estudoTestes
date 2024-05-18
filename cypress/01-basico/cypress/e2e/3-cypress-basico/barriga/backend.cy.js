/// <reference types="cypress" />

describe('Testanado em nível funcional',()=>{
    let token 
    before(()=>{
        cy.getToken('gilvan.silva@gmail.com','Mate123matic@')
        .then(tkn =>{
            token = tkn
        })

        cy.resetRest(token);

    })
    beforeEach(()=>{
    })

    it('Deve cadastrar uma conta',()=>{
        
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            }
        }).as('resposta')
            //}).then(res => console.log(res))
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