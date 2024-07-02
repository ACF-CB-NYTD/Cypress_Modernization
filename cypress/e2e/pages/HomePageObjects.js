class HomePageObjects {
    elements = {
        nytdIcon: () => cy.get('[data-testid="NYTD_logo_left"]'), // NYTD Icon 
        phoneNumberLink: () => cy.get('[data-testid="phone_number_link"]'), // Phone number link to deal NYTD Help desk.
        emailLink: () => cy.get('[data-testid="email_link"]'), // Email link to sent email to Help desk .
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
    }
  

    clickOnNYTDIcon() {
        this.elements.nytdIcon().invoke('removeAttr', 'target', '_blank').click();
    }

    clickOnPhoneNumber() {
        this.elements.phoneNumber().click();
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