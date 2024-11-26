import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import TransmissionPageObjects from "../pages/TransmissionsPageObjects";
const transmissionPage = new TransmissionPageObjects();
import TransmissionsSummaryObjects from "../pages/TransmissionsSummaryObjects";
const transmissionsSummaryObjects = new TransmissionsSummaryObjects();
describe("SAO User Transmission Page", function () {
    beforeEach(() => {
        cy.login('cypress.sao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify Transmission Summary page details", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.getTableData(false, 'Report Period').invoke('text').then((reportPeriod) => {
            transmissionPage.getTableData(false, 'File Type').invoke('text').then((fileType) => {
                transmissionPage.elements.firstTableLink().invoke('text').then((fileNum) => {
                    transmissionPage.elements.firstTableLink().click();
                    commonPage.verifyUrl(`User/Transmissions/Summary?id=${fileNum}`);
                    transmissionsSummaryObjects.elements.transmissionDetailsHeader().should('have.text', 'Transmission Details', { timeout: 10000 });
                    commonPage.elements.headerH3Text().should('have.text', `File #${fileNum}`);
                    transmissionsSummaryObjects.elements.transmissionHeader().should('have.text', `${reportPeriod} Test State - ${fileType}`);
                });
            });
        });
        transmissionsSummaryObjects.elements.transmissionTableHeader().should('have.text', 'File Name:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(0).children().eq(0).should('have.text', 'State File ID:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(1).children().eq(0).should('have.text', 'Compliance Status:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(2).children().eq(0).should('have.text', 'Potential Penalty:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(3).children().eq(0).should('have.text', 'Uploaded By:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(4).children().eq(0).should('have.text', 'Uploaded On:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(5).children().eq(0).should('have.text', 'File Processed Date:');
        transmissionsSummaryObjects.elements.transmissionTableData().children().eq(6).children().eq(0).should('have.text', 'Total Records in File:');
        transmissionsSummaryObjects.elements.transmissionSubmitBtn().should('have.text', 'Submit Transmission');
        transmissionsSummaryObjects.elements.transmissionDeleteBtn().should('have.text', 'Delete Transmission');
    });
    it("Verify the fields and links in the Total Penalty Calculations card with 0% penalty", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');  
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(1).children().eq(1).click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.penaltyCardHeader().should('have.text', 'Total Penalty Calculations');
        transmissionsSummaryObjects.elements.penaltyCardGreen().should('contain', 'Potential Penalty0%');
        transmissionsSummaryObjects.elements.penaltyCardFilePenalty().should('have.text', '0%File StandardsPenalty');
        transmissionsSummaryObjects.elements.penaltyCardFileValue().should('have.text', '0 Issues');
        transmissionsSummaryObjects.elements.penaltyCardFileValue().click();
        commonPage.verifyUrl('&view=penalty#file');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.penaltyCardDataPenalty().should('have.text', '0%Data StandardsPenalty');
        transmissionsSummaryObjects.elements.penaltyCardDataValue().should('have.text', '0 Issues');
        transmissionsSummaryObjects.elements.penaltyCardDataValue().click();
        commonPage.verifyUrl('&view=penalty#data');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.penaltyCardSystemPenalty().should('have.text', '0%System-GeneratedPotential Penalty');
        transmissionsSummaryObjects.elements.penaltyCardLink().should('have.text', 'See Full Penalty Breakdown');
        transmissionsSummaryObjects.elements.penaltyCardLink().click();
        commonPage.verifyUrl('&view=penalty');
    });
    it("Verify the fields and links in the Total Penalty Calculations card with a non-0% penalty", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.penaltyDropdown().click();
        transmissionPage.elements.firstDropdownContent().children().eq(0).children().eq(2).children().eq(1).click();
        commonPage.clickOnRefreshResultBtn();
        transmissionPage.getTableData(false, 'Penalty').invoke('text').then((potentialPenalty) => {
            transmissionPage.elements.firstTableLink().click();
            transmissionsSummaryObjects.elements.penaltyCardHeader().should('have.text', 'Total Penalty Calculations');
            transmissionsSummaryObjects.elements.penaltyCardYellow().should('contain', `Potential Penalty${potentialPenalty}`);
            transmissionsSummaryObjects.elements.penaltyCardFilePenalty().should('include.text', 'File StandardsPenalty');
            transmissionsSummaryObjects.elements.penaltyCardFileValue().should('include.text', 'Issue');
            transmissionsSummaryObjects.elements.penaltyCardFileValue().click();
            commonPage.verifyUrl('&view=penalty#file');
            transmissionsSummaryObjects.clickSummaryBreadcrumb();
            transmissionsSummaryObjects.elements.penaltyCardDataPenalty().should('include.text', 'Data StandardsPenalty');
            transmissionsSummaryObjects.elements.penaltyCardDataValue().should('include.text', 'Issue');
            transmissionsSummaryObjects.elements.penaltyCardDataValue().click();
            commonPage.verifyUrl('&view=penalty#data');
            transmissionsSummaryObjects.clickSummaryBreadcrumb();
            transmissionsSummaryObjects.elements.penaltyCardSystemPenalty().should('have.text', `${potentialPenalty}System-GeneratedPotential Penalty`);
            transmissionsSummaryObjects.elements.penaltyCardLink().should('have.text', 'See Full Penalty Breakdown');
            transmissionsSummaryObjects.elements.penaltyCardLink().click();
            commonPage.verifyUrl('&view=penalty');
        });
    });
    it("Verify the fields and links in the Data Quality Advisories card", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.dqaCardHeader().should('have.text', 'Data Quality Advisories');
        transmissionsSummaryObjects.elements.dqaCardElementLevel().should('include.text', 'Element-Level');
        transmissionsSummaryObjects.elements.dqaCardElementLevel().click();
        commonPage.verifyUrl('&view=dqa&tab=element-level');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.dqaCardRecordLevel().should('include.text', 'Record-Level');
        transmissionsSummaryObjects.elements.dqaCardRecordLevel().click();
        commonPage.verifyUrl('&view=dqa&tab=record-level');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();

        // Can't guarantee either Element-Level or Record-Level Advisory Distribution will exist
        cy.get('body').then(($body) => {
            let elementExists = true;
            let recordExists = true;

            transmissionsSummaryObjects.elements.dqaCardElementLevel().find(':nth-child(1)').invoke('text').then((text) => {
                if (text == '0') {
                    elementExists = false;
                }
            });

            transmissionsSummaryObjects.elements.dqaCardRecordLevel().find(':nth-child(1)').invoke('text').then((text) => {
                if (text == '0') {
                    recordExists = false;
                }
            });

            cy.wrap(null).then(() => {
                if (elementExists && recordExists) {
                    transmissionsSummaryObjects.elements.dqaAdvisoryText().eq(0).find('h3').should('have.text', 'Element-Level Advisory Distribution');
                    transmissionsSummaryObjects.elements.dqaAdvisoryText().eq(1).find('h3').should('have.text', 'Record-Level Advisory Distribution');
                } else if (elementExists) {
                    transmissionsSummaryObjects.elements.dqaAdvisoryText().find('h3').should('have.text', 'Element-Level Advisory Distribution');
                } else if (recordExists) {
                    transmissionsSummaryObjects.elements.dqaAdvisoryText().find('h3').should('have.text', 'Record-Level Advisory Distribution');
                } else {
                    cy.log('Neither Element-Level nor Record-Level Advisory Distribution exists');
                }
            });
        });
        transmissionsSummaryObjects.elements.dqaLink().should('have.text', 'See Data Quality Advisory Details');
        transmissionsSummaryObjects.elements.dqaLink().click();
        commonPage.verifyUrl('&view=dqa');
    });
    it("Verify the fields and links in the Compliance Report card", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.complianceCardHeader().should('have.text', 'Compliance Report');
        transmissionsSummaryObjects.elements.complianceCardElementLevel().should('include.text', 'Element-Level');
        transmissionsSummaryObjects.elements.complianceCardElementLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=element-level');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.complianceCardRecordLevel().should('include.text', 'Record-Level');
        transmissionsSummaryObjects.elements.complianceCardRecordLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=record-level');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.complianceCardFileLevel().should('include.text', 'File-Level');
        transmissionsSummaryObjects.elements.complianceCardFileLevel().click();
        commonPage.verifyUrl('&view=compliance&tab=file-level');
        transmissionsSummaryObjects.clickSummaryBreadcrumb();
        transmissionsSummaryObjects.elements.complianceCardElementBar().should('have.text', 'Element-Level Compliance');
        transmissionsSummaryObjects.elements.complianceCardRecordBar().should('have.text', 'Record-Level Compliance');
        transmissionsSummaryObjects.elements.complianceCardLink().should('have.text', 'See Full Compliance Report');
        transmissionsSummaryObjects.elements.complianceCardLink().click();
        commonPage.verifyUrl('&view=compliance');
    });
    it("Verify the fields and links in the File Notes card", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.fileNotesCardHeader().should('have.text', 'File Notes');
        transmissionsSummaryObjects.elements.fileNotesCardLink().should('have.text', 'See All File Notes');
        transmissionsSummaryObjects.elements.fileNotesCardLink().click();
        commonPage.verifyUrl('&view=notes');
    });
    it("Verify SAO user can submit transmissions", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.transmissionSubmitBtn().click();
        transmissionsSummaryObjects.elements.submissionModalHeader().should('have.text', 'Submit File Review');
        transmissionsSummaryObjects.elements.submissionModalSubheader().should('have.text', 'You have chosen the following transmission for submission');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(0).children().eq(0).should('have.text', 'File Number:');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(1).children().eq(0).should('have.text', 'File Name:');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(2).children().eq(0).should('have.text', 'Report Period:');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(3).children().eq(0).should('have.text', 'File Type:');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(4).children().eq(0).should('have.text', 'Compliance Status:');
        transmissionsSummaryObjects.elements.submissionModalTable().eq(5).children().eq(0).should('have.text', 'Potential Penalty:');
        transmissionsSummaryObjects.elements.submissionModalFooter().should('have.text', 'This file will become the "active" submission of record for this report period for monitoring and data analysis purposes. In addition, regular and corrected file submissions will be reviewed for compliance with NYTD standards by ACF.');
        transmissionsSummaryObjects.elements.submissionModalSubmitBtn().should('have.text', 'Confirm Submit');
        transmissionsSummaryObjects.elements.submissionModalCancelBtn().should('have.text', 'Cancel');
        transmissionsSummaryObjects.elements.submissionModalCancelBtn().click();
        transmissionsSummaryObjects.elements.transmissionSubmitBtn().click();
        commonPage.elements.headerH3Text().invoke('text').then((fileNum) => {
            const cleanedFileNum = fileNum.replace('File #', '').trim();
            transmissionsSummaryObjects.elements.submissionModalSubmitBtn().click();
            transmissionPage.elements.successModalHeader().should('have.text', 'Success!');
            transmissionPage.elements.successModalText().should('have.text', `File ${cleanedFileNum} was successfully submitted.`);
            transmissionPage.elements.successModalBtn(cleanedFileNum).should('have.text', 'Return to Transmissions Page');
            transmissionPage.elements.successModalBtn().click();
        });

    });
    it("Verify SAO user can delete transmissions", function () {
        cy.visit('/User.html');
        commonPage.clickOnTransmissionsTab();
        transmissionPage.elements.firstTableLink().click();
        transmissionsSummaryObjects.elements.transmissionDeleteBtn().click();
        transmissionsSummaryObjects.elements.deleteModalHeader().should('have.text', 'Delete File Review');
        transmissionsSummaryObjects.elements.deleteModalSubheader().should('have.text', 'You have chosen the following transmission for deletion');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(0).children().eq(0).should('have.text', 'File Number:');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(1).children().eq(0).should('have.text', 'File Name:');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(2).children().eq(0).should('have.text', 'Report Period:');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(3).children().eq(0).should('have.text', 'File Type:');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(4).children().eq(0).should('have.text', 'Compliance Status:');
        transmissionsSummaryObjects.elements.deleteModalTable().eq(5).children().eq(0).should('have.text', 'Potential Penalty:');
        transmissionsSummaryObjects.elements.deleteModalFooter().should('have.text', 'This file will be deleted from the NYTD database and will no longer be available.');
        transmissionsSummaryObjects.elements.deleteModalDeleteBtn().should('have.text', 'Confirm Delete');
        transmissionsSummaryObjects.elements.deleteModalCancelBtn().should('have.text', 'Cancel');
        transmissionsSummaryObjects.elements.deleteModalCancelBtn().click();
        transmissionsSummaryObjects.elements.transmissionDeleteBtn().click();
        commonPage.elements.headerH3Text().invoke('text').then((fileNum) => {
            const cleanedFileNum = fileNum.replace('File #', '').trim();
            transmissionsSummaryObjects.elements.deleteModalDeleteBtn().click();
            transmissionPage.elements.successModalHeader().should('have.text', 'Success!');
            transmissionPage.elements.successModalText().should('have.text', `File ${cleanedFileNum} was successfully deleted.`);
            transmissionPage.elements.successModalBtn(cleanedFileNum).should('have.text', 'Return to Transmissions Page');
            transmissionPage.elements.successModalBtn().click();
        });
    });
});