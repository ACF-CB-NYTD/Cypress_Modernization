import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
import CommonPageObjects from "./CommonPageObjects";
const commonObjects = new CommonPageObjects();
class StateUserAccountRequestFormObjects {
    
  elements = {
    // Step 1 Page Elements
    colorBar1: () => cy.get('[data-testid="color_bar1"]'), //First color bar at the top
    colorBar2: () => cy.get('[data-testid="color_bar2"]'), //Second color bar at the top
    colorBar3: () => cy.get('[data-testid="color_bar3"]'), //Third color bar at the top
    colorBar4: () => cy.get('[data-testid="color_bar4"]'), //Fourth color bar at the top
    header: () => cy.get('[data-testid="New_user_title"]'), //Header at the very top
    stepHeader: () => cy.get('[data-testid="New_user_page_title"]'), //Header for each step
    Alert: () => cy.get('[data-testid="alert"]'), //Alert message at the top
    SecondAlert: () => cy.get('[data-testid="alert"]').eq(1), //Second alert message at the top
    nytdIcon: () => cy.get('[data-testid="NYTD_logo_pre_login"]'), //NYTD icon at the top
    progressBarText1: () => cy.get('[data-testid="progress_bar_text1"]'), //Text for first step in the color bar
    progressBarText2: () => cy.get('[data-testid="progress_bar_text2"]'), //Text for second step in the color bar
    progressBarText3: () => cy.get('[data-testid="progress_bar_text3"]'), //Text for third step in the color bar
    progressBarText4: () => cy.get('[data-testid="progress_bar_text4"]'), //Text for fourth step in the color bar
    cancelBtn: () => cy.get('[class="styles_cancelButton__3OfxS"]'), //Cancel button at the bottom left
    label: () => cy.get('[data-testid="label"]'),  //label for radio buttons
    StateUserRadioBtn: () => cy.get('[data-testid="radio"]').contains("State User Account"), //Radio button for State User Account
    FederalUserRadioBtn: () => cy.get('[data-testid="radio"]').contains("Federal User Account"), //Radio button for Federal User Account
    UserRoleHeader: () => cy.get('[data-testid="label"]').contains("User Role *"), //User Role header after a radio button is selected
    StandardUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("Standard User"), //Radio button for Standard User selection
    MngrUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("State Manager"), //Radio button for State Manager selection
    SAOUserRoleRadioBtn: () => cy.get('[data-testid="radio"]').contains("State Authorized Official"), //Radio button for State Authorized Official selection
    StateHeader: () => cy.get('[data-testid="label"]').contains("State *"), //State header for state dropdown
    StateDropdown: () => cy.get('[data-testid="state_select"]'), //State dropdown for all 50 states
    AgencyOrOfficeHeader: () => cy.get('[data-testid="label"]').contains("Agency or Office *"), //Agency or Office header for text input
    AgencyOrOfficeInput: () => cy.get('[data-testid="textInput"]'), //Text input for Agency or Office
    ContinueBtn: () => cy.get('[data-testid="button"]').contains("Continue"), //Continue button at the bottom right
    ErrorMsg: () => cy.get('[data-testid="errorMessage"]'), //Error message for fields that are empty when continuing

    

    // Step 2 Page Elements
    UserTitleLabel: () => cy.get('[data-testid="label"]').contains("User Title *"), //User Title label for text input
    UserTitleInput: () => cy.get('[id="title"]'), //User Title text input
    UserFNameLabel: () => cy.get('[data-testid="label"]').contains("User First Name *"), //User First Name label for text input
    UserFnameInput: () => cy.get('[id="firstName"]'), //User First Name text input
    UserLnameLabel: () => cy.get('[data-testid="label"]').contains("User Last Name *"), //User Last Name label for text input
    UserLNameInput: () => cy.get('[id="lastName"]'), //User Last Name text input
    UserPhoneLabel: () => cy.get('[data-testid="label"]').contains("User Phone *"), //User Phone label for text input
    UserPhoneInput: () => cy.get('[id="phone"]'), //User Phone text input
    UserEmailLabel: () => cy.get('[data-testid="label"]').contains("User Email *"), //User Email label for text input
    UserEmailInput: () => cy.get('[id="email"]'), //User Email text input
    AcknowledgeAlert: () => cy.get('[data-testid="alert"]').contains('The user must acknowledge and submit the "State User Security Compliance Statement" on the next page.'), //Acknowledgement alert at the bottom of the page
    BackBtn: () => cy.get('[type="button"]').contains("Back"), //Back button for returning to a previous page

    // Step 3 Page Elements
    AcknowledgeText: () =>  cy.get(".styles_pageSetupBox63__LLf_t > :nth-child(3)").contains("All new state users must acknowledge and submit the following statement of user responsibilities for ensuring appropriate security of NYTD data and of the NYTD system."), //Acknowledgement text for state users
    SecurityStatementLabel: () => cy.get("h3"), //Security compliance statement header for page 3
    SecurityAgreementText: () =>  cy.get('.styles_pageSetupBox63__LLf_t > :nth-child(7)'), //Agreement text above list
    AgreementListElement1: () => cy.get('li').eq(2), //First list item in the agreement list
    AgreementListElement2: () => cy.get('li').eq(3), //Second list item in the agreement list
    AgreementListElement3: () => cy.get('li').eq(4), //Third list item in the agreement list
    AgreementListElement4: () => cy.get('li').eq(5), //Fourth list item in the agreement list
    AgreementListElement5: () => cy.get('li').eq(6), //Fifth list item in the agreement list
    AgreementListElement6: () => cy.get('li').eq(7), //Sixth list item in the agreement list
    AgreementListElement7: () => cy.get('li').eq(8), //Seventh list item in the agreement list
    SecurityAgreementNote: () => cy.get('[class="styles_noWrap__A9KlA"]').contains("Note: The state user needing access to the NYTD system MUST check Agree below:"), //Additional note below the list

    SecurityAgreeementCheckbox: () => cy.get('[data-testid="checkbox"]'), //Checkbox confirming you have read the list

    NameText: () => cy.get('[for="signedName"]').contains("User First and Last Name *"), //Name text above text input field for name
    FormatText: () => cy.get("span").contains('Format should be "First Last" with a space separating the first and last names'), //Format of the text input field
    NameInput: () => cy.get('[id="signedName"]'), //Text input field for name
    DateText: () => cy.get('[for="date-today"]').contains("Date *"), //Date text above date input field
    DateField: () => cy.get('[id="date-today"]'), //Shows current date
    ErrorAlert: () => cy.get('[data-testid="alert"]').contains("Please check your entries and try again"), //Error alert for missing fields

    SAOAcknowledgeAlert: () => cy.get('.styles_marginBottom75px__sz8iZ > .usa-alert__body'), //Acknowledgement text alert for SAOs in page 2
    SAOAcknowledgeText: () => cy.get('.styles_pageSetupBox63__LLf_t > :nth-child(3)'), //Acknowledgement text for SAOs on page 3
    SAOListHeader: () => cy.get('.styles_userAgreement__C7AH3'), //List text header for SAO
    SAONote: () => cy.get('.styles_noWrap__A9KlA'), //Additional note below the list for SAO
    SAOExtraLi: () => cy.get('.styles_responsibilitiesList__D2xf3 > :nth-child(8)'), //New list item for SAO in the agreement list

    // Step 4 Page Elements

    AccuracyCheckbox: () => cy.get('[for="confirm_accuracy"]'), //Checkbox asking user to confirm the details of the request
    EditBtn: () => cy.get('[class="nytd-button--secondary"]').contains("Edit"), //Edit button at the bottom
    SubmitBtn: () => cy.get('[class="usa-button styles_continue__Lban2"]'), //Submit button at the bottom
    RequestTypeText: () => cy.get(':nth-child(1) > .styles_verifyLabel__mWmE5'), //Request type text in the table
    UserRoleText: () => cy.get(':nth-child(2) > .styles_verifyLabel__mWmE5'), //User role text in the table
    StateText: () => cy.get(':nth-child(3) > .styles_verifyLabel__mWmE5'), //State text in the table
    AgencyOrOfficeText: () => cy.get(':nth-child(4) > .styles_verifyLabel__mWmE5'), //Agency or Office text in the table
    UserTitleText: () => cy.get(':nth-child(5) > .styles_verifyLabel__mWmE5'), //User title text in the table
    UserFNameText: () => cy.get(':nth-child(6) > .styles_verifyLabel__mWmE5'), //User first name text in the table
    UserLNameText: () => cy.get(':nth-child(7) > .styles_verifyLabel__mWmE5'), //User last name text in the table
    UserPhoneText: () => cy.get(':nth-child(8) > .styles_verifyLabel__mWmE5'), //User phone text in the table
    UserEmailText: () => cy.get(':nth-child(9) > .styles_verifyLabel__mWmE5'), //User email text in the table
    SecurityStatementText: () => cy.get(':nth-child(10) > .styles_verifyLabel__mWmE5'), //Security statement text in the table
    DateSignedText: () => cy.get(':nth-child(11) > .styles_verifyLabel__mWmE5'), //Date signed text in the table
    ReturnHomeHeader: () => cy.get('[data-testid="request_account_success_modal_h1"]'), //Header of the modal after submitting the request
    ReturnHomeText: () => cy.get('[class="styles_subtitle___RAKh"]'), //Text of the modal after submitting the request
    ReturnHomeBtn: () => cy.get('[data-testid="request_account_success_modal_button"]'), //Button of the modal after submitting the request
  };

