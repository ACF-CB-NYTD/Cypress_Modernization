import CommonPageObjects from "./CommonPageObjects";
const commonObjects = new CommonPageObjects();
class userAccountRequestFormObjects {
    
  elements = {
    // Step 1 Page Elements
    colorBar1: () => cy.get('[data-testid="color_bar1"]'), //First color bar at the top
    colorBar2: () => cy.get('[data-testid="color_bar2"]'), //Second color bar at the top
    colorBar3: () => cy.get('[data-testid="color_bar3"]'), //Third color bar at the top
    colorBar4: () => cy.get('[data-testid="color_bar4"]'), //Fourth color bar at the top
    header: () => cy.get('[data-testid="New_user_title"]'), //Header at the very top
    stepHeader: () => cy.get('[data-testid="New_user_page_title"]'), //Header for each step
    alert: () => cy.get('[data-testid="alert"]'), //Alert message at the top
    secondAlert: () => cy.get('[data-testid="alert"]').eq(1), //Second alert message at the top
    nytdIcon: () => cy.get('[data-testid="NYTD_logo_pre_login"]'), //NYTD icon at the top
    progressBarText1: () => cy.get('[data-testid="progress_bar_text1"]'), //Text for first step in the color bar
    progressBarText2: () => cy.get('[data-testid="progress_bar_text2"]'), //Text for second step in the color bar
    progressBarText3: () => cy.get('[data-testid="progress_bar_text3"]'), //Text for third step in the color bar
    progressBarText4: () => cy.get('[data-testid="progress_bar_text4"]'), //Text for fourth step in the color bar
    cancelBtn: () => cy.get('[class="styles_cancelButton__3OfxS"]'), //Cancel button at the bottom left
    label: () => cy.get('[data-testid="label"]'),  //label for radio buttons
    stateUserRadioBtn: () => cy.get('[data-testid="radio"]').contains("State User Account"), //Radio button for State user Account
    federalUserRadioBtn: () => cy.get('[data-testid="radio"]').contains("Federal User Account"), //Radio button for Federal user Account
    userRoleHeader: () => cy.get('[data-testid="label"]').contains("User Role *"), //user Role header after a radio button is selected
    standardUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("Standard User"), //Radio button for Standard user selection
    mngrUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("State Manager"), //Radio button for State Manager selection
    saoUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("State Authorized Official"), //Radio button for State Authorized Official selection
    stateHeader: () => cy.get('[data-testid="label"]').contains("State *"), //State header for state dropdown
    stateDropdown: () => cy.get('[data-testid="state_select"]'), //State dropdown for all 50 states
    agencyOrOfficeHeader: () => cy.get('[data-testid="label"]').contains("Agency or Office *"), //Agency or Office header for text input
    agencyOrOfficeInput: () => cy.get('[data-testid="textInput"]'), //Text input for Agency or Office
    continueBtn: () => cy.get('[data-testid="button"]').contains("Continue"), //Continue button at the bottom right
    errorMsg: () => cy.get('[data-testid="errorMessage"]'), //Error message for fields that are empty when continuing    

    // Step 2 Page Elements
    userTitleLabel: () => cy.get('[data-testid="label"]').contains("User Title *"), //user Title label for text input
    userTitleInput: () => cy.get('[id="title"]'), //user Title text input
    userFNameLabel: () => cy.get('[data-testid="label"]').contains("User First Name *"), //user First Name label for text input
    userFnameInput: () => cy.get('[id="firstName"]'), //user First Name text input
    userLnameLabel: () => cy.get('[data-testid="label"]').contains("User Last Name *"), //user Last Name label for text input
    userLNameInput: () => cy.get('[id="lastName"]'), //user Last Name text input
    userPhoneLabel: () => cy.get('[data-testid="label"]').contains("User Phone *"), //user Phone label for text input
    userPhoneInput: () => cy.get('[id="phone"]'), //user Phone text input
    userEmailLabel: () => cy.get('[data-testid="label"]').contains("User Email *"), //user Email label for text input
    userEmailInput: () => cy.get('[id="email"]'), //user Email text input
    acknowledgeAlert: () => cy.get('[data-testid="alert"]').contains('The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.'), //Acknowledgement alert at the bottom of the page
    backBtn: () => cy.get('[type="button"]').contains("Back"), //Back button for returning to a previous page

    // Step 3 Page Elements
    acknowledgeText: () =>  cy.get(".styles_pageSetupBox63__LLf_t > :nth-child(3)").contains("All new state users must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system."), //Acknowledgement text for state users
    securityStatementLabel: () => cy.get("h3"), //Security compliance statement header for page 3
    SecurityAgreementText: () =>  cy.get('.styles_pageSetupBox63__LLf_t > :nth-child(7)'), //Agreement text above list
    agreementListElement1: () => cy.get('li').eq(2), //First list item in the agreement list
    agreementListElement2: () => cy.get('li').eq(3), //Second list item in the agreement list
    agreementListElement3: () => cy.get('li').eq(4), //Third list item in the agreement list
    agreementListElement4: () => cy.get('li').eq(5), //Fourth list item in the agreement list
    agreementListElement5: () => cy.get('li').eq(6), //Fifth list item in the agreement list
    agreementListElement6: () => cy.get('li').eq(7), //Sixth list item in the agreement list
    agreementListElement7: () => cy.get('li').eq(8), //Seventh list item in the agreement list
    securityAgreementNote: () => cy.get('[class="styles_noWrap__A9KlA"]').contains("Note: The state user needing access to the NYTD system MUST check Agree below:"), //Additional note below the list
    securityAgreeementCheckbox: () => cy.get('[data-testid="checkbox"]'), //Checkbox confirming you have read the list
    nameText: () => cy.get('[for="signedName"]').contains("User First and Last Name *"), //Name text above text input field for name
    formatText: () => cy.get("span").contains('Format should be "First Last" with a space separating the first and last names'), //Format of the text input field
    nameInput: () => cy.get('[id="signedName"]'), //Text input field for name
    dateText: () => cy.get('[for="date-today"]').contains("Date *"), //Date text above date input field
    dateField: () => cy.get('[id="date-today"]'), //Shows current date
    errorAlert: () => cy.get('[data-testid="alert"]').contains("Please check your entries and try again"), //Error alert for missing fields
    saoAcknowledgeAlert: () => cy.get('.styles_marginBottom75px__sz8iZ > .usa-alert__body'), //Acknowledgement text alert for SAOs in page 2
    saoAcknowledgeText: () => cy.get('.styles_pageSetupBox63__LLf_t > :nth-child(3)'), //Acknowledgement text for SAOs on page 3
    saoListHeader: () => cy.get('.styles_userAgreement__C7AH3'), //List text header for SAO
    saoNote: () => cy.get('.styles_noWrap__A9KlA'), //Additional note below the list for SAO
    saoExtraLi: () => cy.get('.styles_responsibilitiesList__D2xf3 > :nth-child(8)'), //New list item for SAO in the agreement list

    // Step 4 Page Elements
    accuracyCheckbox: () => cy.get('[for="confirm_accuracy"]'), //Checkbox asking user to confirm the details of the request
    editBtn: () => cy.get('[class="nytd-button--secondary"]').contains("Edit"), //Edit button at the bottom
    submitBtn: () => cy.get('[class="usa-button styles_continue__Lban2"]'), //Submit button at the bottom
    requestTypeText: () => cy.get(':nth-child(1) > .styles_verifyLabel__mWmE5'), //Request type text in the table
    userRoleText: () => cy.get(':nth-child(2) > .styles_verifyLabel__mWmE5'), //user role text in the table
    stateText: () => cy.get(':nth-child(3) > .styles_verifyLabel__mWmE5'), //State text in the table
    agencyOrOfficeText: () => cy.get(':nth-child(4) > .styles_verifyLabel__mWmE5'), //Agency or Office text in the table
    userTitleText: () => cy.get(':nth-child(5) > .styles_verifyLabel__mWmE5'), //user title text in the table
    userFNameText: () => cy.get(':nth-child(6) > .styles_verifyLabel__mWmE5'), //user first name text in the table
    userLNameText: () => cy.get(':nth-child(7) > .styles_verifyLabel__mWmE5'), //user last name text in the table
    userPhoneText: () => cy.get(':nth-child(8) > .styles_verifyLabel__mWmE5'), //user phone text in the table
    userEmailText: () => cy.get(':nth-child(9) > .styles_verifyLabel__mWmE5'), //user email text in the table
    securityStatementText: () => cy.get(':nth-child(10) > .styles_verifyLabel__mWmE5'), //Security statement text in the table
    dateSignedText: () => cy.get(':nth-child(11) > .styles_verifyLabel__mWmE5'), //Date signed text in the table
    requestType: () => cy.get(':nth-child(1) > [data-testid="table_value"]'), //Request type selected by the user
    userRole: () => cy.get(':nth-child(2) > [data-testid="table_value"]'), //user role selected by the user
    state: () => cy.get(':nth-child(3) > [data-testid="table_value"]'), //State selected by the user
    agencyOrOffice: () => cy.get(':nth-child(4) > [data-testid="table_value"]'), //Agency or Office input by the user
    userTitle: () => cy.get(':nth-child(5) > [data-testid="table_value"]'), //user title input by the user
    userFName: () => cy.get(':nth-child(6) > [data-testid="table_value"]'), //user first name input by the user
    userLName: () => cy.get(':nth-child(7) > [data-testid="table_value"]'), //user last name input by the user
    userPhone: () => cy.get(':nth-child(8) > [data-testid="table_value"]'), //user phone input by the user
    userEmail: () => cy.get(':nth-child(9) > [data-testid="table_value"]'), //user email input by the user
    securityStatement: () => cy.get(':nth-child(10) > [data-testid="table_value"]'), //Security statement input by the user
    dateSigned: () => cy.get(':nth-child(11) > [data-testid="table_value"]'), //Date signed input by the user
    returnHomeHeader: () => cy.get('[data-testid="request_account_success_modal_h1"]'), //Header of the modal after submitting the request
    returnHomeText: () => cy.get('[class="styles_subtitle___RAKh"]'), //Text of the modal after submitting the request
    returnHomeBtn: () => cy.get('[data-testid="request_account_success_modal_button"]'), //Button of the modal after submitting the request
  };

