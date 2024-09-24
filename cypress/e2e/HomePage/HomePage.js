import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
import UserAccountManagementObjects from "../pages/UserAccountManagementObjects";
const userAccountManagementPage = new UserAccountManagementObjects();
import CommonPageObjects from "../pages/CommonPageObjects";
import { home } from "ospath";
const commonPage = new CommonPageObjects();
describe("Login Page Validations", function () {

  it("Verify welcome msg and nytd help desk information", function () {
    cy.visit("");
    homePage.elements.welcomeToNytdText().should('have.text', 'Welcome to the National Youth in Transition Database')
    homePage.elements.nytdDiscriptionText().should('have.text', "The National Youth in Transition Database (NYTD) collects information on youth in foster care, including sex, race, ethnicity, date of birth, and foster care status. It also collects information about the outcomes of those youth who have aged out of foster care. For more information, visit theNYTD pageon the Children's Bureau website.")
    homePage.elements.nytdHelpDeskText().should('have.text', 'NYTD Help Desk')
    homePage.elements.phoneNumberLink().should('have.text', '(877)-565-6983')
    homePage.elements.hoursOfOperationText().should('have.text', 'Hours of Operation:')
    homePage.elements.nytdHelpDeskDaysOfOperationText().should('have.text', 'Monday - Friday')
    homePage.elements.nytdHelpDeskHoursOfOperationText().should('have.text', '9:00AM - 5:00PM EST')
  });
  it("Verify NYTD Icon navigates to national youth in transition database ", function () {
    cy.visit("");
    homePage.clickOnNYTDIcon();
    cy.origin('https://www.acf.hhs.gov/cb/research-data-technology/reporting-systems/nytd', () => {
      cy.url().should('include', '/reporting-systems/nytd');
    })
  });

  it("Verify NYTD page link ", function () {
    cy.visit("");
    homePage.clickOnNYTDPageLink();
    cy.origin('https://www.acf.hhs.gov/cb/research-data-technology/reporting-systems/nytd', () => {
      cy.url().should('include', '/reporting-systems/nytd');
    })
  });
  it("Verify user is able to select state user tab", function () {
    cy.visit("");
    homePage.clickOnStateUserTab();
    homePage.elements.loginInstructionsMsg().contains('Please enter your Username and Password and select Login to begin using the NYTD portal')
    homePage.elements.usernameText().contains('Username')
    homePage.elements.forgotUsernameText().contains('Forgot Username')
    homePage.elements.passwordText().contains('Password')
    homePage.elements.forgotPasswordText().contains('Forgot Password')
    homePage.elements.stateUserLoginBtn().should('have.text', 'Login')
  });
  it("Verify selecting eye will show the password", function () {
    cy.visit("");
    homePage.enterUsernameAndPassword('test', '1234');
    homePage.verifyEyeIconShowsPassword();

  });

  it("Verify user is able to select federal user tab", function () {
    cy.visit("");
    homePage.clickOnFederalUserTab();
    homePage.elements.federalUserLogInInstructionText().should('have.text', 'Insert your HSPD-12 access card into the smart card reader before you select login.');
    homePage.elements.pavCardImage().invoke('prop', 'naturalWidth').should('be.greaterThan', 0)
    homePage.elements.federalUserLoginBtn().should('have.text', 'Login');
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
    homePage.elements.incorrectUsernameAndPasswordErrorMsg().should('have.text', 'Incorrect username or password. Please try again.')

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
      cy.url().should('include', '/privacy/index.html');
      cy.get('.page-title').should('have.text', "HHS Privacy Policy Notice")
      cy.get('.field__item > :nth-child(1) > a').should('have.text', "External Link and Website Disclaimer Policy")
      cy.get('.field__item > :nth-child(2)').contains("This privacy policy describes what information HHS")
    })
  });

  it("Verify Security compliance statement link for state and federal user", function () {
    cy.visit("");
    homePage.clickOnSecurityComplianceStatementLink();
    commonPage.verifyUrl("/SecurityCompliance");
    homePage.elements.securityComplianceStatementTitle().should('have.text', "Security Compliance Statement for:")
    homePage.elements.responsibilitiesOfNYTDStateUserTitle().should('have.text', "Responsibilities of a NYTD State User:")
    homePage.elements.responsibilitiesOfNYTDStateUserInfoText().contains("Responsibilities of a NYTD State User:As a state user granted access to the NYTD system, I agree to abide by the following:I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.I will not make any unencrypted electronic copies of PII from the NYTD system.I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.I will ensure the proper disposal of PII in any format, including printed reports.I will access NYTD system only to the extent that my duties require such access.I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.I will immediately notify the NYTD Help Desk of any user account changes, including the need to close my account.As a state authorized official user granted access to the NYTD system, I also agree to the following:I will submit requests for user account requests to the NYTD Help Desk promptly, including notifying when a state user no longer requires access to the NYTD system.");
    homePage.elements.securityComplianceStatementDropdown().select(1);
    homePage.elements.responsibilitiesOfNYTDFederalUserInfoText().contains("Responsibilities of a NYTD Federal User:As a federal user granted access to the NYTD system, I agree to abide by the following:I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.I will not make any unencrypted electronic copies of PII from the NYTD system.I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.I will ensure the proper disposal of PII in any format, including printed reports.I will access NYTD system only to the extent that my duties require such access.I will abide by all HHS Rules of Behavior.I will adhere to all applicable HHS and Federal Information Technology policies, including all IT security training requirements.I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.I will immediately notify the NYTD Help Desk if I am separated from duty or no longer responsible for the duties granted by this account.I will provide updated user account information upon request.");
    homePage.clickOnBackButton();
    commonPage.verifyUrl("/sbx.dssnytd.com")
  });

  it("Verify Vulnerability disclosure policy link", function () {
    cy.visit("");
    homePage.clickOnVulnerabilityDisclosurePolicyLink();
    cy.origin('https://www.hhs.gov/vulnerability-disclosure-policy/index.html', () => {
      cy.url().should('include', '/vulnerability-disclosure-policy/index.html');
      cy.get('.page-title').should("have.text", 'Vulnerability Disclosure Policy')
      cy.get('#introduction').should('have.text', 'Introduction')
      cy.get(':nth-child(1) > .usa-section > .field > .field__item > :nth-child(3)').should('have.text', 'The Department of Health and Human Services (HHS) is committed to ensuring the security of the American public by protecting their information from unwarranted disclosure. This policy is intended to give security researchers clear guidelines for conducting vulnerability discovery activities and to convey our preferences in how to submit discovered vulnerabilities to us.')
      cy.get(':nth-child(1) > .usa-section > .field > .field__item > :nth-child(4)').contains("This policy describes what systems and types of research are covered under this policy, how to send us vulnerability reports, and how long we ask security researchers to wait before publicly disclosing vulnerabilities.");
      cy.get(':nth-child(1) > .usa-section > .field > .field__item > :nth-child(5)').contains("We want security researchers to feel comfortable reporting vulnerabilities they’ve discovered – as set out in this policy – so we can fix them and keep our users safe. We have developed this policy to reflect our values and uphold our sense of responsibility to security researchers who share their expertise with us in good faith");
      cy.get('#authorization').should('have.text', 'Authorization');
      cy.get(':nth-child(1) > .usa-section > .field > .field__item > :nth-child(7)').should('have.text', 'If you make a good faith effort to comply with this policy during your security research, we will consider your research to be authorized, we will work with you to understand and resolve the issue quickly, and HHS will not recommend or pursue legal action related to your research.');

    })
  });

  it("Verify Unauthorized access warning link", function () {
    cy.visit("");
    homePage.clickOnUnauthorizedAccessWarningLink();
    commonPage.verifyUrl("/UnauthorizedAccess")
    homePage.elements.unauthorizedAccessWarningTextInfo().contains("Unauthorized Access WarningYou are accessing a U.S. Government information system, which includes: this computer this computer network all computers connected to this network all devices and storage media attached to this network or to a computer on this networkThis information system is provided for U.S. Government-authorized use only. Unauthorized or improper use of this system may result in disciplinary action, as well as civil and criminal penalties. By using this information system, you understand and consent to the following:You have no reasonable expectation of privacy regarding any communications or data transiting or stored on this information system. At any time, and for any lawful Government purpose, the government may monitor, intercept, and search and seize any communication or data transiting or stored on this information system.Any communication or data transiting or stored on this information system may be disclosed or used for any lawful Government purpose.")
    homePage.clickOnBackButton();
    commonPage.verifyUrl("/sbx.dssnytd.com")
  });

  it("Verify locked account error validation message displays and unlock user", function () {
    cy.visit("");
    homePage.enterUsernameAndPassword('Mincho.Rusev', 'P@ssw0rd1');
    for (let i = 0; i < 9; i++) {
      homePage.clickOnStateUserLoginBtn();
    }
    homePage.elements.yourAccountHasBeenLockedErrorMsg().should('have.text', 'Your account has been locked. Please contact NYTDhelp@acf.hhs.gov.')
  });
  it("Verify User is able to unlock account", function () {
    cy.visit("");
    cy.standardLogin('nytdsysadmin', 'P@ssw0rd1') // Login with session, implemented in commands.js
    commonPage.clickOnAccountSettingsDropdown();
    commonPage.clickOnUserAccountManagementSelect();
    commonPage.verifyUrl('/User/Account');
    commonPage.searchForUserAccount('Rusev');
    commonPage.clickOnRefreshResultBtn();
    userAccountManagementPage.clickOnUsername('Mincho.Rusev');
    commonPage.verifyUrl('/ViewAccount');
    userAccountManagementPage.clickOnUnlockAccountBtn();
    userAccountManagementPage.elements.accountUnlockText().should('have.text', 'Account Unlocked');
    userAccountManagementPage.elements.accountHasBeenLockedText().contains('account has been unlocked.');
    userAccountManagementPage.clickOnContinueBtn();
  });
});