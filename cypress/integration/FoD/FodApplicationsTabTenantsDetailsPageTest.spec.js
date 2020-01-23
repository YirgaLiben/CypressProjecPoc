import TenantsPage from '../../page-objects/adminSite/administration/TenantsPage'
import ApplicationsPage from '../../page-objects/adminSite/administration/TenantDetails/ApplicationsPage'
import LogInPage from '../../page-objects/tenantSite/LogInPage'
import ApplicationPage from '../../page-objects/tenantSite/Applications/ApplicationsPage'


describe('Applications tab at tenant details page (18005)', () => {

    beforeEach(() => {
        cy.fixture('TenantId.json').as('tenantId')
    })

    const tenantsPage = new TenantsPage()
    const loginPage = new LogInPage()
    const applicationsPage = new ApplicationsPage()
    const appPage = new ApplicationPage()
    const appName = ['appName123','appName456'];


    it('Create a tenant', () => {
        const tenantId = 'AUTO-TENANT1-' + Date.now()
        loginPage.loginToAdminSite("zeusadmin", "Spi!pass007^");
        tenantsPage.navigateToTenantsPage()
        tenantsPage.createTenant(tenantId)
        Cypress.currentTest.retries(1)

    })

    it('create an application', () => {

        loginPage.loginToTenantSite('AUTO-TAM', 'Spi!pass007^', 'tenantId')
        appName.forEach(app =>{ 
            appPage.createApplication(app, 'High', 'Web / Thick-Client', 'Production')
        })
        Cypress.currentTest.retries(1)

    })
    it('Verify Applications page at tenant details page displayed', () => {
        loginPage.loginToAdminSite("zeusadmin", "Spi!pass007^");
        tenantsPage.navigateToTenantsPage()
        cy.readFile('cypress/fixtures/TenantId.json').then((tenant) => {
            tenantsPage.searchTenantsAndNavigateToDetailsPage(tenant.tenantId)
            applicationsPage.clickApplicationsTab()
            applicationsPage.isTheSelectedTenantDisplayedOnThePage(tenant.tenantId)
        })
        applicationsPage.isApplicationTitleDisplayed()
        applicationsPage.isApplicationsTableDisplayed()
        applicationsPage.isApplicationsIDColumnDisplayed()
        applicationsPage.isNameColumnDisplayed()
        applicationsPage.isModifiedDateColumnDisplayed()
        applicationsPage.isDeletedColumnDisplayed()
        applicationsPage.isPagingSectionDisplayed()
        applicationsPage.isReleaseButtonEnabled()
        applicationsPage.isAdditionalDataLinkDisplayed()
        applicationsPage.isNameColumnSortable()
        applicationsPage.verifyTableDisplayedIsSorted()
        applicationsPage.isSearchSectionDisplayed()
        appName.forEach(app=>{
            applicationsPage.verifySearchFunction(app)
        })
        
        

    })



})