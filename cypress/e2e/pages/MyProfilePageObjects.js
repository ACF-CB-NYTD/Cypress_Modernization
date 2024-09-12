class MyProfilePageObjects {
    elements = {
        myProfileFirstLastName: () => cy.get('#main_content'), // This is the first and last name of the user logged in to the app
        username: () => cy.get('.styles_frame__z_r5H > :nth-child(1) > p'), // This is the username for the id 
        phoneNumber: () => cy.get('.styles_frame__z_r5H > :nth-child(2)'), // This is the phone number for the id 
        dataExportText: () => cy.get('.styles_span__WV1T8 > p'), // This is the phone number for the id 
        email: () => cy.get(':nth-child(3) > p'), // This is the email  for the id
        emailForRegionalID: () => cy.get('.styles_frame__z_r5H > :nth-child(2) > p'), // This is the email  regional id
        emailForTestStateMngID: () => cy.get('.styles_frame__z_r5H > :nth-child(2) > p'), // This is the email for test state mng id
        emailForTestStateSao: () => cy.get('.styles_frame__z_r5H > :nth-child(3) > p'), // This is the email for test state sao id
        emailForTestStateUser: () => cy.get('.styles_frame__z_r5H > :nth-child(2) > p'), // This is the email  regional id
        receivesEmailNotification: () => cy.get(':nth-child(4) > p'), // This locator will display if the user will receive notification or not
        receivesEmailNotificationForRegional: () => cy.get(':nth-child(3) > p'), // This locator will display if the user will receive notification or not
        receivesEmailNotificationForTestStageMng: () => cy.get(':nth-child(3) > p'), // This locator will display if the user will receive notification or not
        receivesEmailNotificationForTestStatesao: () => cy.get(':nth-child(4) > p'), // This locator will display if the user will receive notification or not
        receivesEmailNotificationForTestState: () => cy.get(':nth-child(3) > p'), // This locator will display if the user will receive notification or not
        userType: () => cy.get('.styles_primaryRoleText__1f2Fo'), // This locator will the user type
        region: () => cy.get('.styles_primaryRoleText__1f2Fo'), // This locator is for region text
        userTypeForSAO: () => cy.get('.styles_secondaryRoles__I7kce > .styles_span__WV1T8 > p'), // This locator is to display user type for sao
        userTypeForTestStateMng: () => cy.get('.styles_secondaryRoles__I7kce > .styles_span__WV1T8 > p'), // This locator is to display user type for sao
        assignedStatesText: () => cy.get('.styles_assignedStatesText__r1k88'), // This locator is for assigned states
        assignedStates: () => cy.get('.styles_spanRegionAssignedStates__GnxIX > :nth-child(1) > p'), // This locator is for assigned states
        editMyProfileBtn: () => cy.get('[data-testid="Edit_user_button"]'), // Edit my profile button
        deleteMyAccountBtn: () => cy.get('[data-testid="delete_user_button"]'), // Delete my account btn
        returnToTopBtn: () => cy.get('.styles_returnToTop__9_gBL > a'), // Return to top btn
        updatePasswordBtn: () => cy.get('[data-testid="button"]'), // Update password btn
        requestStateAuthOfficialAccessBtn: () => cy.get('[data-testid="request_elevation_button"]'), // Request state authorization official access button
        requestStateAuthOfficialAccessBtnForSTestStateUser: () => cy.get('[data-testid="StateUserRequestElevationSpan"] > :nth-child(2)'), // Request state authorization official access button for state user
        requestStateManagerAccessBtnForTestStateUser: () => cy.get('[data-testid="StateUserRequestElevationSpan"] > :nth-child(1)'), // Request state authorization official access button for state user
    }
}
export default MyProfilePageObjects;