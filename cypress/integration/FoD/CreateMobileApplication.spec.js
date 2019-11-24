/// <reference types="Cypress" />

describe('Verify application page', () => {


    it('Verify application page displayed and new application button displayed and enabled', () => {
        cy.visit(Cypress.env("tenantSite"))
        cy.loginTenant()
        cy.url().should('include', 'Applications')
        cy.get('.section-right > .btn-primary').should('contain','New Application').and('be.enabled')
        cy.get('.section-right > .btn-primary').click()
        cy.get('#modalCreateApplication').should('exist')
        cy.MobileScanApplicationName();
 
        // cy.get('#createApplicationName').then(($appName)=>{
        //     const appName = $appName.val()
        //     cy.log(appName)
        // })

        cy.get('#createApplicationBusinessCriticality').select('Medium')
        cy.get('#createApplicationApplicationType').select('Mobile')
        cy.get('#createApplicationDescription').type('Mobile application')
        cy.get('#createApplicationEmailNotifications').should('have.value','');
        cy.get('#createApplicationEmailNotifications').type('Cypress@email.com').should('have.value','Cypress@email.com')
        cy.get('[data-action="next"]').click()
        cy.get('#createApplicationReleaseName').type('test')
        cy.get('#createApplicationReleaseSDLC').select('Production')
        cy.get('#createApplicationReleaseDescription').type('test')
        cy.get('[data-action="next"]').click();
        cy.get('#createApplicationAttributeContainer > :nth-child(1) > .form-control').select('A')
        cy.get('#createApplicationAttributeContainer > :nth-child(2) > .form-control').type('autoText')
        cy.get('#createApplicationAttributeContainer > :nth-child(3) > .form-control').select('True')

        cy.get('[data-action="next"]').click();
       // cy.get('.buttonblock > .btn-primary').should('exist').and('be.enabled').click()
       // cy.get('.section-right > :nth-child(2) > .btn').click()
       //cy.get('[data-itemname="mobile"] > a').click() //start
       // cy.get('[data-groupid="7"] > .action-cell > .control > .control-indicator').click().should('have.class','control-indicator')
       // 

        cy.get('[data-groupid="7"] > .action-cell > .control > .control-indicator').not('[disabled]')
        .click().should('have.class','control-indicator')
        cy.get('[data-action="next"]').click();
        


 
    })

    after(function () {
        cy.logout()
    })



})