  navigateToStep2(choice) {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    switch(choice) {
      case "State user":
        this.clickOnStandardUserRoleRadioBtn();
        break;
      case "SAO":
        this.clickOnSAOUserRoleRadioBtn();
        break;
      case "Mngr":
        this.clickOnMngrUserRoleRadioBtn();
        break;
    }
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
  }

  navigateToStep3(choice) {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    switch(choice) {
      case "State user":
        this.clickOnStandardUserRoleRadioBtn();
        break;
      case "SAO":
        this.clickOnSAOUserRoleRadioBtn();
        break;
      case "Mngr":
        this.clickOnMngrUserRoleRadioBtn();
        break;
    }
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeNameInFirstName('FName');
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail();
    this.clickOnContinueBtn();
  }

  navigateToStep4(choice) {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    switch(choice) {
      case "State user":
        this.clickOnStandardUserRoleRadioBtn();
        break;
      case "SAO":
        this.clickOnSAOUserRoleRadioBtn();
        break;
      case "Mngr":
        this.clickOnMngrUserRoleRadioBtn();
        break;
    }
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeNameInFirstName('FName');
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail();
    this.clickOnContinueBtn();
    this.checkSecurityAgreementCheckbox();
    this.typeNameIntoNameInput();
    this.clickOnContinueBtn();
  }  

