const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        HOME: '[data-test="menu-home"]',
        CONTAS: '[href="/contas"]',
        RESETAR: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        EXTRATO: '[data-test="menu-extrato"]'
    },
    CONTA: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: 'button.btn',
        //LOCALIZAR_BTN_ALTERAR:"'tr', 'Conta de testes'",
        LOCATOR_BTN_ALTERAR: 'i.far.fa-edit'
    },
    MOVIMENTACAO :{
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        BTN_SALVAR: '.btn-primary'
    },
    MESSAGE: '.toast'

}

export default locators