
class UserAccountManagementObjects {
  elements = {
    manageUserAccountRequestsBtn: () => cy.get('[data-testid="manage_user_account_requests"]'), // Manage User Account Requests button
    nameSearchText: () => cy.get('[data-testid="label"]'), // Name search text
    nameSearchInput: () => cy.get('[data-testid="textInput"]'), // Name search input
    primaryRoleDropdown: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Primary Role'), // Primary role dropdown
    primaryRoleChildren: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Primary Role').get('[data-testid="radio"]').children(), // Primary role dropdown children options
    secondaryRoleDropdown: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Secondary Role'), // Secondary Role dropdown.
    secondaryRoleChildren: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Secondary Role').get('[data-testid="checkbox"]').children(), // Secondary role dropdown children options
    otherFiltersDropdown: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Other Filters'), // Other filters dropdown
    otherFiltersChildren: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Other Filters').get('[data-testid="checkbox"]').children(), // Other filters dropdown children options
    regionalDropdown: () => cy.get(':nth-child(2) > .styles_button__uj25O'), // Regional filters dropdown
    regionalChildren: () => cy.get('[data-testid="dropdown_wrapper"]').contains('Region').get('[data-testid="checkbox"]').children(), // Regional filters dropdown children options
    stateDropdown: () => cy.get(':nth-child(3) > .styles_button__uj25O'), // Regional filters dropdown
    stateChildren: () => cy.get('[data-testid="dropdown_wrapper"]').contains('State').get('[data-testid="checkbox"]').children(), // Other filters dropdown children options
    tableLink: () => cy.get('[data-testid="uam_link"]'), // Username table link
    firstTableLink: () => cy.get(':nth-child(1) > :nth-child(2) > [data-testid="uam_link"]'), // First username table link
    firstRowFourthCol: () => cy.get(':nth-child(1) > :nth-child(5) > p'), // First primary role
    firstRowFifthCol: () => cy.get(':nth-child(1) > :nth-child(6) > p'), // First secondary role
    tableFirstHeader: () => cy.get('[name="userName"]'), // Table first header
    tableSecondHeader: () => cy.get('[name="firstName"]'), // Table second header
    tableThirdHeader: () => cy.get('[name="lastName"]'), // Table third header
    tableFourthHeader: () => cy.get('[name="primaryRole"]'), // Table fourth header
    tableFifthHeader: () => cy.get('[name="secondaryRole"]'), // Table fifth header
    tableSixthHeader: () => cy.get('[name="emailAddress"]'), // Table sixth header
    tableSeventhHeader: () => cy.get('[name="phoneNumber"]'), // Table seventh header
    removalIcon: () => cy.get('[aria-label="Pending User Removal Request"]'), // Removal icon
    elevationIcon: () => cy.get('[aria-label="Pending Role Elevation Request"]'), // Elevation icon
    tableErrorHeader: () => cy.get('h2'), // Table error header
    deletedUserTitle: () => cy.get(':nth-child(1) > [title="Deleted User"]'), // Deleted user title
    editPageUsername: () => cy.get('.styles_frame__z_r5H > :nth-child(1) > p'), // Edit page username
    editPageName: () => cy.get('#main_content'), // Edit page name
    editPageEmail: () => cy.get('.styles_frame__z_r5H > :nth-child(2) > p'), // Edit page email
    editPageReceivesEmails: () => cy.get(':nth-child(3) > p'), // Edit page receives emails
    editPageStateManagerButton: () => cy.get('[data-testid="elevate_account_button_State Manager"]'), // Edit page state manager button
    editPageSAOButton: () => cy.get('[data-testid="elevate_account_button_State Authorized Official"]'), // Edit page SAO button
    editPageEditButton: () => cy.get('[data-testid="Edit_user_button"]'), // Edit page edit button
    editPageUnlockAccButton: () => cy.get('[data-testid="unlock_account_button"]'), // Edit page unlock account button
    editPageRemoveUserButton: () => cy.get('[data-testid="remove_user_button"]'), // Edit page remove user button
    editPageDeleteUserButton: () => cy.get('[data-testid="delete_user_button"]'), // Edit page delete user button
  }

