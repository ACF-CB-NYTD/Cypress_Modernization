import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('nytdsysadmin', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify System admin users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text','nytd sysadmin')
    viewMyProfile.elements.username().should('have.text', 'nytdsysadmin')
    viewMyProfile.elements.phoneNumber().should('have.text', 'ZAP')
    viewMyProfile.elements.email().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'System Administrator')
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    it("Verify System admin users are able to view my profile via welcome username", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'nytd sysadmin')
        viewMyProfile.elements.username().should('have.text', 'nytdsysadmin')
        viewMyProfile.elements.phoneNumber().should('have.text', 'ZAP')
        viewMyProfile.elements.email().should('have.text', 'wynton.jones@icf.com')
        viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'System Administrator')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
});