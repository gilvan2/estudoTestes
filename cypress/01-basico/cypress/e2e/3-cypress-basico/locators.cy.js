/// <reference types="cypress" />

describe('Trabalhando com elementos básicos', ()=>{
    cy.visit('https://wcaquino.me/cypress/componentes.html#')
})

beforeEach(()=>{
    cy.reload()
})
//A gente consegue indicar ao cypress qual a estratégia de busca de campos 
//Procurar na documentação, a parte de selector-playground 
//Eu posso priorizar, mas é bom deixar as buscas configuradas default 
//Ver aula 41
it('',()=>{

})

//JQuery Selectors -> Buscar as referencias na w3scholls - https://www.w3schools.com/jquery/jquery_ref_selectors.asp
/*
.nomeDaClasse
 #idDoComponenteHtml
 [atributo=valor] --- [data-cy=dataSobrenome]
 dúvidas, aula 42

 */
 it('JQuerySelector',()=>{

 })