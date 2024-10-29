import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import TransmissionPageObjects from "../pages/TransmissionsPageObjects";
const transmissionPage = new TransmissionPageObjects();
describe("SAO User Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.sao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Transmission page buttons, text fields, dropdowns, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.elements.transmissionsBtn().click();
        commonPage.verifyBreadCrumbs('Transmissions');
        commonPage.elements.headerH3Text().should('have.text', 'Transmissions');
        commonPage.elements.pageDescriptionText().should('have.text', '[TRANSMISSIONS PAGE DESCRIPTION -  example: “Leave the filter blank if you wish to receive all column results. The filter will return transmissions that meet the criteria you select after clicking the "Refresh Results" button. To clear a filter, press the X (delete) button in the panel.”]');
        commonPage.elements.exportBtn().should('have.text', 'Export Current Table');
        transmissionPage.elements.fileSearchName().should('have.text', 'File Search'); // Name Search label
        transmissionPage.elements.fileSearchInput().should('exist');
        transmissionPage.elements.dateRangeName().should('have.text', 'Transmission Date'); // File Received Date Range label
        transmissionPage.elements.dateRangeInput().should('exist');
        transmissionPage.elements.penaltyDropdown().should('contain', 'Penalty');
        transmissionPage.elements.reportPeriodDropdown().should('contain', 'Report Period');
        transmissionPage.elements.fileTypeDropdown().should('contain', 'File Type');
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(1).should('have.text', 'Compliant0.00%');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().each((option) => {
            expect(option.text()).to.be.oneOf(['Non-Compliant', '0.00%', 'All', '0.50%', '1.00%', '1.25%', '1.50%', '1.75%', '2.50%']);
        });
        transmissionPage.elements.reportPeriodDropdown().click();
        transmissionPage.elements.secondDropdownContent().children().children().eq(1).children().each((option) => {
            expect(option.text()).to.be.oneOf(['Filter options for Report Period', '2010B', '2011A', '2011B', '2012A', '2012B', '2013A', '2013B', '2014A', '2014B', '2015A', '2015B', '2016A', '2016B', '2017A', '2017B', '2018A', '2018B', '2019A', '2019B', '2020A', '2020B', '2021A', '2021B', '2022A', '2022B', '2023A', '2023B', '2024A', '2024B', '2025A']);
        });
        transmissionPage.elements.fileTypeDropdown().click();
        transmissionPage.elements.thirdDropdownContent().children().children().eq(1).children().each((option) => {
            expect(option.text()).to.be.oneOf(['Regular', 'Corrected', 'Subsequent', 'Test']);
        });
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('contain', 'Refresh Results');
        transmissionPage.elements.fileNumberHeader().should('have.text', 'File Number');
        transmissionPage.elements.reportPeriodHeader().should('have.text', 'Report Period');
        transmissionPage.elements.transmissionDateHeader().should('have.text', 'Transmission Date');
        transmissionPage.elements.fileTypeHeader().should('have.text', 'File Type');
        transmissionPage.elements.complianceHeader().should('have.text', 'Compliance');
        transmissionPage.elements.penaltyHeader().should('have.text', 'Potential Penalty');
    });
    it('Verify the penalty dropdown filters can be clicked', function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(1).children().eq(1).click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(1).click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(2).find('[type="checkbox"]').should('be.checked');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(3).find('[type="checkbox"]').should('be.checked');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(4).find('[type="checkbox"]').should('be.checked');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(5).find('[type="checkbox"]').should('be.checked');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(6).find('[type="checkbox"]').should('be.checked');
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(7).find('[type="checkbox"]').should('be.checked');
    });
    it("Verify the report period dropdown filters can be clicked", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.reportPeriodDropdown().click();
        transmissionPage.elements.secondDropdownContent().children().children().eq(1).children().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the file type dropdown filters can be clicked", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.fileTypeDropdown().click();
        transmissionPage.elements.thirdDropdownContent().children().children().eq(1).children().each((option) => {
            cy.get(option).click();
        })
    });
    it("Verify the dropdown filters are working as expected", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(1).children().eq(1).click();
        commonPage.clickOnRefreshResultsBtn();
        transmissionPage.getTableData(false, 'Penalty').should('have.text', 'Compliant');
        commonPage.clickOnClearFiltersBtn();
        transmissionPage.elements.reportPeriodDropdown().click();
        transmissionPage.elements.secondDropdownContent().children().children().eq(1).children().eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        transmissionPage.getTableData(false, 'Report Period').should('have.text', '2024A');
        commonPage.clickOnClearFiltersBtn();
        transmissionPage.elements.fileTypeDropdown().click();
        transmissionPage.elements.thirdDropdownContent().children().children().eq(1).children().eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        transmissionPage.getTableData(false, 'File Type').should('have.text', 'Subsequent');
    });
    it('Verify the file number and potential penalty link are working as expected', function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().click();
        commonPage.verifyUrl('/User/Transmissions/Summary?');
        transmissionPage.elements.returnBreadcrumb().click();
        transmissionPage.elements.firstPenaltyLink().click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        transmissionPage.elements.returnBreadcrumb().click();
    });
    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Transmissions');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        transmissionPage.typeFileNumber('1111');
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });
    it("Verify SAO user is able to upload file", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.uploadTransmissionBtn().should('exist').click();
        transmissionPage.elements.uploadModalHeader().should('have.text', 'NYTD File Upload').should('be.visible');
        transmissionPage.elements.uploadModalAlert().should('have.text', 'Asterisks (*) in field names are used to denote required fields.');
        transmissionPage.elements.uploadModalLabels().eq(0).should('have.text', 'Choose an xml file to upload. *');
        transmissionPage.elements.uploadModalLabels().eq(1).should('have.text', 'Report Period *');
        transmissionPage.elements.uploadModalLabels().eq(2).should('have.text', 'File Type *');
        transmissionPage.elements.uploadConfirmationBtn().should('have.text', 'Upload');
        transmissionPage.elements.uploadBtn().should('have.text', 'Choose File');


        // TODO - Make upload work
        const file = 'VVG1CX4.CFI.ST.A2024.S241018.T1541.xml';
        transmissionPage.elements.uploadInput().selectFile(`cypress/fixtures/${file}`, { force: true });

        

        transmissionPage.elements.reportPeriodSelect().select('2024A');
        transmissionPage.elements.reportPeriodSelect().should('have.value', '2024A');
        transmissionPage.elements.fileTypeSelect().select('Subsequent');
        transmissionPage.elements.fileTypeSelect().should('have.value', 'Subsequent');
        // cy.get('div.usa-modal:visible').find('button.nytd-button--tertiary').should('have.text', 'Cancel').click();
        // transmissionPage.elements.uploadTransmissionBtn().click();
        // cy.get('[data-testid="success_modal_h1"]').should('have.text', 'Success!');
        // cy.get('[id="modal_subtitle_description"]').should('have.text', 'Your file was uploaded successfully.');
        // cy.get('[id="success_modal_button"]').should('have.text', 'Return to Transmissions Page').click();

    });
    it("Verify SAO user can use the Submit Quick Action", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.quickActionSubmit().should('have.text', 'Submit');
        transmissionPage.elements.quickActionSubmit().click();
        transmissionPage.elements.submissionModal().find('[id="fileReviewID"]').should('have.text', 'Submit File Review');
        transmissionPage.elements.submissionModal().find('[class="usa-prose"]').eq(0).should('have.text', 'You have chosen the following transmission for submission');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(0).children().eq(0).should('have.text', 'File Number:');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(1).children().eq(0).should('have.text', 'File Name:');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(2).children().eq(0).should('have.text', 'Report Period:');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(3).children().eq(0).should('have.text', 'File Type:');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(4).children().eq(0).should('have.text', 'Compliance Status:');
        transmissionPage.elements.submissionModal().find('tbody').children().eq(5).children().eq(0).should('have.text', 'Potential Penalty:');
        transmissionPage.elements.submissionModal().find('[class="usa-prose"]').eq(1).should('have.text', 'This file will become the "active" submission of record for this report period for monitoring and data analysis purposes. In addition, regular and corrected file submissions will be reviewed for compliance with NYTD standards by ACF.');
        transmissionPage.elements.submissionModal().find('[data-testid="button"]').should('have.text', 'Confirm Submit');
        transmissionPage.elements.submissionModal().find('[id="submission_confirmationCancelButton"]').should('have.text', 'Cancel').click();
        transmissionPage.elements.firstTableLink().invoke('text').then((fileNum) => {
            transmissionPage.elements.quickActionSubmit().click();
            transmissionPage.elements.submissionModal().find('[data-testid="button"]').should('have.text', 'Confirm Submit').click();
            transmissionPage.elements.successModalHeader().should('have.text', 'Success!');
            transmissionPage.elements.successModalText().should('have.text', `File ${fileNum.trim()} was successfully submitted.`);
            transmissionPage.elements.successModalBtn(fileNum).should('have.text', 'Return to Transmissions Page').click({force:true});
        });

    });
    it("Verify SAO user can use the Delete Quick Action", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTableLink().should('exist');
        transmissionPage.elements.quickActionDelete().should('have.text', 'Delete').click({ force: true });
        transmissionPage.elements.deleteModal().find('[id="fileReviewID"]').should('have.text', 'Delete File Review');
        transmissionPage.elements.deleteModal().find('[class="usa-prose"]').eq(0).should('have.text', 'You have chosen the following transmission for deletion');
        transmissionPage.elements.deleteModal().find('tbody').children().should('contain', 'File Number:').should('contain', 'File Name:').should('contain', 'Report Period:').should('contain', 'File Type:').should('contain', 'Compliance Status:').should('contain', 'Potential Penalty:');
        transmissionPage.elements.deleteModal().find('[class="usa-prose"]').eq(1).should('have.text', 'This file will be deleted from the NYTD database and will no longer be available.');
        transmissionPage.elements.deleteModal().find('[data-testid="button"]').should('have.text', 'Confirm Delete');
        transmissionPage.elements.deleteModal().find('[id="deletion_confirmationCancelButton"]').should('have.text', 'Cancel').click();
        transmissionPage.elements.quickActionDelete().eq(0).should('have.text', 'Delete').click({ force: true });
        transmissionPage.elements.deleteModal().find('[data-testid="button"]').should('have.text', 'Confirm Delete').click();
        transmissionPage.elements.firstTableLink().invoke('text').then((fileNum) => {
            transmissionPage.elements.quickActionDelete().click();
            transmissionPage.elements.deleteModal().find('[data-testid="button"]').should('have.text', 'Confirm Delete').click();
            transmissionPage.elements.successModalHeader().should('have.text', 'Success!');
            transmissionPage.elements.successModalText().should('have.text', `File ${fileNum.trim()} was successfully deleted.`);
            transmissionPage.elements.successModalBtn(fileNum).should('have.text', 'Return to Transmissions Page').click();
        });
    });
    it("Verify SAO user is able to export current table", function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/User/Transmissions');
        commonPage.elements.exportBtn().should('have.text', 'Export Current Table');
        commonPage.elements.exportBtn().click({force:true});
        commonPage.elements.exportBtn().click({force:true});
        cy.verifyDownload('nytd_transmissions_2024-10-28T', { contains: true }, { timeout: 70000, interval: 900 });
    });
    it("Verify the arrow dropdown button opens the transmissions expanded view", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTransmissionArrowBtn().click();
        transmissionPage.elements.transmissionDetails().should('exist').and('not.have.descendants', '[data-testid="Loading_div"]');
        transmissionPage.elements.transmissionDetails().children().eq(0).children().eq(0).should('have.text', 'Uploaded');
        transmissionPage.elements.transmissionDetails().children().eq(1).children().eq(0).should('have.text', 'Records In File');
        transmissionPage.elements.transmissionDetails().children().eq(1).find('tbody').should('contain', 'Served').should('contain', 'Baseline').should('contain', 'Follow-up').should('contain', 'Total');
        transmissionPage.elements.transmissionDetails().children().eq(2).children().eq(0).should('have.text', 'Meets Standards');
        transmissionPage.elements.transmissionDetails().children().eq(2).find('tbody').should('contain', 'File Submission').should('contain', 'Data');
        transmissionPage.elements.transmissionDetails().children().eq(3).children().eq(0).should('have.text', 'Data Quality Advisories');
        transmissionPage.elements.transmissionDetails().children().eq(3).find('tbody').should('contain', 'Element-level').should('contain', 'Record-level').should('contain', 'Total');
        transmissionPage.elements.transmissionDetails().children().eq(4).children().eq(0).should('have.text', 'Element Compliance');
        transmissionPage.elements.transmissionDetails().children().eq(4).find('tbody').should('contain', 'Total');
        transmissionPage.elements.transmissionDetails().children().eq(5).children().eq(0).should('have.text', 'Workflow Status');
    });
    it("Verify the link and modals in the transmissions expanded view", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.firstTransmissionArrowBtn().click();
        transmissionPage.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(0).click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        transmissionPage.elements.returnBreadcrumb().click();
        transmissionPage.elements.firstTransmissionArrowBtn().click();
        transmissionPage.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(1).click();
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        transmissionPage.elements.returnBreadcrumb().click();
        transmissionPage.elements.firstTransmissionArrowBtn().click();
        transmissionPage.elements.transmissionDetails().children().eq(4).children().eq(1).find('a').click({force:true});
        commonPage.verifyUrl('/User/Transmissions/TransmissionDetail?');
        transmissionPage.elements.returnBreadcrumb().click();
        transmissionPage.elements.firstTransmissionArrowBtn().click();
        transmissionPage.elements.transmissionDetails().children().eq(5).children().eq(1).click({ force: true });
        transmissionPage.elements.readyModalHeader().invoke('text').then((text) => {
            expect(text.trim()).to.be.oneOf([
                'Submission Available for this File',
                'Submission Not Available for this File'
            ]);
        });
        transmissionPage.elements.readyModalText().invoke('text').then((text) => {
            expect(text.trim()).to.be.oneOf([
                'This file is ready for submission.',
                'Test files cannot be submitted. If this is an actual Transmission file please change the file type within the .XML file and upload it with the appropriate file type.'
            ]);
        });
        transmissionPage.elements.readyModalFooter().should('have.text', 'Close').find('button').click();
    });
    it("Verify the name search filters are working as expected", function () {
        cy.visit('/User/Transmissions');
        // Todo match uploaded file
        transmissionPage.typeFileNumber('8460');
        commonPage.clickOnRefreshResultsBtn();
        transmissionPage.elements.firstTableLink().should('have.text', '8460');
        commonPage.clickOnClearFiltersBtn();
        transmissionPage.typeFileNumber('8460');
        commonPage.clickOnMagnifyingGlassSearchIcon();
        transmissionPage.elements.firstTableLink().should('have.text', '8460');
        commonPage.clickOnClearFiltersBtn();
        transmissionPage.typeFileNumber('8460');
        transmissionPage.typeFileNumber('{enter}');
        transmissionPage.elements.firstTableLink().should('have.text', '8460');
        commonPage.clickOnClearFiltersBtn();
    });
    it("Verify the Error Loading Results message is displayed when inputting letters", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.typeFileNumber('abc');
        commonPage.clickOnRefreshResultsBtn();
        transmissionPage.getErrorHeader().should('have.text', 'Error Loading Results');
        transmissionPage.elements.errorText().should('have.text', 'We encountered an error while trying to load transmission data. Refresh the page to try again. If the problem persists please contact the support line.');
        transmissionPage.elements.errorRefreshBtn().should('have.text', 'Refresh the page').click();
        transmissionPage.elements.errorHeader().should('not.exist');
    });
    it("Verify the default table sorting is by transmission date", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.checkIsDateSorted(4, 'descending');
    });
    it("Verify the table can be sorted by the File Number header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableFirstHeader().click();
        transmissionPage.checkIsArraySorted(2, 'descending');
        transmissionPage.elements.tableFirstHeader().click();
        transmissionPage.checkIsArraySorted(2, 'ascending');
    });
    it("Verify the table can be sorted by the Report Period header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableSecondHeader().click();
        transmissionPage.checkIsArraySorted(3, 'descending');
        transmissionPage.elements.tableSecondHeader().click();
        transmissionPage.checkIsArraySorted(3, 'ascending');
    });
    it("Verify the table can be sorted by the Transmission Date header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableThirdHeader().click();
        transmissionPage.checkIsDateSorted(4, 'descending');
        transmissionPage.elements.tableThirdHeader().click();
        transmissionPage.checkIsDateSorted(4, 'ascending');
    });
    it("Verify the table can be sorted by the File Type header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableFourthHeader().click();
        transmissionPage.checkIsArraySorted(5, 'descending');
        transmissionPage.elements.tableFourthHeader().click();
        transmissionPage.checkIsArraySorted(5, 'ascending');
    });
    it("Verify the table can be sorted by the Compliance header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableFifthHeader().click();
        transmissionPage.checkIsArraySorted(6, 'descending');
        transmissionPage.elements.tableFifthHeader().click();
        transmissionPage.checkIsArraySorted(6, 'ascending');
    });
    it("Verify the table can be sorted by the Potential Penalty header", function () {
        cy.visit('/User/Transmissions');
        transmissionPage.elements.tableSixthHeader().click();
        transmissionPage.checkIsArraySorted(7, 'descending');
        transmissionPage.elements.tableSixthHeader().click();
        transmissionPage.checkIsArraySorted(7, 'ascending');
    });
});