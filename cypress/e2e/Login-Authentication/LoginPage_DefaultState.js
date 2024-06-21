import LoginPageObjects from "./pages/CommonPageObjects.js";
//import UserAccountRequestPage from "../pages/UserAccountRequestPageObeject.js";
//import SecurityComplianceStatement from "../pages/SecurityComplianceStatementPageObject.js";
const loginPage = new LoginPageObjects();
//const scsPage = new SecurityComplianceStatement();
//const userAccountRequestPage = new UserAccountRequestPage();
describe("Login Page Validations", function () {
  it("Verify login logo is present", function () {
    cy.visit("");
    //loginPage.elements.headerText().should("have.text","Administration for Children & Families");
    //loginPage.elements.loginLogoText().should("have.text","NYTD: National Youth in Transition Database");
  });

  /*it("Verify Unauthorized Access Warning section text", function () {
    cy.visit("nytdp/");
    loginPage.elements.unautorizedAccessWarningText().contains("Unauthorized Access Warning");
    loginPage.elements.youAreAccesingUsGovermentMsg().contains("You are accessing a U.S. Government information system, which includes (1) this computer," +" (2) this computer network, (3) all computers connected to this network, and (4) all devices and storage media attached to this network or to a computer on" +" this network. This information system is provided for U.S. Government-authorized use only. Unauthorized or improper use of this system may result in disciplinary" +" action, as well as civil and criminal penalties. By using this information system, you understand and consent to the following:");
    loginPage.elements.youHaveNoReasonobleMsg().contains("You have no reasonable expectation of privacy regarding any communications or data " +"transiting or stored on this information system. At any time, and for any lawful Government purpose, the government may monitor, intercept, and search and seize any " +"communication or data transiting or stored on this information system.");
    loginPage.elements.anyComunicationOrDataMsg().contains("Any communication or data transiting or stored on this information system may be " +"disclosed or used for any lawful Government purpose.");
  });

  it("Verify Security compliance section",  function () {
    cy.visit("nytdp/");
    loginPage.elements.securityComplianceText().contains("Security Compliance");
    loginPage.elements.allUserAcknowledgeMsg().contains("All users acknowledge responsibility for ensuring appropriate security of NYTD data and of the NYTD system as specified in the");
    cy.wait(4000);
    cy.contains("Security Compliance Statement").click();
    cy.url().should("include", "/securityComplianceLoginStmt.action");
    scsPage.elements.userSecurityComplianceStatementText().contains("User Security Compliance Statement");
    scsPage.elements.stateUserSecComplianceStatementText().contains("State User Security Compliance Statement");
    scsPage.elements.federalUserSecComplianceStatementText().contains("Federal User Security Compliance Statement");
    cy.wait(4000);
    cy.go("back");
  });

  it("Verify User Acc Request link",  function () {
    cy.visit("nytdp/");
    cy.contains("User Account Requests").click();
    cy.url().should("include", "/helpChangeReq.action")
    userAccountRequestPage.elements.userAccountReqeustText().contains("User Account Requests");
    userAccountRequestPage.elements.stateUserAccountRequestFormLink().contains("State User Account Request Form");
    userAccountRequestPage.elements.stateAuthorizedOfficialRequestFormLink().contains("State Authorized Official Request Form");
    userAccountRequestPage.elements.federalUserAccountRequestFormLink().contains("Federal User Account Request Form");
    userAccountRequestPage.elements.returnToNYTDHomePageLink().contains("Return to NYTD Homepage");
    cy.wait(4000);
    cy.go("back");
  });

  it("Verify NDRU download link does not exist",   function () {
    cy.visit("nytdp/");
    cy.get("[id='NDRULink']").should('not.exist')

  });

  it("Verify Visit Nav link", function () {
    cy.visit("nytdp/");
    const nytdLink ="https://www.acf.hhs.gov/cb/research-data-technology/reporting-systems/nytd";
    cy.get(loginPage.elements.visitLink).then((link) => {
      if (link.prop("href") === nytdLink) {
        cy.request(nytdLink).its("status").should("eq", 200);
      }
    });
  });

  it("Verify Vulnerability Disclosure Policy Nav link",  function () {
    cy.visit("nytdp/");
    cy.get(':nth-child(4) > span > #visitLink')
      .invoke("removeAttr", "target")
      .click();
    cy.url().should("include","https://www.hhs.gov/vulnerability-disclosure-policy/index.html");
    cy.get('.page-title').should('have.text', ('Vulnerability Disclosure Policy'));
    cy.go("back");
  });

  it("Verify Privacy Policy Notice Nav link",  function () {
    cy.visit("nytdp/");
    cy.get(':nth-child(6) > span > #visitLink')
      .invoke("removeAttr", "target")
      .click();
    cy.go("back");
  });

  it("Helpdesk Information",  function () {
    cy.visit("nytdp/");
    loginPage.elements.nypdHelpDeskText().contains("NYTD Help Desk");
    loginPage.elements.mondayFridayTimeText().contains("Monday-Friday, 9:00 am - 5:00 pm ET");;
    loginPage.elements.nytdEmailaddress().contains("NYTDhelp@acf.hhs.gov");
    loginPage.elements.nytdPhoneNumber().contains("(877) 565-6983");
    loginPage.elements.weAreClosedOnFederalHolidayText().contains("We are closed on federal holidays.");
  });*/
});