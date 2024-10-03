import debug from 'debug';
import { authenticator, totp, hotp } from 'otplib';
const testStateUsrSecret = 'V4QNFINSJE7IA7SYO3LBMTSXEUXUIQZMLTUHFXURCACKPW74ZMVA';
const testStateMgrSecret = 'EQHTLQZ6JRV5Z3J2PAUDRZEJFKAUYOTDCNZT4C5CBQSTNBBQBIGQ';
const testStateSAOSecret = 'OZZVNG7WRXMTOX2PX4MOJZTCL37AUBPHJI2ZDRFVYYMPLIUTNCYA';
const nytdSysAdminSecret = 'G5M3KSTG6JG275QXC7ILXTLAWIR5T2667RKJVN27XOW7QRT4ABGA';
const nytdRegionalSecret = 'O2B7FYKYE2VUJ7YM3T65XL2CLCF5QRDVDUIXLFUVDDPRPMADCTOA';
const nytdCBSecret = 'MS5FLTBFCAICAKVXSTP7UJXM4BZTPETP2HB67EFXSBJFMBDM2CYQ';
const cypressSysadmin = 'DPEVPQQBLAN7G7IELFYLVZVVIXCAMBGQ7UJGTA4RROLNGVU3PCWA';
const cypressmgr = 'VGDVAGWC5QXJZLSCAW27JA7SCD2PA2H6HM5MKVV7NK6MO3FBIWFQ';
const defaultState = 'XM6PKVB6GUTH2UFAPR7EQL2BF7XCNEG5XJRQQ6QREYI76ERWZVTA';
const cypressao = 'LOFCGT4SWLTGJI6MDKVISUVE5EHZFAYGVR55HNLGCRIW4CWUVXQA';
const cypressregion = 'D2OZ2FUQOOBBI3CGNFYIBKQFRSTZE54TIKNUM7LLPDVTAFKGEUPA';
const cypresscb = 'J7QCG3UKX357IE7WT5SYN2IQSYIR2ODV4APQNW7IGVXM5LDIAUEQ';


class MFAPageObjects {
    elements = {
        passcodeText: () => cy.get('[data-testid="label"]'), // Passcode text above the username input.
        passcodeInput: () => cy.get('[data-testid="passcode_input"]'), // Passcode input, where user to enter Passcode.
        submitBtn: () => cy.get('[data-testid="MFA_submit_button"]'), // Submit button 
    }
    enterPasscode(account) {
        debug.log(account);
        switch(account){
            case "cypress.sysadmin":
                this.elements.passcodeInput().type(authenticator.generate(cypressSysadmin), { log: false });
                break;
            case "cypress.sao":
                this.elements.passcodeInput().type(authenticator.generate(cypressao), { log: false });
                break;
            case "cypress.regional":
                this.elements.passcodeInput().type(authenticator.generate(cypressregion), { log: false });
                break;
            case "cypress.cb":
                this.elements.passcodeInput().type(authenticator.generate(cypresscb), { log: false });
                break;
            case "cypress.default":
                this.elements.passcodeInput().type(authenticator.generate(defaultState), { log: false });
                break;
            case "cypress.mng":
                this.elements.passcodeInput().type(authenticator.generate(cypressmgr), { log: false });
                break;
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
            default:
                this.elements.passcodeInput().debug().type('Default Failure');
        }
    }
    
    clickOnSubmitBtn() {
        this.elements.submitBtn().click();
    }

}
export default MFAPageObjects;