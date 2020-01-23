import BasePage from '../../BasePage'

class ApplicationsPage extends BasePage {

    navigateToApplicationsPage(){
       
       cy.reload()
       cy.get('.navbar-nav a').contains('Applications').click()
        
    }
    verifyApplicationsPageDisplayed()
    {
        
        cy.get('.navbar-nav a').contains('Applications').should('exist')
        cy.get('.navbar-nav a').contains('Dashboard').should('exist')
        cy.get('.navbar-nav a').contains('Reports').should('exist')
        cy.get('.navbar-nav a').contains('Administration').should('exist')
        cy.get('#side-nav').should('exist')
        cy.get('[data-action="add-application"]').should('exist')

    }

    createApplication(appName,businessCriticality,applicationType,selectSdlc)
    {
        //Create application popup
        cy.get('[data-action="add-application"]').should('be.visible').click()
        cy.get('#modalCreateApplication').should('exist')
        cy.get('.modal-custom-header').should('contain','Create Application')

        //Application Details
        cy.get('#createApplicationName').type(appName)
        cy.get('#createApplicationBusinessCriticality').select(businessCriticality)
        cy.get('#createApplicationApplicationType').select(applicationType)
        cy.get('#createApplicationDescription').type('The most epic App ever')
        cy.get('[data-action="next"]').click()

        //Release Details
        cy.get('#createApplicationReleaseName').type('APP-RELEASE')
        cy.get('#createApplicationReleaseSDLC').select(selectSdlc)
        cy.get('#createApplicationReleaseDescription').type('Auto App Release')

        cy.get('[data-action="next"]',{ timeout: 30000 }).click()
        cy.get('#createApplicationSummaryContainerApplication').should('exist')
        cy.get('#createApplicationSummaryContainerRelease').should('exist')
        cy.contains(appName).should('exist')
        cy.get('[data-action="save"]').click()
        cy.get('[data-action="save"]').should('not.exist')
        cy.get('[data-action="add-application"]').should('not.exist')
        cy.get('.navbar-nav a').contains('Applications').click()
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        this.navigateToApplicationsPage()
        cy.contains(appName).should('exist')
        cy.reload()
      //  cy.get('.paging-section-total > span', { timeout: 30000 }).should('contain.text','1 found')
        

    }

    selectCreatedApplication(appName)
    {
        cy.get(`a[title="${appName}"]`).click()
    }

    verifyApplicationDeleted(appName)
    {
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        cy.get('.paging-section-total > span',{ timeout: 30000}).should('contain.text','0 found')
    }

    searchForCreatedApplication(appName)
    {
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        cy.reload()

        this.navigateToApplicationsPage()
        cy.reload()
        cy.contains(`${appName}`).should('exist')
        cy.get(`a[title="${appName}"]`).click()
    }

    navigateApplicationSettingPage()
    {
        cy.get('.navbar-nav a').contains('Applications').click({force:true})
        
        
    }


}

export default ApplicationsPage