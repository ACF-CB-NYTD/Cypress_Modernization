import debug from 'debug';
import { authenticator, totp, hotp } from 'otplib';

// Dev Secrets
const testStateUsrSecret = 'V4QNFINSJE7IA7SYO3LBMTSXEUXUIQZMLTUHFXURCACKPW74ZMVA';
const testStateMgrSecret = 'EQHTLQZ6JRV5Z3J2PAUDRZEJFKAUYOTDCNZT4C5CBQSTNBBQBIGQ';
const testStateSAOSecret = 'OZZVNG7WRXMTOX2PX4MOJZTCL37AUBPHJI2ZDRFVYYMPLIUTNCYA';
const nytdSysAdminSecret = '2AH5YAMQ53EOCYQPMUDUWFO6G44TROHVJJBDC3SNMJVDY4XECFUA';
const nytdRegionalSecret = 'O2B7FYKYE2VUJ7YM3T65XL2CLCF5QRDVDUIXLFUVDDPRPMADCTOA';
const nytdCBSecret = 'MS5FLTBFCAICAKVXSTP7UJXM4BZTPETP2HB67EFXSBJFMBDM2CYQ';

// QA Secrets
const QACypressSysAdmin = 'GW3WYHR5GJSPNASBAA2JTHQPLLCK4KH2MBJBTDSZ5ZKG734XBJSQ';
const QACypressDefault = 'G6U5T2IFBXEM2Y2JFSSYIZMENZGBB6RETTCFFKT2QHIG4FT2MZMA';

class MFAPageObjects {
    elements = {
        passcodeText: () => cy.get('[data-testid="label"]'), // Passcode text above the username input.
        passcodeInput: () => cy.get('[data-testid="passcode_input"]'), // Passcode input, where user to enter Passcode.
        submitBtn: () => cy.get('[data-testid="MFA_submit_button"]'), // Submit button 
    }
    enterPasscode(account) {
        debug.log(account);
        switch(account){
            case "teststateuser":
                this.elements.passcodeInput().type(authenticator.generate(testStateUsrSecret), { log: false });
                break;
            case "teststatesao":
                this.elements.passcodeInput().type(authenticator.generate(testStateSAOSecret), { log: false });
                break;
            case "teststatemgr":
                this.elements.passcodeInput().type(authenticator.generate(testStateMgrSecret), { log: false });
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
            case "cypress.sysadmin":
                this.elements.passcodeInput().type(authenticator.generate(QACypressSysAdmin), { log: false });
                break;
            case "cypress.default":
                this.elements.passcodeInput().type(authenticator.generate(QACypressDefault), { log: false });
                break;
            case "cypress.mgr":
                this.elements.passcodeInput().type(authenticator.generate(QACypressMgr), { log: false });
                break;
            case "cypress.sao":
                this.elements.passcodeInput().type(authenticator.generate(QACypressSAO), { log: false });
                break;
            case "cypress.regional":
                this.elements.passcodeInput().type(authenticator.generate(QACypressRegional), { log: false });
                break;
            case "cypress.cb":
                this.elements.passcodeInput().type(authenticator.generate(QACypressCB), { log: false });
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