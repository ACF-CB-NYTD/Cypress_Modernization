import HomePageObjects from "../pages/HomePageObjects";
const homePage = new HomePageObjects();
class CommonPageObjects {
  elements = {
    url: () => cy.url(), // This method will take the current url.

    // Login page account request link
    requestAccountLink: () => cy.get('[data-testid="request_account"]'), //Request link under log in


    // Cancel Request Modal
    cancelRequestBtn: () => cy.get('[class="nytd-button--tertiary"]').contains("Cancel Request"), //Cancel Request button at the bottom left.
    CancelModalHeader: () => cy.get('[id="areYouSureTitle"]'), //Cancel modal header text
    CancelModalText: () => cy.get('[class="style_flexContainer__3X3nW"]'), //  Cancel modal body text
    CancelModalDiscardBtn: () => cy.get('[data-testid="button"]').contains("Discard Changes"), //Cancel modal discard button
    CancelModalContinueBtn: () => cy.get('[id="no_button"]'), //Cancel modal cancel button
    
  }

  verifyUrl(url) {
    this.elements.url().should("include", url);
  }

  clickOnRequestAccountLink() {
    this.elements.requestAccountLink().invoke("removeAttr", "target", "_blank").click();
  }
  
  ModalCancelRequest() {
    this.clickOnCancelRequestBtn();

    // Confirm modal
    this.elements.CancelModalHeader().should("have.text", "Unsaved Changes");
    this.elements.CancelModalText().should("have.text","You have unsaved edits. Are you sure you want to cancel this account request?");

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
    this.elements.CancelModalContinueBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnCancelModalDiscardBtn() {
    this.elements.CancelModalDiscardBtn().invoke("removeAttr", "target", "_blank").click();
  }

}
export default CommonPageObjects;