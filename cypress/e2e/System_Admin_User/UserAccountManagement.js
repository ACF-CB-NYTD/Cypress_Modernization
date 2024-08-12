import CommonPageObjects from "../pages/CommonPageObjects";
const commonPage = new CommonPageObjects();
import UserAccountManagementObjects from "../pages/UserAccountManagementObjects";
const userAccountManagement = new UserAccountManagementObjects();
describe("UAM Page Validations", function () {
    beforeEach(() => {
        cy.login('nytdsysadmin', 'P@ssw0rd') // Login with session, implemented in commands.js
    });
    it("Verify User Account Management page buttons, text fields, checkboxes and dropdowns", function () {
        cy.visit('/User.html');
        commonPage.verifyUrl('/User');
        commonPage.clickOnAccountSettingsDropdown();
        commonPage.clickOnUserAccountManagementSelect();
        commonPage.elements.headerH3Text().should('have.text', 'User Account Management');
        commonPage.elements.pageDescriptionText().should('contain', 'Leave the filter blank if you wish to receive all column results. The filter will return transmissions that meet the criteria you select after clicking the "Refresh Results" button. To clear a filter, press the X (delete) button in the panel.');
        userAccountManagement.elements.manageUserAccountRequestsBtn().should('have.text', 'Manage User Account Requests');
        userAccountManagement.elements.nameSearchText().should('have.text', 'Search Name');
        userAccountManagement.elements.nameSearchInput().should('exist');
        userAccountManagement.elements.primaryRoleDropdown().should('contain', 'Primary Role');
        userAccountManagement.elements.primaryRoleChildren().should('contain', 'System Administrator').and('contain', 'CB Central Office User').and('contain', 'Regional Office User').and('contain', 'State User');
        userAccountManagement.elements.secondaryRoleDropdown().should('contain', 'Secondary Role');
        userAccountManagement.elements.secondaryRoleChildren().should('contain', 'Data Export').and('contain', 'Standard User').and('contain', 'State Manager').and('contain', 'State Authorized Official');
        userAccountManagement.elements.otherFiltersDropdown().should('contain', 'Other Filters');
        userAccountManagement.elements.otherFiltersChildren().should('contain', 'Show Deleted Users');
        commonPage.elements.clearFiltersBtn().should('contain', 'Clear Filters');
        commonPage.elements.refreshResultsBtn().should('have.text', 'Refresh Results');
        userAccountManagement.elements.tableFirstHeader().should('have.text', 'Username');
        userAccountManagement.elements.tableSecondHeader().should('have.text', 'First Name');
        userAccountManagement.elements.tableThirdHeader().should('have.text', 'Last Name');
        userAccountManagement.elements.tableFourthHeader().should('have.text', 'Primary Role');
        userAccountManagement.elements.tableFifthHeader().should('have.text', 'Secondary Role(s)');
        userAccountManagement.elements.tableSixthHeader().should('have.text', 'Email');
        userAccountManagement.elements.tableSeventhHeader().should('have.text', 'Phone');
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(3).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(3).click();
        userAccountManagement.elements.regionalDropdown().should('contain', 'Region');
        userAccountManagement.elements.regionalChildren().should('contain', 'Region 1').and('contain', 'Region 2').and('contain', 'Region 3').and('contain', 'Region 4').and('contain', 'Region 5').and('contain', 'Region 6').and('contain', 'Region 7').and('contain', 'Region 8').and('contain', 'Region 9').and('contain', 'Region 10')
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(4).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(4).click();
        userAccountManagement.elements.stateDropdown().should('contain', 'State');
        userAccountManagement.checkAllStates();
        userAccountManagement.clickOnPrimaryRoleDropdown();
    });

    it("Verify Regional and CB Office Staff users will not be able to access the User Account Management page.", function () {
        cy.visit('/User.html');
        commonPage.clickOnLogoutBtn();
        cy.standardLogin('nytdregional', 'P@ssw0rd1');
        commonPage.clickOnAccountSettingsDropdown();
        commonPage.elements.userAccountManagementSelect().should('not.exist');
        commonPage.clickOnLogoutBtn();
        cy.standardLogin('nytdcb', 'P@ssw0rd1');
        commonPage.clickOnAccountSettingsDropdown();
        commonPage.elements.userAccountManagementSelect().should('not.exist');
    });

    it("Verify the filter inputs and dropdowns are working as expected", function () {
        cy.visit('/User/Account.html');
        userAccountManagement.typeNameSearchInput('Test');
        cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').then((text) => {
            commonPage.clickOnRefreshResultsBtn();
            cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').contains(text.text()).should('not.exist');
        });
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.typeNameSearchInput('Test');
        cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').then((text) => {
            commonPage.clickOnMagnifyingGlassSearchIcon();
            cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').contains(text.text()).should('not.exist');
        });
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.typeNameSearchInput('Test');
        cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').then((text) => {
            userAccountManagement.typeNameSearchInput('{enter}');
            cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]').contains(text.text()).should('not.exist');
        });
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(1).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(1).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(5) > p').should('have.text', 'System Administrator');
        userAccountManagement.clickOnSecondaryRoleDropdown();
        userAccountManagement.elements.secondaryRoleChildren().get('[data-testid="checkbox"]').eq(0).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(6) > p').should('have.text', 'Data Export');
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(2).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(2).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(5) > p').should('have.text', 'CB Central Office User');
        userAccountManagement.clickOnSecondaryRoleDropdown();
        userAccountManagement.elements.secondaryRoleChildren().get('[data-testid="checkbox"]').eq(0).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(6) > p').should('have.text', 'Data Export');
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(3).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(3).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(5) > p').should('have.text', 'Regional Office User');
        userAccountManagement.clickOnRegionalDropdown();
        userAccountManagement.elements.regionalChildren().get('[data-testid="checkbox"]').eq(0).click();
        userAccountManagement.elements.regionalChildren().get('[data-testid="checkbox"]').eq(1).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(6) > p').invoke('text').then((text) => {
            if (text.includes('Region 1')) {
                expect(text).to.include('Region 1');
            }
            else if (text.includes('Region 2')) {
                expect(text).to.include('Region 2');
            }
            else {
                expect(text).to.include('Fail');
            }
        });
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(4).click();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(4).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > :nth-child(5) > p').should('have.text', 'State User');
        userAccountManagement.clickOnStateDropdown();
        userAccountManagement.elements.stateChildren().eq(7).click();
        userAccountManagement.elements.stateChildren().eq(9).click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get('tbody > :nth-child(1) > :nth-child(7)').invoke('text').then((text) => {
            if (text.includes('Alabama')) {
                expect(text).to.include('Alabama');
            }
            else if (text.includes('Alaska')) {
                expect(text).to.include('Alaska');
            }
            else {
                expect(text).to.include('Fail');
            }
        });
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.clickOnOtherFiltersDropdown();
        userAccountManagement.elements.otherFiltersChildren().get('[data-testid="checkbox"]').contains('Show Deleted Users').click();
        commonPage.clickOnRefreshResultsBtn();
        cy.get(':nth-child(1) > [title="Deleted User"]').should('contain', 'Deleted User');
    });
    it("As a System Administrator, I want to verify the Pending removal and pending elevation icons in the table", function () {
        cy.visit('/User/Account.html');
        userAccountManagement.typeNameSearchInput('removalIconTest');
        commonPage.clickOnRefreshResultsBtn();
        userAccountManagement.elements.removalIcon().should('exist');
        commonPage.clickOnClearFiltersBtn();
        userAccountManagement.typeNameSearchInput('elevationIconTest');
        commonPage.clickOnRefreshResultsBtn();
        userAccountManagement.elements.elevationIcon().should('exist');
    });

    it("Verify the Refresh Results button is greyed out by default", function () {
        cy.visit('/User/Account.html');
        commonPage.elements.refreshResultsBtn().should('be.disabled');
        userAccountManagement.clickOnPrimaryRoleDropdown();
        userAccountManagement.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(1).click();
        commonPage.elements.refreshResultsBtn().should('not.be.disabled');
    });

    it("Verify the Manage User Account Requests button works", function () {
        cy.visit('/User/Account.html');
        userAccountManagement.elements.manageUserAccountRequestsBtn().click();
        commonPage.elements.headerH3Text().should('have.text', 'User Account Requests');
    });

    it("Verify the No Users Founds page functionality", function () {
        cy.visit('/User/Account.html');
        userAccountManagement.typeNameSearchInput('TestABC123DoesNotExist');
        commonPage.clickOnRefreshResultsBtn();
        cy.get('h2').should('have.text', 'No Users Found');
    });

    it("Verify the user hyperlinks in the table", function () {
        cy.visit('/User/Account.html');
        userAccountManagement.elements.tableLink().first().then((text) => {
            const username = text.text();
            userAccountManagement.elements.tableLink().first().click();
            cy.get('.styles_frame__z_r5H > :nth-child(1) > p').should('have.text', username);
        });

    });

    it("Verify the table can be sorted by clicking the header", function () {
        cy.visit('/User/Account.html');
        // Default array check
        userAccountManagement.checkIsArraySorted(2, 'ascending');
        // Check username after 1 click
        userAccountManagement.elements.tableFirstHeader().click();
        userAccountManagement.checkIsArraySorted(2, 'descending');
        // Check username after a second click
        userAccountManagement.elements.tableFirstHeader().click();
        userAccountManagement.checkIsArraySorted(2, 'ascending');
        // Check First Name after a click
        userAccountManagement.elements.tableSecondHeader().click();
        userAccountManagement.checkIsArraySorted(3, 'descending');
        // Check First Name after a second click
        userAccountManagement.elements.tableSecondHeader().click();
        userAccountManagement.checkIsArraySorted(3, 'ascending');
        // Check Last Name after a click
        userAccountManagement.elements.tableThirdHeader().click();
        userAccountManagement.checkIsArraySorted(4, 'descending');
        // Check Last Name after a second click
        userAccountManagement.elements.tableThirdHeader().click();
        userAccountManagement.checkIsArraySorted(4, 'ascending');
        // Check Primary Role after a click
        userAccountManagement.elements.tableFourthHeader().click();
        userAccountManagement.checkIsArraySorted(5, 'descending');
        // Check Primary Role after a second click
        userAccountManagement.elements.tableFourthHeader().click();
        userAccountManagement.checkIsArraySorted(5, 'ascending');
        // Check Secondary Role after a click
        userAccountManagement.elements.tableFifthHeader().click();
        userAccountManagement.checkIsArraySorted(6, 'descending');
        // Check Secondary Role after a second click
        userAccountManagement.elements.tableFifthHeader().click();
        userAccountManagement.checkIsArraySorted(6, 'ascending');
        // Check Email after a click
        userAccountManagement.elements.tableSixthHeader().click();
        userAccountManagement.checkIsEmailArraySorted(7, 'descending');
        // Check Email after a second click
        userAccountManagement.elements.tableSixthHeader().click();
        userAccountManagement.checkIsEmailArraySorted(7, 'ascending');
        // Check Phone after a click
        userAccountManagement.elements.tableSeventhHeader().click();
        userAccountManagement.checkIsArraySorted(8, 'descending');
        // // Check Phone after a second click
        userAccountManagement.elements.tableSeventhHeader().click();
        userAccountManagement.checkIsArraySorted(8, 'ascending');

    });

    it("Verify the pagination functionality", function () {
        cy.visit('/User/Account.html');
        commonPage.elements.previousPaginationBtn().should('not.exist');
        commonPage.elements.currentPaginationBtn().should('have.attr', 'aria-label', 'Page 1');
        commonPage.clickOnNextPaginationBtn();
        commonPage.elements.previousPaginationBtn().should('exist');
        commonPage.elements.currentPaginationBtn().should('have.attr', 'aria-label', 'Page 2');
        commonPage.clickOnLastPaginationBtn();
        commonPage.elements.nextPaginationBtn().should('not.exist');
        commonPage.clickOnFirstPaginationBtn();
        userAccountManagement.elements.tableLink().should('have.length', 10);
        commonPage.clickOnTwentyfiveResultsBtn();
        userAccountManagement.elements.tableLink().should('have.length', 25);
        commonPage.clickOnFiftyResultsBtn();
        userAccountManagement.elements.tableLink().should('have.length', 50);
    });
});