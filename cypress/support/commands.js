import { timeout } from "async";
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
        commonPage.verifyUrl('/MFA', {timeout: 10000});
        commonPage.elements.headerH3Text().should('have.text', 'Multi-Factor Authentication');
        mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
        mfaPage.enterPasscode(username);
        mfaPage.clickOnSubmitBtn();
        commonPage.verifyUrl('/User');
    }),
    {
        cacheAcrossSpecs: true
    }
});

Cypress.Commands.add('standardLogin', (username, password,) => {
    // Login without a session
    cy.visit('')
    homePage.enterUsernameAndPassword(username, password);
    homePage.clickOnStateUserLoginBtn();
    commonPage.verifyUrl('/MFA', { timeout: 10000 });
    commonPage.elements.headerH3Text().should('have.text', 'Multi-Factor Authentication');
    mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
    mfaPage.enterPasscode(username);
    mfaPage.clickOnSubmitBtn();
    commonPage.verifyUrl('/User');
});