

  //This file is example for session log in.
describe("Login Page Validations", function () {
  beforeEach(() => {
    cy.login('teststatesao', 'P@ssw0rd') // Login with session, implemented in commands.js
  })
  it("Dashboard", function () {
    cy.visit('/User.html');
    cy.get(':nth-child(2) > [data-testid="default_link"]').should('have.text', 'Transmissions').click()
  });

  it("Transmissions", function () {
    cy.visit('/User/Transmissions.html');
    cy.get(':nth-child(1) > .styles_button__1rHaa').click()

  });

});