const buildEnv = () =>{

    //cy.server() e cy.route até versão 12, da versão 13 em diante usar cy.intercept 
/*
    cy.server()

    cy.route({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        response: {
            id: 99999,
            nome: "Usuário Falso",
            token: "Uma string muit, muito, muito longa que não deveria ser aceita, mas é"
        }
    }).as('sigin')

    cy.route({
        method: 'GET',
        url:'https://barrigarest.wcaquino.me/saldo',
        response:[
            {
                conta_id: 999,
                conta: "Carteira",
                saldo: "100.00"},
            {
                conta_id: 99909,
                conta: "Banco",
                saldo: "10000000.00"
            }
        ]
    }).as('saldo')        
*/

    cy.intercept({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin'
    },
    {id: 99999, nome: "Usuário Falso", token: "Uma string muit, muito, muito longa que não deveria ser aceita, mas é"}
    ).as('sigin')

    cy.intercept({
        method: 'GET',
        url:'https://barrigarest.wcaquino.me/saldo'
    },
    [
        {conta_id: 999, conta: "Carteira", saldo: "100.00"},
        {conta_id: 99909, conta: "Banco", saldo: "10000000.00"}
    ]
    ).as('saldo')

    cy.intercept({
        method: 'GET',
        url: 'https://barrigarest.wcaquino.me/contas'
    },[
        {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
        {id: 2, nome: 'Banco', visivel: true, usuario_id: 1}
    ]
    ).as('contas')

}

export default buildEnv