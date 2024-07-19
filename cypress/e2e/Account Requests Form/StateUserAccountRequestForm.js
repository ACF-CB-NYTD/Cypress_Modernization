import UserAccountRequestFormObjects from "../pages/UserAccountRequestFormObjects";
const stateUserAccountRequestForm = new UserAccountRequestFormObjects();
import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
const rgbCurrent = "rgb(99, 186, 176)";
const rgbBlank = "rgb(221, 226, 232)";
const rgbComplete = "rgb(22, 46, 81)";

describe("State User Account Request Validations", function () {
  it("State User Account Request Form Page 1", function () {
    // Confirm page 1 elements appear
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateUserAccountRequestForm.elements.nytdIcon().invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.progressBarText1().should("have.text", "Request Type");
    stateUserAccountRequestForm.elements.progressBarText2().should("have.text", "Personal User Information");  
    stateUserAccountRequestForm.elements.progressBarText3().should("have.text", "Security Compliance");
    stateUserAccountRequestForm.elements.progressBarText4().should("have.text", "Review and Submit");
    stateUserAccountRequestForm.elements.header().should("contain", "User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().should("have.text", "Request Type");
    stateUserAccountRequestForm.elements.alert().should("have.text", "Asterisks (*) in field names are used to denote required fields.");
    stateUserAccountRequestForm.elements.label().should("have.text", "Request Type *");
    stateUserAccountRequestForm.elements.stateUserRadioBtn().should("have.text", "State User Account");
    stateUserAccountRequestForm.elements.federalUserRadioBtn().should("have.text", "Federal User Account");
    stateUserAccountRequestForm.elements.cancelBtn().should("have.text", "Cancel");
    stateUserAccountRequestForm.clickOnCancelBtn();
  });

  it("Verify Page 1 radio buttons, text fields and dropdowns", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();
    stateUserAccountRequestForm.elements.secondAlert().should('have.text', 'Indicate the role-based access of the user.Standard users have view-only access to the state\'s NYTD information.State Managers can view all state NYTD information and can submit and delete files on behalf of the state.State Authorized Officials can transmit, submit, and delete NYTD files, as well as approve and manage user account requests for all state users.');
    // Fill out page 1 elements
    stateUserAccountRequestForm.elements.userRoleHeader().should("have.text", "User Role *");
    stateUserAccountRequestForm.elements.stateHeader().should("have.text", "State *");
    stateUserAccountRequestForm.elements.stateDropdown().children('option').then(states => {
      const actual = [...states].map(o => o.value)
      expect(actual).to.deep.eq(['','Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming','Test State'])
    })
    stateUserAccountRequestForm.elements.agencyOrOfficeHeader().should("have.text", "Agency or Office *");
    stateUserAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
  });

  it("Verifying Page 1 error messages display when required fields are blank", function () {
    cy.visit('');
    commonObjects.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();
    stateUserAccountRequestForm.clickOnContinueBtn();
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
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();
    commonObjects.modalCancelRequest();
  });

  it("State User Account Request Form Page 2", function () {
    stateUserAccountRequestForm.navigateToStep2("State User");
    // Confirm page 2 elements appear
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().should("have.text", "Personal User Information");
    stateUserAccountRequestForm.elements.alert().should("have.text", 'Asterisks (*) in field names are used to denote required fields.The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.');
    stateUserAccountRequestForm.elements.userTitleLabel().should("have.text", "User Title *");
    stateUserAccountRequestForm.elements.userFNameLabel().should("have.text", "User First Name *");
    stateUserAccountRequestForm.elements.userLnameLabel().should("have.text", "User Last Name *");
    stateUserAccountRequestForm.elements.userPhoneLabel().should("have.text", "User Phone *");
    stateUserAccountRequestForm.elements.userEmailLabel().should("have.text", "User Email *");
    stateUserAccountRequestForm.elements.acknowledgeAlert().should("have.text",'The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.');
    stateUserAccountRequestForm.elements.backBtn().should("have.text", "Back");
    stateUserAccountRequestForm.elements.continueBtn().should("have.text", "Continue");
    commonObjects.elements.cancelRequestBtn().should("have.text", "Cancel Request");
  });

  it("Page 2 Selections", function () {
    stateUserAccountRequestForm.navigateToStep2("State User");
    // Fill out page 2 elements
    stateUserAccountRequestForm.typeTitleInUserTitle();
    stateUserAccountRequestForm.typeFNameInFirstName();
    stateUserAccountRequestForm.typeLNameInLastName();
    stateUserAccountRequestForm.typePhoneInUserPhone();
    stateUserAccountRequestForm.typeEmailInUserEmail();
    stateUserAccountRequestForm.clickBackBtn();
  });

  it("Page 2 Errors", function () {
    stateUserAccountRequestForm.navigateToStep2("State User");
    stateUserAccountRequestForm.clickOnContinueBtn();
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
    stateUserAccountRequestForm.navigateToStep2("State User");
    stateUserAccountRequestForm.typeTitleInUserTitle();
    commonObjects.modalCancelRequest();
  });

  it("Page 2 Invalid Phone Number", function () {
    stateUserAccountRequestForm.navigateToStep2("State User");
    stateUserAccountRequestForm.elements.userPhoneInput().type("123");
    stateUserAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Phone number is invalid or does not adhere to the required format");
      });
  });

  it("Page 2 Invalid Email", function () {
    stateUserAccountRequestForm.navigateToStep2("State User");
    stateUserAccountRequestForm.elements.userEmailInput().type("abc");
    stateUserAccountRequestForm.clickOnContinueBtn();
    cy.get('[data-testid="formGroup"]').eq(4).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Email is invalid or does not adhere to the required format");
      });
  });

  it("State User Account Request Form Page 3", function () {
    stateUserAccountRequestForm.navigateToStep3("State User");
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().should("have.text", "Security Compliance");
    // Check text
    stateUserAccountRequestForm.elements.acknowledgeText().should("have.text","All new state users must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system.");
    stateUserAccountRequestForm.elements.securityStatementLabel().should("have.text", "State User Security Compliance Statement:");
    stateUserAccountRequestForm.elements.SecurityAgreementText().should("have.text","As a state user granted access to the NYTD system, I agree to abide by the following:");
    stateUserAccountRequestForm.elements.agreementListElement1().should("have.text","I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.");
    stateUserAccountRequestForm.elements.agreementListElement2().should("have.text","I will not make any unencrypted electronic copies of PII from the NYTD system.");
    stateUserAccountRequestForm.elements.agreementListElement3().should("have.text","I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.");
    stateUserAccountRequestForm.elements.agreementListElement4().should("have.text","I will ensure the proper disposal of PII in any format, including printed reports.");
    stateUserAccountRequestForm.elements.agreementListElement5().should("have.text","I will access NYTD system only to the extent that my duties require such access.");
    stateUserAccountRequestForm.elements.agreementListElement6().should("have.text","I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.");
    stateUserAccountRequestForm.elements.agreementListElement7().should("have.text","I will immediately notify the NYTD Help Desk of any user account changes, including the need to close my account.");
    stateUserAccountRequestForm.elements.securityAgreementNote().should("have.text","Note: The state user needing access to the NYTD system MUST check Agree below:");
    // check checkbox
    stateUserAccountRequestForm.elements.securityAgreeementCheckbox().should("not.be.checked");
    stateUserAccountRequestForm.elements.securityAgreeementCheckbox().should("have.text","Check here to acknowledge you have read and agree with the Security Compliance Statement above");
    // Check alert
    stateUserAccountRequestForm.elements.alert().should("have.text", "The Name entered here must match the first and last name on the request form.");
    // check name fields
    stateUserAccountRequestForm.elements.nameText().should("have.text", "User First and Last Name *");
    stateUserAccountRequestForm.elements.formatText().should("have.text",'Format should be "First Last" with a space separating the first and last names');
    stateUserAccountRequestForm.elements.nameInput().should("have.value", "");
    // check date fields
    stateUserAccountRequestForm.elements.dateText().should("have.text", "Date *");
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
    stateUserAccountRequestForm.elements.dateField().should("have.value", formattedDate);
  });

  it("Page 3 Selections", function () {
    stateUserAccountRequestForm.navigateToStep3("State User");
    stateUserAccountRequestForm.checkSecurityAgreementCheckbox();
    stateUserAccountRequestForm.typeNameIntoNameInput();
  });

  it("Verifying Page 3 error messages display when required fields are blank", function () {
    stateUserAccountRequestForm.navigateToStep3("State User");
    stateUserAccountRequestForm.clickOnContinueBtn();
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
      stateUserAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
  });

  it("Page 3 Cancel Request", function () {
    stateUserAccountRequestForm.navigateToStep3("State User");
    stateUserAccountRequestForm.checkSecurityAgreementCheckbox();
    commonObjects.modalCancelRequest();
  });

  it("State User Account Request Form Page 4", function () {
    stateUserAccountRequestForm.navigateToStep4("State User");
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.header().should("have.text", "State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().should("have.text", "Review and Submit");
    stateUserAccountRequestForm.elements.alert().should('have.text', 'Verify the information below is correct before submitting. If any changes need to be made, please click on the Edit button below.');
    stateUserAccountRequestForm.elements.requestTypeText().should("contain","Request Type *");
    stateUserAccountRequestForm.elements.userRoleText().should("contain", "User Role *");
    stateUserAccountRequestForm.elements.stateText().should("contain", "State *");
    stateUserAccountRequestForm.elements.agencyOrOfficeText().should("contain", "Agency or Office *");
    stateUserAccountRequestForm.elements.userTitleText().should("contain", "User Title *");
    stateUserAccountRequestForm.elements.userFNameText().should("contain", "User First Name *");
    stateUserAccountRequestForm.elements.userLNameText().should("contain", "User Last Name *");
    stateUserAccountRequestForm.elements.userPhoneText().should("contain", "User Phone *");
    stateUserAccountRequestForm.elements.userEmailText().should("contain", "User Email *"); 
    stateUserAccountRequestForm.elements.securityStatementText().should("contain", "Security Statement *");
    stateUserAccountRequestForm.elements.dateSignedText().should("contain", "Date Signed *");   
    stateUserAccountRequestForm.elements.requestType().should("contain", "State User Account");
    stateUserAccountRequestForm.elements.userRole().should("contain", "Standard User");
    stateUserAccountRequestForm.elements.state().should("contain", "Test State");
    stateUserAccountRequestForm.elements.agencyOrOffice().should("contain", "Test");
    stateUserAccountRequestForm.elements.userTitle().should("contain", "Title");
    stateUserAccountRequestForm.elements.userFName().should("contain", "FName");
    stateUserAccountRequestForm.elements.userLName().should("contain", "LName");
    stateUserAccountRequestForm.elements.userPhone().should("contain", "999-999-9999");
    stateUserAccountRequestForm.elements.userEmail().should("contain", "test@gov.net");
    stateUserAccountRequestForm.elements.securityStatement().should("contain", "Complete");
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
    stateUserAccountRequestForm.elements.dateSigned().should("contain", formattedDate);
    stateUserAccountRequestForm.elements.accuracyCheckbox().should('not.be.checked');
    stateUserAccountRequestForm.elements.accuracyCheckbox().should('have.text', 'Check this box to confirm the accuracy of the above information');
    stateUserAccountRequestForm.elements.editBtn().should('have.text', 'Edit');
    stateUserAccountRequestForm.elements.submitBtn().should('have.text', 'Submit Request');
  });

  it("Page 4 Selection", function () {
    stateUserAccountRequestForm.navigateToStep4("State User");
    stateUserAccountRequestForm.clickAccuracyCheckbox();
  });

  it("Page 4 Error", function () {
    stateUserAccountRequestForm.navigateToStep4("State User");
    stateUserAccountRequestForm.clickSubmitBtn();
    stateUserAccountRequestForm.elements.errorAlert().should('have.text', 'Please check your entries and try again.');
    stateUserAccountRequestForm.elements.errorMsg().should('have.text', 'Please fill out this field');
  });

  it("Page 4 Cancel Request", function () {
    stateUserAccountRequestForm.navigateToStep4("State User");
    commonObjects.modalCancelRequest();
  });

  it("Confirm Request was submitted and confirmation modal", function () {
    stateUserAccountRequestForm.navigateToStep4("State User");
    stateUserAccountRequestForm.clickAccuracyCheckbox();
    stateUserAccountRequestForm.clickSubmitBtn(); 
    stateUserAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    stateUserAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    stateUserAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    stateUserAccountRequestForm.clickReturnHomeBtn();    
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
    stateUserAccountRequestForm.navigateToStep4("State User");
    stateUserAccountRequestForm.clickAccuracyCheckbox();
    stateUserAccountRequestForm.clickSubmitBtn(); 
    stateUserAccountRequestForm.elements.returnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    stateUserAccountRequestForm.elements.returnHomeText().should("contain", 'You will be contacted via email once your request has been reviewed.');
    stateUserAccountRequestForm.elements.returnHomeBtn().should('have.text', 'Return to NYTD Home');
    stateUserAccountRequestForm.clickReturnHomeBtn(); 

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
