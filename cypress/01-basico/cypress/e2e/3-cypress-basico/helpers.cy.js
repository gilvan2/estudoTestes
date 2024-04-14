/// <reference types="cypress" />
describe('Helpers...',()=>{
    /*beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })*/
    it('Wrap',()=>{
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property','nome')
        /*Case estejamos usando um objeto, o cypress não sabe usar shoud
        nesse objeto, é preciso passar um wraper desse objeot para conseguir 
        utilizar API do cypress, conforme exemplo acima*/

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el =>{
        cy.wrap($el).type('Funciona')

        const promisse = new Promise((resolve, reject) =>{
            setTimeout(()=>{
                resolve(10)
            }, 500)
        })
        cy.get('#buttonSimple').then(()=> console.log('Enconttrei o primeiro botão'))
        //promisse.then(num =>console.log(num)) Esse trecho nãoé gerenciado prlo cypress
        
        cy.wrap(promisse).then(ret => console.log(ret))
        cy.get('#buttonList').then(()=>console.log('Encontrei o segundo botão'))
        /*Nessa situação, a promisse foi envolvida para que o cypress consiga ter 
        controle/dominio sobre ela */

        cy.wrap(1).then(num =>{
            return '2'
        }).should('be.equal','2')
        /*Nesse exemplo não pode-se usar:
        cy.wrap(1).should(num =>{
            return '2'
        }).should('be.equal','2')  
        
        Pois o should ignora o valor do return, pra ele seria 1 em be.equal*/

        })
    })

    it('Its...',()=>{
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property','nome','User')
        cy.wrap(obj).its('nome').should('be.equal','User') 
        //O itens busca uma propriedade especifica do objeto fornecido

        const obj2 = {nome: 'User', idade: 20, endereco: {rua:'dos bobos'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'bobos')
        cy.wrap(obj2).its('endereco.rua').should('contain','bobos')
        //Tudo faz basicamente a mesma coisa no código acima

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)      
    })


})