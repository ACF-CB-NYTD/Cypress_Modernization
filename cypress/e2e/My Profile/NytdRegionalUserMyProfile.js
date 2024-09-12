import CommonPageObjects from "../pages/CommonPageObjects";
const commonObjects = new CommonPageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();
describe("My profile validation", function () {
    beforeEach(() => {
        cy.login('nytdregional', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify CB central users are able to view my profile user information", function () {
    cy.visit('/User');
    commonObjects.clickOnAccountSettingsDropdown();
    commonObjects.clickOnMyProfileSelect();
    viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'Regional User NYTD');
    viewMyProfile.elements.username().should('have.text', 'nytdregional')
    viewMyProfile.elements.emailForRegionalID().should('have.text', 'wynton.jones@icf.com')
    viewMyProfile.elements.receivesEmailNotificationForRegional().should('have.text', 'Receives emails')
    viewMyProfile.elements.region().should('have.text', 'Region 11')
    viewMyProfile.elements.assignedStatesText().should('have.text', 'Assigned States')
    viewMyProfile.elements.assignedStates().should('have.text', 'Test State')
    viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
    viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
    viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });

    it("Verify CB central users are able to view my profile user information vie Welcome username ", function () {
        cy.visit('/User');
        commonObjects.clickOnWelcomeBtn();
        viewMyProfile.elements.myProfileFirstLastName().should('have.text', 'Regional User NYTD');
        viewMyProfile.elements.username().should('have.text', 'nytdregional')
        viewMyProfile.elements.emailForRegionalID().should('have.text', 'wynton.jones@icf.com')
        viewMyProfile.elements.receivesEmailNotificationForRegional().should('have.text', 'Receives emails')
        viewMyProfile.elements.region().should('have.text', 'Region 11')
        viewMyProfile.elements.assignedStatesText().should('have.text', 'Assigned States')
        viewMyProfile.elements.assignedStates().should('have.text', 'Test State')
        viewMyProfile.elements.editMyProfileBtn().should('have.text', 'Edit My Profile')
        viewMyProfile.elements.deleteMyAccountBtn().should('have.text', 'Delete My Account')
        viewMyProfile.elements.returnToTopBtn().should('have.text', 'Return to top').click();
    });
});