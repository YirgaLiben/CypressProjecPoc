describe('Admin Site Settings Page', () => {


    it('Verify admin site setting page displayed', () => {
        cy.LoginToAdminSite('zeusadmin', 'Spi!pass007^')
        cy.get(':nth-child(1) > .dropdown > .dropdown-toggle').should('exist')
        cy.get('.dropdown-menu > :nth-child(6) > a').click({ force: true })
        cy.get(':nth-child(1) > .contextbar > .section').should('exist').and('contain', 'Configuration')
        cy.get('.SPITabContentGroup > .contextbar > .section').should('exist').and('contain', 'Site Settings')
        cy.get('#side-nav > ul > li:nth-child(2) > a').should('have.class', ' nav-tab selected')
        let siteSettingName = Cypress.$('[data-setting-id="143"] > :nth-child(2)').text()
        cy.get('[data-setting-id="143"] > .action-cell > .btn').click()




        cy.log(siteSettingName)

    })
    it('Verify Site Edit name and value', () => {
        //cy.get('[data-setting-id="143"] > .action-cell > .btn').click()
        //cy.get('[data-setting-id="143"] > .action-cell > .btn').click()
        ///  cy.get('[data-setting-id="143"] > .action-cell > .btn').click()
        //cy.wait(100)
        cy.get('#modalEditSiteSetting > .modal-custom-header').should('be.exist').and('contain', 'Edit Site Setting')
        // cy.get('.modal-custom-content > :nth-child(1) > :nth-child(1)').should('exist').and('contain','Name')

        // cy.get(':nth-child(1) > .form-control').should('be.disabled').and('contain.value','AgentToken')

    })

    it("pdf test", () => {
        const fileName = 'static.java.fpr';


        cy.fixture(fileName).then(fileContent => {
            cy.get('#filesToUpload').upload({ fileContent, fileName, mimeType: 'application/pdf' }, { subjectType: 'input' });
        });
    })


})