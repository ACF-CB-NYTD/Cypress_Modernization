import { timeout } from "async";
import { first } from "lodash";

class TransmissionsDQAObjects {
    elements = {
        fileNumber: () => cy.get('#main_content'),
        elementLevel: () => cy.get('#tab_element-level > h1', { timeout: 10000 }),
        recordLevel: () => cy.get('#tab_record-level > h1', { timeout: 10000 }),
        fileSummary: () => cy.get('.styles_backButton___asOG'),
        penaltyNav: () => cy.get(':nth-child(1) > a > .styles_navItem__nTeiW'),
        dqaNav: () => cy.get('.styles_navItemSelected__DFhlA'),
        complianceNav: () => cy.get(':nth-child(3) > a > .styles_navItem__nTeiW'),
        notesNav: () => cy.get(':nth-child(4) > a > .styles_navItem__nTeiW'),
        exportBtn: () => cy.get('.styles_button__T2X6A', { timeout: 10000 }),
        tableHeaders:() => cy.get('table').eq(1).find('thead > tr'),
        recordSearchLabel: () => cy.get('[for="transmissionRecordId"]'),
        recordSearchInput: () => cy.get('[id="transmissionRecordId"]'),
        elementNumberLabel: () => cy.get('[for="elementNumber"]'),
        elementNumberInput: () => cy.get('[id="elementNumber"]'),
        elementNameLabel: () => cy.get('[for="elementName"]'),
        elementNameInput: () => cy.get('[id="elementName"]'),
        advisoryNumberLabel: () => cy.get('[for="advisoryCategory"]'),
        advisoryNumberInput: () => cy.get('[id="advisoryCategory"]'),
        firstRecordLink: () => cy.get(':nth-child(1) > :nth-child(1) > .styles_viewButton__bYvRo'),
        firstElementName: () => cy.get('.styles_table__9XfOZ > tbody > :nth-child(1) > :nth-child(3)'),
        firstElementNumber: () => cy.get('.styles_table__9XfOZ > tbody > :nth-child(1) > :nth-child(2)'),
        firstAdvisoryNumber: () => cy.get('.styles_table__9XfOZ > tbody > :nth-child(1) > :nth-child(4)'),
        modalH1Header: () => cy.get('[class="usa-modal__main"] > h2').last(),
        modalFirstHeader: () => cy.get('b').eq(1),
        modalSecondHeader: () => cy.get('b').eq(2),
        modalThirdHeader: () => cy.get('b').eq(3),
        modalFirstRow: () => cy.get('[class="styles_modalSection__ybn2m"] > table').eq(0).children().eq(1).children(),
        modalSecondRow: () => cy.get('[class="styles_modalSection__ybn2m"] > table').eq(1).children().eq(1).children(),
        modalThirdRow: () => cy.get('[class="styles_modalSection__ybn2m"] > table').eq(2).children().eq(1).children(),
        modalFooterText: () => cy.get('[class="styles_footerText__n3k5m"]'),
        modalCloseBtn: () => cy.get('[id="dqa_reportCloseButton"]'),
    }

    typeRecordSearchInput(input) {
        this.elements.recordSearchInput().type(input);
    }
    typeElementNumberInput(input) {
        this.elements.elementNumberInput().type(input);
    }
    typeElementNameInput(input) {
        this.elements.elementNameInput().type(input);
    }
    typeAdvisoryNumberInput(input) {
        this.elements.advisoryNumberInput().type(input);
    }

    checkModalRows() {
        const expectedModalHeaders1 = [
            'State',
            'Report Date',
            'Record Number',
            'Date of Birth',
            'Sex',
            'Race - American Indian or Alaska Native',
            'Race - Asian',
            'Race - Black or African American',
            'Race - Native Hawaiian or Other Pacific Islander',
            'Race - White',
            'Race - Unknown',
            'Race - Declined',
            'Hispanic or Latino Ethnicity',
            
        ];
        const expectedModalHeaders2 = [
            'Foster Care Status - Services',
            'Local Agency',
            'Federally Recognized Tribe',
            'Adjudicated Delinquent',
            'Educational Level',
            'Special Education',
            'Independent Living Needs Assessment',
            'Academic Support',
            'Post-secondary Educational Support',
            'Career Preparation',
            'Employment Programs or Vocational Training',
            'Budget and Financial Management',
            'Housing Education and Home Management Training',
            'Health Education and Risk Prevention',
            'Family Support and Healthy Marriage Education',
            'Mentoring',
            'Supervised Independent Living',
            'Room and Board Financial Assistance',
            'Education Financial Assistance',
            'Other Financial Assistance',
            
        ];
        const expectedModalHeaders3 = [
            'Outcomes Reporting Status',
            'Date of Outcome Data Collection',
            'Foster Care Status - Outcomes',
            'Current Full-Time Employment',
            'Current Part-Time Employment',
            'Employment-Related Skills',
            'Social Security',
            'Educational Aid',
            'Public Financial Assistance',
            'Public Food Assistance',
            'Public Housing Assistance',
            'Other Financial Support',
            'Highest Educational Certification Received',
            'Current Enrollment and Attendance',
            'Connection to an Adult',
            'Homelessness',
            'Substance Abuse Referral',
            'Incarceration',
            'Children',
            'Marriage at Child\'s Birth',
            'Medicaid',
            'Other Health Insurance Coverage',
            'Health Insurance Type: Medical',
            'Health Insurance Type: Mental Health',
            'Health Insurance Type: Prescription Drugs'
        ];
        this.elements.modalFirstRow().each((content, index) => {
            cy.wrap(content).find('td').children().eq(0).invoke('text').should('eq', expectedModalHeaders1[index]);
        });
        this.elements.modalSecondRow().each((content, index) => {
            cy.wrap(content).find('td').children().eq(0).invoke('text').should('eq', expectedModalHeaders2[index]);
        }); ;
        this.elements.modalThirdRow().each((content, index) => {
            cy.wrap(content).find('td').children().eq(0).invoke('text').should('eq', expectedModalHeaders3[index]);
        });;
    }
}
export default TransmissionsDQAObjects;