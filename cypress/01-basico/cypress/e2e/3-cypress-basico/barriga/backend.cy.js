/// <reference types="cypress" />
import dayjs from "dayjs"

describe('Testanado em nível funcional',()=>{
    //let token 
    before(()=>{
        cy.getToken('gilvan.silva@gmail.com','Mate123matic@')
        //.then(tkn =>{
        //    token = tkn
        //})

        cy.resetRest();

    })
    beforeEach(()=>{
    })

    it('Deve cadastrar uma conta via rest',()=>{
        
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            //headers: {Authorization: `JWT ${token}`},
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
        cy.getContaByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${contaId}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
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
            //headers: {Authorization: `JWT ${token}`},
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

    it('Deve cadastrar uma movimentação via rest', ()=>{
        cy.getContaByName('Conta para movimentacoes')
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/transacoes',
                    //headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: dayjs().add(1, 'day').format('DD/MM/YYYY'),
                        data_transacao: dayjs().format('DD/MM/YYYY'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123",
                    }
                }).as('response')
            })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Deve validar extrato via rest', () => {
        cy.request({
            url: 'https://barrigarest.wcaquino.me/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
            //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao 1, calculo saldo' }
        }).then(res => {
            console.log(res.body[0])
            cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: { Authorization: `JWT ${token}` },
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: 'https://barrigarest.wcaquino.me/saldo',
            method: 'GET',
            //headers: { Authorization: `JWT ${token}` }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it("Deve remover a movimentação inserida  via rest",()=>{
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/transacoes',
             //headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `https://barrigarest.wcaquino.me/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                 //headers: { Authorization: `JWT ${token}` },
            }).its('status').should('be.equal', 204)
        })
    })
})