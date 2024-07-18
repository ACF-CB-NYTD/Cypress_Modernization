import debug from 'debug';
import { authenticator, totp, hotp } from 'otplib';
const testStateSAOSecret = 'BZ722EYYD323F5YMTTTGPSWAN6EAUAVFVSKZ3YAEC4M2OV6OX4KA';
const nytdSysAdminSecret = 'S7TV6LSWRJMG4P3G35UHYHGJNX2YVNYCYUJ7M2547WMTL6U7IQEQ';

class MFAPageObjects {
    elements = {
        mfaHeader: () => cy.get('#main_content').should('have.text', 'Multi-Factor Authentication'), // MFA header 
        passcodeText: () => cy.get('[data-testid="label"]'), // Passcode text above the username input.
        passcodeInput: () => cy.get('[data-testid="passcode_input"]'), // Passcode input, where user to enter Passcode.
        submitBtn: () => cy.get('[data-testid="MFA_submit_button"]'), // Submit button 
    }
    enterPasscode(account) {
        debug.log(account);
        switch(account){
            case "teststatesao":
                this.elements.passcodeInput().type(authenticator.generate(testStateSAOSecret), { log: false });
                break;
            case "nytdsysadmin":
                this.elements.passcodeInput().type(authenticator.generate(nytdSysAdminSecret), { log: false });
                break;
            default:
                this.elements.passcodeInput().debug().type('Default Failure');
        }
    }
    
    clickOnSubmitBtn() {
        this.elements.submitBtn().click();
    }

}
export default MFAPageObjects;