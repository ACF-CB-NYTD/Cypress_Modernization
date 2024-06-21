class CommonPageObjects {
  elements = {
    stateUserBtn: () =>  cy.get('[data-testid="state_user_button"]'),
    usernameInput: () => cy.get('[data-testid="user_id_input"]'),
    passwordInput: () => cy.get('[data-testid="password_input"]'),
    LoginBtn: () => cy.get('[data-testid="state_user_login_button"]'),
  };
  clickOnStateButton() {
    this.elements.stateUserBtn().click();
}

enterUsernameAndPassword(username, password) {
  this.elements.usernameInput().type(username)
  this.elements.passwordInput().type(password)
}

clickOnLoginButton() {
  this.elements.LoginBtn.should('have.text','Login').click();
}
}
export default CommonPageObjects;
