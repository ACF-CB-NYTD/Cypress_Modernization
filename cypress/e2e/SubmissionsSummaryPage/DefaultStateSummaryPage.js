import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import SubmissionsPageObjects from "../pages/SubmissionsPageObjects";
const submissionsPage = new SubmissionsPageObjects();
import SubmissionSummaryPageObjects from "../pages/SubmissionSummaryPageObjects";
const submissionSummaryPage = new SubmissionSummaryPageObjects();
describe("Default user Submissions summary Page", function () {
    beforeEach(() => {
        cy.login('cypress.default', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Submissions Summary page details", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnSubmissionTab();
        commonPage.verifyUrl('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionSummaryPage.elements.firstSubmissionsLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary');
        submissionSummaryPage.elements.fileNameText().should('have.text', 'File Name:');
        submissionSummaryPage.elements.stateFileIdText().should('have.text', 'State File ID:');
        submissionSummaryPage.elements.complianceStatusText().should('have.text', 'Compliance Status:');
        submissionSummaryPage.elements.potentialPenaltyText().should('have.text', 'Potential Penalty:');
        submissionSummaryPage.elements.UploadedByText().should('have.text', 'Uploaded By:');
        submissionSummaryPage.elements.UploadedOnText().should('have.text', 'Uploaded On:');
        submissionSummaryPage.elements.federalSystemReceivedDateText().should('have.text', 'Federal System Received Date:');
        submissionSummaryPage.elements.fileProcessedDateText().should('have.text', 'File Processed Date:');
        submissionSummaryPage.elements.totalRecordsInFileText().should('have.text', 'Total Records in File:');
        submissionSummaryPage.elements.submissionStatusText().should('have.text', 'Submission Status:');
        submissionSummaryPage.elements.dateStateSelectedForSubmissionsText().should('have.text', 'Date State Selected for Submission:');
        submissionSummaryPage.elements.submittedByText().should('have.text', 'Submitted By:');

    });
    it("Verify the fields and links in the Total Penalty Calculations card", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionSummaryPage.elements.firstSubmissionsLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary');
        submissionSummaryPage.elements.totalPenaltyCalculationText().should('have.text', 'Total Penalty Calculations');
        submissionSummaryPage.elements.fileStandardsText().should('have.text', 'File Standards');
        submissionSummaryPage.elements.dataStandardsText().should('have.text', 'Data Standards');
        submissionSummaryPage.elements.systemGeneratedText().should('have.text', 'System-Generated');
        submissionSummaryPage.elements.seeFullPenaltyBreakdownText().should('have.text', 'See Full Penalty Breakdown').click();
        commonPage.verifyUrl('view=penalty')
        submissionSummaryPage.elements.fileSubmissionStandards().should('have.text', 'File Submission Standards')
        submissionSummaryPage.elements.backToFileSummary().click();
        submissionSummaryPage.elements.fileStandardsLink().click();
        commonPage.verifyUrl('SubmissionDetail');
        submissionSummaryPage.elements.submissionDetails().should('have.text', 'Submission Details');
        submissionSummaryPage.elements.backToFileSummary().click();
        submissionSummaryPage.elements.dataStandardsLink().click();
        commonPage.verifyUrl('SubmissionDetail')
        submissionSummaryPage.elements.dataStandardsTextForPenaltyBreakdown().should('have.text', 'Data Standards');
        submissionSummaryPage.elements.backToFileSummary().click();
    });

    it("Verify the fields and links in the Data quality advisories", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionSummaryPage.elements.firstSubmissionsLink().click();
        commonPage.verifyUrl('/User/Submissions/Summary');
        submissionSummaryPage.elements.totalPenaltyCalculationText().should('have.text', 'Total Penalty Calculations');
        submissionSummaryPage.elements.dqaCardHeader().should('have.text', 'Data Quality Advisories');
        submissionSummaryPage.elements.dqaCardElementLevel().should('include.text', 'Element-Level');
        submissionSummaryPage.elements.dqaCardElementLevel().click();
        commonPage.verifyUrl('&view=dqa&tab=element-level');
        submissionSummaryPage.clickSummaryBreadcrumb();
        submissionSummaryPage.elements.dqaCardRecordLevel().should('include.text', 'Record-Level');
        submissionSummaryPage.elements.dqaCardRecordLevel().click();
        commonPage.verifyUrl('&view=dqa&tab=record-level');
        submissionSummaryPage.clickSummaryBreadcrumb();
        submissionSummaryPage.elements.seeDQAAdvisoryDetails().should('include.text', 'See Data Quality Advisory Details').click();
        commonPage.verifyUrl('SubmissionDetail')
        submissionSummaryPage.elements.backToFileSummary().click();
    });

    it("Verify the fields and links in the Compliance Report card", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionSummaryPage.elements.firstSubmissionsLink().click();
        submissionSummaryPage.elements.complianceCardHeader().should('have.text', 'Compliance Report');
        submissionSummaryPage.elements.complianceCardElementLevel().should('include.text', 'Element-Level');
        submissionSummaryPage.elements.complianceCardElementLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=element-level');
        submissionSummaryPage.clickSummaryBreadcrumb();
        submissionSummaryPage.elements.complianceCardRecordLevel().should('include.text', 'Record-Level');
        submissionSummaryPage.elements.complianceCardRecordLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=record-level');
        submissionSummaryPage.clickSummaryBreadcrumb();
        submissionSummaryPage.elements.complianceCardFileLevel().should('include.text', 'File-Level');
        submissionSummaryPage.elements.complianceCardFileLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=file-level');
        submissionSummaryPage.clickSummaryBreadcrumb();
        submissionSummaryPage.elements.complianceCardElementBarText().should('have.text', 'Element-Level Compliance');
        submissionSummaryPage.elements.complianceCardRecordBarText().should('have.text', 'Record-Level Compliance');
        submissionSummaryPage.elements.seeFullComplianceReport().should('have.text', 'See Full Compliance Report');
        submissionSummaryPage.elements.seeFullComplianceReport().click();
        commonPage.verifyUrl('&view=compliance');
        submissionSummaryPage.elements.backToFileSummary().click();
    });

    it("Verify the fields and links in the File notes card", function () {
        cy.visit('/User/Submissions');
        submissionsPage.elements.firstSubmissionArrowBtn().click();
        submissionSummaryPage.elements.firstSubmissionsLink().click();
        submissionSummaryPage.elements.fileNotesCardHeader().should('have.text', 'File Notes');
        submissionSummaryPage.elements.fileNotesCardLink().should('have.text', 'See All File Notes');
        submissionSummaryPage.elements.fileNotesCardLink().click();
        commonPage.verifyUrl('&view=notes');
        submissionSummaryPage.elements.backToFileSummary().click();
    });
});