import { timeout } from "async";
import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import SubmissionsPageObjects from "../pages/SubmissionsPageObjects";
const submissionsPage = new SubmissionsPageObjects();
describe("System admin user Submissions Page", function () {
    beforeEach(() => {
        cy.login('cypress.sysadmin', 'P@ssw0rd') // Login with session, implemented in commands.js
    });
    it("Verify Submissions page buttons, text fields, dropdowns, and headers", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyBreadCrumbs('Submissions');
        commonPage.elements.headerH3Text().should('have.text', 'Submissions');
        submissionsPage.elements.fileSearchName().should('have.text', 'File Search');
        submissionsPage.elements.submissionDateText().should('have.text', 'Submission Date');
        submissionsPage.elements.fileSearchInput().should('exist');
        submissionsPage.elements.dateRangeInput().should('exist');
        submissionsPage.elements.penaltyDropdown().should('contain', 'Penalty');
        submissionsPage.elements.stateDropdown().should('contain', 'State');
        submissionsPage.elements.reportPeriodDropdownForFederal().should('contain', 'Report Period');
        submissionsPage.elements.fileTypeDropdownForFederal().should('contain', 'File Type');
        submissionsPage.elements.statusDropdownForFederal().should('contain', 'Status');
        submissionsPage.elements.penaltyDropdown().click();
        submissionsPage.elements.penaltyDropdownCompliance().should('have.text', 'Compliant0.00%');
        submissionsPage.elements.penaltyDropdownNonCompliance().each((option) => {
            expect(option.text()).to.be.oneOf(['Non-Compliant', '0.00%', 'All', '0.50%', '1.00%', '1.25%', '1.50%', '1.75%', '2.50%']);
        });
        submissionsPage.elements.stateDropdownForFederal().click();
        submissionsPage.elements.stateDropDownOptionForFederal().each((option) => {
            expect(option.text()).to.be.oneOf(['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia','Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming','Test State']);
        });
        submissionsPage.elements.reportPeriodDropdownForFederal().click();
        submissionsPage.elements.reportPeriodDropdownOptionsForCBCentral().each((option) => {
            expect(option.text()).to.be.oneOf(['2010B', '2011A', '2011B', '2012A', '2012B', '2013A', '2013B', '2014A', '2014B', '2015A', '2015B', '2016A', '2016B', '2017A', '2017B', '2018A', '2018B', '2019A', '2019B', '2020A', '2020B', '2021A', '2021B', '2022A', '2022B', '2023A', '2023B', '2024A', '2024B', '2025A']);
        });
        submissionsPage.elements.fileTypeDropdownForFederal().click();
        submissionsPage.elements.fileTypeDropdownOptionsForFederal().each((option) => {
            expect(option.text()).to.be.oneOf(['Regular', 'Corrected', 'Subsequent', 'Test']);
        });
        submissionsPage.elements.statusDropdownForFederal().click();
        submissionsPage.elements.statusDropdownOptionsForFederal().each((option) => {
            expect(option.text()).to.be.oneOf(['Hide Inactive Submissions']);
        });
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('contain', 'Refresh Results');
        submissionsPage.elements.fileNumberHeader().should('have.text', 'File Number');
        cy.get(':nth-child(3) > .styles_tableHeader__mVxy6 > .styles_fieldName__kegXV').should('have.text', 'State');
        submissionsPage.elements.reportPeriodHeaderForFederal().should('have.text', 'Report Period');
        submissionsPage.elements.submissionDateHeaderForFederal().should('have.text', 'Submission Date');
        submissionsPage.elements.fileTypeHeader().should('have.text', 'File Type');
        submissionsPage.elements.statusHeaderForFederal().should('have.text', 'Status');
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
        submissionsPage.elements.penaltyTableDataForFederal().should('have.text', 'Compliant');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.elements.reportPeriodDropdownForFederal().click();
        submissionsPage.elements.reportPeriodDropdownOptionsForFederal().eq(2).click();
        submissionsPage.elements.reportPeriodDropdownForFederal().click();
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.reportPeriodTableDataForFederal().should('have.text', '2024A');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.elements.fileTypeDropdownForFederal().click();
        submissionsPage.elements.fileTypeDropdownOptionsForFederal().eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.fileTypeTableDataForFederal().should('have.text', 'Subsequent');
    });
    it('Verify links are working as expected', function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstTableLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstPenaltyLinkForFederal().click();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
    });
    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Submissions');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        submissionsPage.typeFileNumberForFederal('8488');
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });
    it("Verify System admin user is able to export current table", function () {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.visit('/User/Submissions');
        commonPage.clickOnExportCurrentTable();
        cy.verifyDownload('nytd_submissions_2024', { contains: true }, { timeout: 70000, interval: 900 });
    });
    it("Verify the arrow dropdown button opens the submissions expanded view", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionsPage.elements.submissionDetails().should('exist').and('not.have.descendants', '[data-testid="Loading_div"]');
        submissionsPage.elements.submissionDetails().children().eq(0).children().eq(0).should('have.text', 'Submitted');
        submissionsPage.elements.submissionDetails().children().eq(1).children().eq(0).should('have.text', 'File Processed');
        submissionsPage.elements.submissionDetails().children().eq(2).find('tbody').should('contain', 'Served').should('contain', 'Baseline').should('contain', 'Follow-up').should('contain', 'Total');
        submissionsPage.elements.submissionDetails().children().eq(3).children().eq(0).should('have.text', 'Meets Standards');
        submissionsPage.elements.submissionDetails().children().eq(3).find('tbody').should('contain', 'File Submission').should('contain', 'Data');
        submissionsPage.elements.submissionDetails().children().eq(4).children().eq(0).should('have.text', 'Data Quality Advisories');
        submissionsPage.elements.submissionDetails().children().eq(4).find('tbody').should('contain', 'Element-level').should('contain', 'Record-level').should('contain', 'Total');
        submissionsPage.elements.submissionDetails().children().eq(5).children().eq(0).should('have.text', 'Element Compliance');
        submissionsPage.elements.submissionDetails().children().eq(4).find('tbody').should('contain', 'Total');
        submissionsPage.elements.submissionDetails().children().eq(5).children().eq(0).should('have.text', 'Element Compliance');
    });
    it("Verify the link and modals in the submissions expanded view", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionsPage.clickOnDQAElementLevelLink();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionsPage.clickOnDQARecordLevelLink();
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionsPage.clickOnElementComplianceTotalLink()
        commonPage.verifyUrl('/User/Submissions/Summary?');
        submissionsPage.elements.returnBreadcrumb().click();
        submissionsPage.elements.firstSubmissionArrowBtn().click();
    });
    it("Verify the name search filters are working as expected", function () {
        cy.visit('/User/Submissions');
        submissionsPage.typeFileNumberForFederal('8488');
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.typeFileNumberForFederal('8488');
        commonPage.clickOnMagnifyingGlassSearchIcon();
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
        submissionsPage.typeFileNumberForFederal('8488');
        submissionsPage.typeFileNumberForFederal('{enter}');
        submissionsPage.elements.firstTableLink().should('have.text', '8488');
        commonPage.clickOnClearFiltersBtn();
    });
    it("Verify the Error Loading Results message is displayed when inputting letters", function () {
        cy.visit('/User/Submissions');
        submissionsPage.typeFileNumberForFederal('abc');
        commonPage.clickOnRefreshResultsBtn();
        submissionsPage.getErrorHeader().should('have.text', 'Error Loading Results');
        submissionsPage.elements.errorText().should('have.text', 'We encountered an error while trying to load submission data. Refresh the page to try again. If the problem persists please contact the support line.');
        submissionsPage.elements.errorRefreshBtn().should('have.text', 'Refresh the page').click();
        submissionsPage.elements.errorHeader().should('not.exist');
    });
    it("Verify the default table sorting is by submission date", function () {
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
        submissionsPage.elements.tableSecondHeaderForFederal().click();
        submissionsPage.checkIsArraySorted(3, 'descending');
        submissionsPage.elements.tableSecondHeaderForFederal().click();
        submissionsPage.checkIsArraySorted(3, 'ascending');
    });
    it("Verify the table can be sorted by the submission Date header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'descending');
        submissionsPage.elements.tableThirdHeader().click();
        submissionsPage.checkIsDateSorted(4, 'ascending');
    });

    // it.only("Upload", function () {
    //     cy.visit('/User.html');
    //     commonPage.verifyUrl('/User');
    //     cy.visit('/User');
    //     commonPage.verifyUrl('/User');
    //     cy.get(':nth-child(2) > [data-testid="default_link"]').click();
    //     commonPage.verifyUrl('/User/Transmissions');
    //     commonPage.verifyBreadCrumbs('Transmissions');
    //     cy.get(':nth-child(2) > [data-testid="button"]').click();

    //     cy.fixture('cypress/fixtures/il.xml', 'utf-8').then((fileContent)=>{
    //         const blob = new Blob([fileContent],{type: 'application/xml'});
    //         const file = new File([blob],'cypress/fixtures/il.xml',{type: 'application/xml'});
    //         cy.get("input[type='file']").attachFile(file);
    //     })
// Please ignore this for now I am working to upload transmission so thats why I have this, as soon as I resolve it I will delete and push again

    // });

    it("Verify the table can be sorted by the File Type header", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.tableFourthHeaderForFederal().click();
        submissionsPage.checkIsArraySorted(5, 'descending');
        submissionsPage.elements.tableFourthHeaderForFederal().click();
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
        submissionsPage.checkIsArraySorted(8, 'descending');
        submissionsPage.elements.tableSixthHeader().click();
        submissionsPage.checkIsArraySorted(8, 'ascending');
    });
});