  createAccountRequest(choice, fname, email) {
    cy.visit("https://nytdm.qa.dssnytd.com/RequestAccount");
    this.clickOnStateUserRadioBtn();
    switch(choice) {
      case "State user":
        this.clickOnStandardUserRoleRadioBtn();
        break;
      case "SAO":
        this.clickOnSAOUserRoleRadioBtn();
        break;
      case "Mngr":
        this.clickOnMngrUserRoleRadioBtn();
        break;
    }
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeNameInFirstName(fname);
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail(email);
    this.clickOnContinueBtn();
    this.checkSecurityAgreementCheckbox();
    this.typeNameIntoNameInput(fname);
    this.clickOnContinueBtn();
    this.clickAccuracyCheckbox();
    this.clickSubmitBtn();
    cy.wait(2000);
  }  

  clickOnStateUserRadioBtn() {
    this.elements.stateUserRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnCancelBtn() {
    this.elements.cancelBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnStandardUserRoleRadioBtn() {
    this.elements.standardUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnMngrUserRoleRadioBtn() {
    this.elements.mngrUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnSAOUserRoleRadioBtn() {
    this.elements.saoUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  selectTestStateDropdown() {
    this.elements.stateDropdown().invoke("removeAttr", "target", "_blank").select("Test State");
  }

  typeTestOnAgencyOrOfficeInput() {
    this.elements.agencyOrOfficeInput().invoke("removeAttr", "target", "_blank").type("Test");
  }

  clickOnContinueBtn() {
    this.elements.continueBtn().invoke("removeAttr", "target", "_blank").click();
  }

  typeTitleInUserTitle() {
    this.elements.userTitleInput().invoke("removeAttr", "target", "_blank").type("Title");
  }

  typeNameInFirstName(name) {
    this.elements.userFnameInput().invoke("removeAttr", "target", "_blank").type(name);
  }

  typeLNameInLastName() {
    this.elements.userLNameInput().invoke("removeAttr", "target", "_blank").type("LName");
  }

  typePhoneInUserPhone() {
    this.elements.userPhoneInput().invoke("removeAttr", "target", "_blank").type("999-999-9999");
  }

  typeEmailInUserEmail(email) {
    this.elements.userEmailInput().invoke("removeAttr", "target", "_blank").type(email);
  }

  checkSecurityAgreementCheckbox() {
    this.elements.securityAgreeementCheckbox().invoke("removeAttr", "target", "_blank").click();
  }

  clickBackBtn() {
    this.elements.backBtn().invoke("removeAttr", "target", "_blank").click();
  }

  typeNameIntoNameInput(fname) {
    this.elements.nameInput().invoke("removeAttr", "target", "_blank").type(fname +" LName");
  }

  clickAccuracyCheckbox() {
    this.elements.accuracyCheckbox().invoke("removeAttr", "target", "_blank").click();
  }

  clickSubmitBtn() {
    this.elements.submitBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickReturnHomeBtn() {
    this.elements.returnHomeBtn().invoke("removeAttr", "target", "_blank").click();
    commonObjects.verifyUrl('/sbx.dssnytd.com');
  }
  
}
export default userAccountRequestFormObjects;
