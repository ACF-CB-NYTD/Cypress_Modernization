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
        mfaPage.enterPasscode();
        mfaPage.clickOnSubmitBtn();
        commonPage.verifyUrl('/User');
    }),
    {
        cacheAcrossSpecs: true
    }
});

Cypress.Commands.add('standardLogin', (username, password) => {
    cy.visit('')
    homePage.enterUsernameAndPassword(username, password);
    homePage.clickOnStateUserLoginBtn();
    commonPage.verifyUrl('/MFA');
    mfaPage.elements.mfaHeader().should('have.text', 'Multi-Factor Authentication');
    mfaPage.elements.passcodeText().should('have.text', 'Passcode *');
    mfaPage.enterPasscode();
    mfaPage.clickOnSubmitBtn();
    commonPage.verifyUrl('/User');
});

Cypress.Commands.add('createPage1Session', () => {
    cy.session('step 1', () => {
        cy.visit("");
        cy.get('[data-testid="request_account"]').click();
    }, {
      // Optionally, validate the session state
      validate() {
        cy.get('[data-testid="New_user_title"]').should("exist");
        // Check if the session state is still valid, e.g., by checking if you're at the last step
      }
    });
});


Cypress.Commands.add('createPage2Session', () => {
    cy.session('step 2', () => {
        cy.visit("");
        cy.get('[data-testid="request_account"]').click();
        cy.get('[data-testid="radio"]').contains("State User Account").click();
        cy.get('[data-testid="radio"]').contains("Standard User").click();
        cy.get('[data-testid="state_select"]').select('Test State');
        cy.get('[data-testid="textInput"]').type('Test Agency');
        cy.get('[data-testid="button"]').contains("Continue").click();
        cy.get('[data-testid="New_user_page_title"]').contains("Personal User Information");
    }, {
      // Optionally, validate the session state
      validate() {
        cy.url().should('include', '/RequestAccount');
        cy.get('[data-testid="New_user_page_title"]').contains("Personal User Information");
      }
    });
});


Cypress.Commands.add('createPage3Session', () => {
    cy.session('step 3', () => {
        cy.visit("");
        cy.get('[data-testid="request_account"]').click();
        cy.get('[data-testid="radio"]').contains("State User Account").click();
        cy.get('[data-testid="radio"]').contains("Standard User").click();
        cy.get('[data-testid="state_select"]').select('Test State');
        cy.get('[data-testid="textInput"]').type('Test Agency');
        cy.get('[data-testid="button"]').contains("Continue").click();
        cy.get('[id="title"]').type('Test Title');
        cy.get('[id="firstName"]').type('FName');
        cy.get('[id="lastName"]').type('LName');
        cy.get('[id="phone"]').type('999-999-9999');
        cy.get('[id="email"]').type('abc@gov.net');
        cy.get('[data-testid="button"]').contains("Continue").click();
        cy.get('[data-testid="New_user_page_title"]').contains("Security Compliance");
    }, {
      // Optionally, validate the session state
      validate() {
        cy.get('[data-testid="New_user_page_title"]').contains("Security Compliance");

        // Check if the session state is still valid, e.g., by checking if you're at the last step
      }
    });
});


Cypress.Commands.add('createPage4Session', () => {
    cy.session('fullForm', () => {
        cy.visit("");
    this.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    this.clickOnStandardUserRoleRadioBtn();
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeFNameInFirstName();
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail();
    this.clickOnContinueBtn();
    this.CheckSecurityAgreementCheckbox();
    this.TypeNameIntoNameInput();
    this.clickOnContinueBtn();
    }, {
      // Optionally, validate the session state
      validate() {
        // Check if the session state is still valid, e.g., by checking if you're at the last step
      }
    });
});