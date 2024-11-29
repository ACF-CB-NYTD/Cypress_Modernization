class SubmissionsPageObjects {

    elements = {
        firstSubmissionsLink: () => cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .usa-link'),
        fileNameText: () => cy.get('b'),
        stateFileIdText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(1) > th'),
        complianceStatusText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(2) > th'),
        potentialPenaltyText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(3) > th'),
        UploadedByText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(4) > th'),
        UploadedOnText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(5) > th'),
        federalSystemReceivedDateText: () => cy.get('.styles_table__i7BH9 > tbody > :nth-child(6) > th'),
        fileProcessedDateText: () => cy.get(':nth-child(7) > th'),
        totalRecordsInFileText: () => cy.get(':nth-child(8) > th'),
        submissionStatusText: () => cy.get(':nth-child(10) > th'),
        dateStateSelectedForSubmissionsText: () => cy.get(':nth-child(11) > th'),
        submittedByText: () => cy.get(':nth-child(12) > th'),
        totalPenaltyCalculationText: () => cy.get('.styles_summary__uAMKQ > :nth-child(1) > :nth-child(1) > h2'),
        fileStandardsText: () => cy.get(':nth-child(1) > .styles_subCol__W6P_J > .styles_percentageLabel__gelx1 > :nth-child(1)'),
        dataStandardsText: () => cy.get('.styles_row__xEkRm > :nth-child(3) > .styles_subCol__W6P_J > .styles_percentageLabel__gelx1 > :nth-child(1)'),
        systemGeneratedText: () => cy.get(':nth-child(5) > .styles_percentageLabel__gelx1 > :nth-child(1)'),
        seeFullPenaltyBreakdownText: () =>  cy.get(':nth-child(1) > :nth-child(1) > .styles_spacer__EVKX1 > .styles_changeViewLink__aO_NF'),
        backToFileSummary: () => cy.get('.styles_summary__ieBNT > [data-testid="button"]'),
        fileStandardsLink: () => cy.get(':nth-child(1) > .usa-link'),
        dataStandardsLink: () => cy.get(':nth-child(3) > .usa-link'),
        fileSubmissionStandards: () => cy.get('#file'),
        submissionDetails: () => cy.get('.styles_header__DJ849 > p'),
        dataStandardsTextForPenaltyBreakdown: () => cy.get('#data'),
        dqaCardHeader: () => cy.get(':nth-child(1) > :nth-child(2) > h2'),
        dqaCardElementLevel: () => cy.get('.styles_row__uEJvb > :nth-child(1)'),
        dqaCardRecordLevel: () => cy.get('.styles_row__uEJvb > :nth-child(2)'),
        summaryBreadcrumb: () => cy.get(':nth-child(3) > .styles_liOther__1TGKl'),
        seeDQAAdvisoryDetails: () => cy.get(':nth-child(1) > :nth-child(2) > .styles_spacer__EVKX1 > .styles_changeViewLink__aO_NF'),
        complianceCardHeader: () => cy.get(':nth-child(2) > :nth-child(1) > h2'),
        complianceCardElementLevel: () => cy.get('[href="/User/Submissions/SubmissionDetail?id=8722&view=compliance&tab=element-level"] > .styles_label___Ssy1'),
        complianceCardRecordLevel: () => cy.get('[href="/User/Submissions/SubmissionDetail?id=8722&view=compliance&tab=record-level"] > .styles_label___Ssy1'),
        complianceCardFileLevel: () => cy.get('[href="/User/Submissions/SubmissionDetail?id=8722&view=compliance&tab=file-level"] > .styles_label___Ssy1'),
        complianceCardElementBarText: () => cy.get(':nth-child(3) > .styles_progressLabel__wi967 > .styles_progressLabelText__w6WbN'),
        complianceCardRecordBarText: () => cy.get(':nth-child(4) > .styles_progressLabel__wi967 > .styles_progressLabelText__w6WbN'),
        seeFullComplianceReport: () => cy.get(':nth-child(2) > :nth-child(1) > .styles_spacer__EVKX1 > .styles_changeViewLink__aO_NF'),
        fileNotesCardHeader: () => cy.get(':nth-child(2) > :nth-child(2) > h2'),
        fileNotesCardLink: () => cy.get(':nth-child(2) > :nth-child(2) > .styles_spacer__EVKX1 > .styles_changeViewLink__aO_NF'),
    }

    clickSummaryBreadcrumb() {
        this.elements.summaryBreadcrumb().click();
    }
}
export default SubmissionsPageObjects;