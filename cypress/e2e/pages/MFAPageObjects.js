import { authenticator, totp, hotp } from 'otplib';
const secret = 'BZ722EYYD323F5YMTTTGPSWAN6EAUAVFVSKZ3YAEC4M2OV6OX4KA';
const Atoken = authenticator.generate(secret);

const sysAdminSecret = '';
const sysAdmintoken = authenticator.generate(secret);
class MFAPageObjects {
    elements = {
        mfaHeader: () => cy.get('#main_content').should('have.text', 'Multi-Factor Authentication'), // MFA header 
        passcodeText: () => cy.get('[data-testid="label"]'), // Passcode text above the username input.
        passcodeInput: () => cy.get('[data-testid="passcode_input"]'), // Passcode input, where user to enter Passcode.
        submitBtn: () => cy.get('[data-testid="MFA_submit_button"]'), // Submit button 
    }
    enterPasscode() {
        this.elements.passcodeInput().type(Atoken, { log: false });
    }
    enterSysAdminPasscode() {
        this.elements.passcodeInput().type(sysAdmintoken, { log: false });
    }
    clickOnSubmitBtn() {
        this.elements.submitBtn().click();
    }

}
export default MFAPageObjects;