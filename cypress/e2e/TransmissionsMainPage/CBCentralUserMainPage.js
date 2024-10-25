import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
describe("CB Central Office User Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.cb', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Transmission tab does not exist", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.elements.transmissionsBtn().should('not.exist');
    });
});