// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators'
Cypress.Commands.add('login',(user, passwd)=>{

    cy.visit('https://barrigareact.wcaquino.me/')
        cy.get(loc.LOGIN.USER).type(user)
        cy.get(loc.LOGIN.PASSWORD).type(passwd)
        cy.get(loc.LOGIN.BTN_LOGIN).click()
        cy.get(loc.MESSAGE).should('contain','Bem vindo')

})

Cypress.Commands.add('resetApp',()=>{
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.RESETAR).click()

})

Cypress.Commands.add('getToken',(user, passwd)=>{
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body : {
                "email": user,
                "senha": passwd,
                "redirecionar": false
        }
    //}).then(res => console.log(res)) -> Para ver o que veio da requisição
    }).its('body.token').should('not.be.empty')
    .then(token =>{
        return token
    })
})
//TODO - Ajustar para o cypress não precisar declatar a url totalmente, somente os recursos acessados () baseUrl )
//TODO - Ajustar resetToken para receber o token ao invés de fazer a requisição pelo getToken
Cypress.Commands.add('resetRest',()=>{
    cy.getToken('gilvan.silva@gmail.com','Mate123matic@')
    .then(token =>{
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: {Authorization: `JWT ${token}`}
        }).its('status').should('be.equal',200)
    })
})

