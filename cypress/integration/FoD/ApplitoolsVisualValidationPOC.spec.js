describe('Applitools visual validation POC', () => {

    beforeEach(() => cy.eyesOpen({
        appName: 'Add Tenants Visual Test', batchName: 'Add Tenants Visual Validation',
        browser: [
            { name: 'chrome',width: 1024,height:768 },
            { name: 'edge',width: 1024,height:768 }, 
            { name: 'firefox',width: 1024,height:768 }, 
            { deviceName: 'iPhone X' },

        ]
    }))

    afterEach(() => cy.eyesClose())

    it('Visual test adding a tenants ', () => {

        cy.LoginToAdminSite("zeusadmin", "Spi!pass007^");
        cy.eyesCheckWindow('Admin Page dashboard')
        cy.get('.navbar-nav a').contains('Administration').click()
        cy.get('.dropdown-menu').contains('Tenants').click()
        cy.get('[data-action="add-tenant"]').click()

        cy.get('#secLeadUserName').type('AUTO-TENANT1234')
        cy.get('#secLeadEmail').type('AUTO-TENANT1234@fod.auto')
        cy.get('#secLeadFirstName').type('AUTO-SL1')
        cy.get('#secLeadLastName').type('AUTO-SL1')
        cy.eyesCheckWindow('Security Lead Page Summary')
        cy.get('[data-action="next"]').click()

        cy.get('#tenantName').type('AUTO-TENANT1234')
        cy.get('#tenantCode').type('AUTO-TENANT1234')
        cy.get('#addressStreet1').type('5555 Windward Pkwy"')
        cy.get('#addressCity').type('Alpharetta')
        cy.get('#addressCountry').select('Uganda')
        cy.get('#timeZone').select('(UTC) Coordinated Universal Time')
        cy.eyesCheckWindow('Tenant Details Summary')
        cy.get('[data-action="next"]').click()

        cy.get('#entitlementPaymentType').select('Other')
        cy.eyesCheckWindow('Tenant Entitlement Info summary')
        cy.get('[data-action="next"]').click()

        cy.get('#industryType').select('Information Technology')
        cy.get('[data-action="next"]').click()
        cy.eyesCheckWindow('Tenants Summary')

    })



})