import BasePage from '../../BasePage'
import LoginPage from '../../tenantSite/LogInPage'


//const requiredExample = require('../../../fixtures/TenantId.json')


class TenantsPage extends BasePage {

    verifyTenantsPageDisplayed()
    {
        cy.get('.section').should('contain','Tenants')
        cy.get('.search-text-container > .form-control').should('have.attr', 'placeholder', 'Search Text')
        cy.get('.section-right > .btn-primary').should('exist').and('be.enabled')
        cy.get('.prettygrid').should('exist')
        cy.get('thead > tr > :nth-child(1) > a').should('contain','Tenant Name').and('exist')
        cy.get('thead > tr > :nth-child(2) > a').should('contain','Tenant Code').and('exist')
        cy.get('thead > tr > :nth-child(3) > a').should('contain','Demo Tenant').and('exist')
        cy.get('thead > tr > :nth-child(4) > a').should('contain','Country Name').and('exist')
        cy.get('thead > tr > :nth-child(5) > a').should('contain','Status').and('exist')

    }
    navigateToTenantsPage()
    {
        cy.get('.navbar-nav a').contains('Administration').click()
        cy.get('.dropdown-menu').contains('Tenants').click()

    }

    createTenant(tenantId)
    {

       this.navigateToTenantsPage()
        cy.get('[data-action="add-tenant"]').click()
        //Security Lead
        cy.get('#secLeadUserName').type("AUTO-SL" + Date.now())
        cy.get('#secLeadEmail').type(tenantId + '@fod.auto')
        cy.get('#secLeadFirstName').type('AUTO-SL1')
        cy.get('#secLeadLastName').type('AUTO-SL1')
        cy.get('[data-action="next"]').click()
        //Tenant Details
        cy.get('#tenantName').type(tenantId)
        cy.get('#tenantCode').type(tenantId)
        cy.get('#addressStreet1').type('5555 Windward Pkwy"')
        cy.get('#addressCity').type('Alpharetta')
        cy.get('#addressCountry').select('Uganda')
        cy.get('#timeZone').select('(UTC) Coordinated Universal Time')
        cy.get('[data-action="next"]').click()
        //Tenant Entitlement info
        cy.get('#entitlementType').select('Assessment Units')
        cy.get('#entitlementSubscriptionType').select('Entitlement Period')
        cy.get('#entitlementPaymentType').select('Other')
        cy.get('#remediationScansAllowed').type('2')
        cy.get('#remediationScanPeriod').type('3')
        cy.get('[data-action="next"]').click()
        //Additional Tenant Info
        cy.get('#industryType').select('Information Technology')
        cy.get('#primaryCustomerContactEmail').type('yahoo@gmail.com')
        cy.get('[data-action="next"]').click()
        cy.get('#tenantDetailsSummary').should('exist')
        cy.get('[data-action="save"]').click()
        cy.get('#TenantModel_PrimaryCustomerContactEmail').type('yahoo@gmail.com')
        cy.get('#btnSaveTenantDetails')
        cy.get('#modalAddTenant').should('not.exist')
      
        cy.get('.navbar-nav a').contains('Administration').click()
        cy.get('.dropdown-menu').contains('Users').click()
      
        cy.get('[data-role="searchText"]').type('AUTO-TAM{enter}')
        cy.get('[data-user-name="AUTO-TAM"] > .action-cell > [data-action="edit-user"]').click()
        //cy.get('select[name="countryid"]').select('Albania')
        cy.get('#modalAddUser').click()
        cy.get('#tenantSearch').focus()
        cy.get('#tenantSearch').type(tenantId)
        cy.get('div#selectedTenants > table > thead > tr > th > label > span').click()
        cy.get('[data-action="save-user"]').click()
        cy.get('#div.modalAddUser.model.box-glow').should('not.exist')
        cy.get('[data-action="add-user"]').should('exist')
        cy.get('[data-role="searchText"]').should('have.value', 'AUTO-TAM')
        cy.reload()
        this.navigateToTenantsPage()
        cy.get('[data-role="searchText"]').type(`${tenantId}{enter}`)
        cy.contains(tenantId).should('exist')
        cy.get('.paging-section-total > span').should('contain.text','1 found')
        cy.writeFile('cypress/fixtures/TenantId.json', { tenantId: tenantId })
        cy.writeFile('cypress/fixtures/TenantId.csv', tenantId)
        
      
    }

    getTenantId()
    {
      
        cy.readFile('cypress/fixtures/TenantId.json').then(($tenant) =>{
            
            return  $tenant.tenantId

        })

       
    }

    searchTenantsAndNavigateToDetailsPage(tenantId)
    {
     
        this.navigateToTenantsPage()
        cy.get('[data-role="searchText"]').type(`${tenantId}{enter}`)
        cy.get('table').find('tr').contains(`${tenantId}`).click()


    }

}

export default TenantsPage