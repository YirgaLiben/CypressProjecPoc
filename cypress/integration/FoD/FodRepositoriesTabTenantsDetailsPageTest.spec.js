import TenantsPage from '../../page-objects/adminSite/administration/TenantsPage'
import RepositoriesPage from '../../page-objects/adminSite/administration/TenantDetails/RepositoriesPage'
import LogInPage from '../../page-objects/tenantSite/LogInPage'




describe('Repositories tab at Tenant Details page Test', () => {

    beforeEach(() => {
        cy.fixture('TenantId.json').as('tenantId')
    })

    const tenantsPage = new TenantsPage()
    const loginPage = new LogInPage()
    const repositoriesPage = new RepositoriesPage()

    const tenantid = ['AUTO-TENANT1-' + Date.now()]



    it('Verify Repositories page functionality', () => {

        loginPage.loginToAdminSite("zeusadmin", "Spi!pass007^");
        tenantsPage.navigateToTenantsPage()
        tenantid.forEach(tenantId => {
            tenantsPage.createTenant(tenantId)
            tenantsPage.searchTenantsAndNavigateToDetailsPage(tenantId)
            repositoriesPage.clickRepositoriesTab()
            repositoriesPage.isTheSelectedTenantDisplayedOnThePage(tenantId)
            repositoriesPage.isRepositoriesTableDisplayed()
            repositoriesPage.isRefreshPermissionsButtonDisplayed()
            repositoriesPage.isHealthCheckButtonDisplayed();
            repositoriesPage.isRebuildButtonDisplayed()
            repositoriesPage.isDeleteButtonDisplayed()
            repositoriesPage.isRepositoryTypeColumnDisplayed()
            repositoriesPage.isRepositoryIDColumnDisplayed()
            repositoriesPage.isRecordCountColumnDisplayed()
            repositoriesPage.verifyRepositoryTypeColumnContainsDefainedTypes()
            repositoriesPage.verifyPopUpWindowDisplayedRefreshPermissionsButton()
            repositoriesPage.verifyPopUpWindowDisplayedByClickingHealthCheckButton()
            repositoriesPage.verifyPopUpWindowDisplayedForEachRepoTypeByClickingRebuildButton()
            repositoriesPage.verifyPopUpWindowDisplayedForEachRepoTypeByClickingDeleteButton()
        })

    })

})

