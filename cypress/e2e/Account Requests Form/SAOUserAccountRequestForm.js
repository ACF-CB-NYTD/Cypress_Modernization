import UserAccountRequestFormObjects from "../pages/UserAccountRequestFormObjects";
const saoUserAccountRequestForm = new UserAccountRequestFormObjects();
import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
const rgbCurrent = "rgb(99, 186, 176)";
const rgbBlank = "rgb(221, 226, 232)";
const rgbComplete = "rgb(22, 46, 81)";

describe("State Authorized Official Account Request Validations", function () {
  it("State Authorized Official Request Form Page 1", function () {
    // Confirm page 1 elements appear
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    saoUserAccountRequestForm.elements.nytdIcon().invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
    saoUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbCurrent);
    saoUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.progressBarText1().should("have.text", "Request Type");
    saoUserAccountRequestForm.elements.progressBarText2().should("have.text", "Personal User Information");  
    saoUserAccountRequestForm.elements.progressBarText3().should("have.text", "Security Compliance");
    saoUserAccountRequestForm.elements.progressBarText4().should("have.text", "Review and Submit");
    saoUserAccountRequestForm.elements.header().should("contain", "User Account Request Form");
    saoUserAccountRequestForm.elements.stepHeader().should("have.text", "Request Type");
    saoUserAccountRequestForm.elements.alert().should("have.text", "Asterisks (*) in field names are used to denote required fields.");
    saoUserAccountRequestForm.elements.label().should("have.text", "Request Type *");
    saoUserAccountRequestForm.elements.stateUserRadioBtn().should("have.text", "State User Account");
    saoUserAccountRequestForm.elements.federalUserRadioBtn().should("have.text", "Federal User Account");
    saoUserAccountRequestForm.elements.cancelBtn().should("have.text", "Cancel");
    saoUserAccountRequestForm.clickOnCancelBtn();
  });

  it("Verify Page 1 radio buttons, text fields and dropdowns", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    saoUserAccountRequestForm.clickOnStateUserRadioBtn();
    saoUserAccountRequestForm.elements.secondAlert().should('have.text', 'Indicate the role-based access of the user.Standard users have view-only access to the state\'s NYTD information.State Managers can view all state NYTD information and can submit and delete files on behalf of the state.State Authorized Officials can transmit, submit, and delete NYTD files, as well as approve and manage user account requests for all state users.');
    // Fill out page 1 elements
    saoUserAccountRequestForm.elements.userRoleHeader().should("have.text", "User Role *");
    saoUserAccountRequestForm.elements.stateHeader().should("have.text", "State *");
    saoUserAccountRequestForm.elements.stateDropdown().children('option').then(states => {
      const actual = [...states].map(o => o.value)
      expect(actual).to.deep.eq(['','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Test State'])
    })
    saoUserAccountRequestForm.elements.agencyOrOfficeHeader().should("have.text", "Agency or Office *");
    saoUserAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
  });

  it("Verifying Page 1 error messages display when required fields are blank", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    saoUserAccountRequestForm.clickOnStateUserRadioBtn();
    saoUserAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(1).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(2).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
  });

  it("Page 1 Cancel Request", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    saoUserAccountRequestForm.clickOnStateUserRadioBtn();
    commonObjects.modalCancelRequest();
  });

  it("State Authorized Official Account Request Form Page 2", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    // Confirm page 2 elements appear
    saoUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbCurrent);
    saoUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    saoUserAccountRequestForm.elements.stepHeader().should("have.text", "Personal User Information");
    saoUserAccountRequestForm.elements.alert().should("have.text", 'Asterisks (*) in field names are used to denote required fields.The user must acknowledge and submit the "State Authorized Official Security Compliance Statement" on the next page.');
    saoUserAccountRequestForm.elements.userTitleLabel().should("have.text", "User Title *");
    saoUserAccountRequestForm.elements.userFNameLabel().should("have.text", "User First Name *");
    saoUserAccountRequestForm.elements.userLnameLabel().should("have.text", "User Last Name *");
    saoUserAccountRequestForm.elements.userPhoneLabel().should("have.text", "User Phone *");
    saoUserAccountRequestForm.elements.userEmailLabel().should("have.text", "User Email *");
    saoUserAccountRequestForm.elements.saoAcknowledgeAlert().should("have.text",'The user must acknowledge and submit the "State Authorized Official Security Compliance Statement" on the next page.');
    saoUserAccountRequestForm.elements.backBtn().should("have.text", "Back");
    saoUserAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
    commonObjects.elements.cancelRequestBtn().should("have.text", "Cancel Request");
  });

  it("Page 2 Selections", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    // Fill out page 2 elements
    saoUserAccountRequestForm.typeTitleInUserTitle();
    saoUserAccountRequestForm.typeFNameInFirstName();
    saoUserAccountRequestForm.typeLNameInLastName();
    saoUserAccountRequestForm.typePhoneInUserPhone();
    saoUserAccountRequestForm.typeEmailInUserEmail();
    saoUserAccountRequestForm.clickBackBtn();
  });

  it("Page 2 Errors", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    saoUserAccountRequestForm.clickOnContinueBtn();
    // Note errors
    cy.get('[data-testid="formGroup"]').eq(0).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(1).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(2).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
    cy.get('[data-testid="formGroup"]').eq(4).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
  });

  it("Page 2 Cancel Request", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    saoUserAccountRequestForm.typeTitleInUserTitle();
    commonObjects.modalCancelRequest();
  });

  it("Page 2 Invalid Phone Number", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    saoUserAccountRequestForm.elements.userPhoneInput().type("123");
    saoUserAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Phone number is invalid or does not adhere to the required format");
      });

  });

  it("Page 2 Invalid Email", function () {
    saoUserAccountRequestForm.navigateToStep2("SAO");
    saoUserAccountRequestForm.elements.userEmailInput().type("abc");
    saoUserAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(4).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Email is invalid or does not adhere to the required format");
      });
  });

  it("State Authorized Official Account Request Form Page 3", function () {
    saoUserAccountRequestForm.navigateToStep3("SAO");
    saoUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbCurrent);
    saoUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    saoUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    saoUserAccountRequestForm.elements.stepHeader().should("have.text", "Security Compliance");
    // Check text
    saoUserAccountRequestForm.elements.saoAcknowledgeText().should("have.text","All new state authorized officials must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system.");
    saoUserAccountRequestForm.elements.securityStatementLabel().should("have.text", "State Authorized Official Security Compliance Statement:");
    saoUserAccountRequestForm.elements.saoListHeader().should("have.text","As a state authorized official granted access to the NYTD system, I agree to abide by the following:");
    saoUserAccountRequestForm.elements.saoNote().should('have.text', 'Note: The state authorized official needing access to the NYTD system MUST check Agree below:');
    saoUserAccountRequestForm.elements.agreementListElement1().should("have.text","I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.");
    saoUserAccountRequestForm.elements.agreementListElement2().should("have.text","I will not make any unencrypted electronic copies of PII from the NYTD system.");
    saoUserAccountRequestForm.elements.agreementListElement3().should("have.text","I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.");
    saoUserAccountRequestForm.elements.agreementListElement4().should("have.text","I will ensure the proper disposal of PII in any format, including printed reports.");
    saoUserAccountRequestForm.elements.agreementListElement5().should("have.text","I will access NYTD system only to the extent that my duties require such access.");
    saoUserAccountRequestForm.elements.agreementListElement6().should("have.text","I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.");
    saoUserAccountRequestForm.elements.agreementListElement7().should("have.text","I will immediately notify the NYTD Help Desk of any user account changes, including the need to close my account.");
    saoUserAccountRequestForm.elements.saoExtraLi().should('have.text', 'I will submit requests for user account requests to the NYTD Help Desk promptly, including notifying when a state user no longer requires access to the NYTD system.');  
    // check checkbox
    saoUserAccountRequestForm.elements.securityAgreeementCheckbox().should("not.be.checked");
    saoUserAccountRequestForm.elements.securityAgreeementCheckbox().should("have.text","Check here to acknowledge you have read and agree with the Security Compliance Statement above");
    // Check alert
    saoUserAccountRequestForm.elements.alert().should("have.text", "The Name entered here must match the first and last name on the request form.");
    // check name fields
    saoUserAccountRequestForm.elements.nameText().should("have.text", "User First and Last Name *");
    saoUserAccountRequestForm.elements.formatText().should("have.text",'Format should be "First Last" with a space separating the first and last names');
    saoUserAccountRequestForm.elements.nameInput().should("have.value", "");
    // check date fields
    saoUserAccountRequestForm.elements.dateText().should("have.text", "Date *");
    const currentDate = new Date();
    // Extract day, month, and year
    let day = currentDate.getUTCDate().toString();
    let month = (currentDate.getUTCMonth() + 1).toString(); // getUTCMonth() returns 0-11
    let year = currentDate.getUTCFullYear().toString();
    // Ensure day and month are in two-digit format
    day = day.length < 2 ? "0" + day : day;
    month = month.length < 2 ? "0" + month : month;
    // Format the date as MM/DD/YYYY
    const formattedDate = `${month}/${day}/${year}`;
    saoUserAccountRequestForm.elements.dateField().should("have.value", formattedDate);
  });

  it("Page 3 Selections", function () {
    saoUserAccountRequestForm.navigateToStep3("SAO");
    saoUserAccountRequestForm.checkSecurityAgreementCheckbox();
    saoUserAccountRequestForm.typeNameIntoNameInput();
  });

  it("Verifying Page 3 error messages display when required fields are blank", function () {
    saoUserAccountRequestForm.navigateToStep3("SAO");
    saoUserAccountRequestForm.clickOnContinueBtn();
    // Note errors
    cy.get('[data-testid="formGroup"]').eq(0).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
      cy.get('[data-testid="formGroup"]').eq(1).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Please fill out this field");
      });
      saoUserAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
  });

  it("Page 3 Cancel Request", function () {
    saoUserAccountRequestForm.navigateToStep3("SAO");
    saoUserAccountRequestForm.checkSecurityAgreementCheckbox();
    commonObjects.modalCancelRequest();
  });

  it("State Authorized Official Account Request Form Page 4", function () {
    saoUserAccountRequestForm.navigateToStep4("SAO");
    saoUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbComplete);
    saoUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbCurrent);
    saoUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    saoUserAccountRequestForm.elements.stepHeader().should("have.text", "Review and Submit");
    saoUserAccountRequestForm.elements.alert().should('have.text', 'Verify the information below is correct before submitting. If any changes need to be made, please click on the Edit button below.');
    saoUserAccountRequestForm.elements.requestTypeText().should("contain","Request Type *");
    saoUserAccountRequestForm.elements.userRoleText().should("contain", "User Role *");
    saoUserAccountRequestForm.elements.stateText().should("contain", "State *");
    saoUserAccountRequestForm.elements.agencyOrOfficeText().should("contain", "Agency or Office *");
    saoUserAccountRequestForm.elements.userTitleText().should("contain", "User Title *");
    saoUserAccountRequestForm.elements.userFNameText().should("contain", "User First Name *");
    saoUserAccountRequestForm.elements.userLNameText().should("contain", "User Last Name *");
    saoUserAccountRequestForm.elements.userPhoneText().should("contain", "User Phone *");
    saoUserAccountRequestForm.elements.userEmailText().should("contain", "User Email *");  
    saoUserAccountRequestForm.elements.securityStatementText().should("contain", "Security Statement *");
    saoUserAccountRequestForm.elements.dateSignedText().should("contain", "Date Signed *"); 
    saoUserAccountRequestForm.elements.requestType().should("contain", "State User Account");
    saoUserAccountRequestForm.elements.userRole().should("contain", "State Authorized Official");
    saoUserAccountRequestForm.elements.state().should("contain", "Test State");
    saoUserAccountRequestForm.elements.agencyOrOffice().should("contain", "Test");
    saoUserAccountRequestForm.elements.userTitle().should("contain", "Title");
    saoUserAccountRequestForm.elements.userFName().should("contain", "FName");
    saoUserAccountRequestForm.elements.userLName().should("contain", "LName");
    saoUserAccountRequestForm.elements.userPhone().should("contain", "999-999-9999");
    saoUserAccountRequestForm.elements.userEmail().should("contain", "test@gov.net");
    saoUserAccountRequestForm.elements.securityStatement().should("contain", "Complete"); 
    saoUserAccountRequestForm.elements.accuracyCheckbox().should('not.be.checked');
    saoUserAccountRequestForm.elements.accuracyCheckbox().should('have.text', 'Check this box to confirm the accuracy of the above information');
    saoUserAccountRequestForm.elements.editBtn().should('have.text', 'Edit');
    saoUserAccountRequestForm.elements.submitBtn().should('have.text', 'Submit Request');
  });

  it("Page 4 Selection", function () {
    saoUserAccountRequestForm.navigateToStep4("SAO");
    saoUserAccountRequestForm.clickAccuracyCheckbox();
  });

  it("Page 4 Error", function () {
    saoUserAccountRequestForm.navigateToStep4("SAO");
    saoUserAccountRequestForm.clickSubmitBtn();
    saoUserAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
    saoUserAccountRequestForm.elements.errorMsg().should('have.text', 'Please fill out this field');
  });

  it("Page 4 Cancel Request", function () {
    saoUserAccountRequestForm.navigateToStep4("SAO");
    commonObjects.modalCancelRequest();
  });

  it("Confirm Request was submitted and confirmation modal", function () {
    saoUserAccountRequestForm.navigateToStep4("SAO");
    saoUserAccountRequestForm.clickAccuracyCheckbox();
    saoUserAccountRequestForm.clickSubmitBtn();
    saoUserAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    saoUserAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    saoUserAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    saoUserAccountRequestForm.clickReturnHomeBtn();    
  });

  it("Verify the SAO has received the Account Request and deny it", function () {
    cy.standardLogin('teststatesao', 'P@ssw0rd');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnUserAccountManagementSelect();
    commonObjects.clickOnManageUserAccountRequestsBtn();
    cy.get('td').contains('FName').parent().within($tr => {
      cy.get('button').contains('Deny').click({force: true});
    });
    commonObjects.typeAreaSelectorArea("Cypress Test");
    cy.get('[data-testid="Deny New_user_button"]', { timeout: 10000 }).should('be.visible');
    commonObjects.clickDenyRequestBtn();
  });

  it("Verify the SA has received the Account Request and deny it", function () {
    // Create a new user account request
    saoUserAccountRequestForm.navigateToStep4("SAO");
    saoUserAccountRequestForm.clickAccuracyCheckbox();
    saoUserAccountRequestForm.clickSubmitBtn(); 
    saoUserAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    saoUserAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    saoUserAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    saoUserAccountRequestForm.clickReturnHomeBtn();    

    // Deny the new user account request as a System Admin
    cy.standardLogin('nytdsysadmin', 'P@ssw0rd');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnUserAccountManagementSelect();
    commonObjects.clickOnManageUserAccountRequestsBtn();
    cy.get('td').contains('FName').parent().within($tr => {
      cy.get('button').contains('Deny').click({force: true});
    })
    commonObjects.typeAreaSelectorArea("Cypress Test");
    cy.get('[data-testid="Deny New_user_button"]', { timeout: 10000 }).should('be.visible');
    commonObjects.clickDenyRequestBtn();
  });
});
