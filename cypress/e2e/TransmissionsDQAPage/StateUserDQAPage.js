import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import TransmissionPageObjects from "../pages/TransmissionsPageObjects";
const transmissionPage = new TransmissionPageObjects();
import transmissionsSummaryObjects from "../pages/TransmissionsSummaryObjects";
const transmissionSummaryObjects = new transmissionsSummaryObjects();
import TransmissionsDQAObjects from "../pages/TransmissionsDQAObjects";
const transmissionsDQAObjects = new TransmissionsDQAObjects();
describe("State User Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.default', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Transmission DQA page buttons, text fields, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab();
        commonPage.verifyBreadCrumbs('Transmissions');
        transmissionPage.elements.penaltyDropdown().click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.elements.firstTableLink().click();
        transmissionSummaryObjects.elements.dqaLink().click();
        transmissionsDQAObjects.elements.elementLevel().should('have.text', 'Element-Level');
        transmissionsDQAObjects.elements.recordLevel().should('have.text', 'Record-Level');
        transmissionsDQAObjects.elements.fileSummary().should('have.text', 'Back to File Summary');
        transmissionsDQAObjects.elements.penaltyNav().should('have.text', 'Penalty');
        transmissionsDQAObjects.elements.dqaNav().should('have.text', 'Data Quality Advisories');
        transmissionsDQAObjects.elements.complianceNav().should('have.text', 'Compliance');
        transmissionsDQAObjects.elements.notesNav().should('have.text', 'Notes');
        transmissionsDQAObjects.elements.exportBtn().should('have.text', 'Export Current Table');
        transmissionsDQAObjects.elements.tableHeaders().children().should('have.length', 6);
        const expectedElementHeaders = ['DQA #', 'Element #', 'Element Name', 'Value', 'Value Rate', 'Advisory Threshold'];
        transmissionsDQAObjects.elements.tableHeaders().children().each((header, index) => {
            cy.wrap(header).should('have.text', expectedElementHeaders[index]);
        });
        transmissionsDQAObjects.elements.recordLevel().click();
        transmissionsDQAObjects.elements.recordSearchLabel().should('have.text', 'Record Search');
        transmissionsDQAObjects.elements.recordSearchInput().should('be.visible');
        transmissionsDQAObjects.elements.elementNumberLabel().should('have.text', 'Element Number');
        transmissionsDQAObjects.elements.elementNumberInput().should('be.visible');
        transmissionsDQAObjects.elements.elementNameLabel().should('have.text', 'Element Name');
        transmissionsDQAObjects.elements.elementNameInput().should('be.visible');
        transmissionsDQAObjects.elements.advisoryNumberLabel().should('have.text', 'Advisory Number');
        transmissionsDQAObjects.elements.advisoryNumberInput().should('be.visible');
        transmissionsDQAObjects.elements.tableHeaders().children().should('have.length', 5);
        const expectedRecordHeaders = ['Record #', 'Element #', 'Element Name', 'Advisory #', 'Advisory Description'];
        transmissionsDQAObjects.elements.tableHeaders().children().each((header, index) => {
            cy.wrap(header).should('have.text', expectedRecordHeaders[index]);
        });
    });
    it("Verify Transmissions DQA page export button", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab();
        commonPage.verifyBreadCrumbs('Transmissions');
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(0).click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.elements.firstTableLink().click();
        transmissionSummaryObjects.elements.dqaLink().click();
        transmissionsDQAObjects.elements.exportBtn().click();
        transmissionsDQAObjects.elements.fileNumber().invoke('text').then((fileNum) => {
            const fileNumWithoutFile = fileNum.replace('File #', '').trim();
            cy.verifyDownload('nytd_transmission_' + fileNumWithoutFile + '_dqa_element_level_warnings_202', { contains: true }, { timeout: 70000, interval: 900 });
        });
    });
    it("Verify Transmissions DQA page youth record report modal fields and button", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(0).click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.elements.firstTableLink().click();
        transmissionSummaryObjects.elements.dqaLink().click();
        transmissionsDQAObjects.elements.recordLevel().click();
        transmissionsDQAObjects.elements.firstRecordLink().click();
        transmissionsDQAObjects.elements.modalH1Header().should('have.text', 'Youth Record Report');
        transmissionsDQAObjects.elements.modalFirstHeader().should('have.text', 'General and Demographic Elements');
        transmissionsDQAObjects.elements.modalSecondHeader().should('have.text', 'Independent Living Services Elements');
        transmissionsDQAObjects.elements.modalThirdHeader().should('have.text', 'Outcomes Elements');
        transmissionsDQAObjects.checkModalRows();
        transmissionsDQAObjects.elements.modalFooterText().should('contain', 'Indicates a Record-Level Data Quality Advisory');
        transmissionsDQAObjects.elements.modalCloseBtn().should('have.text', 'Close');
        transmissionsDQAObjects.elements.modalCloseBtn().click();
    });
    it("Verify record search functionality", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(0).click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.elements.firstTableLink().click();
        transmissionSummaryObjects.elements.dqaLink().click();
        transmissionsDQAObjects.elements.recordLevel().click();
        transmissionsDQAObjects.elements.firstRecordLink().invoke('text').then((recordNum) => {
            transmissionsDQAObjects.typeRecordSearchInput(recordNum);
            commonPage.clickOnRefreshResultBtn();
            transmissionsDQAObjects.elements.firstRecordLink().should('have.text', recordNum);
        });
        commonPage.clickOnClearFiltersBtn();
        transmissionsDQAObjects.elements.firstElementName().invoke('text').then((elementName) => {
            transmissionsDQAObjects.typeElementNameInput(elementName);
            commonPage.clickOnRefreshResultBtn();
            transmissionsDQAObjects.elements.firstElementName().should('have.text', elementName);
        });
        commonPage.clickOnClearFiltersBtn();
        transmissionsDQAObjects.elements.firstElementNumber().invoke('text').then((elementNum) => {
            transmissionsDQAObjects.typeElementNumberInput(elementNum);
            commonPage.clickOnRefreshResultBtn();
            transmissionsDQAObjects.elements.firstElementNumber().should('have.text', elementNum);
        });
        commonPage.clickOnClearFiltersBtn();
        transmissionsDQAObjects.elements.firstAdvisoryNumber().invoke('text').then((advisoryNum) => {
            const numWithoutDQA = advisoryNum.replace('DQA#', '').trim();
            transmissionsDQAObjects.typeAdvisoryNumberInput(advisoryNum);
            commonPage.clickOnRefreshResultBtn();
            transmissionsDQAObjects.elements.firstAdvisoryNumber().should('have.text', advisoryNum);
            commonPage.clickOnClearFiltersBtn();
            transmissionsDQAObjects.typeAdvisoryNumberInput(numWithoutDQA);
            commonPage.clickOnRefreshResultBtn();
            transmissionsDQAObjects.elements.firstAdvisoryNumber().should('have.text', advisoryNum);
        });
    });
});