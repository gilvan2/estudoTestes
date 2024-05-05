const locators = {
    LOGIN: {
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]'
    },
    CONTA: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: 'button.btn',
        //LOCALIZAR_BTN_ALTERAR:"'tr', 'Conta de testes'",
        LOCATOR_BTN_ALTERAR: 'i.far.fa-edit'
    },
    MESSAGE: '.toast'

}

export default locators