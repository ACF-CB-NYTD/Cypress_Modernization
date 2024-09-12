import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('nytdcb', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify CB central users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'CB User NYTD');
    viewMyProfile.elements.username().should('have.text', 'nytdcb')
    viewMyProfile.elements.phoneNumber().should('have.text', '(508) 246-0315')
    viewMyProfile.elements.email().should('have.text', 'mincho.rusev@icf.com')
    viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
    viewMyProfile.elements.userType().should('have.text', 'Central Office User')
    viewMyProfile.elements.dataExportText().should('have.text'," Data Export")
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    it("Verify CB central users are able to view my profile via Welcome username", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'CB User NYTD');
        viewMyProfile.elements.username().should('have.text', 'nytdcb')
        viewMyProfile.elements.phoneNumber().should('have.text', '(508) 246-0315')
        viewMyProfile.elements.email().should('have.text', 'mincho.rusev@icf.com')
        viewMyProfile.elements.receivesEmailNotification().should('have.text', 'Receives emails')
        viewMyProfile.elements.userType().should('have.text', 'Central Office User')
        viewMyProfile.elements.dataExportText().should('have.text', " Data Export")
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
});