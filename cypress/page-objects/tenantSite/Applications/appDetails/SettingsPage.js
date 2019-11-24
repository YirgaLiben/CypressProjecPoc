import BasePage from '../../../BasePage'
import ApplicationPage from '../ApplicationsPage'
import AttributesPage from '../../../tenantSite/administration/settings/AttributesPage'



class SettingPage extends BasePage {


    clickSettingTab() {
        cy.get('div.nav-tabs li>a[data-tabaction="SettingsSummary"]').click({ force: true })
    }


    verifyApplicationSummaryPageDisplayed() {
        cy.get('.SPITabContentGroup > .contextbar > .section').contains('Application Summary').should('exist')
        cy.get('[data-action="save"]').should('exist').and('be.enabled')
        cy.get('[data-action="delete-application"]').should('exist').and('be.enabled').and('contain', 'Delete Application')
        cy.get('.nav-tabs > li').contains('Application Summary').should('exist').and('have.attr', 'href')
        cy.get('.nav-tabs > li').contains('Application Attributes').should('exist').and('have.attr', 'href')
        cy.get('.nav-tabs > li').contains('Bug Tracker').should('exist').and('have.attr', 'href')
        cy.get('.nav-tabs > li').contains('Source Control').should('exist').and('have.attr', 'href')

    }

    clickSaveButton() {
        cy.get('[data-action="save"]').click()
    }

    enterApplicationName(appName) {
        cy.get('#ApplicationName').clear()
        cy.get('#ApplicationName').type(appName)
    }

    verifyApplicationNameDisplayed(applicationName) {

        cy.get('#ApplicationName').should('contain.value', `${applicationName}`).and('have.attr', 'required')
    }

    selectBusinessCriticality(businessCriticality) {
        cy.get('#BusinessCriticalityId').select(businessCriticality)
    }

    verifyBusinessCriticalitySelected(businessCriticality) {
        switch (businessCriticality) {
            case 'High':
                cy.get('#BusinessCriticalityId').should('have.value', '1').and('have.attr', 'required')
                break;
            case 'Medium':
                cy.get('#BusinessCriticalityId').should('have.value', '2').and('have.attr', 'required')
                break;
            case 'Low':
                cy.get('#BusinessCriticalityId').should('have.value', '3').and('have.attr', 'required')
                break;
        }
    }

    verifyApplicationSummaryTabDisplayed() {
        cy.get('[data-tabname="applicationsummary"]').should('be.visible').and('exist')
        cy.get('label').contains('Application Name').should('be.visible').and('exist')
        cy.get('label').contains('Business Criticality').should('be.visible').and('exist')
        cy.get('label').contains('Application Type').should('be.visible').and('exist')
        cy.get('label').contains('Application Description').should('be.visible').and('exist')
        cy.get('label').contains('Additional Emails').should('be.visible').and('exist')
        cy.get('label').contains('Application Name').should('be.visible').and('exist')

    }

    verifyApplicationTypeDisplayed(applicationType) {
        cy.get(':nth-child(3) > .form-control').should('contain', applicationType)
    }

    verifyApplicationDescriptionDisplayed() {
        cy.get('#ApplicationDescription').should('contain', 'The most epic App ever')
    }

    enterAndVerifyAdditionalEmails(email) {
        cy.get('#NotificationEmails').clear()
        cy.get('#NotificationEmails').type(email)
        this.clickSaveButton()
        cy.get('.saveResults-js').should('exist').and('contain', 'Settings saved successfully.')
        cy.reload()
        cy.get('#NotificationEmails').should('have.text', `${email}`)

    }

    verifyEmailValidation() {
        cy.get('#NotificationEmails').clear()
        cy.get('#NotificationEmails').type('yahoo@gmail.com;gmail')
        this.clickSaveButton()
        cy.get('div.modal.box-glow').should('exist')
        cy.get('.modal-message > li').should('contain', 'One or more Additional Emails are invalid. Multiple email addresses must be separated by a semicolon or comma.')
        cy.get('[data-confirm="1"]').contains('Close').click()
        cy.get('div.modal.box-glow').should('not.exist')
    }

    clickDeleteApplicationButton() {
        cy.get('[data-action="delete-application"]').click()
    }

    verifyAppDeletionPopUp() {
        this.clickDeleteApplicationButton()
        cy.get('.box-glow').should('exist')
        cy.get('.box-glow > .modal-custom-header').should('exist').and('contain.text', 'Confirm')
        cy.get('.modal-message').should('exist').and('contain.text', 'Are you sure you want to delete this application and all of its releases? This action is permanent!')
        cy.get('[data-confirm="1"]').should('contain.text', 'Yes').and('have.css', 'color', 'rgb(229, 0, 76)')
        cy.get('.btn-secondary').should('exist').and('contain.text', 'No')
        cy.get('.btn-secondary').click()
        cy.get('.modal box-glow').should('not.exist')


    }

    verifyApplicationSaveValidation() {
        cy.get('#ApplicationName').clear()
        cy.get('#BusinessCriticalityId').select('(Choose One)')
        this.clickSaveButton()
        cy.get('div.modal.box-glow').should('exist')
        cy.get('div.modal-custom-header').should('contain', 'Error')
        cy.get('.modal-message > :nth-child(1)').should('be.visible').and('contain.text', 'The Application Name field is required.')
        cy.get('.modal-message > :nth-child(2)').should('be.visible').and('contain.text', 'The Business Criticality field is required.')
        cy.get('.buttonblock > .btn').click()
        cy.get('div.modal.box-glow').should('not.exist')
        cy.reload()

    }

