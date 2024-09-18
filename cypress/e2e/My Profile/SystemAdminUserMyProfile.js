import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('nytdsysadmin', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify System admin users are able to view my profile user information", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnAccountSettingsDropdown();
    commonPage.clickOnMyProfileSelect();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text','nytd sysadmin')
    viewMyProfile.elements.username().should('have.text', 'nytdsysadmin')
    viewMyProfile.elements.phoneNumber().should('have.text', 'ZAP')
    viewMyProfile.elements.email().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'System Administrator')
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

    it("Verify System admin users are able to view my profile via welcome username", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnWelcomeBtn();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'nytd sysadmin')
    viewMyProfile.elements.username().should('have.text', 'nytdsysadmin')
    viewMyProfile.elements.phoneNumber().should('have.text', 'ZAP')
    viewMyProfile.elements.email().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'System Administrator')
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