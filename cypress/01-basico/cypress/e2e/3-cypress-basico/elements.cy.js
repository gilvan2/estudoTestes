/// <reference types="cypress" />

describe('Trabalhando com elementos básicos',()=>{
    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Textos',()=>{
        
        cy.get('span').should('contain','Cuidado onde clica, ')//Uma classe css(tag)
        cy.get('.facilAchar').should('have.text','Cuidado onde clica, muitas armadilhas...')//Uma classe -> busca exatamente o elemento
    })

    it('Links',()=>{
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text','Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')

    })

    it('TextFild',()=>{
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value','Cypress Test')

        cy.get('#elementosForm\\:sugestoes')
            .type('TextArea')//No jQery Selector, os : está confundindo o Cypress, por isso a adição do caracter de escape
            .should('have.value','TextArea')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('Campo1')

        cy.get('[data-cy="dataSobrenome"]')
            .type('Teste12345{backspace}{backspace}')
            .should('have.value','Teste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto',{delay:100})
            .should('have.value','acerto')
    })

    it('RadioButton',()=>{
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')

        cy.get('#formSexoMasc')
            .should('not.be.checked')

        cy.get("[name='formSexo']").should('have.length',2) //Busca por
    })

    it('Checkbox', ()=>{
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]').
            click({multiple: true})
            
        cy.get('#formComidaPizza').should('not.be.checked')

        cy.get('#formComidaVegetariana').should('be.checked')

    })

    it.only('Combo',()=>{
        cy.get('[data-test="dataEscolaridade"]')
            .select('2o grau completo')
            .should('have.value','2graucomp')

        cy.get('[data-test="dataEscolaridade"]')
            .select('1graucomp')
            .should('have.value','1graucomp')
    })
})