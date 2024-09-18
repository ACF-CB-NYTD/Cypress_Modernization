import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("My profile validation", function () {
    beforeEach(() => {
        cy.login('nytdregional', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify CB central users are able to view my profile user information", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnAccountSettingsDropdown();
    commonPage.clickOnMyProfileSelect();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'Regional User NYTD');
    viewMyProfile.elements.username().should('have.text', 'nytdregional')
    viewMyProfile.elements.emailForRegionalID().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotificationForRegional().should('have.text', 'Receives emails')
    viewMyProfile.elements.region().should('have.text', 'Region 11')
    viewMyProfile.elements.assignedStatesText().should('have.text', 'Assigned States')
    viewMyProfile.elements.assignedStates().should('have.text', 'Test State')
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.clickOnDeleteMyAccount();
    viewMyProfile.elements.deleteYourAccountModalText().should('have.text', 'Delete Your Account?')
    viewMyProfile.clickOnCancelButton();
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    commonPage.verifyPageIsScrollToTheTop();
    viewMyProfile.clickOnEditMyProfileButton();
    commonPage.verifyUrl('/User/Profile/Edit');
    commonPage.verifyBreadCrumbs('My Profile', 'Edit My Profile');
    commonPage.elements.headerH3Text().should('have.text', 'Edit My Profile');
    commonPage.navigateBack();

    });

    it("Verify CB central users are able to view my profile user information vie welcome username ", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnWelcomeBtn();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'Regional User NYTD');
    viewMyProfile.elements.username().should('have.text', 'nytdregional')
    viewMyProfile.elements.emailForRegionalID().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotificationForRegional().should('have.text', 'Receives emails')
    viewMyProfile.elements.region().should('have.text', 'Region 11')
    viewMyProfile.elements.assignedStatesText().should('have.text', 'Assigned States')
    viewMyProfile.elements.assignedStates().should('have.text', 'Test State')
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.clickOnDeleteMyAccount();
    viewMyProfile.elements.deleteYourAccountModalText().should('have.text', 'Delete Your Account?')
    viewMyProfile.clickOnCancelButton();
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    commonPage.verifyPageIsScrollToTheTop();
    viewMyProfile.clickOnEditMyProfileButton();
    commonPage.verifyUrl('/User/Profile/Edit');
    commonPage.verifyBreadCrumbs('My Profile', 'Edit My Profile');
    commonPage.elements.headerH3Text().should('have.text', 'Edit My Profile');
    commonPage.navigateBack();
    });
});