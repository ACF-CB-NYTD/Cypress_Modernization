import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import TransmissionPageObjects from "../pages/TransmissionsPageObjects";
const transmissionPage = new TransmissionPageObjects();
describe("SAO Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.sao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
});