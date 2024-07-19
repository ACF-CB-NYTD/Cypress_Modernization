class UserAccountManagementPageObjects{


    elements ={
        selectUsername: () => cy.get('button'), //Select username from the result table
        unlockAccountBtn: () => cy.get('[data-testid="unlock_account_button"]'), //Unlock Account Btn
        accountUnlockText: () => cy.get('[class="styles_modalSuccessMessage__0PjOc"]'), // This is the text on the pop up after clicking Unlock account Btn 
        accountHasBeenLockedText: () => cy.get('[class="styles_subtitle___RAKh"]'), // Confirmation text for account has been locked
        continueBtn: () => cy.get('[class="usa-button styles_overrideButton__OKuyE"]'), // Continue button on the confirmation pop up

    }
    clickOnUsername(username){
        this.elements.selectUsername().contains(username).click({ force: true })
    }

    clickOnUnlockAccountBtn() {
        this.elements.unlockAccountBtn().should('have.text', 'Unlock Account').click()
    }

    clickOnContinueBtn() {
        this.elements.continueBtn().should('have.text', "Continue").click();
    }

}
export default UserAccountManagementPageObjects;