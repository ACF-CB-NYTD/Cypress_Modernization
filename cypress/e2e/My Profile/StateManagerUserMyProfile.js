import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('teststatemgr', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify state manager users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate mgr');
    viewMyProfile.elements.username().should('have.text', 'teststatemgr')
    viewMyProfile.elements.emailForTestStateMngID().should('have.text', 'wyntonj1@yahoo.com')
    viewMyProfile.elements.receivesEmailNotificationForTestStageMng().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'Test State')
    viewMyProfile.elements.userTypeForTestStateMng().should('have.text', 'Manager')
    viewMyProfile.elements.requestStateAuthOfficialAccessBtn().should('have.text',"Request State Authorized Official Access")
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.updatePasswordBtn().should('have.text','Update Password')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    it("Verify state manager users are able to view my profile via welcome button", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate mgr');
        viewMyProfile.elements.username().should('have.text', 'teststatemgr')
        viewMyProfile.elements.emailForTestStateMngID().should('have.text', 'wyntonj1@yahoo.com')
        viewMyProfile.elements.receivesEmailNotificationForTestStageMng().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.userTypeForTestStateMng().should('have.text', 'Manager')
        viewMyProfile.elements.requestStateAuthOfficialAccessBtn().should('have.text', "Request State Authorized Official Access")
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text', 'Update Password')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
});