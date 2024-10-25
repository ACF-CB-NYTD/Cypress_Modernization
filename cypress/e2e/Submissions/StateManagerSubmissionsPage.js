import { timeout } from "async";
import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import SubmissionsPageObjects from "../pages/SubmissionsPageObjects";
const submissionsPage = new SubmissionsPageObjects();
describe("State Manager User Submissions Page", function () {
    beforeEach(() => {
        cy.login('cypress.mgr', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Submissions page buttons, text fields, dropdowns, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyBreadCrumbs('Submissions');
        commonPage.elements.headerH3Text().should('have.text', 'Submissions');
        commonPage.elements.exportBtn().should('have.text', 'Export Current Table');
        submissionsPage.elements.fileSearchName().should('have.text', 'File Search'); // Name Search label
        submissionsPage.elements.fileSearchInput().should('exist');
        submissionsPage.elements.dateRangeName().should('have.text', 'Transmission Date'); // File Received Date Range label
        submissionsPage.elements.dateRangeInput().should('exist');
        submissionsPage.elements.penaltyDropdown().should('contain', 'Penalty');
        submissionsPage.elements.reportPeriodDropdown().should('contain', 'Report Period');
        submissionsPage.elements.fileTypeDropdown().should('contain', 'File Type');
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
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('contain', 'Refresh Results');
        submissionsPage.elements.fileNumberHeader().should('have.text', 'File Number');
        submissionsPage.elements.reportPeriodHeader().should('have.text', 'Report Period');
        submissionsPage.elements.submissionsDateHeader().should('have.text', 'Transmission Date');
        submissionsPage.elements.fileTypeHeader().should('have.text', 'File Type');
        submissionsPage.elements.complianceHeader().should('have.text', 'Compliance');
        submissionsPage.elements.penaltyHeader().should('have.text', 'Potential Penalty');
    });
    it('Verify the penalty dropdown filters can be clicked', function () {
        cy.visit('/User/Transmissions');
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
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.reportPeriodDropdown().click();
        submissionsPage.elements.reportPeriodDropdownOptions().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the file type dropdown filters can be clicked", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.fileTypeDropdown().click();
        submissionsPage.elements.fileTypeDropdownOptions().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the dropdown filters are working as expected", function () {
        cy.visit('/User/Transmissions');
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
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTableLink().click();
        commonPage.verifyUrl('/User/Transmissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstPenaltyLink().click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
    });
    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Transmissions');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        submissionsPage.typeFileNumber('8488');
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });
    it("Verify Manager State user is able to upload file", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.uploadTransmissionBtn().should('exist').click();
        submissionsPage.elements.uploadModalHeader().should('have.text', 'NYTD File Upload').should('be.visible');
        cy.get('[data-testid="alert"]').should('have.text', 'Asterisks (*) in field names are used to denote required fields.');
        cy.get('[class="usa-modal"]').find('[data-testid="label"]').eq(0).should('have.text', 'Choose an xml file to upload. *');
        cy.get('[class="usa-modal"]').find('[data-testid="label"]').eq(1).should('have.text', 'Report Period *');
        cy.get('[class="usa-modal"]').find('[data-testid="label"]').eq(2).should('have.text', 'File Type *');
        cy.get('button.styles_uploadButton__vdJ7F').should('have.text', 'Upload');
        cy.get('[id="chooseFile"]').should('have.text', 'Choose File');
        const file = 'VVG1CX4.CFI.ST.A2024.S241018.T1541.xml';
        cy.get('input[type=file]').selectFile(`cypress/fixtures/${file}`, { force: true });
        cy.get('[id="reportPeriod"]').select('2024A');
        cy.get('[id="reportPeriod"]').should('have.value', '2024A');
        cy.get('[id="fileType"]').select('Subsequent');
        cy.get('[id="fileType"]').should('have.value', 'Subsequent');

    });
    it("Verify Manager State user can use the Submit Quick Action", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTableLink().should('exist');

        submissionsPage.elements.quickActionSubmit().eq(0).should('have.text', 'Submit').click();
        submissionsPage.elements.submissionModal().find('[id="fileReviewID"]').should('have.text', 'Submit File Review');
        submissionsPage.elements.submissionModal().find('[class="usa-prose"]').eq(0).should('have.text', 'You have chosen the following transmission for submission');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(0).children().eq(0).should('have.text', 'File Number:');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(1).children().eq(0).should('have.text', 'File Name:');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(2).children().eq(0).should('have.text', 'Report Period:');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(3).children().eq(0).should('have.text', 'File Type:');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(4).children().eq(0).should('have.text', 'Compliance Status:');
        submissionsPage.elements.submissionModal().find('tbody').children().eq(5).children().eq(0).should('have.text', 'Potential Penalty:');
        submissionsPage.elements.submissionModal().find('[class="usa-prose"]').eq(1).should('have.text', 'This file will become the "active" submission of record for this report period for monitoring and data analysis purposes. In addition, regular and corrected file submissions will be reviewed for compliance with NYTD standards by ACF.');
        submissionsPage.elements.submissionModal().find('[data-testid="button"]').should('have.text', 'Confirm Submit');
        submissionsPage.elements.submissionModal().find('[id="submission_confirmationCancelButton"]').should('have.text', 'Cancel').click();

        submissionsPage.elements.firstTableLink().invoke('text').then((fileNum) => {
            // submissionsPage.elements.quickActionSubmit().eq(0).should('have.text', 'Submit').click();
            // submissionsPage.elements.submissionModal().find('[data-testid="button"]').should('have.text', 'Confirm Submit').click();
            // cy.get('h2 > ?[data-testid="success_modal_h1"]').should('have.text', 'Success!');
            // cy.get('[id="modal_subtitle_description"]').should('have.text', `File ${fileNum.trim()} was successfully submitted.`);
            // cy.get('[id="success_modal_button"]').should('have.text', 'Return to Transmissions Page').click();
        });

    });
    it("Verify Manager State user can use the Delete Quick Action", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTableLink().should('exist');
        submissionsPage.elements.quickActionDelete().eq(0).should('have.text', 'Delete').click({ force: true });
        submissionsPage.elements.deleteModal().find('[id="fileReviewID"]').should('have.text', 'Delete File Review');
        submissionsPage.elements.deleteModal().find('[class="usa-prose"]').eq(0).should('have.text', 'You have chosen the following transmission for deletion');
        submissionsPage.elements.deleteModal().find('tbody').children().should('contain', 'File Number:').should('contain', 'File Name:').should('contain', 'Report Period:').should('contain', 'File Type:').should('contain', 'Compliance Status:').should('contain', 'Potential Penalty:');
        submissionsPage.elements.deleteModal().find('[class="usa-prose"]').eq(1).should('have.text', 'This file will be deleted from the NYTD database and will no longer be available.');
        submissionsPage.elements.deleteModal().find('[data-testid="button"]').should('have.text', 'Confirm Delete');
        submissionsPage.elements.deleteModal().find('[id="deletion_confirmationCancelButton"]').should('have.text', 'Cancel').click();
        submissionsPage.elements.quickActionDelete().eq(0).should('have.text', 'Delete').click({ force: true });
        submissionsPage.elements.deleteModal().find('[data-testid="button"]').should('have.text', 'Confirm Delete').click();
        cy.get('[data-testid="success_modal_h1"]').should('have.text', 'Success!');
        cy.get('[id="modal_subtitle_description"]').should('have.text', 'File 8563 was successfully submitted.');
        cy.get('[id="success_modal_button"]').should('have.text', 'Return to Transmissions Page').click();
        // TODO do Delete
    });
    it("Verify Manager State user is able to export current table", function () {
        cy.visit('/User/Transmissions');
        commonPage.elements.exportBtn().should('have.text', 'Export Current Table').click();

    });
    it("Verify the arrow dropdown button opens the transmissions expanded view", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().should('exist').and('not.have.descendants', '[data-testid="Loading_div"]');
        submissionsPage.elements.transmissionDetails().children().eq(0).children().eq(0).should('have.text', 'Uploaded');
        submissionsPage.elements.transmissionDetails().children().eq(1).children().eq(0).should('have.text', 'Records In File');
        submissionsPage.elements.transmissionDetails().children().eq(1).find('tbody').should('contain', 'Served').should('contain', 'Baseline').should('contain', 'Follow-up').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(2).children().eq(0).should('have.text', 'Meets Standards');
        submissionsPage.elements.transmissionDetails().children().eq(2).find('tbody').should('contain', 'File Submission').should('contain', 'Data');
        submissionsPage.elements.transmissionDetails().children().eq(3).children().eq(0).should('have.text', 'Data Quality Advisories');
        submissionsPage.elements.transmissionDetails().children().eq(3).find('tbody').should('contain', 'Element-level').should('contain', 'Record-level').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(4).children().eq(0).should('have.text', 'Element Compliance');
        submissionsPage.elements.transmissionDetails().children().eq(4).find('tbody').should('contain', 'Total');
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(0).should('have.text', 'Workflow Status');
    });
    it("Verify the link and modals in the transmissions expanded view", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(0).click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(1).click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(4).children().eq(1).find('a').click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstTransmissionArrowBtn().click();
        submissionsPage.elements.transmissionDetails().children().eq(5).children().eq(1).click({ force: true });
        submissionsPage.elements.readyModalHeader().should('have.text', 'Submission Available for this File');
        submissionsPage.elements.readyModalText().should('have.text', 'This file is ready for submission.');
        submissionsPage.elements.readyModalFooter().should('have.text', 'Close').find('button').click();
    });
    it("Verify the name search filters are working as expected", function () {
        cy.visit('/User/Transmissions');
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
        cy.visit('/User/Transmissions');
        submissionsPage.typeFileNumber('abc');
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.getErrorHeader().should('have.text', 'Error Loading Results');
        submissionsPage.elements.errorText().should('have.text', 'We encountered an error while trying to load transmission data. Refresh the page to try again. If the problem persists please contact the support line.');
        submissionsPage.elements.errorRefreshBtn().should('have.text', 'Refresh the page').click();
        submissionsPage.elements.errorHeader().should('not.exist');
    });
    it("Verify the default table sorting is by transmission date", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.checkIsDateSorted(4, 'descending');
    });
    it("Verify the table can be sorted by the File Number header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableFirstHeader().click();
        submissionsPage.checkIsArraySorted(2, 'descending');
        submissionsPage.elements.tableFirstHeader().click();
        submissionsPage.checkIsArraySorted(2, 'ascending');
    });
    it("Verify the table can be sorted by the Report Period header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableSecondHeader().click();
        submissionsPage.checkIsArraySorted(3, 'descending');
        submissionsPage.elements.tableSecondHeader().click();
        submissionsPage.checkIsArraySorted(3, 'ascending');
    });
    it("Verify the table can be sorted by the Transmission Date header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'descending');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'ascending');
    });
    it("Verify the table can be sorted by the File Type header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableFourthHeader().click();
        submissionsPage.checkIsArraySorted(5, 'descending');
        submissionsPage.elements.tableFourthHeader().click();
        submissionsPage.checkIsArraySorted(5, 'ascending');
    });
    it("Verify the table can be sorted by the Compliance header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableFifthHeader().click();
        submissionsPage.checkIsArraySorted(6, 'descending');
        submissionsPage.elements.tableFifthHeader().click();
        submissionsPage.checkIsArraySorted(6, 'ascending');
    });
    it("Verify the table can be sorted by the Potential Penalty header", function () {
        cy.visit('/User/Transmissions');
        submissionsPage.elements.tableSixthHeader().click();
        submissionsPage.checkIsArraySorted(7, 'descending');
        submissionsPage.elements.tableSixthHeader().click();
        submissionsPage.checkIsArraySorted(7, 'ascending');
    });

});