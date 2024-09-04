import UserAccountRequestFormObjects from "../pages/UserAccountRequestFormObjects";
const stateMngrAccountRequestForm = new UserAccountRequestFormObjects();
import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
const rgbCurrent = "rgb(99, 186, 176)";
const rgbBlank = "rgb(221, 226, 232)";
const rgbComplete = "rgb(22, 46, 81)";

describe("State Manager Account Request Validations", function () {
  it("State Manager Account Request Form Page 1", function () {
    // Confirm page 1 elements appear
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateMngrAccountRequestForm.elements.nytdIcon().invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
    stateMngrAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbCurrent);
    stateMngrAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.progressBarText1().should("have.text", "Request Type");
    stateMngrAccountRequestForm.elements.progressBarText2().should("have.text", "Personal User Information");  
    stateMngrAccountRequestForm.elements.progressBarText3().should("have.text", "Security Compliance");
    stateMngrAccountRequestForm.elements.progressBarText4().should("have.text", "Review and Submit");
    stateMngrAccountRequestForm.elements.header().should("contain", "User Account Request Form");
    stateMngrAccountRequestForm.elements.stepHeader().should("have.text", "Request Type");
    stateMngrAccountRequestForm.elements.alert().should("have.text", "Asterisks (*) in field names are used to denote required fields.");
    stateMngrAccountRequestForm.elements.label().should("have.text", "Request Type *");
    stateMngrAccountRequestForm.elements.stateUserRadioBtn().should("have.text", "State User Account");
    stateMngrAccountRequestForm.elements.federalUserRadioBtn().should("have.text", "Federal User Account");
    stateMngrAccountRequestForm.elements.cancelBtn().should("have.text", "Cancel");
    stateMngrAccountRequestForm.clickOnCancelBtn();

  });

  it("Verify Page 1 radio buttons, text fields and dropdowns", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateMngrAccountRequestForm.clickOnStateUserRadioBtn();
    stateMngrAccountRequestForm.elements.secondAlert().should('have.text', 'Indicate the role-based access of the user.Standard users have view-only access to the state\'s NYTD information.State Managers can view all state NYTD information and can submit and delete files on behalf of the state.State Authorized Officials can transmit, submit, and delete NYTD files, as well as approve and manage user account requests for all state users.');
    // Fill out page 1 elements
    stateMngrAccountRequestForm.elements.userRoleHeader().should("have.text", "User Role *");
    stateMngrAccountRequestForm.elements.stateHeader().should("have.text", "State *");
    stateMngrAccountRequestForm.elements.stateDropdown().children('option').then(states => {
      const actual = [...states].map(o => o.value)
      expect(actual).to.deep.eq(['','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Test State'])
    })
    stateMngrAccountRequestForm.elements.agencyOrOfficeHeader().should("have.text", "Agency or Office *");
    stateMngrAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
  });

  it("Verifying Page 1 error messages display when required fields are blank", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateMngrAccountRequestForm.clickOnStateUserRadioBtn();
    stateMngrAccountRequestForm.clickOnContinueBtn();
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
    stateMngrAccountRequestForm.clickOnStateUserRadioBtn();
    commonObjects.modalCancelRequest();
  });

  it("State Manager Account Request Form Page 2", function () {
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    // Confirm page 2 elements appear
    stateMngrAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbCurrent);
    stateMngrAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateMngrAccountRequestForm.elements.stepHeader().should("have.text", "Personal User Information");
    stateMngrAccountRequestForm.elements.alert().should("have.text", 'Asterisks (*) in field names are used to denote required fields.The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.');
    stateMngrAccountRequestForm.elements.userTitleLabel().should("have.text", "User Title *");
    stateMngrAccountRequestForm.elements.userFNameLabel().should("have.text", "User First Name *");
    stateMngrAccountRequestForm.elements.userLnameLabel().should("have.text", "User Last Name *");
    stateMngrAccountRequestForm.elements.userPhoneLabel().should("have.text", "User Phone *");
    stateMngrAccountRequestForm.elements.userEmailLabel().should("have.text", "User Email *");
    stateMngrAccountRequestForm.elements.acknowledgeAlert().should("have.text",'The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.');
    stateMngrAccountRequestForm.elements.backBtn().should("have.text", "Back");
    stateMngrAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
    commonObjects.elements.cancelRequestBtn().should("have.text", "Cancel Request");
  });

  it("Page 2 Selections", function () {
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    // Fill out page 2 elements
    stateMngrAccountRequestForm.typeTitleInUserTitle();
    stateMngrAccountRequestForm.typeFNameInFirstName();
    stateMngrAccountRequestForm.typeLNameInLastName();
    stateMngrAccountRequestForm.typePhoneInUserPhone();
    stateMngrAccountRequestForm.typeEmailInUserEmail();
    stateMngrAccountRequestForm.clickBackBtn();
  });

  it("Page 2 Errors", function () {
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    stateMngrAccountRequestForm.clickOnContinueBtn();
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
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    stateMngrAccountRequestForm.typeTitleInUserTitle();
    commonObjects.modalCancelRequest();
  });

  it("Page 2 Invalid Phone Number", function () {
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    stateMngrAccountRequestForm.elements.userPhoneInput().type("123");
    stateMngrAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Phone number is invalid or does not adhere to the required format");
      });
  });

  it("Page 2 Invalid Email", function () {
    stateMngrAccountRequestForm.navigateToStep2("Mngr");
    stateMngrAccountRequestForm.elements.userEmailInput().type("abc");
    stateMngrAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(4).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Email is invalid or does not adhere to the required format");
      });
  });

  it("State Manager Account Request Form Page 3", function () {
    stateMngrAccountRequestForm.navigateToStep3("Mngr");
    stateMngrAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbCurrent);
    stateMngrAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateMngrAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateMngrAccountRequestForm.elements.stepHeader().should("have.text", "Security Compliance");
    // Check text
    stateMngrAccountRequestForm.elements.acknowledgeText().should("have.text","All new state users must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system.");
    stateMngrAccountRequestForm.elements.securityStatementLabel().should("have.text", "State User Security Compliance Statement:");
    stateMngrAccountRequestForm.elements.SecurityAgreementText().should("have.text","As a state user granted access to the NYTD system, I agree to abide by the following:");
    stateMngrAccountRequestForm.elements.agreementListElement1().should("have.text","I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.");
    stateMngrAccountRequestForm.elements.agreementListElement2().should("have.text","I will not make any unencrypted electronic copies of PII from the NYTD system.");
    stateMngrAccountRequestForm.elements.agreementListElement3().should("have.text","I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.");
    stateMngrAccountRequestForm.elements.agreementListElement4().should("have.text","I will ensure the proper disposal of PII in any format, including printed reports.");
    stateMngrAccountRequestForm.elements.agreementListElement5().should("have.text","I will access NYTD system only to the extent that my duties require such access.");
    stateMngrAccountRequestForm.elements.agreementListElement6().should("have.text","I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.");
    stateMngrAccountRequestForm.elements.agreementListElement7().should("have.text","I will immediately notify the NYTD Help Desk of any user account changes, including the need to close my account.");
    stateMngrAccountRequestForm.elements.securityAgreementNote().should("have.text","Note: The state user needing access to the NYTD system MUST check Agree below:");
    // check checkbox
    stateMngrAccountRequestForm.elements.securityAgreeementCheckbox().should("not.be.checked");
    stateMngrAccountRequestForm.elements.securityAgreeementCheckbox().should("have.text","Check here to acknowledge you have read and agree with the Security Compliance Statement above");
    // Check alert
    stateMngrAccountRequestForm.elements.alert().should("have.text", "The Name entered here must match the first and last name on the request form.");
    // check name fields
    stateMngrAccountRequestForm.elements.nameText().should("have.text", "User First and Last Name *");
    stateMngrAccountRequestForm.elements.formatText().should("have.text",'Format should be "First Last" with a space separating the first and last names');
    stateMngrAccountRequestForm.elements.nameInput().should("have.value", "");
    // check date fields
    stateMngrAccountRequestForm.elements.dateText().should("have.text", "Date *");
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
    stateMngrAccountRequestForm.elements.dateField().should("have.value", formattedDate);
  });

  it("Page 3 Selections", function () {
    stateMngrAccountRequestForm.navigateToStep3("Mngr");
    stateMngrAccountRequestForm.checkSecurityAgreementCheckbox();
    stateMngrAccountRequestForm.typeNameIntoNameInput();
  });

  it("Verifying Page 3 error messages display when required fields are blank", function () {
    stateMngrAccountRequestForm.navigateToStep3("Mngr");
    stateMngrAccountRequestForm.clickOnContinueBtn();
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
      stateMngrAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
  });
  it("Page 3 Cancel Request", function () {
    stateMngrAccountRequestForm.navigateToStep3("Mngr");
    stateMngrAccountRequestForm.checkSecurityAgreementCheckbox();
    commonObjects.modalCancelRequest();
  });

  it("State Manager Account Request Form Page 4", function () {
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    stateMngrAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbComplete);
    stateMngrAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbCurrent);
    stateMngrAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateMngrAccountRequestForm.elements.stepHeader().should("have.text", "Review and Submit");
    stateMngrAccountRequestForm.elements.alert().should('have.text', 'Verify the information below is correct before submitting. If any changes need to be made, please click on the Edit button below.');
    stateMngrAccountRequestForm.elements.requestTypeText().should("contain","Request Type *");
    stateMngrAccountRequestForm.elements.userRoleText().should("contain", "User Role *");
    stateMngrAccountRequestForm.elements.stateText().should("contain", "State *");
    stateMngrAccountRequestForm.elements.agencyOrOfficeText().should("contain", "Agency or Office *");
    stateMngrAccountRequestForm.elements.userTitleText().should("contain", "User Title *");
    stateMngrAccountRequestForm.elements.userFNameText().should("contain", "User First Name *");
    stateMngrAccountRequestForm.elements.userLNameText().should("contain", "User Last Name *");
    stateMngrAccountRequestForm.elements.userPhoneText().should("contain", "User Phone *");
    stateMngrAccountRequestForm.elements.userEmailText().should("contain", "User Email *");  
    stateMngrAccountRequestForm.elements.securityStatementText().should("contain", "Security Statement *");
    stateMngrAccountRequestForm.elements.dateSignedText().should("contain", "Date Signed *");  
    stateMngrAccountRequestForm.elements.requestType().should("contain", "State User Account");
    stateMngrAccountRequestForm.elements.userRole().should("contain", "State Manager");
    stateMngrAccountRequestForm.elements.state().should("contain", "Test State");
    stateMngrAccountRequestForm.elements.agencyOrOffice().should("contain", "Test");
    stateMngrAccountRequestForm.elements.userTitle().should("contain", "Title");
    stateMngrAccountRequestForm.elements.userFName().should("contain", "FName");
    stateMngrAccountRequestForm.elements.userLName().should("contain", "LName");
    stateMngrAccountRequestForm.elements.userPhone().should("contain", "999-999-9999");
    stateMngrAccountRequestForm.elements.userEmail().should("contain", "test@gov.net");
    stateMngrAccountRequestForm.elements.securityStatement().should("contain", "Complete");
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
    stateMngrAccountRequestForm.elements.dateSigned().should("contain", formattedDate);
    stateMngrAccountRequestForm.elements.accuracyCheckbox().should('not.be.checked');
    stateMngrAccountRequestForm.elements.accuracyCheckbox().should('have.text', 'Check this box to confirm the accuracy of the above information');
    stateMngrAccountRequestForm.elements.editBtn().should('have.text', 'Edit');
    stateMngrAccountRequestForm.elements.submitBtn().should('have.text', 'Submit Request');
  });

  it("Page 4 Selection", function () {
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    stateMngrAccountRequestForm.clickAccuracyCheckbox();
  });

  it("Page 4 Error", function () {
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    stateMngrAccountRequestForm.clickSubmitBtn();
    stateMngrAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
    stateMngrAccountRequestForm.elements.errorMsg().should('have.text', 'Please fill out this field');
  });

  it("Page 4 Cancel Request", function () {
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    commonObjects.modalCancelRequest();
  });

  it("Confirm Request was submitted and confirmation modal", function () {
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    stateMngrAccountRequestForm.clickAccuracyCheckbox();
    stateMngrAccountRequestForm.clickSubmitBtn(); 
    stateMngrAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    stateMngrAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    stateMngrAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    stateMngrAccountRequestForm.clickReturnHomeBtn(); 
  });

  it("Verify the SAO has received the Account Request and deny it", function () {
    cy.standardLogin('teststatesao', 'P@ssw0rd');
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

  it("Verify the SA has received the Account Request and deny it", function () {
    // Create a new user account request
    stateMngrAccountRequestForm.navigateToStep4("Mngr");
    stateMngrAccountRequestForm.clickAccuracyCheckbox();
    stateMngrAccountRequestForm.clickSubmitBtn(); 
    stateMngrAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    stateMngrAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    stateMngrAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    stateMngrAccountRequestForm.clickReturnHomeBtn();    
    
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
