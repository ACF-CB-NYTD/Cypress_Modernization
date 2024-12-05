import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import SubmissionsPageObjects from "../pages/SubmissionsPageObjects";
const submissionPage = new SubmissionsPageObjects();
import SubmissionsDQAObjects from "../pages/SubmissionsDQAObjects";
const submissionsDQAObjects = new SubmissionsDQAObjects();
describe("State User Submission Page", function () {
    beforeEach(() => {
        cy.login('cypress.regional', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Submission DQA page buttons, text fields, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyBreadCrumbs('Submissions');
        submissionPage.elements.penaltyDropdown().click();
        commonPage.clickOnRefreshResultBtn();
        submissionPage.elements.lastTableLink().click();
        submissionPage.elements.dqaLink().click();
        submissionsDQAObjects.elements.elementLevel().should('have.text', 'Element-Level');
        submissionsDQAObjects.elements.recordLevel().should('have.text', 'Record-Level');
        submissionsDQAObjects.elements.fileSummary().should('have.text', 'Back to File Summary');
        submissionsDQAObjects.elements.penaltyNav().should('have.text', 'Penalty');
        submissionsDQAObjects.elements.dqaNav().should('have.text', 'Data Quality Advisories');
        submissionsDQAObjects.elements.complianceNav().should('have.text', 'Compliance');
        submissionsDQAObjects.elements.notesNav().should('have.text', 'Notes');
        submissionsDQAObjects.elements.exportBtn().should('have.text', 'Export Current Table');
        submissionsDQAObjects.elements.tableHeaders().children().should('have.length', 6);
        const expectedElementHeaders = ['DQA #', 'Element #', 'Element Name', 'Value', 'Value Rate', 'Advisory Threshold'];
        submissionsDQAObjects.elements.tableHeaders().children().each((header, index) => {
            cy.wrap(header).should('have.text', expectedElementHeaders[index]);
        });
        submissionsDQAObjects.elements.recordLevel().click();
        submissionsDQAObjects.elements.recordSearchLabel().should('have.text', 'Record Search');
        submissionsDQAObjects.elements.recordSearchInput().should('be.visible');
        submissionsDQAObjects.elements.elementNumberLabel().should('have.text', 'Element Number');
        submissionsDQAObjects.elements.elementNumberInput().should('be.visible');
        submissionsDQAObjects.elements.elementNameLabel().should('have.text', 'Element Name');
        submissionsDQAObjects.elements.elementNameInput().should('be.visible');
        submissionsDQAObjects.elements.advisoryNumberLabel().should('have.text', 'Advisory Number');
        submissionsDQAObjects.elements.advisoryNumberInput().should('be.visible');
        submissionsDQAObjects.elements.tableHeaders().children().should('have.length', 5);
        const expectedRecordHeaders = ['Record #', 'Element #', 'Element Name', 'Advisory #', 'Advisory Description'];
        submissionsDQAObjects.elements.tableHeaders().children().each((header, index) => {
            cy.wrap(header).should('have.text', expectedRecordHeaders[index]);
        });
    });

    it("Verify Submissions DQA page youth record report modal fields and button", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyBreadCrumbs('Submissions');
        submissionPage.elements.penaltyDropdown().click();
        commonPage.clickOnRefreshResultBtn();
        submissionPage.elements.lastTableLink().click();
        submissionPage.elements.dqaLink().click();
        submissionsDQAObjects.elements.recordLevel().click();
        submissionsDQAObjects.elements.firstRecordLink().click();
        submissionsDQAObjects.elements.modalH1Header().should('have.text', 'Youth Record Report');
        submissionsDQAObjects.elements.modalFirstHeader().should('have.text', 'General and Demographic Elements');
        submissionsDQAObjects.elements.modalSecondHeader().should('have.text', 'Independent Living Services Elements');
        submissionsDQAObjects.elements.modalThirdHeader().should('have.text', 'Outcomes Elements');
        submissionsDQAObjects.checkModalRows();
        submissionsDQAObjects.elements.modalFooterText().should('contain', 'Indicates a Record-Level Data Quality Advisory');
        submissionsDQAObjects.elements.modalCloseBtn().should('have.text', 'Close');
        submissionsDQAObjects.elements.modalCloseBtn().click();
    });
    it("Verify record search functionality", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        submissionPage.elements.penaltyDropdown().click();
        submissionPage.elements.firstDropdownContent();
        commonPage.clickOnRefreshResultBtn();
        submissionPage.elements.lastTableLink().click();
        submissionPage.elements.dqaLink().click();
        submissionsDQAObjects.elements.recordLevel().click();
        submissionsDQAObjects.elements.firstRecordLink().invoke('text').then((recordNum) => {
            submissionsDQAObjects.typeRecordSearchInput(recordNum);
            commonPage.clickOnRefreshResultBtn();
            submissionsDQAObjects.elements.sixRecordLink().should('have.text', recordNum);
        });
        commonPage.clickOnClearFiltersBtn();
        submissionsDQAObjects.elements.firstElementName().invoke('text').then((elementName) => {
            submissionsDQAObjects.typeElementNameInput(elementName);
            commonPage.clickOnRefreshResultBtn();
            submissionsDQAObjects.elements.firstElementName().should('have.text', elementName);
        });
        commonPage.clickOnClearFiltersBtn();
        submissionsDQAObjects.elements.firstElementNumber().invoke('text').then((elementNum) => {
            submissionsDQAObjects.typeElementNumberInput(elementNum);
            commonPage.clickOnRefreshResultBtn();
            submissionsDQAObjects.elements.firstElementNumber().should('have.text', elementNum);
        });
        commonPage.clickOnClearFiltersBtn();
        submissionsDQAObjects.elements.firstAdvisoryNumber().invoke('text').then((advisoryNum) => {
            const numWithoutDQA = advisoryNum.replace('DQA#', '').trim();
            submissionsDQAObjects.typeAdvisoryNumberInput(advisoryNum);
            commonPage.clickOnRefreshResultBtn();
            submissionsDQAObjects.elements.firstAdvisoryNumber().should('have.text', advisoryNum);
            commonPage.clickOnClearFiltersBtn();
            submissionsDQAObjects.typeAdvisoryNumberInput(numWithoutDQA);
            commonPage.clickOnRefreshResultBtn();
            submissionsDQAObjects.elements.firstAdvisoryNumber().should('have.text', advisoryNum);
        });
    });
});