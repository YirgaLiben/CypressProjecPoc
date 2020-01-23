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
        cy.get('.btn-link').should('exist').and('have.attr', 'href')
        cy.get('#nav-collapse > .btn-primary').should('exist').and('have.attr', 'href')
        cy.get('h1').should('be.visible').and('exist').and('contain', "Fortify")
        cy.get('h2').should('be.visible').and('exist').and('contain', 'on Demand')
        cy.get('#loginEmail').should('have.attr', 'placeholder', 'Username').and('be.visible').and('exist')
        cy.get('#loginPassword').should('have.attr', 'placeholder', 'Password').and('be.visible').and('exist')
        cy.get('#loginTenantID').should('have.attr', 'placeholder', 'Tenant').and('be.visible').and('exist')
        cy.get('.forgot-password > a').should('exist').and('contain', 'Forgot Your Password?').and('be.visible').and('exist').and('have.attr','href')
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

    }

    verifyErrorMessageDisplayedWithoutEnteringUserNameandPassword(){
        this.clearUserNamePassWordAndTenantFields()
        this.clickLoginButton()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Username is required.')

    }

    verifyErrorMessageDisplayedWithoutEnteringPassword(){
        this.clearUserNamePassWordAndTenantFields()
        this.enterValue('#loginEmail','username')
        this.clickLoginButton()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Password is required.')

    }

    verifyErrorMessageDisplayedWithoutEnteringUserName(){
        this.clearUserNamePassWordAndTenantFields()
        this.enterValue('#loginPassword','password')
        this.clickLoginButton()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Username is required.')

    }
    verifyErrorMessageDisplayedWithoutEnteringTenant(){
        this.clearUserNamePassWordAndTenantFields()
        this.enterValue('#loginEmail','username')
        this.enterValue('#loginPassword','password')
        cy.get('#loginEmail').should('have.value','username')
        cy.get('#loginTenantID').should('have.value','')
        this.clickLoginButton()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Tenant is required.')

    }

    verifyErrorMessageDisplayedForInvalidUserNamePasswordAndTenant(){
        this.clearUserNamePassWordAndTenantFields()
        this.enterValue('#loginEmail','username')
        this.enterValue('#loginPassword','password')
        this.enterValue('#loginTenantID','tenant')
        this.clickLoginButton()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'The username, password and/or tenant was incorrect.')


    }
    
    verifyChooseTenantPageDisplayedForValidUsers(){
        this.clearUserNamePassWordAndTenantFields()
        this.enterValue('#loginEmail','AUTO-TAM')
        this.enterValue('#loginPassword','Spi!pass007^')
        this.enterValue('#loginTenantID','tenantid')
        this.clickLoginButton()
        cy.url().should('include','Account/SwitchTenant?ReturnURL=/Applications')
        cy.get('div.section').contains('Choose Tenant').should('exist').and('be.visible')
        cy.get('#SelectedValue').should('exist').and('be.enabled').and('be.have.length.greaterThan',0)
        cy.get('input[type=submit][value=OK]').should('exist').and('be.enabled')
        

        

    }

    verifyValidTenantsCanLoginToTheSite(){
        this.loginToTenantSite('AUTO-TAM','Spi!pass007^','AUTO-TENANT')
        cy.url().should('include','/Applications')
        cy.get('.navbar-nav a').contains('Applications').should('exist').and('be.visible')
        cy.get('.navbar-nav a').contains('Dashboard').should('exist').and('be.visible')
        cy.get('.navbar-nav a').contains('Reports').should('exist').and('be.visible')
        cy.get('.navbar-nav a').contains('Administration').should('exist').and('be.visible')
        cy.get('#side-nav').should('exist').and('be.visible')

    }



    clearUserNamePassWordAndTenantFields() {
        cy.get('#loginEmail').clear()
        cy.get('#loginPassword').clear()
        cy.get('#loginTenantID').clear()
    }



}

export default LogInPage