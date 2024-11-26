import { timeInterval } from "rxjs";
class TransmissionPageObjects {
    elements = {
        fileSearchName: () => cy.get('[for="transmissionId"]'), // Name Search label
        fileSearchInput: () => cy.get('[id="transmissionId"]'), // Name Search input
        dateRangeName: () => cy.get('[for="date-range-filter-fileReceivedDate"]'), // Date Range label
        dateRangeInput: () => cy.get('[data-testid="date-range-picker"]'), // Date Range input
        dateRangeBtn: () => cy.get('[data-testid="daterangepicker_calendar_button"]'), // Date Range button
        penaltyDropdown: () => cy.get('div.styles_buttonGroup__NYJPa', { timeout: 10000 }).contains('Penalty'), // Penalty dropdown
        reportPeriodDropdown: () => cy.get('div.styles_buttonGroup__NYJPa', { timeout: 10000 }).contains('Report Period'), //report period dropdown
        fileTypeDropdown: () => cy.get('div.styles_buttonGroup__NYJPa', { timeout: 10000 }).contains('File Type'), //file type dropdown
        stateDropdown: () => cy.get('div.styles_buttonGroup__NYJPa', { timeout: 10000 }).contains('State'), //state dropdown
        firstDropdownContent: () => cy.get(':nth-child(1) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt'), //first dropdown content
        secondDropdownContent: () => cy.get(':nth-child(2) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt'), //second dropdown content
        thirdDropdownContent: () => cy.get(':nth-child(3) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt'), //third dropdown content
        fourthDropdownContent: () => cy.get(':nth-child(4) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt'), //fourth dropdown content
        fileNumberHeader: () => cy.get('[name="transmissionId"]'), // table header
        reportPeriodHeader: () => cy.get('[name="reportingPeriod"]'), // table header
        transmissionDateHeader: () => cy.get('[name="fileReceivedDate"]'), // table header
        fileTypeHeader: () => cy.get('[name="transmissionType"]'), // table header
        complianceHeader: () => cy.get('[name="complianceStatus"]'), // table header
        penaltyHeader: () => cy.get('[name="potentialPenalty"]'), // table header
        stateHeader: () => cy.get(':nth-child(3) > .styles_tableHeader__mVxy6 > .styles_fieldName__kegXV'),
        // tableFirstHeader: () => cy.get('[name="transmissionId"]'),
        // tableSecondHeader: () => cy.get('[name="reportingPeriod"]'),
        // tableThirdHeader: () => cy.get('[name="fileReceivedDate"]'),
        // tableFourthHeader: () => cy.get('[name="transmissionType"]'),
        // tableFifthHeader: () => cy.get('[name="complianceStatus"]'),
        // tableSixthHeader: () => cy.get('[name="potentialPenalty"]'),
        firstTableLink: () => cy.get(':nth-child(1) > :nth-child(2) > .usa-link', { timeout: 10000 }),
        firstPenaltyLink: () => cy.get(':nth-child(1) > [align="center"] > .usa-link'),
        firstTransmissionArrowBtn: () => cy.get(':nth-child(1) > [style="width: 62px;"] > .nytd-icon-button', { timeout: 10000 }),
        transmissionDetails: () => cy.get('[class="styles_container__EboDE"]'),
        readyModalHeader: () => cy.get('[class="usa-modal__heading"]:visible'),
        readyModalText: () => cy.get('[class="usa-modal__content"]').find('[class="usa-prose"]:visible'),
        readyModalFooter: () => cy.get('[class="usa-modal__content"]').find('[data-testid="modalFooter"]:visible'),
        downloadFileHeader: () => cy.get(':nth-child(7) > .styles_row__66FUN > .styles_title__ZGMcO'),
        errorHeader: () => cy.get('.styles_heading__wNxLX', { timeout: 30000 }),
        errorText: () => cy.get('.styles_description__0DZVg'),
        errorRefreshBtn: () => cy.get('.styles_action__oJXCb'),
        uploadTransmissionBtn: () => cy.get('[data-testid="button"]', { timeout: 10000 }).contains('Upload New Transmission'),
        uploadModalHeader: () => cy.get('[id="fileUploadID"]'),
        uploadModalAlert: () => cy.get('[data-testid="alert"]'),
        uploadModalLabels: () => cy.get('[class="usa-modal"]').find('[data-testid="label"]'),
        uploadConfirmationBtn: () => cy.get('button.styles_uploadButton__vdJ7F'),
        uploadBtn: () => cy.get('[id="chooseFile"]'),
        uploadInput: () => cy.get('[id="uploadXML"]'),
        uploadSuccessHeader: () => cy.get('[data-testid="success_modal_h1"]'),
        uploadSuccessText: () => cy.get('[id="modal_subtitle_description"]'),
        uploadSuccessBtn: () => cy.get('[id="success_modal_button"]'),
        stateSelect: () => cy.get('[id="state"]'),
        fileTypeSelect: () => cy.get('[id="fileType"]'),
        reportPeriodSelect: () => cy.get('[id="reportPeriod"]'),
        quickActionSubmit: () => cy.get('[class="nytd-button--secondary styles_quickActionEdit__D9YjA"]').eq(0),
        quickActionDelete: () => cy.get('[class="nytd-button--secondary nytd-button--error styles_quickActionDelete__WUBjC"]').eq(0),
        submissionModal: () => cy.get('[id="submission_confirmation"] > .usa-modal-overlay > .styles_modal__wKLbX > .usa-modal__content > .usa-modal__main'),
        deleteModal: () => cy.get('[id="deletion_confirmation"] > .usa-modal-overlay > .styles_modal__wKLbX > .usa-modal__content > .usa-modal__main'),
        successModal: () => cy.get('div.is-visible > .usa-modal-overlay > .usa-modal> .usa-modal__content > .usa-modal__main > .styles_modalOuterBox__XMA3b', { timeout: 10000 }),
        successModalHeader: () => this.elements.successModal().find('.styles_modalSuccessMessage__0PjOc'),
        successModalText: () => this.elements.successModal().find('.styles_iconSubtitleSpan__HkTlX > .styles_subtitle___RAKh'),
        successModalBtn: (fileNum) => cy.get(`[id="${fileNum.trim()}_modal_button"]`).eq(0),
        returnBreadcrumb: () => cy.get(':nth-child(2) > .styles_liOther__1TGKl'),
    }

