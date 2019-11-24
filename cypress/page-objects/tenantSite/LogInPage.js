import BasePage from '../BasePage'


class LogInPage extends BasePage {

    loginToTenantSite(userName,password,tenantid)
    {
        cy.visit(Cypress.env("tenantSite"))
        this.enterValue('#loginEmail',userName)
        this.enterValue('#loginPassword',password)
        this.enterValue('#loginTenantID','tenantid')
        this.clickLoginButton()
        this.selectTenant(tenantid)
        this.clickOk()

    }

    clickLoginButton()
    {
        cy.get('#btnLogin').click()
    }

    selectTenant(tenantid)
    {
        if(tenantid==='AUTO-TENANT' || tenantid === '')
        {
            cy.get('#SelectedValue').select(tenantid)
        }
        else

        cy.readFile('cypress/fixtures/TenantId.json').then((tenant) => {

            cy.get('#SelectedValue').should('be.visible').select(tenant.tenantId)

        })

    }
    
    verifyTenantsLoginPageDisplayed()
    {
        cy.visit(Cypress.env("tenantSite"))
        cy.get('.plus_art > object').should('exist');
        cy.get('#mf-logo').should('exist');
        cy.get('.btn-link').should('exist').and('contain', 'Fortify Security Products')
        cy.get('#nav-collapse > .btn-primary').should('have.attr', 'href')
            .and('include', 'https://software.microfocus.com/en-us/software/fortify-on-demand')
        cy.get('h1').should('contain', "Fortify");
        cy.get('h2').should('contain', 'on Demand')
        cy.get('#loginEmail').should('have.attr', 'placeholder', 'Username')
        cy.get('#loginPassword').should('have.attr', 'placeholder', 'Password')
        cy.get('#loginTenantID').should('have.attr', 'placeholder', 'Tenant')
        cy.get('.forgot-password > a').should('exist').and('contain', 'Forgot Your Password?')
        cy.get('.mf-logo > object').should('exist')
        cy.get('#btnLogin').should('exist').and('be.enabled')

    }

    clickOk()
    {
        cy.get('input[type=submit][value=OK]').click()

    }

 
    loginToAdminSite(username, password) 
    {

        cy.visit(Cypress.env("adminSite"))
        this.enterValue('#loginEmail',username)
        this.enterValue('#loginPassword',password)
        cy.get('#btnAdminLogin').click()
       // this.pause(1000)


    }


}

export default LogInPage