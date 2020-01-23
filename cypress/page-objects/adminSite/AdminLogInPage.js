import BasePage from '../BasePage'

class AdminLogInPage extends BasePage {
    verifyAdminLoginPageDisplayed() {
        cy.visit(Cypress.env("adminSite"))
        cy.url().should('include', '/Login')
        cy.get('div.contextbar.upper').should('contain', 'Admin Login').and('be.visible')
        cy.get('#nav-collapse').should('be.visible').and('exist')
        cy.get('#loginEmail').should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Email/User name')
        cy.get('#loginPassword').should('be.visible').and('be.enabled').and('have.attr', 'placeholder', 'Password')
        cy.get('#btnAdminLogin').should('be.visible').and('be.enabled')
        cy.get('.text-center').should('exist').and('contain', '© Copyright 2019 Micro Focus or one of its affiliates')


    }

    loginToAdminSite(username, password) {

        cy.visit(Cypress.env("adminSite"))
        this.clearUserNameAndPassWordFields()
        this.enterValue('#loginEmail', username)
        this.enterValue('#loginPassword', password)
        cy.get('#btnAdminLogin').click()


    }


    verifyErrorMessageDisplayedWithoutEnteringUserNameandPassword() {
        this.clearUserNameAndPassWordFields()
        cy.get('#btnAdminLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Username is required.')

    }

    verifyErrorMessageDisplayedWithoutEnteringUsername() {
        this.clearUserNameAndPassWordFields()
        this.enterValue('#loginPassword', 'password')
        cy.get('#btnAdminLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Username is required.')

    }

    verifyErrorMessageDisplayedWithoutEnteringPassword() {
        this.clearUserNameAndPassWordFields()
        this.enterValue('#loginEmail', 'test123')
        cy.get('#btnAdminLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Password is required.')

    }



    verifyErrorMessageDisplayedForInvalidUsernameAndPassword() {
        this.clearUserNameAndPassWordFields()
        cy.get('#loginEmail').clear()
        this.enterValue('#loginEmail', 'test123')
        this.enterValue('#loginPassword', 'testPassword')
        cy.get('#btnAdminLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'The username or password was incorrect.')

    }

    verifyAdminUserCanLoginToTheSite(){
        this.loginToAdminSite('zeusadmin','Spi!pass007^')
        cy.get('.navbar-nav a').contains('Dashboard').and('have.attr','href')
        cy.get('.navbar-nav a').contains('Tasks').should('exist').and('have.attr','href')
        cy.get('.navbar-nav a').contains('Container').should('exist').and('have.attr','href')
        cy.get('.navbar-nav a').contains('Mobile').should('exist').and('have.attr','href')
        cy.get('.navbar-nav a').contains('Dynamic').should('exist').and('have.attr','href')
        cy.get('.navbar-nav a').contains('Administration').should('exist').and('have.attr','href')


    }


    clearUserNameAndPassWordFields() {
        cy.get('#loginEmail').clear()
        cy.get('#loginPassword').clear()
    }

}

export default AdminLogInPage