import LogInPage from '../../page-objects/tenantSite/LogInPage'
import TenantsPage from '../../page-objects/adminSite/administration/TenantsPage'
import ApplicationPage from '../../page-objects/tenantSite/Applications/ApplicationsPage'
import SettingsPage from '../../page-objects/tenantSite/Applications/appDetails/SettingsPage'
import AttributesPage from '../../page-objects/tenantSite/administration/settings/AttributesPage'


const tenantId = 'AUTO-TENANT1-' + Date.now();
const appName = 'appName' + + Date.now();

describe('App Summary and Attributes Test', ()=>{

    beforeEach(()=>{
        cy.fixture('TenantId.json').as('tenantId')
    })
    
    const loginPage = new LogInPage()
    const tenantsPage = new TenantsPage()
    const settingsPage = new SettingsPage()
    const attributesPage = new AttributesPage()
    const applicationPage = new ApplicationPage()


    it('Create a tenant',()=>{
        
        loginPage.loginToAdminSite("zeusadmin", "Spi!pass007^");
        tenantsPage.navigateToTenantsPage()
        tenantsPage.createTenant(tenantId)
        Cypress.currentTest.retries(1)

    })

    it('Create an application and verify tenants  App summary page',()=>{

        loginPage.loginToTenantSite('AUTO-TAM','Spi!pass007^','tenantId')
        applicationPage.createApplication(appName,'High','Web / Thick-Client','Production')
        applicationPage.selectCreatedApplication(appName)
        settingsPage.clickSettingTab()
        settingsPage.verifyApplicationSummaryPageDisplayed()
        settingsPage.verifyApplicationSummaryTabDisplayed()
        settingsPage.verifyApplicationSaveValidation()
        settingsPage.verifyApplicationNameDisplayed(`${appName}`)
        settingsPage.verifyBusinessCriticalitySelected('High')
        settingsPage.verifyApplicationTypeDisplayed('Web / Thick-Client')
        settingsPage.verifyApplicationDescriptionDisplayed('The most epic App ever')
        settingsPage.verifyEmailValidation()
        settingsPage.enterAndVerifyAdditionalEmails('Yahoo@gmail.com;test@test.com')
        settingsPage.verifyAppDeletionPopUp()
        settingsPage.updateApplicationSummaryAndVerifyUpdateSaved()
        settingsPage.verifyApplicationDeleted(appName)
        Cypress.currentTest.retries(1)

    })

    it('Create an app  and verify application attributes page',()=>{

        loginPage.loginToTenantSite('AUTO-TAM','Spi!pass007^','tenantId')
        applicationPage.createApplication(appName,'High','Web / Thick-Client','Production')
        attributesPage.navigateToSettingsAttributesPage()
        attributesPage.addAttributes('CustomAttribute1','Text','isRequired')
        attributesPage.addAttributes('CustomPicklist','Picklist','notRequired')
        attributesPage.addAttributes('CustomAttribute3','Boolean','isRequired')
        attributesPage.addAttributes('CustomAttributeDate','Date','notRequired')
        attributesPage.addAttributes('CustomAttributeUser','User','notRequired')
        applicationPage.navigateToApplicationsPage()   
        applicationPage.searchForCreatedApplication(appName)
        settingsPage.clickSettingTab()
        settingsPage.clickApplicationAttributesTab()
        settingsPage.verifyAddedAttributesDisplayInAppAttributesPage()
        settingsPage.verifyApplicationAttributesSaveValidation()
        settingsPage.createApplicationAndVerifyAttributes()

    })
})