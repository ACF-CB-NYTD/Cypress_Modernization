import { timeout } from "async";
import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import SubmissionsPageObjects from "../pages/SubmissionsPageObjects";
const submissionsPage = new SubmissionsPageObjects();
describe("Default state User Submissions Page", function () {
    beforeEach(() => {
        cy.login('cypress.default', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Submissions page buttons, text fields, dropdowns, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionsTab();
        commonPage.verifyBreadCrumbs('Submissions');
        commonPage.elements.headerH3Text().should('have.text', 'Submissions');
        submissionsPage.elements.fileSearchName().should('have.text', 'File Search'); 
        //add submission date text
        submissionsPage.elements.fileSearchInput().should('exist');
        submissionsPage.elements.dateRangeInput().should('exist');
        submissionsPage.elements.penaltyDropdown().should('contain', 'Penalty');
        submissionsPage.elements.reportPeriodDropdown().should('contain', 'Report Period');
        submissionsPage.elements.fileTypeDropdown().should('contain', 'File Type');
        //add status dropdown
        submissionsPage.elements.penaltyDropdown().click();
        submissionsPage.elements.penaltyDropdownCompliance().should('have.text', 'Compliant0.00%');
        submissionsPage.elements.penaltyDropdownNonCompliance().each((option) => {
            expect(option.text()).to.be.oneOf(['Non-Compliant', '0.00%', 'All', '0.50%', '1.00%', '1.25%', '1.50%', '1.75%', '2.50%']);
        });
        submissionsPage.elements.reportPeriodDropdown().click();
        submissionsPage.elements.reportPeriodDropdownOptions().each((option) => {
            expect(option.text()).to.be.oneOf(['2010B', '2011A', '2011B', '2012A', '2012B', '2013A', '2013B', '2014A', '2014B', '2015A', '2015B', '2016A', '2016B', '2017A', '2017B', '2018A', '2018B', '2019A', '2019B', '2020A', '2020B', '2021A', '2021B', '2022A', '2022B', '2023A', '2023B', '2024A', '2024B', '2025A']);
        });
        submissionsPage.elements.fileTypeDropdown().click();
        submissionsPage.elements.fileTypeDropdownOptions().each((option) => {
            expect(option.text()).to.be.oneOf(['Regular', 'Corrected', 'Subsequent', 'Test']);
        });

        //add status dropdown
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('contain', 'Refresh Results');
        submissionsPage.elements.fileNumberHeader().should('have.text', 'File Number');
        submissionsPage.elements.reportPeriodHeader().should('have.text', 'Report Period');
        //submissionsPage.elements.submissionsDateHeader().should('have.text', 'Submission Date');
        submissionsPage.elements.fileTypeHeader().should('have.text', 'File Type');
        //add status column text
        submissionsPage.elements.complianceHeader().should('have.text', 'Compliance');
        submissionsPage.elements.penaltyHeader().should('have.text', 'Potential Penalty');
    });
    it('Verify the penalty dropdown filters can be clicked', function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.penaltyDropdown().click();
        submissionsPage.elements.penaltyDropdownCompliance().eq(1).click();
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(1).click();
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(2).find('[type="checkbox"]').should('be.checked');
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(3).find('[type="checkbox"]').should('be.checked');
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(4).find('[type="checkbox"]').should('be.checked');
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(5).find('[type="checkbox"]').should('be.checked');
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(6).find('[type="checkbox"]').should('be.checked');
        submissionsPage.elements.penaltyDropdownNonCompliance().eq(7).find('[type="checkbox"]').should('be.checked');
    });
    it("Verify the report period dropdown filters can be clicked", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.reportPeriodDropdown().click();
        submissionsPage.elements.reportPeriodDropdownOptions().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the file type dropdown filters can be clicked", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.fileTypeDropdown().click();
        submissionsPage.elements.fileTypeDropdownOptions().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the dropdown filters are working as expected", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.penaltyDropdown().click();
        submissionsPage.elements.penaltyDropdownCompliance().eq(1).click();
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.penaltyTableData().should('have.text', 'Compliant');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.elements.reportPeriodDropdown().click();
        submissionsPage.elements.reportPeriodDropdownOptions().eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.reportPeriodTableData().should('have.text', '2024A');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.elements.fileTypeDropdown().click();
        submissionsPage.elements.fileTypeDropdownOptions().eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.fileTypeTableData().should('have.text', 'Subsequent');
    });
    it('Verify links are working as expected', function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstPenaltyLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
    });
    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Submissions');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        submissionsPage.typeFileNumber('8488');
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });

    it("Verify Default State user is able to export current table", function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/User/Submissions');
        commonPage.clickOnExportCurrentTable();
        commonPage.clickOnExportCurrentTable();
        cy.verifyDownload('nytd_submissions_2024', { contains: true }, { timeout: 70000, interval: 900 });
    });
    it("Verify the arrow dropdown button opens the submissions expanded view", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().should('exist').and('not.have.descendants', '[data-testid="Loading_div"]');
        submissionsPage.elements.transmissionDetails().children().eq(0).children().eq(0).should('have.text', 'Submitted');
        submissionsPage.elements.transmissionDetails().children().eq(1).children().eq(0).should('have.text', 'File Processed');
        submissionsPage.elements.transmissionDetails().children().eq(2).find('tbody').should('contain', 'Served').should('contain', 'Baseline').should('contain', 'Follow-up').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(3).children().eq(0).should('have.text', 'Meets Standards');
        submissionsPage.elements.transmissionDetails().children().eq(3).find('tbody').should('contain', 'File Submission').should('contain', 'Data');
        submissionsPage.elements.transmissionDetails().children().eq(4).children().eq(0).should('have.text', 'Data Quality Advisories');
        submissionsPage.elements.transmissionDetails().children().eq(4).find('tbody').should('contain', 'Element-level').should('contain', 'Record-level').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(0).should('have.text', 'Element Compliance');
        submissionsPage.elements.transmissionDetails().children().eq(4).find('tbody').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(0).should('have.text', 'Element Compliance');
    });
    it.only("Verify the link and modals in the submissions expanded view", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(0).find('a').eq(0).click();
        commonPage.verifyUrl('/User/Submissions/SubmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(1).click();
        commonPage.verifyUrl('/User/Submissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(4).children().eq(1).find('a').click();
        commonPage.verifyUrl('/User/Submissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(1).click({ force: true });
        submissionsPage.elements.readyModalHeader().should('have.text', 'Submission Available for this File');
        submissionsPage.elements.readyModalText().should('have.text', 'This file is ready for submission.');
        submissionsPage.elements.readyModalFooter().should('have.text', 'Close').find('button').click();
    });
    it("Verify the name search filters are working as expected", function () {
        cy.visit('/User/Submissions');
        submissionsPage.typeFileNumber('8488');
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.typeFileNumber('8488');
        commonPage.clickOnMagnifyingGlassSearchIcon();
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.typeFileNumber('8488');
        submissionsPage.typeFileNumber('{enter}');
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
    });
    it("Verify the Error Loading Results message is displayed when inputting letters", function () {
        cy.visit('/User/Submissions');
        submissionsPage.typeFileNumber('abc');
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.getErrorHeader().should('have.text', 'Error Loading Results');
        submissionsPage.elements.errorText().should('have.text', 'We encountered an error while trying to load transmission data. Refresh the page to try again. If the problem persists please contact the support line.');
        submissionsPage.elements.errorRefreshBtn().should('have.text', 'Refresh the page').click();
        submissionsPage.elements.errorHeader().should('not.exist');
    });
    it("Verify the default table sorting is by transmission date", function () {
        cy.visit('/User/Submissions');
        submissionsPage.checkIsDateSorted(4, 'descending');
    });
    it("Verify the table can be sorted by the File Number header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableFirstHeader().click();
        submissionsPage.checkIsArraySorted(2, 'descending');
        submissionsPage.elements.tableFirstHeader().click();
        submissionsPage.checkIsArraySorted(2, 'ascending');
    });
    it("Verify the table can be sorted by the Report Period header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableSecondHeader().click();
        submissionsPage.checkIsArraySorted(3, 'descending');
        submissionsPage.elements.tableSecondHeader().click();
        submissionsPage.checkIsArraySorted(3, 'ascending');
    });
    it("Verify the table can be sorted by the Transmission Date header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'descending');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'ascending');
    });
    it("Verify the table can be sorted by the File Type header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableFourthHeader().click();
        submissionsPage.checkIsArraySorted(5, 'descending');
        submissionsPage.elements.tableFourthHeader().click();
        submissionsPage.checkIsArraySorted(5, 'ascending');
    });
    it("Verify the table can be sorted by the Compliance header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableFifthHeader().click();
        submissionsPage.checkIsArraySorted(6, 'descending');
        submissionsPage.elements.tableFifthHeader().click();
        submissionsPage.checkIsArraySorted(6, 'ascending');
    });
    it("Verify the table can be sorted by the Potential Penalty header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableSixthHeader().click();
        submissionsPage.checkIsArraySorted(7, 'descending');
        submissionsPage.elements.tableSixthHeader().click();
        submissionsPage.checkIsArraySorted(7, 'ascending');
    });

});