    updateApplicationSummaryAndVerifyUpdateSaved() {

        const appNameUpdated = 'appNameUpdated' + + Date.now();

        this.enterApplicationName(appNameUpdated)
        this.selectBusinessCriticality('Low')
        this.clickSaveButton()
        cy.get('.saveResults-js').should('exist').and('contain', 'Settings saved successfully.')
        cy.reload()
        this.verifyApplicationNameDisplayed(appNameUpdated)
        this.verifyBusinessCriticalitySelected('Low')

    }

    deleteApplication() {
        this.clickDeleteApplicationButton();
        cy.get('.box-glow').should('exist')
        cy.get('.box-glow > .modal-custom-header').should('exist').and('contain.text', 'Confirm')
        cy.get('.btn-critical').contains('Yes').click()
        cy.get('.box-glow').should('not.exist')


    }

    verifyApplicationDeleted(appName) {
        this.deleteApplication()
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        cy.get('.paging-section-total > span', { timeout: 30000 }).should('contain.text', '0 found')
    }

    clickApplicationAttributesTab() {
        cy.get('.nav-tabs > li').contains('Application Attributes').click()
    }

    verifyAddedAttributesDisplayInAppAttributesPage() {
        // cy.get('[data-tabname="applicationattributes"]').should('be.visible').and('exist')
        cy.get('label').contains('CustomAttribute1').should('be.visible').and('exist')
        cy.get('label').contains('CustomAttribute3').should('be.visible').and('exist')
        cy.get('label').contains('CustomAttributeUser').should('be.visible').and('exist')
        cy.get('label').contains('CustomPicklist').should('be.visible').and('exist')
        cy.get('label').contains('CustomAttributeDate').should('be.visible').and('exist')
        cy.contains('CustomAttribute1').find('input').should('have.attr', 'required')
        cy.contains('CustomAttribute3').find('select').should('have.attr', 'required')
        cy.contains('CustomAttributeDate').find('input').should('have.class', 'hasDatepicker').and('have.attr', 'readonly')
        cy.contains('CustomPicklist').find('select').should('exist')
        cy.contains('CustomAttributeUser').find('select').should('exist')

    }

    verifyApplicationAttributesSaveValidation() {
        this.clickSaveButton()
        var todayDate = this.getTodayDate()
        cy.get('div.modal.box-glow').should('exist')
        cy.get('.modal-message > li').should('exist').and('contain.text', 'The CustomAttribute1 field is required.')
        cy.get('.buttonblock > .btn').click()
        cy.contains('CustomAttribute1').find('input').type('test123')
        cy.contains('CustomAttribute3').find('select').select('True')
        cy.contains('CustomAttributeDate').find('input').invoke('val', todayDate)
        this.clickSaveButton()
        cy.get('.saveResults-js').should('exist').and('contain', 'Settings saved successfully.')
        cy.reload()
        cy.contains('CustomAttribute1').find('input').should('contain.value', 'test123')
        cy.contains('CustomAttribute3').find('select').should('contain.value', '1')
        cy.contains('CustomAttributeDate').find('input').should('contain.value', todayDate)



    }

    createApplicationAndVerifyAttributes() {
        const applicationPage = new ApplicationPage()
        const attributesPage  = new AttributesPage()
        
        const appName = 'appName' +  Date.now();
        var todayDate = this.getTodayDate()
        applicationPage.navigateToApplicationsPage()
        //Create application popup
        cy.get('[data-action="add-application"]').should('be.visible').click()
        cy.get('#modalCreateApplication').should('exist')
        cy.get('.modal-custom-header').should('contain', 'Create Application')
        //Application Details
        cy.get('#createApplicationName').type(appName)
        cy.get('#createApplicationBusinessCriticality').select('High')
        cy.get('#createApplicationApplicationType').select('Web / Thick-Client')
        cy.get('#createApplicationDescription').type('The most epic App ever')
        cy.get('[data-action="next"]').click()
        cy.get('#createApplicationReleaseName').type('APP-RELEASE')
        cy.get('#createApplicationReleaseSDLC').select('Production')
        cy.get('#createApplicationReleaseDescription').type('Auto App Release')
        cy.get('[data-action="next"]', { timeout: 30000 }).click()
        this.verifyAddedAttributesDisplayInAppAttributesPage()

        cy.contains('CustomAttribute1').find('input').type('Apptest123')
        cy.contains('CustomAttribute3').find('select').select('True')
        cy.contains('CustomAttributeDate').find('input').invoke('val', todayDate)
        cy.get('[data-action="next"]', { timeout: 30000 }).click()
        cy.get('#createApplicationSummaryContainerApplication').should('exist')
        cy.get('#createApplicationSummaryContainerRelease').should('exist')
        cy.get('[data-action="save"]').click()
        applicationPage.navigateToApplicationsPage()
        this.searchForCreatedApplication(appName)
        this.clickSettingTab()
        this.clickApplicationAttributesTab()
        cy.contains('CustomAttribute1').find('input').should('contain.value', 'Apptest123')
        cy.contains('CustomAttribute3').find('select').should('contain.value', '1')
        cy.contains('CustomAttributeDate').find('input').should('contain.value', todayDate)




    }


    searchForCreatedApplication(appName)
    {
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        cy.reload()
        cy.wait(2000)
        cy.get('[data-role="searchText"]').clear()
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        cy.reload()
        cy.wait(2000)
        cy.reload()
        cy.contains(`${appName}`).should('exist')
        cy.get(`a[title="${appName}"]`).click()
    }



}

export default SettingPage