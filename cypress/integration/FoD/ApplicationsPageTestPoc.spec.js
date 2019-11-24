

describe('Verify application page', () => {

  //  const generator = require('mochawesome-report-generator')

    it('Verify tenant land on application after login to the site', () => {
        cy.visit(Cypress.env("tenantSite"))
        cy.loginTenant()
        cy.url().should('include', 'Applications')
        cy.screenshot()
        cy.get('#main').should('exist')
        cy.get('#nav-collapse > :nth-child(1) > .active > a').should('contain', 'Applications').and('have.attr', 'href')
        cy.get('.section').should('contain', 'Your Applications')

    })

    it('Verify side navigation tabs displayed and verify mouseover ', () => {
        cy.get('#side-nav').should('exist').and('be.visible').screenshot()
        cy.get('#side-nav > ul > li:nth-child(2)').invoke('trigger', 'mouseover', 'text')
            .then((text) => {
                const tooltip = text;
                expect(tooltip).to.contain('Your Applications');
            })
        cy.get('#side-nav > ul > li:nth-child(3)').invoke('trigger', 'mouseover', 'text')
            .then((text) => {
                const tooltip = text;
                expect(tooltip).to.contain('Your Releases');
            })

        cy.get('#side-nav > ul > li:nth-child(4)').invoke('trigger', 'mouseover', 'text')
            .then((text) => {
                const tooltip = text;
                expect(tooltip).to.contain('Your Scans');
            })
        cy.get('#side-nav > ul > li:nth-child(5)').invoke('trigger', 'mouseover', 'text')
            .then((text) => {
                const tooltip = text;
                expect(tooltip).to.contain('Open Source Components');

            })
            //await generator.create(jsonReport)
    })
    after(function () {
        cy.logout()
    })

})
