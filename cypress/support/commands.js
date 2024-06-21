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
import CommonPageObjects from "../e2e/pages/CommonPageObjects";
import { authenticator, totp, hotp } from 'otplib';

const commonPage = new CommonPageObjects();
const secret = 'BZ722EYYD323F5YMTTTGPSWAN6EAUAVFVSKZ3YAEC4M2OV6OX4KA';
const Atoken = authenticator.generate(secret);

Cypress.Commands.add('login', (username, password) =>
{
    
    cy.session([username, password], () =>
    {
        
        //cy.get('[data-testid="user_id_input"]').type(username)
        //cy.get('[data-testid="password_input"]').type(password)
        //cy.get('[data-testid="state_user_login_button"]').should('have.text','Login').click()
        //cy.url().should('include', '/MFA')
        //commonPage.enterUsernameAndPassword(username,password);
        //commonPage.clickOnLoginButton
        //commonPage.elements.LoginBtn().should('have.text','Login').click()
        cy.visit('/')
        cy.get('[data-testid="user_id_input"]').type(username)
        cy.get('[data-testid="password_input"]').type(password)
        cy.get('[data-testid="state_user_login_button"]').should('have.text','Login').click()
        cy.url().should('include', '/MFA')
        cy.get('#main_content').should('have.text','Multi-Factor Authentication')
        cy.get('[data-testid="label"]').should('have.text','Passcode *')

        cy.get('[data-testid="passcode_input"]').type(Atoken);
        cy.get('[data-testid="MFA_submit_button"]').click();
        cy.url().should('include', '/User') 

    }),
    //cy.visit('/MFA')
    {
        cacheAcrossSpecs: true
    }

})
