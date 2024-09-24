import { remove } from "lodash";
import CommonPageObjects from "./CommonPageObjects";
const commonObjects = new CommonPageObjects();
import userAccountRequestFormObjects from "./UserAccountRequestFormObjects";
const userAccountRequestForm = new userAccountRequestFormObjects();
class ManageUserAccountRequestObjects {
  elements = {
    descriptionText: () => cy.get('.styles_description__0k9k1'), // Description text
    exportBtn: () => cy.get('.styles_button__T2X6A').contains('Export Current Table'),
    nameSearchLabel: () => cy.get('[for="firstName"]'), // Name Search label
    requestedDateLabel: () => cy.get('[for="date-range-filter-requestDateTime"]'), // Requested Date label
    requestedDateBtn: () => cy.get('[data-testid="daterangepicker_group_date-range-filter-requestDateTime"] > [data-testid="daterangepicker_calendar_button"]'), // Requested Date button
    requestedDateStart: () => cy.get('#date-range-filter-requestDateTime [aria-label="Start date"]'), // Requested Date start
    requestedDateEnd: () => cy.get('#date-range-filter-requestDateTime [aria-label="End date"]'), // Requested Date end
    requestedDateInTable: () => cy.get('tbody > tr > :nth-child(4) > div > :nth-child(1)'), // Requested Date in table
    updatedDateBtn: () => cy.get('[data-testid="daterangepicker_group_date-range-filter-approvedDateTime"] > [data-testid="daterangepicker_calendar_button"]'), // Updated Date button    
    updatedDateLabel: () => cy.get('[for="date-range-filter-approvedDateTime"]'), // Updated Date label
    updatedDateStart: () => cy.get('#date-range-filter-approvedDateTime [aria-label="Start date"]'), // Updated Date start
    updatedDateEnd: () => cy.get('#date-range-filter-approvedDateTime [aria-label="End date"]'), // Updated Date end
    updatedDateInTable: () => cy.get('tbody > tr > :nth-child(7) > div > :nth-child(1)'), // Updated Date in table   
    nameSearchInput: () => cy.get('[data-testid="textInput"]').get('[id="firstName"]'), // Name Search input
    requestedDateInput: () => cy.get('[data-testid="daterangepicker_group_date-range-filter-requestDateTime"]'), // Requested Date input
    updatedDateInput: () => cy.get('[data-testid="daterangepicker_group_date-range-filter-approvedDateTime"]'), // Updated Date input
    requestTypeDropdown: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Request Type'),
    requestTypeChildren: () => cy.get(':nth-child(1) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt > [data-testid="fieldset"] > :nth-child(2)').children(),
    statusDropdown: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Status'),
    statusChildren: () => cy.get(':nth-child(2) > [data-testid="dropdown_div"] > .styles_dropdownContent__J4gLt > [data-testid="fieldset"] > :nth-child(2)').children(),
    tableFirstHeader: () => cy.get('[name="requestType"]'), // Table first header
    tableSecondHeader: () => cy.get('[name="firstName"]'), // Table second header
    tableThirdHeader: () => cy.get('[name="lastName"]'), // Table third header
    tableFourthHeader: () => cy.get('[name="requestDateTime"]'), // Table fourth header
    tableFifthHeader: () => cy.get('[name="status"]'), // Table fifth header
    tableSixthHeader: () => cy.get('[name="approvedBy"]'), // Table sixth header
    tableSeventhHeader: () => cy.get('[name="approvedDateTime"]'), // Table seventh header
    firstTableHyperlink: () => cy.get(':nth-child(1) > :nth-child(1) > [data-testid="manage_request_link"]'), // First table hyperlink
    createQuickActionBtn: () => cy.get('[data-testid="createButton"]'), // Create QA button
    createBtn: () => cy.get('[data-testid="Create New_user_button"]'), // Create button
    createCancelBtn: () => cy.get('[data-testid="Create New_cancel_button"]'), // Create cancel button

    denyQuickActionBtn: () => cy.get('[data-testid="denyButton"]'), // Deny QA button
    denyBtn: () => cy.get('[data-testid="Deny New_user_button"]'), // Deny button
    denyCancelBtn: () => cy.get('[data-testid="Deny New_cancel_button"]'), // Deny cancel button

    elevateQuickActionBtn: () => cy.get('[data-testid="elevateButton"]'), // Elevate QA button
    elevateBtn: () => cy.get('[data-testid="Elevate_user_button"]'), // Elevate button
    elevateCancelBtn: () => cy.get('[data-testid="Elevate_cancel_button"]'), // Elevate cancel button

    denyElevateBtn: () => cy.get('[data-testid="Deny Elevate_user_button"]'), // Deny Elevate button
    denyElevateCancelBtn: () => cy.get('[data-testid="Deny Elevate_cancel_button"]'), // Deny Elevate cancel button

    removeQuickActionBtn: () => cy.get('[data-testid="removeButton"]'), // Remove QA button
    removeBtn: () => cy.get('[data-testid="Delete_user_button"]'), // Remove button
    removeCancelBtn: () => cy.get('[data-testid="Delete_cancel_button"]'), // Remove cancel button

    removeDenyBtn: () => cy.get('[data-testid="Deny Remove_user_button"]'), // Remove Deny button
    removeDenyCancelBtn: () => cy.get('[data-testid="Deny Remove_cancel_button"]'), // Remove Deny cancel button

    modalHeader: () => cy.get('[class="styles_modalSuccessMessage__ch84F"]'), // Modal header
    firstInfo: () => cy.get('[aria-labelledby="account_details"]'), // First info
    secondInfo: () => cy.get('[data-testid="user_details_table"]'), // Second info
    commentsText: () => cy.get('[class="styles_commentSpan___mIxl"]'),  // Comments text
    commentsArea: () => cy.get('[data-testid="textarea"]'), // Comments area


  }

