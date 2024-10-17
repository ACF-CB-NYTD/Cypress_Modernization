import HomePageObjects from "./HomePageObjects";
const homePage = new HomePageObjects();
class CommonPageObjects {
  elements = {
    url: () => cy.url(), // This method will take the current url.
    searchInput: () => cy.get('[data-testid="textInput"]'), // Search Input for user account to search for accounts
    refreshResultButton: () => cy.get('.nytd-button--secondary').contains('Refresh Results'), // Refresh result button to update the result
    WelcomeBtn: () => cy.get('.styles_navSection__cbCNb > .styles_liBox__gTXAi > [data-testid="default_link"]'), // Welcome button

    logOutBtn: () => cy.get('[data-testid="logout_button"]'), // Logout button
    headerH3Text: () => cy.get('#main_content'), // Header H3 text
    pageDescriptionText: () => cy.get('.styles_description__0k9k1'), // Page description text under the main content header
    clearFiltersBtn: () => cy.get('.styles_actions__BA1vl > .nytd-button--tertiary').contains('Clear Filters'), // Clear filters button
    refreshResultsBtn: () => cy.get('.nytd-button--secondary').contains('Refresh Results'), // Refresh results button
    magnifyingGlassSearchIcon: () => cy.get('[data-testid="submissionstransmissions_search_icon_button"]'), // Magnifying glass search icon in most name search input fields
    // Login page account request link
    requestAccountLink: () => cy.get('[data-testid="request_account"]'), //Request link under log in
    accountSettingsDropdown: () => cy.get(':nth-child(3) > [data-testid="header_dropdown_button"]'), //Account settings dropdown
    userAccountManagementSelect: () => cy.get(':nth-child(2) > .styles_button__dXuFt'), //User Account Management option in account setting dropdown
    manageUserAccountRequestsBtn: () => cy.get('[data-testid="manage_user_account_requests"]'), //Manage User Account Requests button in UAM
    textAreaSelector: () => cy.get('[data-testid="textarea"]'), // Text area selector for User account request deny selection
    denyRequestBtn: () => cy.get('[data-testid="Deny New_user_button"]'), // Deny request button for user account request
    myProfileSelect: () => cy.get(':nth-child(1) > .styles_button__dXuFt'), // My profile option in account setting dropdown

    // Cancel Request Modal
    cancelRequestBtn: () => cy.get('[class="nytd-button--tertiary"]').contains("Cancel Request"), //Cancel Request button at the bottom left.
    cancelModalHeader: () => cy.get('[id="areYouSureTitle"]'), //Cancel modal header text
    cancelModalText: () => cy.get('[class="style_flexContainer__3X3nW"]'), //  Cancel modal body text
    cancelModalDiscardBtn: () => cy.get('[data-testid="button"]').contains("Discard Changes"), //Cancel modal discard button
    cancelModalContinueBtn: () => cy.get('[id="no_button"]'), //Cancel modal cancel button
    // Pagination
    currentPaginationBtn: () => cy.get('[data-testid="pagination-page-number"]').get('[class="usa-button usa-button--unstyled usa-pagination__button usa-current"]'), // Current pagination button
    lastPaginationBtn: () => cy.get('[data-testid="pagination-page-number"]').last(), // Last Pagination button
    firstPaginationBtn: () => cy.get('[data-testid="pagination-page-number"]').first(), // First pagination button
    nextPaginationBtn: () => cy.get('[class="usa-pagination__link-text"]').contains('Next'), // Next pagination button
    previousPaginationBtn: () => cy.get('[class="usa-pagination__link-text"]').contains('Previous'), // Previous pagination button
    tenResultsBtn: () => cy.get('[name="10"]'),
    twentyfiveResultsBtn: () => cy.get('[name="25"]'),
    fiftyResultsBtn: () => cy.get('[name="50"]'),
    profileName: () => cy.get('.styles_frame__z_r5H > :nth-child(1) > p'), // Profile name
    submissionsTab: () => cy.get(':nth-child(3) > [data-testid="default_link"]'), // Submissions tab

  }

  verifyUrl(url) {
    this.elements.url().should("include", url, {timeout: 10000});
  }

  verifyBreadCrumbs(breadcrumb1,breadcrumb2,breadcrumb3){
    if (breadcrumb3) {
        cy.get('.styles_listOL__Xg8mu').should(($div) => {
        expect($div).to.contain('Dashboard')
        expect($div).to.contain(breadcrumb1)
        expect($div).to.contain(breadcrumb2)
        expect($div).to.contain(breadcrumb3)
      })
    }else if (breadcrumb2){
        cy.get('.styles_listOL__Xg8mu').should(($div) => {
        expect($div).to.contain('Dashboard')
        expect($div).to.contain(breadcrumb1)
        expect($div).to.contain(breadcrumb2)
      })
    }
    else{
      cy.get('.styles_listOL__Xg8mu').should(($div) => {
        expect($div).to.contain('Dashboard')
        expect($div).to.contain(breadcrumb1)
      })
    } 
  }

  clickOnLogoutBtn() {
    this.elements.logOutBtn().invoke("removeAttr", "target", "_blank").click();
  }

  verifyPageIsScrollToTheTop() {
    cy.window().its('scrollY').should('equal', 0);
  }

  clickOnWelcomeBtn() {
    this.elements.WelcomeBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnClearFiltersBtn() { 
    this.elements.clearFiltersBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnRefreshResultsBtn() {
    this.elements.refreshResultsBtn().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnMagnifyingGlassSearchIcon() {
    this.elements.magnifyingGlassSearchIcon().invoke("removeAttr", "target", "_blank").click();
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
  clickOnMyProfileSelect() {
    this.elements.myProfileSelect().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnManageUserAccountRequestsBtn() {
    this.elements.manageUserAccountRequestsBtn().invoke("removeAttr", "target", "_blank").click({timeout:10000});
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

  searchForUserAccount(firstOrLastName) {
    this.elements.searchInput().type(firstOrLastName);
  }

  clickOnRefreshResultBtn() {
    this.elements.refreshResultButton().click({force:true});
  }

  clickOnCurrentPaginationBtn() {
    this.elements.currentPaginationBtn().click();
  }

  clickOnLastPaginationBtn() {
    this.elements.lastPaginationBtn().click();
  }

  clickOnFirstPaginationBtn() {
    this.elements.firstPaginationBtn().click();
  }

  clickOnNextPaginationBtn() {
    this.elements.nextPaginationBtn().click();
  }

  clickOnPreviousPaginationBtn() {
    this.elements.previousPaginationBtn().click();
  }

  clickOnTenResultsBtn() {
    this.elements.tenResultsBtn().click();
  }

  clickOnTwentyfiveResultsBtn() {
    this.elements.twentyfiveResultsBtn().click();
  }

  clickOnFiftyResultsBtn() {
    this.elements.fiftyResultsBtn().click();
  }

  navigateBack() {
    cy.go('back')
  }
  clickOnSubmissionTab() {
    this.elements.submissionsTab().click();
  }


}
export default CommonPageObjects;