class TransmissionPageObjects {
    elements = {
        fileSearchName: () => cy.get('[for="transmissionId"]'), // Name Search label
        fileSearchInput: () => cy.get('[data-testid="textInput"]'),
        dateRangeName: () => cy.get('[for="date-range-filter-fileReceivedDate"]'),
        dateRangeInput: () => cy.get('[data-testid="date-range-picker"]'),
        dateRangeBtn: () => cy.get('[data-testid="daterangepicker_calendar_button"]'),
        penaltyDropdown: () => cy.get('div.styles_buttonGroup__NYJPa > div:nth-child(1)', {timeout : 10000}),
        penaltyDropdownCompliance: () => cy.get('[data-testid="dropdown_wrapper"]').eq(0).find('[data-testid="fieldset"]').children().eq(1).children(),
        penaltyDropdownNonCompliance: () => cy.get('[data-testid="dropdown_wrapper"]').eq(0).find('[data-testid="fieldset"]').children().eq(2).children(),
        reportPeriodDropdown: () => cy.get('div.styles_buttonGroup__NYJPa > div:nth-child(2)', {timeout : 10000}),
        reportPeriodDropdownOptions: () => cy.get('[data-testid="dropdown_wrapper"]').eq(1).find('[data-testid="fieldset"]').children().eq(1).children(),
        fileTypeDropdown: () => cy.get('div.styles_buttonGroup__NYJPa > div:nth-child(3)', {timeout : 10000}),
        fileTypeDropdownOptions: () => cy.get('[data-testid="dropdown_wrapper"]').eq(2).find('[data-testid="fieldset"]').children().eq(1).children(),
        fileNumberHeader: () => cy.get('[name="transmissionId"]'),
        reportPeriodHeader: () => cy.get('[name="reportingPeriod"]'),
        transmissionDateHeader: () => cy.get('[name="fileReceivedDate"]'),
        fileTypeHeader: () => cy.get('[name="transmissionType"]'),
        complianceHeader: () => cy.get('[name="complianceStatus"]'),
        penaltyHeader: () => cy.get('[name="potentialPenalty"]'),

        tableFirstHeader: () => cy.get('[name="transmissionId"]'),
        tableSecondHeader: () => cy.get('[name="reportingPeriod"]'),
        tableThirdHeader: () => cy.get('[name="fileReceivedDate"]'),
        tableFourthHeader: () => cy.get('[name="transmissionType"]'),
        tableFifthHeader: () => cy.get('[name="complianceStatus"]'),
        tableSixthHeader: () => cy.get('[name="potentialPenalty"]'),

        firstTableLink: () => cy.get(':nth-child(1) > :nth-child(2) > .usa-link'),
        firstPenaltyLink: () => cy.get(':nth-child(1) > [align="center"] > .usa-link'),
        penaltyTableData: () => cy.get('tbody > :nth-child(1) > :nth-child(6)', { timeout: 10000 }),
        reportPeriodTableData: () => cy.get('tbody > :nth-child(1) > :nth-child(3)', { timeout: 10000 }),
        fileTypeTableData: () => cy.get('tbody > :nth-child(1) > :nth-child(5)', { timeout: 10000 }),
        firstTransmissionArrowBtn: () => cy.get(':nth-child(1) > [style="width: 62px;"] > .nytd-icon-button', {timeout: 10000}),
        transmissionDetails: () => cy.get('[class="styles_container__EboDE"]'),
        readyModalHeader: () => cy.get('[class="usa-modal__heading"]:visible'),
        readyModalText: () => cy.get('[class="usa-modal__content"]').find('[class="usa-prose"]:visible'),
        readyModalFooter: () => cy.get('[class="usa-modal__content"]').find('[data-testid="modalFooter"]:visible'),

        errorHeader: () => cy.get('.styles_heading__wNxLX', { timeout: 30000 }),
        errorText: () => cy.get('.styles_description__0DZVg'),
        errorRefreshBtn: () => cy.get('.styles_action__oJXCb'),

        uploadTransmissionBtn: () => cy.get('[data-testid="button"]').contains('Upload New Transmission'),

        quickActionSubmit: () => cy.get('[class="nytd-button--secondary styles_quickActionEdit__D9YjA"]'),
        quickActionDelete: () => cy.get('[class="nytd-button--secondary nytd-button--error styles_quickActionDelete__WUBjC"]'),

        returnBreadcrumb: () => cy.get(':nth-child(2) > .styles_liOther__1TGKl'),
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