import CommonPageObjects from "../e2e/pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import HomePageObjects from "../e2e/pages/HomePageObjects";
const homePage = new HomePageObjects();
import MFAPageObjects from "../e2e/pages/MFAPageObjects";
const mfaPage = new MFAPageObjects();

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('')
        homePage.enterUsernameAndPassword(username, password);
        homePage.clickOnStateUserLoginBtn();
        commonPage.verifyUrl('/MFA');
        mfaPage.elements.mfaHeader().should('have.text', 'Multi-Factor Authentication');
        mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
        mfaPage.enterPasscode("teststatesao");
        mfaPage.clickOnSubmitBtn();
        commonPage.verifyUrl('/User');
    }),
    {
        cacheAcrossSpecs: true
    }
});

Cypress.Commands.add('standardLogin', (username, password,) => {
    cy.visit('')
    homePage.enterUsernameAndPassword(username, password);
    homePage.clickOnStateUserLoginBtn();
    commonPage.verifyUrl('/MFA');
    mfaPage.elements.mfaHeader().should('have.text', 'Multi-Factor Authentication');
    mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
    mfaPage.enterPasscode("teststatesao");
    mfaPage.clickOnSubmitBtn();
    commonPage.verifyUrl('/User');
});

Cypress.Commands.add('standardAdminLogin', (username, password,) => {
    cy.visit('')
    homePage.enterUsernameAndPassword(username, password);
    homePage.clickOnStateUserLoginBtn();
    commonPage.verifyUrl('/MFA');
    mfaPage.elements.mfaHeader().should('have.text', 'Multi-Factor Authentication');
    mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
    mfaPage.enterPasscode("nytdSysAdmin");
    mfaPage.clickOnSubmitBtn();
    commonPage.verifyUrl('/User');
});