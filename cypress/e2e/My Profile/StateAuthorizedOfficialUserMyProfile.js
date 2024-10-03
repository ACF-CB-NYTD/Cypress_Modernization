import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
import EditMyProfilePageObjects from "../pages/EditMyProfilePageObjects";
const editMyProfile = new EditMyProfilePageObjects();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('cypress.sao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify SAO users are able to view my profile user information", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnAccountSettingsDropdown();
    commonPage.clickOnMyProfileSelect();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'cypress sao');
    viewMyProfile.elements.username().should('have.text', 'cypress.sao')
    viewMyProfile.elements.emailForTestStateSao().should('have.text', 'mincho.rusev+cypresssao@icf.com')
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
    commonPage.verifyUrl('/User/Profile/UpdatePassword?page=Profile');
    commonPage.verifyBreadCrumbs('My Profile', 'Update Password');
    commonPage.elements.headerH3Text().should('have.text', 'Update Password');
    commonPage.navigateBack();
    });
    it("Verify SAO users are able to view my profile from welcome username", function () {
    cy.visit('/User');
    commonPage.verifyUrl('/User');
    commonPage.clickOnWelcomeBtn();
    commonPage.verifyUrl('/User/Profile');
    commonPage.verifyBreadCrumbs('My Profile');
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'cypress sao');
    viewMyProfile.elements.username().should('have.text', 'cypress.sao')
    viewMyProfile.elements.emailForTestStateSao().should('have.text', 'mincho.rusev+cypresssao@icf.com')
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
    commonPage.verifyUrl('/User/Profile/UpdatePassword?page=Profile');
    commonPage.verifyBreadCrumbs('My Profile', 'Update Password');
    commonPage.elements.headerH3Text().should('have.text', 'Update Password');
    commonPage.navigateBack();
    });

    it("Verify state authorized user is able to edit firstname,lastname and phone number for my profile", function () {
        cy.visit('/User');
        commonPage.verifyUrl('/User');
        commonPage.clickOnWelcomeBtn();
        commonPage.verifyUrl('/User/Profile');
        commonPage.verifyBreadCrumbs('My Profile');
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'cypress sao')
        viewMyProfile.elements.username().should('have.text', 'cypress.sao')
        viewMyProfile.elements.phoneNumber().should('have.text', '(508) 246-0311')
        viewMyProfile.elements.email().should('have.text', 'mincho.rusev+cypresssao@icf.com')
        viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text', 'Update Password')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.clickOnEditMyProfileButton();
        commonPage.verifyUrl('/User/Profile/Edit');
        commonPage.verifyBreadCrumbs('My Profile', 'Edit My Profile');
        commonPage.elements.headerH3Text().should('have.text', 'Edit My Profile');
        editMyProfile.elements.firstnameText().should('have.text', 'First Name *');
        editMyProfile.elements.firstnameTextBox().should('have.value', 'cypress')
        editMyProfile.elements.lastnameText().should('have.text', 'Last Name *');
        editMyProfile.elements.lastnameTextBox().should('have.value', 'sao')
        editMyProfile.elements.phoneText().should('have.text', 'Phone *');
        editMyProfile.elements.phoneTextBox().should('have.value', '(508) 246-0311');
        editMyProfile.elements.userEmailText().should('have.text', 'User Email *');
        editMyProfile.elements.userEmailTextBox().should('have.value', 'mincho.rusev+cypresssao@icf.com');
        editMyProfile.elements.receivesEmailNotificationsText().should('have.text', 'Receive Email Notifications? *');
        editMyProfile.elements.primaryRoleTextForStateMng().should('have.text', 'Primary Role');
        editMyProfile.elements.stateUserForTestStateStateMngText().should('contain', 'State User for Test State');
        editMyProfile.elements.secondaryRoleTextForStateMng().should('have.text', 'Secondary Role');
        editMyProfile.elements.standardUserRadioButton().should('have.text', 'Standard User');
        editMyProfile.elements.stateManagerRadioButton().should('have.text', 'State Manager');
        editMyProfile.elements.stateAuthorizationOfficialRadioButton().should('have.text', 'State Authorized Official');
        editMyProfile.elements.previewEditsButton().should('have.text', 'Preview Edits');
        editMyProfile.elements.accountSecurityText().should('have.text', 'Account Security');
        editMyProfile.elements.deleteMyAccountButton().should('have.text', 'Delete My Account');
        editMyProfile.elements.currentUserInfoFirstName().should('have.text', 'cypress');
        editMyProfile.elements.currentUserInfoLastName().should('have.text', 'sao');
        editMyProfile.elements.currentUserInfoUsername().should('have.text', 'cypress.sao');
        editMyProfile.elements.currentUserInfoUserEmail().should('have.text', 'mincho.rusev+cypresssao@icf.com');
        editMyProfile.elements.currentUserInfoReceivesEmail().should('have.text', 'Yes');
        editMyProfile.elements.currentUserInfoPhone().should('have.text', '(508) 246-0311');
        editMyProfile.elements.currentUserInfoState().should('have.text', 'Test State');
        editMyProfile.elements.currentUserInfoStateAuthorizationOfficial().should('have.text', 'Yes');
        editMyProfile.elements.currentUserInfoAccountLockedStateMng().should('have.text', 'No');
        editMyProfile.elements.currentUserInfoAccountLockedStateMng().should('have.text', 'No');
        editMyProfile.elements.currentUserInfo().should('have.text', 'This information will not be updated until "Preview Edits" and then "Save Edits" have been clicked');
        editMyProfile.elements.usernameTextBox().should('be.disabled');
        editMyProfile.elements.userEmailTextBox().should('be.disabled');
        editMyProfile.elements.previewEditsButton().should('be.disabled');
        editMyProfile.enterFirstName();
        editMyProfile.enterLastName();
        editMyProfile.enterPhoneNumber();
        editMyProfile.clickOnPreviewEdits();
        editMyProfile.elements.editUserInfoModalText().should('have.text', 'Edit User Information');
        editMyProfile.elements.oldInformationText().should('have.text', 'Old Information');
        editMyProfile.elements.oldInformationFName().should('have.text', 'cypress')
        editMyProfile.elements.oldInformationLName().should('have.text', 'sao')
        editMyProfile.elements.oldInformationNumber().should('have.text', '(508) 246-0311')
        editMyProfile.elements.revisedInformationText().should('have.text', 'Revised Information');
        editMyProfile.elements.revisedInformationFName().should('have.text', editMyProfile.firstName)
        editMyProfile.elements.revisedInformationLName().should('have.text', editMyProfile.lastName)
        editMyProfile.elements.revisedInformationNumber().should('have.text', editMyProfile.phone)
        editMyProfile.clickOnSaveEdits();
        editMyProfile.elements.editsSuccessfulText().should('have.text', 'Edits Successful');
        editMyProfile.elements.SuccessMsg().contains('You have successfully updated the NYTD account information for');
        editMyProfile.clickOnContinueBtn();
        commonPage.verifyUrl('/User/Profile');
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', editMyProfile.firstName + " " + editMyProfile.lastName)
        viewMyProfile.elements.phoneNumber().should('have.text', editMyProfile.phone)
        viewMyProfile.clickOnEditMyProfileButton();
        commonPage.verifyUrl('/User/Profile/Edit');
        commonPage.verifyBreadCrumbs('My Profile', 'Edit My Profile');
        commonPage.elements.headerH3Text().should('have.text', 'Edit My Profile');
        editMyProfile.elements.firstnameText().should('have.text', 'First Name *');
        editMyProfile.elements.firstnameTextBox().should('have.value', editMyProfile.firstName)
        editMyProfile.elements.lastnameText().should('have.text', 'Last Name *');
        editMyProfile.elements.lastnameTextBox().should('have.value', editMyProfile.lastName)
        editMyProfile.elements.phoneText().should('have.text', 'Phone *');
        editMyProfile.elements.phoneTextBox().should('have.value', editMyProfile.phone);
        editMyProfile.elements.userEmailText().should('have.text', 'User Email *');
        editMyProfile.elements.userEmailTextBox().should('have.value', 'mincho.rusev+cypresssao@icf.com');
        editMyProfile.elements.receivesEmailNotificationsText().should('have.text', 'Receive Email Notifications? *');
        editMyProfile.elements.primaryRoleTextForStateMng().should('have.text', 'Primary Role');
        editMyProfile.elements.stateUserForTestStateStateMngText().should('contain', 'State User for Test State');
        editMyProfile.elements.secondaryRoleTextForStateMng().should('have.text', 'Secondary Role');
        editMyProfile.elements.standardUserRadioButton().should('have.text', 'Standard User');
        editMyProfile.elements.stateManagerRadioButton().should('have.text', 'State Manager');
        editMyProfile.elements.stateAuthorizationOfficialRadioButton().should('have.text', 'State Authorized Official');
        editMyProfile.elements.previewEditsButton().should('have.text', 'Preview Edits');
        editMyProfile.elements.accountSecurityText().should('have.text', 'Account Security');
        editMyProfile.elements.deleteMyAccountButton().should('have.text', 'Delete My Account');
        editMyProfile.elements.currentUserInfoFirstName().should('have.text', editMyProfile.firstName);
        editMyProfile.elements.currentUserInfoLastName().should('have.text', editMyProfile.lastName);
        editMyProfile.elements.currentUserInfoUsername().should('have.text', 'cypress.sao');
        editMyProfile.elements.currentUserInfoUserEmail().should('have.text', 'mincho.rusev+cypresssao@icf.com');
        editMyProfile.elements.currentUserInfoReceivesEmail().should('have.text', 'Yes');
        editMyProfile.elements.currentUserInfoPhone().should('have.text', editMyProfile.phone);
        editMyProfile.elements.currentUserInfoState().should('have.text', 'Test State');
        editMyProfile.elements.currentUserInfoStateAuthorizationOfficial().should('have.text', 'Yes');
        editMyProfile.elements.currentUserInfoAccountLockedStateMng().should('have.text', 'No');
        editMyProfile.elements.currentUserInfo().should('have.text', 'This information will not be updated until "Preview Edits" and then "Save Edits" have been clicked');
        editMyProfile.elements.usernameTextBox().should('be.disabled');
        editMyProfile.elements.userEmailTextBox().should('be.disabled');
        editMyProfile.elements.previewEditsButton().should('be.disabled');
        editMyProfile.enterDefaultUsernamePasswordAndPhone('cypress', 'sao', '5082460311');
        editMyProfile.clickOnPreviewEdits();
        editMyProfile.elements.editUserInfoModalText().should('have.text', 'Edit User Information');
        editMyProfile.elements.oldInformationText().should('have.text', 'Old Information');
        editMyProfile.elements.oldInformationFName().should('have.text', editMyProfile.firstName)
        editMyProfile.elements.oldInformationLName().should('have.text', editMyProfile.lastName)
        editMyProfile.elements.oldInformationNumber().should('have.text', editMyProfile.phone)
        editMyProfile.elements.revisedInformationText().should('have.text', 'Revised Information');
        editMyProfile.elements.revisedInformationFName().should('have.text', 'cypress')
        editMyProfile.elements.revisedInformationLName().should('have.text', "sao")
        editMyProfile.elements.revisedInformationNumber().should('have.text', '(508) 246-0311')
        editMyProfile.clickOnSaveEdits();
        editMyProfile.elements.editsSuccessfulText().should('have.text', 'Edits Successful');
        editMyProfile.elements.SuccessMsg().contains('You have successfully updated the NYTD account information for');
        editMyProfile.clickOnContinueBtn();
        commonPage.verifyUrl('/User/Profile');
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', "cypress sao")
        viewMyProfile.elements.phoneNumber().should('have.text', '(508) 246-0311')
    });
});