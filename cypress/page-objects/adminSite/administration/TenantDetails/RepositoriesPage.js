import BasePage from '../../../BasePage'

class RepositoriesPage extends BasePage {

    clickRepositoriesTab() {
        cy.get('div.nav-tabs li>a[data-tabaction="Repositories"]').click({ force: true })
    }

    isTheSelectedTenantDisplayedOnThePage(tenantId)
    {
        cy.get('.breadcrumb > .active').contains(`${tenantId}`).should('be.visible').and('exist')
    }

    isRefreshPermissionsButtonDisplayed() {
        cy.get('[data-action="refreshpermissions"]').should('be.visible').and('be.enabled').and('contain', 'Refresh Permissions')
    }

    isHealthCheckButtonDisplayed() {
        cy.get('[data-action="healthcheck"]').should('be.visible').and('be.enabled').and('contain', 'Health Check')
    }

    isRepositoriesTableDisplayed() {
        cy.get('table.prettygrid.content-container').should('be.visible').and('exist')

    }

    isRebuildButtonDisplayed() {
        cy.get('[data-action="rebuild"]').should('be.visible').and('be.enabled').and('contain', 'Rebuild').and('have.length', '5')
    }

    isDeleteButtonDisplayed() {
        cy.get('[data-action="delete"]').should('be.visible').and('be.enabled').and('contain', 'Delete').and('have.length', '5')
    }

    isRepositoryTypeColumnDisplayed() {
        cy.get('table').find('th').first().should('contain', 'Repository Type').should('exist').and('be.visible')

    }
    isRepositoryIDColumnDisplayed() {
        cy.get('table').find('th').contains('Repository ID').should('exist').and('be.visible')
    }

    isRecordCountColumnDisplayed() {
        cy.get('table').find('th').contains('Record Count').should('exist').and('be.visible')
    }

    verifyRepositoryTypeColumnContainsDefainedTypes() {
        cy.get('tbody > tr >td').contains('Application').should('be.visible').and('exist')
        cy.get('tbody > tr >td').contains('Release').should('be.visible').and('exist')
        cy.get('tbody > tr >td').contains('Scan').should('be.visible').and('exist')
        cy.get('tbody > tr >td').contains('Vulnerability').should('be.visible').and('exist')
        cy.get('tbody > tr >td').contains('Vulnerabilty Pre-Publish').should('be.visible').and('exist')
 
    }

    verifyPopUpWindowDisplayedRefreshPermissionsButton()
    {
        cy.get('[data-action="refreshpermissions"]').click()
        cy.get('.box-glow > .modal-custom-header').should('exist')
        cy.get('.modal-custom-header > span').contains('Confirm').should('be.visible').and('exist')
        cy.get('.modal-message').should('contain','Are you sure you want to queue the permissions task for all repositories for this tenant?')
        cy.get('[data-confirm="1"]').should('contain','Yes').and('be.visible').and('exist')
        cy.get('.btn-secondary').contains('No').should('be.visible').and('exist')
        cy.get('[data-role="closemodal"]').should('be.visible').and('exist')
        cy.get('[data-role="closemodal"]').click()
        


    }

    verifyPopUpWindowDisplayedByClickingHealthCheckButton()
    {
        cy.get('[data-action="healthcheck"]').should('exist').click()
        cy.get('.box-glow > .modal-custom-header').should('exist')
        cy.get('.modal-custom-header > span').contains('Confirm').should('be.visible').and('exist')
        cy.get('.modal-message').should('exist').and('contain','Are you sure you want to queue the Health Check task for this tenant?')
        cy.get('[data-confirm="1"]').should('contain','Yes').and('be.visible').and('exist')
        cy.get('.btn-secondary').contains('No').should('be.visible').and('exist')
        cy.get('[data-role="closemodal"]').should('be.visible').and('exist')
        cy.get('[data-role="closemodal"]').click()
        


    }

    verifyPopUpWindowDisplayedForEachRepoTypeByClickingRebuildButton()
    {
        const repositoryType = ['Application','Release','Scan','Vulnerability','Vulnerabilty Pre-Publish']

        repositoryType.forEach(type =>{
            this.clickRebuildButton(type)
            cy.get('.box-glow > .modal-custom-header').should('exist')
            cy.get('.modal-custom-header > span').contains('Confirm').should('be.visible').and('exist')
            cy.get('.modal-message').should('exist').and('contain','Are you sure you want to queue the rebuild task the selected repository for this tenant?')
            cy.get('[data-confirm="1"]').should('contain','Yes').and('be.visible').and('exist')
            cy.get('.btn-secondary').contains('No').should('be.visible').and('exist')
            cy.get('[data-role="closemodal"]').should('be.visible').and('exist')
            cy.get('[data-role="closemodal"]').click()


        })

        
    }

    verifyPopUpWindowDisplayedForEachRepoTypeByClickingDeleteButton()
    {
        const repositoryType = ['Application','Release','Scan','Vulnerability','Vulnerabilty Pre-Publish']

        repositoryType.forEach(type =>{
            this.clickDeleteButton(type)
            cy.get('.box-glow > .modal-custom-header').should('exist')
            cy.get('.modal-custom-header > span').contains('Confirm').should('be.visible').and('exist')
            cy.get('.modal-message').should('exist').and('contain','Are you sure you want to delete the selected repository for this tenant?')
            cy.get('[data-confirm="1"]').should('contain','Yes').and('be.visible').and('exist')
            cy.get('.btn-secondary').contains('No').should('be.visible').and('exist')
            cy.get('[data-role="closemodal"]').should('be.visible').and('exist')
            cy.get('[data-role="closemodal"]').click()


        })
    }



    clickRebuildButton(repositoryType) {
        switch (repositoryType) {
            case 'Application':
                repositoryType = 7
                break;
            case 'Release':
                repositoryType = 3
                break;
            case 'Scan':
                repositoryType = 2
                break;
            case 'Vulnerability':
                repositoryType = 1
                break;
            case 'Vulnerabilty Pre-Publish':
                repositoryType = 4
                break;

        }

        cy.get(`[data-repository-type="${repositoryType}"] > .action-cell > [data-action="rebuild"]`).click()

    }

    clickDeleteButton(repositoryType) {
        switch (repositoryType) {
            case 'Application':
                repositoryType = 7
                break;
            case 'Release':
                repositoryType = 3
                break;
            case 'Scan':
                repositoryType = 2
                break;
            case 'Vulnerability':
                repositoryType = 1
                break;
            case 'Vulnerabilty Pre-Publish':
                repositoryType = 4
                break;

        }

        cy.get(`[data-repository-type="${repositoryType}"] > .action-cell > [data-action="delete"]`).click()

    }


}

export default RepositoriesPage 