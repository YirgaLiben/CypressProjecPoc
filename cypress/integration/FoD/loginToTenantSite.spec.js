

const tenantUrl = Cypress.env("tenantSite")


describe('Login to tenant site and verify  user land on application page', () => {


    it('verify tenant user can login and user land on application page', () => {
        cy.visit(Cypress.env("tenantSite"))
        cy.loginTenant()
        cy.get('#main').screenshot();
        cy.get('#primary-nav').should('exist').and('be.visible').screenshot()
        cy.url().should('contain', 'Applications')
        cy.get('#nav-collapse > :nth-child(1) > .active > a').should('contain', 'Applications').and('have.attr', 'href')
        cy.get('#nav-collapse > :nth-child(1) > :nth-child(2) > a').should('contain', 'Dashboard').and('have.attr', 'href')
        cy.get('#nav-collapse > :nth-child(1) > :nth-child(3) > a').should('contain', 'Reports').and('have.attr', 'href')
        cy.get('#nav-collapse > :nth-child(1) > :nth-child(4) > a').should('contain', 'Administration').and('have.attr', 'href')
        cy.get('#side-nav').should('exist').and('be.visible').screenshot()

    })
    after(function () {
        cy.logout()
    })
})