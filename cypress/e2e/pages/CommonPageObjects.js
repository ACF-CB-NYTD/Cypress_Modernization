import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
class CommonPageObjects {
  elements = {
    url: () => cy.url(), // This method will take the current url.

    // Login page account request link
    requestAccountLink: () => cy.get('[data-testid="request_account"]'), //Request link under log in
    accountSettingsDropdown: () => cy.get(':nth-child(3) > [data-testid="header_dropdown_button"]'), //Account settings dropdown
    userAccountManagementSelect: () => cy.get(':nth-child(2) > .styles_button__dXuFt'), //User Account Management option in account setting dropdown
    manageUserAccountRequestsBtn: () => cy.get('[data-testid="manage_user_account_requests"]'), //Manage User Account Requests button in UAM
    textAreaSelector: () => cy.get('[data-testid="textarea"]'), // Text area selector for User account request deny selection
    denyRequestBtn: () => cy.get('[data-testid="Deny New_user_button"]'), // Deny request button for user account request
    

    // Cancel Request Modal
    cancelRequestBtn: () => cy.get('[class="nytd-button--tertiary"]').contains("Cancel Request"), //Cancel Request button at the bottom left.
    cancelModalHeader: () => cy.get('[id="areYouSureTitle"]'), //Cancel modal header text
    cancelModalText: () => cy.get('[class="style_flexContainer__3X3nW"]'), //  Cancel modal body text
    cancelModalDiscardBtn: () => cy.get('[data-testid="button"]').contains("Discard Changes"), //Cancel modal discard button
    cancelModalContinueBtn: () => cy.get('[id="no_button"]'), //Cancel modal cancel button
  }

  verifyUrl(url) {
    this.elements.url().should("include", url);
  }

  clickOnRequestAccountLink() {
    this.elements.requestAccountLink().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnAccountSettingsDropdown() {
    this.elements.accountSettingsDropdown().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnUserAccountManagementSelect() {
    this.elements.userAccountManagementSelect().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnManageUserAccountRequestsBtn() {
    this.elements.manageUserAccountRequestsBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnDenyQuickActionBtn() {
    this.elements.denyQuickActionBtn().click({force: true});
  }

  typeAreaSelectorArea(text) {
    this.elements.textAreaSelector().type(text);
  }

  clickDenyRequestBtn() {
    this.elements.denyRequestBtn().invoke("removeAttr", "target", "_blank").click();
  }
  
  modalCancelRequest() {
    this.clickOnCancelRequestBtn();

    // Confirm modal
    this.elements.cancelModalHeader().should("have.text", "Unsaved Changes");
    this.elements.cancelModalText().should("have.text","You have unsaved edits. Are you sure you want to cancel this account request?");

    // Cancel request
    this.clickOnCancelModal();
    this.clickOnCancelRequestBtn();
    this.clickOnCancelModalDiscardBtn();
    homePage.elements.loginInstructionsMsg().contains("Please enter your Username and Password and select Login to begin using the NYTD portal");
  }

  clickOnCancelRequestBtn() {
    this.elements.cancelRequestBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnCancelModal() {
    this.elements.cancelModalContinueBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnCancelModalDiscardBtn() {
    this.elements.cancelModalDiscardBtn().invoke("removeAttr", "target", "_blank").click();
  }

}
export default CommonPageObjects;