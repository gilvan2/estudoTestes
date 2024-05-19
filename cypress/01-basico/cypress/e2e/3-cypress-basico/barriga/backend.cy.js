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

    it('Deve cadastrar uma conta via rest',()=>{
        
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

    it('Deve alterar uma conta via rest', ()=>{
        //Caso exista uma forma de buscar o id, pode ser feita uma implementação parecida com essa
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'GET',
            headers: {Authorization: `JWT ${token}`},
            qs:{
                nome: 'Conta para alterar'
            }
        //}).then(res => console.log(res))
        }).then(res => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                method: 'PUT',
                headers: {Authorization: `JWT ${token}`},
                body: {
                    "nome": "Conta alterada via rest"
                }
            })
        }).as('resposta').its('status').should('be.equal',200)

        /*Caso não exista uma forma de se obter o id, pode se por exemplo pesquisar os id disponíveis 
        e fazer um filtro do valor desejado */
        //TODO implementar teste buscando a lista de ID's disponíveis
    })

    it('não deve inserir conta com nome repetido via rest',()=>{
        cy.request({
            url: 'https://barrigarest.wcaquino.me/contas',
            method: 'POST',
            headers: {Authorization: `JWT ${token}`},
            body: {
                nome: "Conta mesmo nome"
            },
            failOnStatusCode: false
        }).as('resposta')

        cy.get('@resposta').then(res =>{
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.contain('Já existe uma conta com esse nome!')          
        })
    })

    it('Deve cadastrar uma movimentação', ()=>{
    })

    it("Deve remover a movimentação inserida",()=>{
    })
})