    clickOnDQAElementLink() {
        this.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(0).click({ force: true });
    }

    clickOnRecordLink() {
        this.elements.transmissionDetails().children().eq(3).children().eq(1).find('a').eq(1).click({ force: true });
    }

    clickOnElementComplianceTotalLink() {
        this.elements.transmissionDetails().children().eq(4).children().eq(1).find('a').click({ force: true });
    }

    clickOnWorkflowStatusLink() {
        this.elements.transmissionDetails().children().eq(5).children().eq(1).click({ force: true });
    }

    clickOnDetailsDownloadLink() {
        this.elements.transmissionDetails().children().eq(6).children().eq(1).click({ force: true });
    }

    getTableData(sysadmin, column) {
        if (sysadmin) {
            switch (column) {
                case 'File Number':
                    return cy.get('tbody > :nth-child(1) > :nth-child(2)', { timeout: 10000 });
                case 'State':
                    return cy.get('tbody > :nth-child(1) > :nth-child(3)', { timeout: 10000 });
                case 'Report Period':
                    return cy.get('tbody > :nth-child(1) > :nth-child(4)', { timeout: 10000 });
                case 'File Type':
                    return cy.get('tbody > :nth-child(1) > :nth-child(6)', { timeout: 10000 });
                case 'Compliance':
                    return cy.get('tbody > :nth-child(1) > :nth-child(7)', { timeout: 10000 });
                case 'Penalty':
                    return cy.get('tbody > :nth-child(1) > :nth-child(8)', { timeout: 10000 });
                default:
                    return null;
            }
        } else {
            switch (column) {
                case 'File Number':
                    return cy.get('tbody > :nth-child(1) > :nth-child(2)', { timeout: 10000 });
                case 'Report Period':
                    return cy.get('tbody > :nth-child(1) > :nth-child(3)', { timeout: 10000 });
                case 'File Type':
                    return cy.get('tbody > :nth-child(1) > :nth-child(5)', { timeout: 10000 });
                case 'Compliance':
                    return cy.get('tbody > :nth-child(1) > :nth-child(6)', { timeout: 10000 }); 
                case 'Penalty':
                    return cy.get('tbody > :nth-child(1) > :nth-child(7)', { timeout: 10000 });
                default:
                    return null;
            }
        }
    }

    typeFileNumber(fileNum) {
        this.elements.fileSearchInput().type(fileNum);
    }

    getErrorHeader() {
        return this.elements.errorHeader();
    }

    getColumnData(columnNumber) {
        return cy.get(`table tr td:nth-child(${columnNumber})`).then(columnCells => {
            const textContents = Array.from(columnCells).map(cell => cell.innerText);
            return textContents;
        });
    }


    checkIsArraySorted(columnNumber, checkType) {
        this.getColumnData(columnNumber).then(columnData => {
            columnData = columnData.filter(entry => entry.trim() !== '');
            let sortedItems = [];
            if (checkType === 'ascending') {
                sortedItems = [...columnData].sort((a, b) => {
                    if (a === "(none)") return 1;
                    if (b === "(none)") return -1;
                    return a.replace(/[-_.]/g, '').localeCompare(b.replace(/[-_.]/g, ''), undefined, { sensitivity: 'base', numeric: true });
                });
            } else if (checkType === 'descending') {
                sortedItems = [...columnData].sort((a, b) =>
                    b.replace(/[-_.]/g, '').localeCompare(a.replace(/[-_.]/g, ''), undefined, { sensitivity: 'base' })
                );
            }
            expect(columnData).to.deep.equal(sortedItems);
        });
    }

    checkIsDateSorted(columnNumber, order = 'ascending') {
        this.getColumnData(columnNumber).then(columnData => {
            const sortedDates = [...columnData].sort((a, b) => {
                if (a === "(none)") return 1;
                if (b === "(none)") return -1;
                const [aMonth, aDay, aYear] = a.split('/').map(Number);
                const [bMonth, bDay, bYear] = b.split('/').map(Number);
                const aDate = new Date(aYear, aMonth - 1, aDay);
                const bDate = new Date(bYear, bMonth - 1, bDay);

                return order === 'ascending' ? aDate - bDate : bDate - aDate;
            });
            expect(columnData).to.deep.equal(sortedDates);
        });
    }
}
export default TransmissionPageObjects;