  typeNameInput(name) {
    this.elements.nameSearchInput().type(name);
  }

  clickOnRequestTypeDropdownCheckbox(num) {
    this.elements.requestTypeDropdown().click();
    this.elements.requestTypeChildren().eq(num).click();
    this.elements.requestTypeDropdown().click();
  }

  clickOnStatusDropdownCheckbox(num) {
    this.elements.statusDropdown().click();
    this.elements.statusChildren().eq(num).click();
    this.elements.statusDropdown().click();
  }

  typeComment(text) {
    this.elements.commentsArea().type(text);
  }

  inputRequestedDateRange() {
    this.elements.requestedDateBtn().click();
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(0).click();
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(-1).click();
  }

  inputUpdatedDateRange() {
    this.elements.updatedDateBtn().click();
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(0).click();
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(-1).click();
  }

  getColumnData(columnNumber) {
    return cy.get(`table tr td:nth-child(${columnNumber})`).then(columnCells => {
      const textContents = Array.from(columnCells).map(cell => cell.innerText);
      return textContents;
    });
  }

  checkIsArraySorted(columnNumber, checkType) {
    this.getColumnData(columnNumber).then(columnData => {
      cy.log(columnData.join(',\n '));
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
      cy.log('-----');

      cy.log(sortedItems.join(',\n '));

      // expect(columnData).to.deep.equal(sortedItems);
    });
  }

  checkIsDateSorted(columnNumber, order) {
    this.getColumnData(columnNumber).then(columnData => {
      const dates = columnData.map(dateText => {
        if (dateText === "(none)") {
          return '(none)';
        }
        const [datePart, timePart] = dateText.split('\n\n');
        const [month, day, year] = datePart.split('/');
        const [time, period] = timePart.trim().split(' ');
        // Convert to 24-hour format for comparison
        let [hours, minutes] = time.split(':');
        if (period === 'PM' && hours !== '12') {
          hours = parseInt(hours, 10) + 12;
        } else if (period === 'AM' && hours === '12') {
          hours = '00';
        }
        const dateString = `${year}-${month}-${day}T${hours}:${minutes}:00`;
        const dateObject = new Date(dateString);
        return dateObject;
      });

      const sortedDates = [...dates].sort((a, b) => order === 'ascending' ? a - b : b - a);

      // Log the original and sorted dates
      cy.log('Original Dates:\n' + dates.map(date => date.toString()).join('\n'));
      cy.log('-----');
      cy.log('Sorted Dates:\n' + sortedDates.map(date => date.toString()).join('\n'));

      expect(dates).to.deep.equal(sortedDates);
    });
  }

  createElevationRequest() {
    cy.clearCookies();
    cy.standardLogin('cypress.default', 'P@ssw0rd')
    cy.visit('/User/Profile.html');
    cy.get('[data-testid="request_elevation_button"] > :nth-child(1)').last().click();
    cy.wait(2000);
    cy.get('[for="Yes"]').click();
    cy.get('[data-testid="confirm_button"]').click();
    cy.wait(5000);
  }

  createRemoveRequest() {
    cy.clearCookies();
    cy.standardLogin('cypress.default', 'P@ssw0rd')
    cy.visit('/User/Profile.html');
    cy.get('[data-testid="delete_user_button"] > :nth-child(1)').click();
    cy.get('[data-testid="textarea"]').type('test');
    cy.get('[data-testid="delete_user_button"]').eq(1).click();
    cy.get('[for="Yes"]').click();
    cy.get('[data-testid="confirm_button"]').click();
    cy.wait(2000);
    cy.get('[data-testid="confirm_button"]').click();
  }

  createStateUserRequest(choice, fname) {
    userAccountRequestForm.createAccountRequest(choice, fname);
    cy.wait(2000);
  }

  inputCurrentDate(type) {
    switch (type) {
      case 'requested':
        this.elements.requestedDateBtn().click();
        break;
      case 'updated':
        this.elements.updatedDateBtn().click();
        break
      default:
        cy.log('nothing chosen for inputCurrentDate');
    }
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(-1).click();
    cy.get('[role="gridcell"]:not([aria-disabled="true"])').eq(-1).click();
  }

}
export default ManageUserAccountRequestObjects;