import { timeout } from "async";
import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();

import ManageUserAccountRequestObjects from "../pages/ManageUserAccountRequestObjects";
import userAccountRequestFormObjects from "../pages/UserAccountRequestFormObjects";
const manageUserAccountRequestObjects = new ManageUserAccountRequestObjects();
describe("SAO UAR Page Validations", function () {
    beforeEach(() => {
        cy.login('teststatesao', 'P@ssw0rd1') // Login with session, implemented in commands.js
    });
    it("Verify User Account Requests page buttons, text fields, checkboxes and dropdowns", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnAccountSettingsDropdown();
        commonPage.clickOnUserAccountManagementSelect();
        commonPage.elements.headerH3Text().should('have.text', 'User Account Management');
        commonPage.clickOnManageUserAccountRequestsBtn();
        commonPage.verifyUrl('/Account/Requests');
        commonPage.verifyBreadCrumbs('User Account Management', 'User Account Requests');
        commonPage.elements.headerH3Text().should('have.text', 'User Account Requests');
        manageUserAccountRequestObjects.elements.descriptionText().should('have.text', 'The following requests are in the NYTD system.');
        commonPage.elements.exportBtn().should('have.text', 'Export Current Table');
        manageUserAccountRequestObjects.elements.nameSearchLabel().should('have.text', 'Name Search');
        manageUserAccountRequestObjects.elements.requestedDateLabel().should('have.text', 'Requested Date');
        manageUserAccountRequestObjects.elements.updatedDateLabel().should('have.text', 'Updated Date');
        manageUserAccountRequestObjects.elements.nameSearchInput().should('exist');
        manageUserAccountRequestObjects.elements.requestedDateInput().should('exist');
        manageUserAccountRequestObjects.elements.updatedDateInput().should('exist');
        manageUserAccountRequestObjects.elements.requestTypeDropdown().should('contain', 'Request Type');
        manageUserAccountRequestObjects.elements.statusDropdown().should('contain', 'Status');
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('have.text', 'Refresh Results');
        manageUserAccountRequestObjects.elements.requestTypeDropdown().click();
        manageUserAccountRequestObjects.elements.requestTypeChildren().should('contain', 'Create State User').should('contain', 'Elevate to State Authorized Official').should('contain', 'Elevate to State Manager').should('contain', 'Remove User');
        manageUserAccountRequestObjects.elements.statusDropdown().click();
        manageUserAccountRequestObjects.elements.statusChildren().should('contain', 'Submitted').should('contain', 'Requested by State Authorized Official').should('contain', 'Submitted, no State Authorized Official').should('contain', 'Approved by State Authorized Official').should('contain', 'Approved').should('contain', 'Completed').should('contain', 'Declined');
        manageUserAccountRequestObjects.elements.tableFirstHeader().should('have.text', 'Request Type');
        manageUserAccountRequestObjects.elements.tableSecondHeader().should('have.text', 'First Name');
        manageUserAccountRequestObjects.elements.tableThirdHeader().should('have.text', 'Last Name');
        manageUserAccountRequestObjects.elements.tableFourthHeader().should('have.text', 'Request Date');
        manageUserAccountRequestObjects.elements.tableFifthHeader().should('have.text', 'Status');
        manageUserAccountRequestObjects.elements.tableSixthHeader().should('have.text', 'Updated By');
        manageUserAccountRequestObjects.elements.tableSeventhHeader().should('have.text', 'Updated On');
    });
    it("Verify the date range pickers can be selected and the shown requests are within the range", function () {
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        cy.login('teststateuser', 'P@ssw0rd1')
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.inputRequestedDateRange();
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.requestedDateStart().then((startDate) => {
            manageUserAccountRequestObjects.elements.requestedDateEnd().then((endDate) => {
                manageUserAccountRequestObjects.elements.requestedDateInTable().each((date) => {
                    expect(new Date(date.text())).to.be.gte(new Date(startDate.text()));
                    expect(new Date(date.text())).to.be.lte(new Date(endDate.text()));
                })
            })
        });
        manageUserAccountRequestObjects.inputUpdatedDateRange();
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.updatedDateStart().then((startDate) => {
            manageUserAccountRequestObjects.elements.updatedDateEnd().then((endDate) => {
                manageUserAccountRequestObjects.elements.updatedDateInTable().each((date) => {
                    expect(new Date(date.text())).to.be.gte(new Date(startDate.text()));
                    expect(new Date(date.text())).to.be.lte(new Date(endDate.text()));
                })
            })
        });
    });
    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Account/Requests.html');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });
    it("Verify the default table sorting is by Request Date by default", function () {
        cy.visit('/User/Account/Requests.html');
        // Default array check
        manageUserAccountRequestObjects.checkIsArraySorted(4, 'descending');
    });
    it("Verify the table can be sorted by the Request Type header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableFirstHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(1, 'ascending');
        manageUserAccountRequestObjects.elements.tableFirstHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(1, 'descending');
    });
    it("Verify the table can be sorted by the First Name header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableSecondHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(2, 'ascending');
        manageUserAccountRequestObjects.elements.tableSecondHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(2, 'descending');
    });
    it("Verify the table can be sorted by the Last Name header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableThirdHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(3, 'descending');
        manageUserAccountRequestObjects.elements.tableThirdHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(3, 'ascending');
    });
    it("Verify the table can be sorted by the Request Date header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableFourthHeader().click();
        manageUserAccountRequestObjects.checkIsDateSorted(4, 'descending');
        manageUserAccountRequestObjects.elements.tableFourthHeader().click();
        manageUserAccountRequestObjects.checkIsDateSorted(4, 'ascending');
    });
    it("Verify the table can be sorted by the Status header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableFifthHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(5, 'ascending');
        manageUserAccountRequestObjects.elements.tableFifthHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(5, 'descending');
    });
    it("Verify the table can be sorted by the Updated By header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableSixthHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(6, 'ascending');
        manageUserAccountRequestObjects.elements.tableSixthHeader().click();
        manageUserAccountRequestObjects.checkIsArraySorted(6, 'descending');
    });
    it("Verify the table can be sorted by the Updated On header", function () {
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.elements.tableSeventhHeader().click();
        manageUserAccountRequestObjects.checkIsDateSorted(7, 'descending');
        manageUserAccountRequestObjects.elements.tableSeventhHeader().click();
        manageUserAccountRequestObjects.checkIsDateSorted(7, 'ascending');
    });
    // Needs a FName user premade
    it("Verify clicking a request type hyperlink opens the request in a new page", function () {
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        cy.login('cypress.sao', 'P@ssw0rd1')
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.elements.requestDateData().then((requestedDate) => {
            manageUserAccountRequestObjects.elements.updatedOnData().then((updatedDate) => {
                const months = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                //Calculated requested date text
                const requestedDateText = requestedDate.text();
                const dateParts = requestedDateText.split(' ');
                let [month, day, year] = dateParts[0].split('/');
                // Ensure day and month are two digits
                day = day.padStart(2, '0');
                const timeParts = dateParts[1].split(' ');
                const time = timeParts[0];
                const formattedRequestDate = `${months[parseInt(month, 10) - 1]} ${day}, ${year} ${time} ET`;
                //Calculated updated date text
                const updatedDateText = updatedDate.text();
                const updatedDateParts = updatedDateText.split(' ');
                const [updatedMonth, updatedDay, updatedYear] = updatedDateParts[0].split('/');
                const updatedTimeParts = updatedDateParts[1].split(' ');
                const updatedTime = updatedTimeParts[0];
                const formattedUpdatedDate = `${months[parseInt(updatedMonth, 10) - 1]} ${updatedDay}, ${updatedYear} ${updatedTime} ET`;
                manageUserAccountRequestObjects.elements.firstTableHyperlink().click({ force: true });
                manageUserAccountRequestObjects.elements.requestRequestedDate().should('have.text', 'Requested on' + formattedRequestDate);
                manageUserAccountRequestObjects.elements.requestUpdatedDate().should('have.text', 'Last updated on ' + formattedUpdatedDate);
            })
        })
        commonPage.verifyUrl('/User/Account/Requests/RequestDetails');
        commonPage.elements.headerH3Text().should('have.text', 'Create State User');
        manageUserAccountRequestObjects.elements.descriptionText().should('have.text', 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cum excepturi repudiandae, nam neque sit, aperiam voluptates voluptatem veniam exercitationem autem. Sunt velit tempore, molestias sequi voluptas rem, similique at quisquam dolores culpa eligendi ipsam! Repellat, iste? Culpa quia atque sequi consectetur, sunt eaque, perferendis voluptate neque totam repellendus nam!');
        manageUserAccountRequestObjects.elements.requestStatusText().should('have.text', 'Status: Submitted');
        manageUserAccountRequestObjects.elements.requestLeftInfo().should('contain', 'Account Details').should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.requestRightInfo().should('contain', 'User Details').should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.requestAdditionalComments().should('have.text', 'Comments:(Required to deny request)');
        manageUserAccountRequestObjects.elements.commentInputText().should('exist');
        manageUserAccountRequestObjects.elements.createQuickActionBtn().should('contain', 'Create User');
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().should('contain', 'Deny').should('be.disabled');
        manageUserAccountRequestObjects.elements.backToAllRequestsBtn().should('have.text', 'Back to All Requests');
        manageUserAccountRequestObjects.elements.commentInputText().type('test');
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().should('not.be.disabled');
    });
    it("Verify clicking buttons in the request details page", function () {
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        cy.login('cypress.sao', 'P@ssw0rd1');
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstTableHyperlink().click();
        commonPage.verifyUrl('/User/Account/Requests/RequestDetails');
        manageUserAccountRequestObjects.elements.backToAllRequestsBtn().click();
        commonPage.verifyUrl('/User/Account/Requests');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstTableHyperlink().click();
        commonPage.verifyUrl('/User/Account/Requests/RequestDetails');
        manageUserAccountRequestObjects.typeCommentInputText('test');
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().click();
        manageUserAccountRequestObjects.elements.denyRequestHeader().should('have.text', 'User Request Denied');
        manageUserAccountRequestObjects.elements.requestConfirmationText().should('have.text', 'The request to add State User test@gov.net has been denied. A confirmation message has been sent to the requester.');
        manageUserAccountRequestObjects.elements.denyConfirmationBtn().should('have.text', 'Continue').click();
        commonPage.verifyUrl('/User/Account/Requests');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(6);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().should('have.text', 'FName');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Declined');
        commonPage.clickOnClearFiltersBtn();
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstTableHyperlink().click();
        commonPage.verifyUrl('/User/Account/Requests/RequestDetails');
        manageUserAccountRequestObjects.elements.createQuickActionBtn().click();
        manageUserAccountRequestObjects.elements.createRequestHeader().should('have.text', 'New User Request Approved');
        manageUserAccountRequestObjects.elements.requestConfirmationText().should('have.text', 'You have successfully approved the request to add State User with the email test@gov.net. This request has been sent to a System Administrator for final confirmation.')
        manageUserAccountRequestObjects.elements.createConfirmationBtn().should('have.text', 'Continue').click();
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(3);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().should('have.text', 'FName');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Approved by State Authorized Official');
        commonPage.clickOnLogoutBtn();
        cy.standardLogin('cypress.sysadmin', 'P@ssw0rd1');
        cy.visit('/User/Account');
        commonPage.clickOnManageUserAccountRequestsBtn();
        commonPage.verifyUrl('/Account/Requests');
        manageUserAccountRequestObjects.typeNameInput('FName');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(3);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().click();
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.denyBtn().click();
    });
    // Needs a FName user premade
    it("Verify Create Quick Action button for Create State User", function () {
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        cy.login('cypress.sao', 'P@ssw0rd1');
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.createQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.elements.modalHeader().should('have.text', 'Create New User Account?');
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments(optional)');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.createBtn().should('have.text', 'Create User');
        manageUserAccountRequestObjects.elements.createCancelBtn().should('have.text', 'Cancel');
        manageUserAccountRequestObjects.elements.createCancelBtn().click();
        manageUserAccountRequestObjects.elements.createQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.createBtn().click();
        manageUserAccountRequestObjects.elements.createRequestHeader().should('have.text', 'New User Request Approved');
        manageUserAccountRequestObjects.elements.requestConfirmationText().should('have.text', 'You have successfully approved the request to add State User with the email test@gov.net. This request has been sent to a System Administrator for final confirmation.')
        manageUserAccountRequestObjects.elements.createConfirmationBtn().should('have.text', 'Continue').click();
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(3);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().should('have.text', 'FName');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Approved by State Authorized Official');
        commonPage.clickOnLogoutBtn();
        cy.standardLogin('cypress.sysadmin', 'P@ssw0rd1');
        cy.visit('/User/Account');
        commonPage.clickOnManageUserAccountRequestsBtn();
        commonPage.verifyUrl('/Account/Requests');
        manageUserAccountRequestObjects.typeNameInput('FName');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(3);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.denyBtn().click();
    });
    // Needs a FName user premade
    it("Verify Deny Quick Action button for Create State or Federal User", function () {
        manageUserAccountRequestObjects.createStateUserRequest('State user', 'FName', 'test@gov.net');
        cy.login('cypress.sao', 'P@ssw0rd1');
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(0);
        manageUserAccountRequestObjects.typeNameInput('FName');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.elements.modalHeader().should('have.text', 'Deny New User Account?', {timeout: 10000});
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments*');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.denyBtn().should('have.text', 'Deny Request').should('be.disabled');
        manageUserAccountRequestObjects.elements.denyCancelBtn().should('have.text', 'Cancel').click();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.denyBtn().click();
        manageUserAccountRequestObjects.elements.denyRequestHeader().should('have.text', 'User Request Denied');
        manageUserAccountRequestObjects.elements.requestConfirmationText().should('have.text', 'The request to add State User test@gov.net has been denied. A confirmation message has been sent to the requester.');
        manageUserAccountRequestObjects.elements.denyConfirmationBtn().should('have.text', 'Continue').click();
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(6);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().should('contain', 'FName');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Declined');
    });
    it("Verify Elevate Quick Action button for Elevate to State Manager or Elevate to State Authorized Official", function () {
        manageUserAccountRequestObjects.createElevationRequest();
        cy.login('cypress.sao', 'P@ssw0rd1')
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(1);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(2);
        manageUserAccountRequestObjects.typeNameInput('cypress');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.elevateQuickActionBtn().first().click();
        manageUserAccountRequestObjects.elements.elevateRequestHeader().should('have.text', 'Elevate User Account?');
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments(optional)');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.elevateBtn().should('have.text', 'Elevate User');
        manageUserAccountRequestObjects.elements.elevateCancelBtn().should('have.text', 'Cancel').click();
        manageUserAccountRequestObjects.elements.elevateQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.elevateBtn().click();
        manageUserAccountRequestObjects.elements.elevateConfirmationHeader().click();
        commonPage.clickOnClearFiltersBtn();
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(1);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(2);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(5);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstTableHyperlink().invoke('text').should('match', /Elevate to State Authorized Official|Elevate to State Manager/);
        commonPage.clickOnLogoutBtn();
        cy.standardLogin('cypress.sysadmin', 'P@ssw0rd1');
        cy.visit('/User/Account');
        manageUserAccountRequestObjects.typeNameInput('cypress.default');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.deElevateCypressDefault();
    });
    it("Verify Deny Quick Action button for Elevate to State Manager or Elevate to State Authorized Official", function () {
        manageUserAccountRequestObjects.createElevationRequest();
        cy.login('cypress.sao', 'P@ssw0rd1');
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(1);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(2);
        manageUserAccountRequestObjects.typeNameInput('cypress');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.elements.modalHeader().should('be.visible', {timeout: 10000}).should('have.text', 'Deny Elevate User Account?');
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments*');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.denyElevateBtn().should('have.text', 'Deny Elevation Request').should('be.disabled');
        manageUserAccountRequestObjects.elements.denyElevateCancelBtn().should('have.text', 'Cancel');
        manageUserAccountRequestObjects.elements.denyElevateCancelBtn().click();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.denyElevateBtn().click();
        manageUserAccountRequestObjects.elements.denyElevateHeader().should('have.text', 'Elevation Request Denied');
        manageUserAccountRequestObjects.elements.requestConfirmationText().should('have.text', 'The request to elevate  tyler.smith+cypressdefault@icf.com to State Authorized Official has been denied. A confirmation message has been sent to the requester.');
        manageUserAccountRequestObjects.elements.denyElevateConfirmationBtn().should('have.text', 'Continue').click();
        commonPage.clickOnClearFiltersBtn();
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(1);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(6);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().eq(0).should('contain', 'cypress');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Declined');
    });
    it("Verify Remove Quick Action button for Remove User", function () {
        manageUserAccountRequestObjects.createRemoveRequest();
        cy.login('cypress.sao', 'P@ssw0rd1');
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(3);
        manageUserAccountRequestObjects.typeNameInput('cypress');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.removeQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.elements.modalHeader().should('have.text', 'Delete User Account?');
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments(optional)');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.removeBtn().should('have.text', 'Delete User');
        manageUserAccountRequestObjects.elements.removeCancelBtn().should('have.text', 'Cancel');
        manageUserAccountRequestObjects.elements.removeCancelBtn().click();
        manageUserAccountRequestObjects.elements.removeQuickActionBtn().eq(0).click();
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.removeCancelBtn().click();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.removeDenyBtn().click();
    });
    it("Verify Deny Quick Action button for Remove User", function () {
        manageUserAccountRequestObjects.createRemoveRequest();
        cy.login('cypress.sao', 'P@ssw0rd1')
        cy.visit('/User/Account/Requests.html');
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(0);
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(3);
        manageUserAccountRequestObjects.typeNameInput('cypress');
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.elements.modalHeader().should('have.text', 'Deny Remove User Account?');
        manageUserAccountRequestObjects.elements.firstInfo().should('contain', 'Request Type').should('contain', 'User Role').should('contain', 'Office').should('contain', 'State');
        manageUserAccountRequestObjects.elements.secondInfo().should('contain', 'First Name').should('contain', 'Last Name').should('contain', 'Title').should('contain', 'Phone').should('contain', 'Email');
        manageUserAccountRequestObjects.elements.commentsText().should('have.text', 'Comments*');
        manageUserAccountRequestObjects.elements.commentsArea().should('exist');
        manageUserAccountRequestObjects.elements.removeDenyBtn().should('have.text', 'Keep User').should('be.disabled');
        manageUserAccountRequestObjects.elements.removeDenyCancelBtn().should('have.text', 'Cancel');
        manageUserAccountRequestObjects.elements.removeDenyCancelBtn().click();
        manageUserAccountRequestObjects.elements.denyQuickActionBtn().eq(0).click({ force: true });
        manageUserAccountRequestObjects.typeComment('Test comment');
        manageUserAccountRequestObjects.elements.removeDenyBtn().click();
        manageUserAccountRequestObjects.elements.removeDenyRequestBtn().click();
        commonPage.clickOnClearFiltersBtn();
        manageUserAccountRequestObjects.clickOnRequestTypeDropdownCheckbox(3);
        manageUserAccountRequestObjects.clickOnStatusDropdownCheckbox(6);
        commonPage.clickOnRefreshResultBtn();
        manageUserAccountRequestObjects.elements.firstNameData().should('contain', 'cypress');
        manageUserAccountRequestObjects.elements.firstStatusData().should('contain', 'Declined');
    });
});