
import LogInPage from '../../page-objects/tenantSite/LogInPage'
import TenantsPage from '../../page-objects/adminSite/administration/TenantsPage'



describe('Admin Tenants Page Test', ()=>{

    const loginPage = new LogInPage()
    const tenantsPage = new TenantsPage()

    

    it('verify admin tenants page displayed',()=>{
        const tenantId = 'AUTO-TENANT1-' + Date.now();
        loginPage.loginToAdminSite("zeusadmin", "Spi!pass007^");
        tenantsPage.navigateToTenantsPage()
        tenantsPage.verifyTenantsPageDisplayed()
        tenantsPage.createTenant(tenantId)
        
    })
})