import debug from 'debug';
import { authenticator, totp, hotp } from 'otplib';
const testStateSAOSecret = 'OZZVNG7WRXMTOX2PX4MOJZTCL37AUBPHJI2ZDRFVYYMPLIUTNCYA';
const nytdSysAdminSecret = '3VVWLETF3I2FKG3DZWGPZCJQFCXTTVTZOPTCCY7VRZXXENFGATHQ';
const nytdRegionalSecret = 'O2B7FYKYE2VUJ7YM3T65XL2CLCF5QRDVDUIXLFUVDDPRPMADCTOA';
const nytdCBSecret = 'MS5FLTBFCAICAKVXSTP7UJXM4BZTPETP2HB67EFXSBJFMBDM2CYQ';

class MFAPageObjects {
    elements = {
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
            case "nytdregional":
                this.elements.passcodeInput().type(authenticator.generate(nytdRegionalSecret), { log: false });
                break;
            case "nytdcb":
                this.elements.passcodeInput().type(authenticator.generate(nytdCBSecret), { log: false });
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