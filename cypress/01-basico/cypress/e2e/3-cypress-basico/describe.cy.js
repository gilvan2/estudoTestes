/// <reference types="cypress" />

it('Um teste externo',()=>{

})

describe('Agrupamento de testes',()=>{
    describe('Agrupamento de testes mais especificos',()=>{
        it.skip('Um teste bem especifico',()=>{

        })
    })
    describe('Agrupamento de outros testes especificos',()=>{
        it('Um teste de outro agrupamento',()=>{
            
        })
    })
    it('Um teste interno',()=>{

    })
})