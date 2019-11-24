import BasePage from '../../page-objects/BasePage'
import LogInPage from '../../page-objects/tenantSite/LogInPage'
import ApplicationsPage from '../../page-objects/tenantSite/Applications/ApplicationsPage'

describe('page object test', ()=>{

    const basePage = new BasePage()
    const loginPage = new LogInPage()
    const applicationsPage = new ApplicationsPage()


    it('Tenants login page test',()=>{

        loginPage.verifyTenantsLoginPageDisplayed()
      
    })

    it('login to tenants page', ()=>{
        loginPage.loginToTenantSite('AUTO-TAM','Spi!pass007^','AUTO-TENANT')
        applicationsPage.verifyApplicationsPageDisplayed();
        cy.contains('testFP').click()
        cy.get('div.nav-tabs li>a[data-tabaction="SettingsSummary"]').click({force:true})

    })

    
})