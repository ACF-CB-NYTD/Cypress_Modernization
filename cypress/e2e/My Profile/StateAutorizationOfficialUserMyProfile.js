import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('teststatesao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify SAO users are able to view my profile user information", function () {
        cy.visit('/User');
        commonPage.verifyUrl('/User');
        commonPage.clickOnAccountSettingsDropdown();
        commonPage.clickOnMyProfileSelect();
        commonPage.verifyUrl('/User/Profile');
        commonPage.verifyBreadCrumbs('My Profile');
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate sao');
        viewMyProfile.elements.username().should('have.text', 'teststatesao')
        viewMyProfile.elements.emailForTestStateSao().should('have.text', 'teststatesao@test.com')
        viewMyProfile.elements.receivesEmailNotificationForTestStatesao().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.userTypeForSAO().should('have.text', 'State Authorized Official')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text','Update Password')
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
        viewMyProfile.clickOnUpdatePassword();
        commonPage.verifyUrl('/User/Account/UpdatePassword?page=Profile');
        commonPage.verifyBreadCrumbs('My Profile', 'Update Password');
        commonPage.elements.headerH3Text().should('have.text', 'Update Password');
        commonPage.navigateBack();
    });
    it("Verify SAO users are able to view my profile vie Welcome username", function () {
        cy.visit('/User');
        commonPage.verifyUrl('/User');
        commonPage.clickOnWelcomeBtn();
        commonPage.verifyUrl('/User/Profile');
        commonPage.verifyBreadCrumbs('My Profile');
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate sao');
        viewMyProfile.elements.username().should('have.text', 'teststatesao')
        viewMyProfile.elements.emailForTestStateSao().should('have.text', 'teststatesao@test.com')
        viewMyProfile.elements.receivesEmailNotificationForTestStatesao().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.userTypeForSAO().should('have.text', 'State Authorized Official')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text', 'Update Password')
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
        viewMyProfile.clickOnUpdatePassword();
        commonPage.verifyUrl('/User/Account/UpdatePassword?page=Profile');
        commonPage.verifyBreadCrumbs('My Profile', 'Update Password');
        commonPage.elements.headerH3Text().should('have.text', 'Update Password');
        commonPage.navigateBack();

        commonPage.navigateBack();
    });
});