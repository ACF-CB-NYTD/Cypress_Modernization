import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('teststatesao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify state authorization official  users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate sao');
    viewMyProfile.elements.username().should('have.text', 'teststatesao')
    viewMyProfile.elements.emailForTestStateSao().should('have.text', 'teststatesao@test.com')
    viewMyProfile.elements.receivesEmailNotificationForTestStatesao().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'Test State')
    viewMyProfile.elements.userTypeForSAO().should('have.text', 'State Authorized Official')
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.updatePasswordBtn().should('have.text','Update Password')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
    it("Verify state authorization official  users are able to view my profile vie Welcome username", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate sao');
        viewMyProfile.elements.username().should('have.text', 'teststatesao')
        viewMyProfile.elements.emailForTestStateSao().should('have.text', 'teststatesao@test.com')
        viewMyProfile.elements.receivesEmailNotificationForTestStatesao().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.userTypeForSAO().should('have.text', 'State Authorized Official')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text', 'Update Password')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
});