import BasePage from '../../page-objects/BasePage'
import LogInPage from '../../page-objects/tenantSite/LogInPage'
import ApplicationsPage from '../../page-objects/tenantSite/Applications/ApplicationsPage'
import SettingsPage from '../../page-objects/tenantSite/Applications/appDetails/SettingsPage'
import AttributesPage from '../../page-objects/tenantSite/administration/settings/AttributesPage'

const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()

describe('Application page test', ()=>{
    const loginPage = new LogInPage()
    const applicationsPage = new ApplicationsPage()
    const settingsPage = new SettingsPage()
    const attributesPage = new AttributesPage()

    beforeEach(function (){
        cy.fixture('TenantId.json').as('tenants')
    })

    it('Verify application page displayed', ()=>{

        cy.visit(Cypress.env("tenantSite"))
        loginPage.loginToTenantSite('AUTO-TAM','Spi!pass007^','AUTO-TENANT')
        applicationsPage.verifyApplicationsPageDisplayed();
        cy.contains('testFP').click()
        cy.get('div.nav-tabs li>a[data-tabaction="SettingsSummary"]').click({force:true})
        cy.get('.SPITabContentGroup > .contextbar > .section').contains('Application Summary').should('exist')
        cy.get('[data-action="save"]').should('exist').and('be.enabled')
        cy.get('[data-action="delete-application"]').should('exist').and('be.enabled').and('contain','Delete Application')

      //  settingsPage.verifyAppDeletionPopUp()
        attributesPage.clickSettingsAttributes()
        attributesPage.addAttributes('test','Picklist','isRequired')

        
        let titleText
        cy.get('@tenants').then((users)=>{
            cy.log(`there are ${users.tenantId}`)
            titleText = normalizeText(`${users.tenantId}`)
            cy.log(titleText)

        })
       

    

       

       




        // cy.get('.nav-tabs > li').should(($list)=>{
        //     expect($list).to.have.length(5)
        //     expect($list.eq(0)).to.contains('Application Summary')//.and('have.attr', 'href')
        //     expect($list.eq(1)).to.contain('Application Attributes')//.and('have.attr', 'href')
        //     expect($list.eq(2)).to.contain('Bug Tracker')//.and('have.attr', 'href')
        //     expect($list.eq(3)).to.contain('Application Defender')//.and('have.attr', 'href')
        //     expect($list.eq(4)).to.contain('Source Control')//.and('have.attr', 'href')
        // })
      
        
       
    
        


    })





})