  navigateToStep2() {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    this.clickOnStandardUserRoleRadioBtn();
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
  }

  navigateToStep3() {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    this.clickOnStandardUserRoleRadioBtn();
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeFNameInFirstName();
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail();
    this.clickOnContinueBtn();
  }

  navigateToStep4() {
    cy.visit("");
    commonObjects.clickOnRequestAccountLink();
    this.clickOnStateUserRadioBtn();
    this.clickOnStandardUserRoleRadioBtn();
    this.selectTestStateDropdown();
    this.typeTestOnAgencyOrOfficeInput();
    this.clickOnContinueBtn();
    this.typeTitleInUserTitle();
    this.typeFNameInFirstName();
    this.typeLNameInLastName();
    this.typePhoneInUserPhone();
    this.typeEmailInUserEmail();
    this.clickOnContinueBtn();
    this.CheckSecurityAgreementCheckbox();
    this.TypeNameIntoNameInput();
    this.clickOnContinueBtn();
  }  

  clickOnStateUserRadioBtn() {
    this.elements.StateUserRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnCancelBtn() {
    this.elements.cancelBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnStandardUserRoleRadioBtn() {
    this.elements.StandardUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnMngrUserRoleRadioBtn() {
    this.elements.MngrUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnSAOUserRoleRadioBtn() {
    this.elements.SAOUserRoleRadioBtn().invoke("removeAttr", "target", "_blank").click();
  }

  selectTestStateDropdown() {
    this.elements.StateDropdown().invoke("removeAttr", "target", "_blank").select("Test State");
  }

  typeTestOnAgencyOrOfficeInput() {
    this.elements.AgencyOrOfficeInput().invoke("removeAttr", "target", "_blank").type("Test");
  }

  clickOnContinueBtn() {
    this.elements.ContinueBtn().invoke("removeAttr", "target", "_blank").click();
  }

  typeTitleInUserTitle() {
    this.elements.UserTitleInput().invoke("removeAttr", "target", "_blank").type("Title");
  }

  typeFNameInFirstName() {
    this.elements.UserFnameInput().invoke("removeAttr", "target", "_blank").type("FName");
  }

  typeLNameInLastName() {
    this.elements.UserLNameInput().invoke("removeAttr", "target", "_blank").type("LName");
  }

  typePhoneInUserPhone() {
    this.elements.UserPhoneInput().invoke("removeAttr", "target", "_blank").type("999-999-9999");
  }

  typeEmailInUserEmail() {
    this.elements.UserEmailInput().invoke("removeAttr", "target", "_blank").type("test@gov.net");
  }

  CheckSecurityAgreementCheckbox() {
    this.elements.SecurityAgreeementCheckbox().invoke("removeAttr", "target", "_blank").click();
  }

  ClickBackBtn() {
    this.elements.BackBtn().invoke("removeAttr", "target", "_blank").click();
  }

  TypeNameIntoNameInput() {
    this.elements.NameInput().invoke("removeAttr", "target", "_blank").type("FName LName");
  }

  ClickAccuracyCheckbox() {
    this.elements.AccuracyCheckbox().invoke("removeAttr", "target", "_blank").click();
  }

  ClickSubmitBtn() {
    this.elements.SubmitBtn().invoke("removeAttr", "target", "_blank").click();
  }

  ClickReturnHomeBtn() {
    this.elements.ReturnHomeBtn().invoke("removeAttr", "target", "_blank").click();
  }
}
export default StateUserAccountRequestFormObjects;
