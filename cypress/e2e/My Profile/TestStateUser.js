import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('teststateuser', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify test state users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate user');
    viewMyProfile.elements.username().should('have.text', 'teststateuser')
    viewMyProfile.elements.emailForTestStateUser().should('have.text', 'teststateuser@test.com')
    viewMyProfile.elements.receivesEmailNotificationForTestState().should('have.text', 'Does not receive emails')
    viewMyProfile.elements.userType().should('have.text', 'Test State')
    viewMyProfile.elements.requestStateManagerAccessBtnForTestStateUser().should('have.text',"Request State Manager Access")
    viewMyProfile.elements.requestStateAuthOfficialAccessBtnForSTestStateUser().should('have.text', "Request State Authorized Official Access")
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.updatePasswordBtn().should('have.text','Update Password')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    it("Verify test state users are able to view my pofile via welcome username ", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'teststate user');
        viewMyProfile.elements.username().should('have.text', 'teststateuser')
        viewMyProfile.elements.emailForTestStateUser().should('have.text', 'teststateuser@test.com')
        viewMyProfile.elements.receivesEmailNotificationForTestState().should('have.text', 'Does not receive emails')
        viewMyProfile.elements.userType().should('have.text', 'Test State')
        viewMyProfile.elements.requestStateManagerAccessBtnForTestStateUser().should('have.text', "Request State Manager Access")
        viewMyProfile.elements.requestStateAuthOfficialAccessBtnForSTestStateUser().should('have.text', "Request State Authorized Official Access")
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.updatePasswordBtn().should('have.text', 'Update Password')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    
});