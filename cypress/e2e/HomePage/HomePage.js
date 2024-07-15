import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
describe("Login Page Validations", function () {
 
  it("Verify user is able to select state user tab", function () {
    cy.visit("");
    homePage.clickOnStateUserTab();
    homePage.elements.loginInstructionsMsg().contains('Please enter your Username and Password and select Login to begin using the NYTD portal')
    homePage.elements.usernameText().contains('Username')
    homePage.elements.forgotUsernameText().contains('Forgot Username')
    homePage.elements.passwordText().contains('Password')
    homePage.elements.forgotPasswordText().contains('Forgot Password')
    homePage.elements.stateUserLoginBtn().should('have.text','Login')
  });
  
  it("Verify user is able to select federal user tab", function () {
    cy.visit("");
    homePage.clickOnFederalUserTab();
    homePage.elements.federalUserLogInInstructionText().should('have.text','Insert your HSPD-12 access card into the smart card reader before you select login.');
    homePage.elements.pavCardImage().invoke('prop', 'naturalWidth').should('be.greaterThan', 0)
    homePage.elements.federalUserLoginBtn().should('have.text','Login');
  });

  it("Verify user is able to enter text for username and password", function () {
    cy.visit("");
    homePage.clickOnStateUserTab();
    homePage.verifyUsernameAndPasswordInputContainsSpecificValue();
  });

  it("Verify forgot username navigates to forgot username page", function () {
    cy.visit("");
    homePage.clickOnForgotUsername();
    commonPage.verifyUrl("/ForgotUserName");
  });

  it("Verify forgot password navigates to forgot password page", function () {
    cy.visit("");
    homePage.clickOnForgotPassword();
    commonPage.verifyUrl("/ForgotPassword");
  });

  it("Verify Signing in with incorrect username will display error validation message Incorrect username or password. Please try again", function () {
    cy.visit("");
    homePage.enterIncorrectUsernameAndPassword();
    homePage.clickOnStateUserLoginBtn();
    homePage.elements.incorrectUsernameAndPasswordErrorMsg().should('have.text','Incorrect username or password. Please try again.')

  });

  it("Verify Request your NYTD account now link", function () {
    cy.visit("");
    homePage.clickOnRequestYourNYTDAccountNow();
    commonPage.verifyUrl("/RequestAccount");
  });

  it("Verify privacy policy link", function () {
    cy.visit("");
    homePage.clickOnPrivacyPolicyLink();
    cy.origin('https://www.hhs.gov/web/policies-and-standards/hhs-web-policies/privacy/index.html', () => {
    cy.url().should('include','/privacy/index.html');
    })
  });

  it("Verify Security compliance statement link", function () {
    cy.visit("");
    homePage.clickOnSecurityComplianceStatementLink();
    commonPage.verifyUrl("/SecurityCompliance");
  });

  it("Verify Vulnerability disclosure policy link", function () {
    cy.visit("");
    homePage.clickOnVulnerabilityDisclosurePolicyLink();
    cy.origin('https://www.hhs.gov/vulnerability-disclosure-policy/index.html', () => {
    cy.url().should('include', '/vulnerability-disclosure-policy/index.html');
    })
  });

  it("Verify Unauthorized access warning link", function () {
    cy.visit("");
    homePage.clickOnUnauthorizedAccessWarningLink();
    commonPage.verifyUrl("/UnauthorizedAccess")
  });


});