import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import TransmissionPageObjects from "../pages/TransmissionsPageObjects";
const transmissionPage = new TransmissionPageObjects();
describe("Regional User Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.regional', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Transmission tab does not exist", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab().should('not.exist');
    });
});