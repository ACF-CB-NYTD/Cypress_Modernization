class HomePageObjects {
    elements = {
        nytdIcon: () => cy.get('#main_body > div > div.styles_bodyLeft__L7HfP > div > div.styles_nytdLogo__vBerl > a'), // NYTD Icon 
        nytdPageLink: () => cy.get("[data-testid='nytd_link']"), // NYTD link
        welcomeToNytdText: () => cy.get('[data-testid="NYTD_welcome_title"]'), // Welcome msg
        nytdDiscriptionText: () => cy.get('[data-testid="NYTD_welcome_description"]'), // This is the information text for nytd
        nytdHelpDeskText: () => cy.get('[data-testid="Help_desk_title"]'), // NYTD help desk text
        phoneNumberLink: () => cy.get('[data-testid="phone_number_link"]'), // Phone number link to deal NYTD Help desk.
        emailLink: () => cy.get('[data-testid="email_link"]'), // Email link to sent email to Help desk .
        hoursOfOperationText: () => cy.get('[data-testid="hours_of_operation_text"]'), // Hours of operation text.
        nytdHelpDeskDaysOfOperationText: () => cy.get('.styles_hoursOfOperationText__JQbuy > :nth-child(1)'), // Help desk day of operation text.
        nytdHelpDeskHoursOfOperationText: () => cy.get('.styles_hoursOfOperationText__JQbuy > :nth-child(2)'), // Help desk work hours.
        stateUserTab: () => cy.get('[data-testid="state_user_button"]'), // State user tab for log in with username and password.
        federalUserTab: () => cy.get('[class="usa-button styles_inactiveButton__sAFAc"]'), // Federal user tab for log in with PAV Card
        loginInstructionsMsg: () => cy.get('[data-testid="state_instructions"]'), // Login instructions message text "Please enter your Username and Password and select Login to begin using the NYTD portal".
        usernameText: () => cy.get('.styles_formGroup1___KxLX > [data-testid="label"]'), // Username* text above the username input.
        usernameInput: () => cy.get('[data-testid="user_id_input"]'), // Username input, where to enter username.
        forgotUsernameText: () => cy.get('[data-testid="forgot_userName_link"]'), // Forgot username link under the username input witch is navigating to forgot username page.
        passwordText: () => cy.get('.styles_formGroup2___aa7w > [data-testid="label"]'), // Password* text above the password input.
        passwordInput: () => cy.get('[data-testid="password_input"]'), // Password input where to enter password. 
        forgotPasswordText: () => cy.get('[data-testid="forgot_password_link"]'), // Forgot password link under the password input witch is navigating to forgot password page.
        stateUserLoginBtn: () => cy.get('[data-testid="state_user_login_button"]'), // Login button for State User
        federalUserLoginBtn: () => cy.get('[data-testid="federal_submit"]'), // Login button for FederalUser User
        incorrectUsernameAndPasswordErrorMsg: () => cy.get('#validation_message'), // Error msg "Incorrect username or password. Please try again." when user enters incorrect username or password.
        federalUserLogInInstructionText: () => cy.get('[data-testid="federal_instructions"]'), // Federal user instruction text witch display after clicking on federal user tab.
        pavCardImage: () => cy.get('[data-testid="federal_card_image"]'), // Card image witch display after clicking on federal user tab
        requestYourNytdAccountNowLink: () => cy.get('[data-testid="request_account"]'), // Request Your nytd account link.
        privacyPolicyLink: () => cy.get('[data-testid="privacy_policy_link"]'), // Privacy policy link.
        securityComplianceStatement: () => cy.get('[data-testid="security_compliance_link"]'), // Security compliance statement link.
        vulnerabilityDisclosurePolicy: () => cy.get('[data-testid="vulnerability_link"]'), // Vulnerability disclosure policy link.
        unauthorizedAccessWarning: () => cy.get('[data-testid="unauthorized_access_link"]'), // Unauthorized Access warning link.
        hidePasswordIcon: () => cy.get('.nytd-icon-button > .usa-icon > path'), // Eye icon to hide the password
        securityComplianceStatementTitle: () => cy.get('[data-testid="security-compliance-option-label"]'), // Security compliance statement when you click on the link
        securityComplianceStatementDropdown: () => cy.get('[data-testid="Select"]'), // Security compliance statement dropdown when you click on the link
        responsibilitiesOfNYTDStateUserTitle: () => cy.get('h3'), // Responsibilities of a NYTD State User when you click on the link for security compliance statement
        responsibilitiesOfNYTDStateUserInfoText: () => cy.get('.styles_marginTop20px__e92EO'), // Responsibilities of a NYTD State User info text when you click on the link for security compliance statement
        responsibilitiesOfNYTDFederalUserInfoText: () => cy.get('.styles_marginTop20px__e92EO'), // Responsibilities of a NYTD Federal User info text when you click on the link for security compliance statement
        unauthorizedAccessWarningTextInfo: () => cy.get('.styles_div63__4P3dA'), // Unauthorized access warning text information
        backButton: () => cy.get('[data-testid="back_button"]'), // Back button to navigate to home page 
        yourAccountHasBeenLockedErrorMsg: () => cy.get("[id='validation_message']"), // Error msg for locked account
    }


    clickOnNYTDIcon() {
        this.elements.nytdIcon().invoke('removeAttr', 'target').click();
    }
    clickOnNYTDPageLink() {
        this.elements.nytdPageLink().invoke('removeAttr', 'target').click();
    }
    clickOnBackButton() {
        this.elements.backButton().click();
    }

    verifyEyeIconShowsPassword() {
        this.elements.passwordInput().should('have.value', '1234').and('have.attr', 'type', 'password')
        this.elements.hidePasswordIcon().click();
        this.elements.passwordInput().should('have.value', '1234').and('have.attr', 'type', 'text')
        this.elements.hidePasswordIcon().click();
        this.elements.passwordInput().should('have.value', '1234').and('have.attr', 'type', 'password')
    }

    clickOnPhoneNumber() {
        this.elements.phoneNumber().click();
    }
    clickOnRequestYourNYTDAccountNow() {
        this.elements.requestYourNytdAccountNowLink().should('have.text', 'Request your NYTD account now').click();
    }

    clickOnPrivacyPolicyLink() {
        this.elements.privacyPolicyLink().invoke('removeAttr', 'target').click();
    }
    clickOnSecurityComplianceStatementLink() {
        this.elements.securityComplianceStatement().invoke('removeAttr', 'target').click();
    }
    clickOnVulnerabilityDisclosurePolicyLink() {
        this.elements.vulnerabilityDisclosurePolicy().invoke('removeAttr', 'target').click();
    }
    clickOnUnauthorizedAccessWarningLink() {
        this.elements.unauthorizedAccessWarning().invoke('removeAttr', 'target').click();
    }

    clickOnEmail() {
        this.elements.email().click();
    }

    clickOnStateUserTab() {
        this.elements.stateUserTab().click();
    }
    clickOnFederalUserTab() {
        this.elements.federalUserTab().click();
    }

    clickOnForgotUsername() {
        this.elements.forgotUsernameText().click();
    }
    clickOnForgotPassword() {
        this.elements.forgotPasswordText().click();
    }
    enterIncorrectUsernameAndPassword() {
        this.elements.usernameInput().type('abcdef');
        this.elements.passwordInput().type(12345);
    }

    verifyUsernameAndPasswordInputContainsSpecificValue() {
        this.elements.usernameInput().type('abcdef').should('have.value', 'abcdef').clear();
        this.elements.passwordInput().type(12345).should('have.value', '12345').clear();
    }
    clickOnStateUserLoginBtn() {
        this.elements.stateUserLoginBtn().click();
    }
    enterUsernameAndPassword(username, password) {
        this.elements.usernameInput().type(username, { log: false });
        this.elements.passwordInput().type(password, { log: false });
    }

}
export default HomePageObjects;