class UserAccountManagementPageObjects{


    elements ={
        selectUsername: () => cy.get('button'), //Select username from the result table
        unlockAccountBtn: () => cy.get('[data-testid="unlock_account_button"]'),
        accountUnlockText: () => cy.get('[class="styles_modalSuccessMessage__0PjOc"]'),
        accountHasBeenLockedText: () => cy.get('[class="styles_subtitle___RAKh"]'),
        continueBtn: () => cy.get('[class="usa-button styles_overrideButton__OKuyE"]'),

    }
    clickOnUsername(){
        this.elements.selectUsername().contains('Mincho.Rusev').click({ force: true })
    }

    clickOnUnlockAccountBtn() {
        this.elements.unlockAccountBtn().should('have.text', 'Unlock Account').click()
    }

    clickOnContinueBtn() {
        this.elements.continueBtn().should('have.text', "Continue").click();
    }

}
export default UserAccountManagementPageObjects;