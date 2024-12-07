class EditMyProfilePageObjects {
    firstName = this.generateRandomFirstName();
    lastName = this.generateRandomLastName();
    phone = this.generateRandomPhoneNumber();


    elements = {
        firstNameText: () => cy.get('.styles_inputBoxSpan__qUJQU > div:nth-child(1) > label'), //First name text
        firstNameTextBox: () => cy.get('#firstName'), //First name text box
        lastNameText: () => cy.get('.styles_inputBoxSpan__qUJQU > div:nth-child(2) > label'), //Last name text
        lastNameTextBox: () => cy.get('#lastName'), //Last name text box
        usernameText: () => cy.get('span:nth-child(2) > div:nth-child(1) > label'), //User name text
        usernameTextBox: () => cy.get('#userName'), //User name text box
        phoneText: () => cy.get('span:nth-child(2) > div:nth-child(2) > label'), //Phone text
        phoneTextBox: () => cy.get('#phone'), //Phone text box
        userEmailText: () => cy.get('span:nth-child(3) > div.usa-form-group.styles_width100__c_EwO > label'), //User email text
        userEmailTextBox: () => cy.get('#userEmail'), //user email text box
        receivesEmailNotificationsText: () => cy.get('div.styles_inputStyleCheckbox__Y75Lf > fieldset > legend'), //Receives email notification text
        receivesEmailNotificationsCheckbox: () => cy.get('#receiveEmailNotifications'), //Receives email notification checkbox
        primaryRoleText: () => cy.get('span > span > p.styles_roleTitle__sI0_r'), //Primary role text
        primaryRoleInformationIcon: () => cy.get('button.styles_iconOnlyButton__jK5lV'), //Primary role information icon
        primaryRoleTextForState: () => cy.get('.styles_inputBoxes__jaCG4 > :nth-child(1) > .styles_roleTitle__sI0_r'), //Primary role text for state mng
        stateUserForTestStateStateText: () => cy.get('.styles_primaryRoleRow__y90fr'), //Primary role for state mng
        secondaryRoleTextForState: () => cy.get('.styles_span__DfGgm > .styles_starAlign__0k_WA > .styles_roleTitle__sI0_r'), //Primary role text
        systemAdministratorRadioButton: () => cy.get(':nth-child(2) > .usa-radio__label'), //System administrator radio button
        standardUserRadioButton: () => cy.get(':nth-child(2) > .usa-radio__label'), //Standard user radio button
        stateManagerRadioButton: () => cy.get(':nth-child(3) > .usa-radio__label'), //State manager radio button
        stateAuthorizationOfficialRadioButton: () => cy.get(':nth-child(4) > .usa-radio__label'), //State manager radio button
        cbCentralOfficeStaffMemberRadioButton: () => cy.get(':nth-child(3) > .usa-radio__label'), //CB Central office staff member radio button
        regionalOfficeUserRadioButton: () => cy.get(':nth-child(4) > .usa-radio__label'), //Regional office user radio button
        additionalPermissionsText: () => cy.get('.styles_span__DfGgm > .styles_roleTitle__sI0_r'), //Additional permission text
        dataExportCheckBox: () => cy.get('.styles_inputStyleOuterBox__t9AJ5 > [data-testid="fieldset"] > [data-testid="checkbox"] > .usa-checkbox__label'), //Data exportCheckBox
        accountSecurityText: () => cy.get('.styles_accountSecurity__Ng6cC'), //AccountSecurityText
        previewEditsButton: () => cy.get('[data-testid="preview_edits_button"]'), //Preview edits button
        deleteMyAccountButton: () => cy.get('[data-testid="delete_user_button"]'), //Delete my account button
        currentUserInformationText: () => cy.get(':nth-child(4) > [data-layer="Content"]'), //Current user information text
        currentUserInfoFirstName: () => cy.get(':nth-child(1) > .styles_field__qOPLO'), //Current user information first name
        currentUserInfoLastName: () => cy.get(':nth-child(2) > .styles_field__qOPLO'), //Current user information last name
        currentUserInfoUsername: () => cy.get(':nth-child(3) > .styles_field__qOPLO'), //Current user information username
        currentUserInfoUserEmail: () => cy.get(':nth-child(4) > .styles_field__qOPLO'), //Current user information email
        currentUserInfoReceivesEmail: () => cy.get(':nth-child(5) > .styles_field__qOPLO'), //Current user information receives email
        currentUserInfoPhone: () => cy.get(':nth-child(6) > .styles_field__qOPLO'), //Current user information phone 
        currentUserInfoState: () => cy.get(':nth-child(7) > .styles_field__qOPLO'), //Current user information state
        currentUserInfoStateAuthorizationOfficial: () => cy.get(':nth-child(8) > .styles_field__qOPLO'), //Current user information state authorization official
        currentUserInfoManager: () => cy.get(':nth-child(9) > .styles_field__qOPLO'), //Current user information manager
        currentUserInfoPrimaryRole: () => cy.get(':nth-child(7) > .styles_field__qOPLO'), //Current user information primary role
        currentUserInfoDataExport: () => cy.get(':nth-child(8) > .styles_field__qOPLO'), //Current user information data export
        currentUserInfoAccountLocked: () => cy.get(':nth-child(9) > .styles_field__qOPLO'), //Current user information account locked
        currentUserInfoAccountLockedStateMng: () => cy.get(':nth-child(10) > .styles_field__qOPLO'), //Current user information account locked
        currentUserInfo: () => cy.get('.styles_alertText__uV_MD'), //Current user information
        cancelDeleteBtn: () => cy.get('#cancel_button'), //cancel button for delete
        cancelButtonForEditMyProfile: () => cy.get('[data-testid="button"]'), //cancel button for editing
        saveEditsButton: () => cy.get('#uam-confirm-edits-modal > div > div > div > div > div > span > button'), //Save edits from the modal
        editUserInfoModalText: () => cy.get('#editUserInfo'), //Edit User Information header text from the modal
        oldInformationText: () => cy.get(' tr > th.styles_oldInfoText__ZKyDf'), //Old information text from the modal
        revisedInformationText: () => cy.get('th.styles_newInfoText___BkZZ'), //Revised information text from the modal
        oldInformationFName: () => cy.get('tr:nth-child(1) > td.styles_oldInfoText__ZKyDf'), //Old information text from the modal
        oldInformationLName: () => cy.get('tr:nth-child(2) > td.styles_oldInfoText__ZKyDf'), //Old information text from the modal
        oldInformationNumber: () => cy.get('tr:nth-child(3) > td.styles_oldInfoText__ZKyDf'), //Old information text from the modal
        revisedInformationFName: () => cy.get('tr:nth-child(1) > td.styles_newInfoText___BkZZ'), //Revised information text from the modal
        revisedInformationLName: () => cy.get('tr:nth-child(2) > td.styles_newInfoText___BkZZ'), //Revised information text from the modal
        revisedInformationNumber: () => cy.get('tr:nth-child(3) > td.styles_newInfoText___BkZZ'), //Revised information text from the modal
        editsSuccessfulText: () => cy.get('#heading_label'), //Revised information text from the modal
        successMsg: () => cy.get('#modal_subtitle_description'), //Success msg from the modal
        continueBtnForSuccessModal: () => cy.get('#success_modal_button'), //Success modal continue button
        primaryRoleInformationText: () => cy.get('.usa-alert__body'), //Primary role information text
        primaryRoleInformationTextForStateAuth: () => cy.get('.usa-alert__body'), //Primary role information text
        primaryRoleInformationTextForRegionalUser: () => cy.get('.usa-alert__body'), //Primary role information text for regional office
        unsavedChangesModal: () => cy.get('.usa-modal__heading'), //Unsaved changes header text
        modalSubtitle: () => cy.get('#modal_subtitle'), //Unsaved changes text
        discardChangesButton: () => cy.get('ul > li:nth-child(1) > button'), //Discard changes button
        continueEditing: () => cy.get('ul > li:nth-child(2) > button'), // Continue editing
        
    }
    generateRandomFirstName(){
        const randomName = ['John','Phil','Mark','Mike','Jane','Kate','Smith','Anna','Clark','Bruce','David'];
        const randomIndex = Math.floor(Math.random() * randomName.length);
        return randomName[randomIndex];
    }
    generateRandomLastName() {
        const randomName = ['John', 'Phil', 'Mark', 'Mike', 'Jane', 'Kate', 'Smith', 'Anna', 'Clark', 'Bruce', 'David'];
        const randomIndex = Math.floor(Math.random() * randomName.length);
        return randomName[randomIndex];
    }

    generateRandomPhoneNumber() {
    const areaCode = Math.floor(100 + Math.random() * 900); // 3 digits
    const firstPart = Math.floor(100 + Math.random() * 900); // 3 digits
    const secondPart = Math.floor(1000 + Math.random() * 9000); // 4 digits
    return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    enterFirstName(){
        this.elements.firstNameTextBox().clear().type(this.firstName);
    }
    enterLastName() {
        this.elements.lastNameTextBox().clear().type(this.lastName);
    }
    enterPhoneNumber() {
        this.elements.phoneTextBox().clear().type(this.phone);
    }
    clickOnPreviewEdits() {
        this.elements.previewEditsButton().click();
    }

    clickOnSaveEdits() {
        this.elements.saveEditsButton().click();
    }

    clickOnContinueEditing() {
        this.elements.continueEditing().click();
    }

    clickOnDiscardChanges() {
        this.elements.discardChangesButton().click();
    }

    clickOnContinueBtn() {
        this.elements.continueBtnForSuccessModal().click();
    }

    clickOnCancelButton() {
        this.elements.cancelButtonForEditMyProfile().click();
    }

    clickOnPrimaryRoleInformationIcon() {
        this.elements.primaryRoleInformationIcon().click();
    }
    enterDefaultUsernamePasswordAndPhone(defaultFirstName,defaultLastName,phone){
        this.elements.firstNameTextBox().clear().type(defaultFirstName);
        this.elements.lastNameTextBox().clear().type(defaultLastName);
        this.elements.phoneTextBox().clear().type(phone);
    }


}
export default EditMyProfilePageObjects;