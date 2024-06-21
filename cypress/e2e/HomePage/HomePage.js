import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();

describe("Home Page Validations", function () {
      before(() => {
    //Cypress.session.clearAllSavedSessions()
  })
   //beforeEach(function () {
    //cy.session("login", () => {
   //   cy.visit("");
   // })
  //});
  it("Verify clicking NYTD logo navigates to ACF website", function () {
    cy.visit("");
    homePage.clickOnNYTDIcon();
  });

    it("Verify user is able to select state user tab", function () {
    cy.visit("");
    homePage.clickOnStateButton();
    homePage.elements.loginInstructionsMsg().should('have.text','Please enter your Username and Password and select Login to begin using the NYTD portal')
    homePage.elements.usernameText().should('have.text','Username *')
    homePage.elements.forgotUsernameText().should('have.text','Forgot Username?')
    homePage.elements.passwordText().should('have.text','Password *')
    homePage.elements.forgotPasswordText().should('have.text','Forgot Password?')
    homePage.elements.LoginBtn().should('have.text','Login')
  });

    it("Verify user is able to enter text for username and password", function () {
    cy.visit("");
    homePage.clickOnStateButton();
    homePage.verifyUsernameAndPasswordInputContainsSpecificValue();
  });

   it("Verify user is able to enter text for username and password", function () {
    cy.visit("");
    homePage.clickOnStateButton();
    homePage.verifyUsernameAndPasswordInputContainsSpecificValue();
  });

   it("Verify forgot username navigates to forgot username page", function () {
    cy.visit("");
    
  });
});