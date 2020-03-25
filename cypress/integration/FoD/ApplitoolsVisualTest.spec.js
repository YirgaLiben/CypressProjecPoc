describe('Applitools visual validation POC', () => {

    beforeEach(() => cy.eyesOpen({appName:'TenantsVisualTest',batchName:'Tenants Applittos1'}))
    afterEach(() => cy.eyesClose())

    it('Visual test adding a tenants ', () => {

        cy.LoginToAdminSite("zeusadmin", "Spi!pass007^");

        const tenantId = 'AUTO-TENANT1-' + Date.now();
        cy.eyesCheckWindow('Admin Page dashboard')
        cy.get('.navbar-nav a').contains('Administration').click()
        cy.get('.dropdown-menu').contains('Tenants').click()
        cy.get('[data-action="add-tenant"]').click()
        cy.eyesCheckWindow('Tenant Details')
        cy.get('#secLeadUserName').type("AUTO-SL" + Date.now())
        cy.get('#secLeadEmail').type(tenantId + '@fod.auto')
        cy.get('#secLeadFirstName').type('AUTO-SL1')
        cy.get('#secLeadLastName').type('AUTO-SL1')
        cy.get('[data-action="next"]').click()
        cy.eyesCheckWindow('Tenant Entitlement info')

        
        
        cy.get('#tenantName').type(tenantId)
        cy.get('#tenantCode').type(tenantId)
        cy.get('#addressStreet1').type('5555 Windward Pkwy"')
        cy.get('#addressCity').type('Alpharetta')
        cy.get('#addressCountry').select('Uganda')
        cy.get('#timeZone').select('(UTC) Coordinated Universal Time')
        cy.get('[data-action="next"]').click()
        cy.eyesCheckWindow('Tenant Details')

        cy.get('#entitlementPaymentType').select('Other')
        cy.get('[data-action="next"]').click()
        
 
        cy.get('#industryType').select('Information Technology')
        cy.get('[data-action="next"]').click()
        cy.eyesCheckWindow('Tenants Summary')

    })



})