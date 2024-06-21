import { authenticator, totp, hotp } from 'otplib';
import CommonPageObjects from "../pages/CommonPageObjects";

const commonPage = new CommonPageObjects();
const secret = 'BZ722EYYD323F5YMTTTGPSWAN6EAUAVFVSKZ3YAEC4M2OV6OX4KA';
const Atoken = authenticator.generate(secret);

describe("Login as a State Authorized Official", function () {
beforeEach(() =>
{
/*  cy.fixture("userCredentials").then(function (data) {
    this.data = data;
  cy.login(this.data.saoUsername,this.data.saoPassword)
    
  });*/
  
  cy.login('teststatesao','P@ssw0rd')
 
})


  it("Verify Dashboard", function () {
    
   /* cy.session('login', () => {
      
      commonPage.enterSAOUsernameAndPassword(this.data.saoUsername,this.data.saoPassword);
      commonPage.elements.LoginBtn().should('have.text','Login').click()*/
      
      //cy.url().should('include', '/MFA')
      //cy.visit('')
      
        //cy.get('[data-testid="user_id_input"]').type(username)
        //cy.get('[data-testid="password_input"]').type(password)
        cy.visit('https://sbx.dssnytd.com/User')
        cy.get('#main_content').should('have.text', 'Dashboard')
        cy.get(':nth-child(2) > [data-testid="default_link"]').should('have.text', 'Transmissions').click()

        /*cy.get('[data-testid="user_id_input"]').type('teststatesao')
        cy.get('[data-testid="password_input"]').type('P@ssw0rd')
        cy.get('[data-testid="state_user_login_button"]').should('have.text','Login').click()
        cy.url().should('include', '/MFA')
        cy.get('#main_content').should('have.text','Multi-Factor Authentication')

        cy.url().should('include', '/MFA')
        cy.get('[data-testid="passcode_input"]').type(Atoken);
        cy.get('[data-testid="MFA_submit_button"]').click();*/
    //})
    });

  it("Transmissions", function () {
    //cy.visit('/MFA')
    cy.visit('https://sbx.dssnytd.com/Transmisisons')
    cy.get(':nth-child(1) > :nth-child(2) > .usa-link').click()
        //cy.get('[data-testid="user_id_input"]').type(username)
        //cy.get('[data-testid="password_input"]').type(password)
        //cy.get('[data-testid="user_id_input"]').type('teststatesao')
        //cy.get('[data-testid="password_input"]').type('P@ssw0rd')
        //cy.get('[data-testid="state_user_login_button"]').should('have.text','Login').click()
    /*cy.url().should('include', '/MFA')
    cy.get('[data-testid="passcode_input"]').type(Atoken);
    cy.get('[data-testid="MFA_submit_button"]').click();
    cy.url().should('include', '/User')  */  
  });
});