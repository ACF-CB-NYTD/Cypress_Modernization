import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import EditMyProfilePageObjects from "../pages/EditMyProfilePageObjects";
const editMyProfile = new EditMyProfilePageObjects();
import ViewMyProfile from "../pages/MyProfilePageObjects";
const viewMyProfile = new ViewMyProfile();

describe("State Authorized Official Account Request Validations", function () {
    beforeEach(() => {
        cy.login('cypress.sysadmin', 'P@ssw0rd1') // Login with session, implemented in commands.js
    })
    it("Verify System admin users are able to navigate to submissions page", function () {
        cy.visit('/User');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyUrl('/User/Submissions');
        commonPage.verifyBreadCrumbs('Submissions');
    });
    it("Verify Submissions page buttons, text fields, checkboxes and dropdowns for System admin user", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        cy.visit('/User');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyUrl('/User/Submissions');
        commonPage.verifyBreadCrumbs('Submissions');
    });
});