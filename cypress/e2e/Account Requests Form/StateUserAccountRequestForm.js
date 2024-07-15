import StateUserAccountRequestFormObjects from "../pages/StateUserAccountRequestFormObjects";
const stateUserAccountRequestForm = new StateUserAccountRequestFormObjects();
import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
const rgbCurrent = "rgb(99, 186, 176)";
const rgbBlank = "rgb(221, 226, 232)";
const rgbComplete = "rgb(22, 46, 81)";

describe("State User Account Request Validations", function () {
  it("State User Account Request Form Page 1", function () {
    // Confirm page 1 elements appear
    cy.visit('');
    stateUserAccountRequestForm.clickOnRequestAccountLink();

    stateUserAccountRequestForm.elements.nytdIcon().invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.progressBarText1().contains("Request Type");
    stateUserAccountRequestForm.elements.progressBarText2().contains("Personal User Information");
    stateUserAccountRequestForm.elements.progressBarText3().contains("Security Compliance");
    stateUserAccountRequestForm.elements.progressBarText4().contains("Review and Submit");

    stateUserAccountRequestForm.elements.header().contains("User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().contains("Request Type");
    stateUserAccountRequestForm.elements.Alert().contains("Asterisks (*) in field names are used to denote required fields.");
    stateUserAccountRequestForm.elements.label().contains("Request Type *");
    stateUserAccountRequestForm.elements.StateUserRadioBtn().should("have.text", "State User Account");
    stateUserAccountRequestForm.elements.FederalUserRadioBtn().should("have.text", "Federal User Account");

    stateUserAccountRequestForm.elements.cancelBtn().should("have.text", "Cancel");
  });

  it("Cancel button", function () {
    cy.visit('');
    stateUserAccountRequestForm.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnCancelBtn();
  });

  it("Page 1 Selection", function () {
    cy.visit('');
    stateUserAccountRequestForm.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();

    stateUserAccountRequestForm.elements.SecondAlert().should('have.text', 'Indicate the role-based access of the user.Standard users have view-only access to the state\'s NYTD information.State Managers can view all state NYTD information and can submit and delete files on behalf of the state.State Authorized Officials can transmit, submit, and delete NYTD files, as well as approve and manage user account requests for all state users.');

    // Fill out page 1 elements
    stateUserAccountRequestForm.elements.UserRoleHeader().should("have.text", "User Role *");
    stateUserAccountRequestForm.clickOnStandardUserRoleRadioBtn();
    stateUserAccountRequestForm.clickOnMngrUserRoleRadioBtn();
    stateUserAccountRequestForm.clickOnSAOUserRoleRadioBtn();

    stateUserAccountRequestForm.elements.StateHeader().should("have.text", "State *");
    stateUserAccountRequestForm.selectTestStateDropdown();

    stateUserAccountRequestForm.elements.AgencyOrOfficeHeader().should("have.text", "Agency or Office *");
    stateUserAccountRequestForm.typeTestOnAgencyOrOfficeInput();

    stateUserAccountRequestForm.elements.ContinueBtn().should("have.text", "Continue");
  });

  it("Page 1 Errors", function () {
    cy.visit('');
    stateUserAccountRequestForm.clickOnRequestAccountLink();
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
    stateUserAccountRequestForm.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();
    stateUserAccountRequestForm.ModalCancelRequest();
  });

  it("State User Account Request Form Page 2", function () {
    stateUserAccountRequestForm.navigateToStep2();


    // Confirm page 2 elements appear
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbBlank);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);

    stateUserAccountRequestForm.elements.header().contains("State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().contains("Personal User Information");
    stateUserAccountRequestForm.elements.Alert().contains("Asterisks (*) in field names are used to denote required fields.");

    stateUserAccountRequestForm.elements.UserTitleLabel().should("have.text", "User Title *");
    stateUserAccountRequestForm.elements.UserFNameLabel().should("have.text", "User First Name *");
    stateUserAccountRequestForm.elements.UserLnameLabel().should("have.text", "User Last Name *");
    stateUserAccountRequestForm.elements.UserPhoneLabel().should("have.text", "User Phone *");
    stateUserAccountRequestForm.elements.UserEmailLabel().should("have.text", "User Email *");
    stateUserAccountRequestForm.elements.AcknowledgeAlert().should("have.text",'The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.');
    stateUserAccountRequestForm.elements.BackBtn().should("have.text", "Back");

    stateUserAccountRequestForm.elements.ContinueBtn().should("have.text", "Continue");
    stateUserAccountRequestForm.elements.cancelRequestBtn().should("have.text", "Cancel Request");
  });

  it("Page 2 Selections", function () {
    stateUserAccountRequestForm.navigateToStep2();

    // Fill out page 2 elements
    stateUserAccountRequestForm.typeTitleInUserTitle();
    stateUserAccountRequestForm.typeFNameInFirstName();
    stateUserAccountRequestForm.typeLNameInLastName();
    stateUserAccountRequestForm.typePhoneInUserPhone();
    stateUserAccountRequestForm.typeEmailInUserEmail();
    stateUserAccountRequestForm.ClickBackBtn();

  });

  it("Page 2 Errors", function () {
    stateUserAccountRequestForm.navigateToStep2();

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
    stateUserAccountRequestForm.navigateToStep2();

    stateUserAccountRequestForm.typeTitleInUserTitle();
    stateUserAccountRequestForm.ModalCancelRequest();
  });

  it("Page 2 Invalid Phone Number", function () {
    stateUserAccountRequestForm.navigateToStep2();
    stateUserAccountRequestForm.elements.UserPhoneInput().type("123");
    stateUserAccountRequestForm.clickOnContinueBtn();

    cy.get('[data-testid="formGroup"]').eq(3).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Phone number is invalid or does not adhere to the required format");
      });

  });

  it("Page 2 Invalid Email", function () {
    stateUserAccountRequestForm.navigateToStep2();
    stateUserAccountRequestForm.elements.UserEmailInput().type("abc");
    stateUserAccountRequestForm.clickOnContinueBtn();

    cy.get('[data-testid="formGroup"]').eq(4).within(($span) => {
        return cy
          .get('[data-testid="errorMessage"]')
          .should("have.text", "Email is invalid or does not adhere to the required format");
      });
  });

  it("State User Account Request Form Page 3", function () {
    stateUserAccountRequestForm.navigateToStep3();

    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbBlank);

    stateUserAccountRequestForm.elements.header().contains("State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().contains("Security Compliance");

    // Check text
    stateUserAccountRequestForm.elements.AcknowledgeText().should("have.text","All new state users must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system.");
    stateUserAccountRequestForm.elements.SecurityStatementLabel().should("have.text", "State User Security Compliance Statement:");
    stateUserAccountRequestForm.elements.SecurityAgreementText().should("have.text","As a state user granted access to the NYTD system, I agree to abide by the following:");
    stateUserAccountRequestForm.elements.AgreementListElement1().should("have.text","I will not disclose personally identifiable information (PII) from the NYTD system to anybody except authorized system users whose roles permit access to that data.");
    stateUserAccountRequestForm.elements.AgreementListElement2().should("have.text","I will not make any unencrypted electronic copies of PII from the NYTD system.");
    stateUserAccountRequestForm.elements.AgreementListElement3().should("have.text","I will take all reasonable steps to ensure I do not violate the privacy and confidentiality of all PII from the NYTD system.");
    stateUserAccountRequestForm.elements.AgreementListElement4().should("have.text","I will ensure the proper disposal of PII in any format, including printed reports.");
    stateUserAccountRequestForm.elements.AgreementListElement5().should("have.text","I will access NYTD system only to the extent that my duties require such access.");
    stateUserAccountRequestForm.elements.AgreementListElement6().should("have.text","I will report inappropriate or malicious use of NYTD system to the NYTD Help Desk.");
    stateUserAccountRequestForm.elements.AgreementListElement7().should("have.text","I will immediately notify the NYTD Help Desk of any user account changes, including the need to close my account.");
    stateUserAccountRequestForm.elements.SecurityAgreementNote().should("have.text","Note: The state user needing access to the NYTD system MUST check Agree below:");

    // check checkbox
    stateUserAccountRequestForm.elements.SecurityAgreeementCheckbox().should("not.be.checked");
    stateUserAccountRequestForm.elements.SecurityAgreeementCheckbox().should("have.text","Check here to acknowledge you have read and agree with the Security Compliance Statement above");

    // Check alert
    stateUserAccountRequestForm.elements.Alert().contains("The Name entered here must match the first and last name on the request form.");

    // check name fields
    stateUserAccountRequestForm.elements.NameText().should("have.text", "User First and Last Name *");
    stateUserAccountRequestForm.elements.FormatText().should("have.text",'Format should be "First Last" with a space separating the first and last names');
    stateUserAccountRequestForm.elements.NameInput().should("have.value", "");

    // check date fields
    stateUserAccountRequestForm.elements.DateText().should("have.text", "Date *");
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
    stateUserAccountRequestForm.elements.DateField().should("have.value", formattedDate);
  });

  it("Page 3 Selections", function () {
    stateUserAccountRequestForm.navigateToStep3();

    stateUserAccountRequestForm.CheckSecurityAgreementCheckbox();
    stateUserAccountRequestForm.TypeNameIntoNameInput();
  });

  it("Page 3 Errors", function () {
    stateUserAccountRequestForm.navigateToStep3();
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

      stateUserAccountRequestForm.elements.ErrorAlert().should('have.text', 'Please check your entries and try again.');

  });
  it("Page 3 Cancel Request", function () {
    stateUserAccountRequestForm.navigateToStep3();

    stateUserAccountRequestForm.CheckSecurityAgreementCheckbox();

    stateUserAccountRequestForm.ModalCancelRequest();

  });

  it("State User Account Request Form Page 4", function () {
    stateUserAccountRequestForm.navigateToStep4();
    stateUserAccountRequestForm.elements.colorBar1().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar2().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar3().should("have.css", "background-color", rgbComplete);
    stateUserAccountRequestForm.elements.colorBar4().should("have.css", "background-color", rgbCurrent);
    stateUserAccountRequestForm.elements.header().contains("State User Account Request Form");
    stateUserAccountRequestForm.elements.stepHeader().contains("Review and Submit");
    stateUserAccountRequestForm.elements.Alert().should('have.text', 'Verify the information below is correct before submitting. If any changes need to be made, please click on the Edit button below.');
    stateUserAccountRequestForm.elements.RequestTypeText().contains("Request Type *");
    stateUserAccountRequestForm.elements.UserRoleText().contains("User Role *");
    stateUserAccountRequestForm.elements.StateText().contains("State *");
    stateUserAccountRequestForm.elements.AgencyOrOfficeText().contains("Agency or Office *");
    stateUserAccountRequestForm.elements.UserTitleText().contains("User Title *");
    stateUserAccountRequestForm.elements.UserFNameText().contains("User First Name *");
    stateUserAccountRequestForm.elements.UserLNameText().contains("User Last Name *");
    stateUserAccountRequestForm.elements.UserPhoneText().contains("User Phone *");
    stateUserAccountRequestForm.elements.UserEmailText().contains("User Email *");  
    stateUserAccountRequestForm.elements.SecurityStatementText().contains("Security Statement *");
    stateUserAccountRequestForm.elements.DateSignedText().contains("Date Signed *");  
    stateUserAccountRequestForm.elements.AccuracyCheckbox().should('not.be.checked');
    stateUserAccountRequestForm.elements.AccuracyCheckbox().should('have.text', 'Check this box to confirm the accuracy of the above information');
    stateUserAccountRequestForm.elements.EditBtn().should('have.text', 'Edit');
    stateUserAccountRequestForm.elements.SubmitBtn().should('have.text', 'Submit Request');

  });

  it("Page 4 Selection", function () {
    stateUserAccountRequestForm.navigateToStep4();

    stateUserAccountRequestForm.ClickAccuracyCheckbox();

  });

  it("Page 4 Error", function () {
    stateUserAccountRequestForm.navigateToStep4();
    stateUserAccountRequestForm.ClickSubmitBtn();
    stateUserAccountRequestForm.elements.ErrorAlert().should('have.text', 'Please check your entries and try again.');
    stateUserAccountRequestForm.elements.ErrorMsg().should('have.text', 'Please fill out this field');
  });

  it("Page 4 Cancel Request", function () {
    stateUserAccountRequestForm.navigateToStep4();
    stateUserAccountRequestForm.ModalCancelRequest();
  });

  it("SAO differences", function () {
    cy.visit('');
    stateUserAccountRequestForm.clickOnRequestAccountLink();
    stateUserAccountRequestForm.clickOnStateUserRadioBtn();
    stateUserAccountRequestForm.clickOnSAOUserRoleRadioBtn();
    stateUserAccountRequestForm.selectTestStateDropdown();
    stateUserAccountRequestForm.typeTestOnAgencyOrOfficeInput();
    stateUserAccountRequestForm.clickOnContinueBtn();
    stateUserAccountRequestForm.elements.SAOAcknowledgeAlert().should("have.text",'The user must acknowledge and submit the "State Authorized Official Security Compliance Statement" on the next page.');
    stateUserAccountRequestForm.typeTitleInUserTitle();
    stateUserAccountRequestForm.typeFNameInFirstName();
    stateUserAccountRequestForm.typeLNameInLastName();
    stateUserAccountRequestForm.typePhoneInUserPhone();
    stateUserAccountRequestForm.typeEmailInUserEmail();
    stateUserAccountRequestForm.clickOnContinueBtn();
    stateUserAccountRequestForm.elements.SAOAcknowledgeText().should("have.text", "All new state authorized officials must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system.");
    stateUserAccountRequestForm.elements.SecurityStatementLabel().should("have.text", "State Authorized Official Security Compliance Statement:");
    stateUserAccountRequestForm.elements.SAOListHeader().should('have.text', 'As a state authorized official granted access to the NYTD system, I agree to abide by the following:');
    stateUserAccountRequestForm.elements.SAOExtraLi().should('have.text', 'I will submit requests for user account requests to the NYTD Help Desk promptly, including notifying when a state user no longer requires access to the NYTD system.');  
    stateUserAccountRequestForm.elements.SAONote().should('have.text', 'Note: The state authorized official needing access to the NYTD system MUST check Agree below:');
    stateUserAccountRequestForm.CheckSecurityAgreementCheckbox();
    stateUserAccountRequestForm.TypeNameIntoNameInput();
    stateUserAccountRequestForm.clickOnContinueBtn();
    stateUserAccountRequestForm.ClickAccuracyCheckbox();
  });

  it("Confirm Request was sent", function () {
    stateUserAccountRequestForm.navigateToStep4();
    stateUserAccountRequestForm.ClickAccuracyCheckbox();
    stateUserAccountRequestForm.ClickSubmitBtn(); 

    
    stateUserAccountRequestForm.elements.ReturnHomeHeader().should('have.text', 'Account Request Successfully Submitted');
    stateUserAccountRequestForm.elements.ReturnHomeText().contains('You will be contacted via email once your request has been reviewed.');
    stateUserAccountRequestForm.elements.ReturnHomeBtn().should('have.text', 'Return to NYTD Home');
    stateUserAccountRequestForm.ClickReturnHomeBtn();    
  });

  it("Deny Request as SAO", function () {
    cy.standardLogin('teststatesao', 'P@ssw0rd');

    cy.get('[data-testid="header_dropdown_button"]').contains('Account Settings').click();
    cy.get('[type="button"]').contains('User Account Management').click();
    cy.get('[data-testid="manage_user_account_requests"]').click();
    cy.contains('td', 'FName') .should('exist');
    cy.contains('td', 'LName') .should('exist');
    cy.contains('td', 'FName').parent().within($tr => {
      cy.get('button').contains('Deny').click();
    })
    cy.get('[data-testid="textarea"]').type('Test');
    cy.get('[data-testid="Deny New_user_button"]').click();
  });

  it("Deny Request as SA", function () {
    cy.standardAdminLogin('nytdsysadmin', 'P@ssw0rd1');

    cy.get('[data-testid="header_dropdown_button"]').contains('Account Settings').click();
    cy.get('[type="button"]').contains('User Account Management').click();
    cy.get('[data-testid="manage_user_account_requests"]').click();
    cy.contains('td', 'FName') .should('exist');
    cy.contains('td', 'LName') .should('exist');
    cy.contains('td', 'FName').parent().within($tr => {
      cy.get('button').contains('Deny').click();
    })
    cy.get('[data-testid="textarea"]').type('Test');
    cy.get('[data-testid="Deny New_user_button"]').click();
  });
});