  clickOnCancelRequestBtn() {
    this.elements.cancelRequestBtn().invoke("removeAttr", "target", "_blank").click();
  }

  typeNameSearchInput(name) {
    this.elements.nameSearchInput().type(name);
  }

  clickOnPrimaryRoleDropdown() {
    this.elements.primaryRoleDropdown().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnSecondaryRoleDropdown() {
    this.elements.secondaryRoleDropdown().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnRegionalDropdown() {
    this.elements.regionalDropdown().invoke("removeAttr", "target", "_blank").click();
  }

  clickOnStateDropdown() {
    this.elements.stateDropdown().click();
  }

  checkAllStates() {
    // To do add all states
    this.elements.stateChildren().should('contain', 'Alabama');
  }

  clickOnOtherFiltersDropdown() {
    this.elements.otherFiltersDropdown().invoke("removeAttr", "target", "_blank").click();
  }

  getColumnData(columnNumber) {
    return cy.get(`table tr td:nth-child(${columnNumber})`).then(columnCells => {
      const textContents = Array.from(columnCells).map(cell => cell.innerText);
      return textContents;
    });
  }

  checkIsArraySorted(columnNumber, checkType) {
    this.getColumnData(columnNumber).then(columnData => {
      cy.log(columnData.join(', '));
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
      cy.log(sortedItems.join(', '));

      expect(columnData).to.deep.equal(sortedItems);
    });
  }

  checkIsEmailArraySorted(columnNumber, checkType) {
    this.getColumnData(columnNumber).then(columnData => {
      cy.log(columnData.join(', '));
      let sortedItems = [];
      if (checkType === 'ascending') {
        sortedItems = [...columnData].sort((a, b) => {
            const localPartA = a.replace(/[-_.+@]/g, '');
            const localPartB = b.replace(/[-_.+@]/g, '');
            // cy.log('part a :' + localPartA + ' part b :' + localPartB + ' = ' + localPartA.localeCompare(localPartB, undefined, { sensitivity: 'base', numeric: true }));
            return a.replace(/[-_.+@]/g, '').localeCompare(b.replace(/[-_.+@]/g, ''), undefined, { sensitivity: 'base' });
        });
    } else if (checkType === 'descending') {
        sortedItems = [...columnData].sort((a, b) => {
            const localPartA = a.replace(/[-_.+@]/g, '');
            const localPartB = b.replace(/[-_.+@]/g, '');
            // cy.log('part a :' + localPartA + ' part b :' + localPartB + ' = ' + localPartA.localeCompare(localPartB, undefined, { sensitivity: 'base', numeric: true }));
            return b.replace(/[-_.+@]/g, '').localeCompare(a.replace(/[-_.+@]/g, ''), undefined, { sensitivity: 'base' });
        });
    }
      cy.log(sortedItems.join(', '));

      expect(columnData).to.deep.equal(sortedItems);
    });
  }

  clickPrimaryRoleCheckbox(num) {
    this.elements.primaryRoleChildren().get('[data-testid="radio"]').eq(num).click();
  }

  clickSecondaryRoleCheckbox(num) {
    this.elements.secondaryRoleChildren().get('[data-testid="checkbox"]').eq(num).click();
  }

  clickRegionalCheckbox(num) {
    this.elements.regionalChildren().get('[data-testid="checkbox"]').eq(num).click();
  }

  clickStateCheckbox(num) {
    this.elements.stateChildren().eq(num).click();
  }

  clickDeletedUserCheckbox() {
    this.elements.otherFiltersChildren().get('[data-testid="checkbox"]').contains('Show Deleted Users').click();
  }



}
export default UserAccountManagementObjects;