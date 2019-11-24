describe('Delete Tenant Scan Test', () => {
    beforeEach(() => {
        cy.LoginToAdminSite("zeusadmin", "Spi!pass007^");


    })
    const tenantsId = [1084, 1042]
    tenantsId.forEach(tenant => {
        it('delete tenants scan $(tenants)', () => {
            const url = "http://fodqa11-iis1/Tenants/" + tenant + "/Repositories"
            cy.visit(url)
            var dt = new Date();
            var dateTime = dt.toLocaleString()

            cy.get('[data-repository-type="2"] > .action-cell > [data-action="delete"]').click();
            cy.get('.box-glow > .modal-custom-content').should('exist');
            cy.get('.btn-critical').click();
            cy.get('.modal-custom-header > span').should('exist').and('contain', 'Confirm')
            cy.get('.modal-message').should('contain', 'Are you REALLY SURE you want to delete the selected repository for this tenant?')
            cy.get('.btn-critical').click({ force: true });


            cy.get('[data-repository-type="2"] > .action-cell > [data-action="delete"]').click();
            cy.get('.box-glow > .modal-custom-content').should('exist');
            cy.get('.btn-critical').click();
            cy.get('.modal-custom-header > span').should('exist').and('contain', 'Confirm')
            cy.get('.modal-message').should('contain', 'Are you REALLY SURE you want to delete the selected repository for this tenant?')
            cy.get('.btn-critical').click({ force: true });


            var deletedTime = dateTime


            //Rebuild Scan
            cy.wait(2000)
            cy.get('[data-repository-type="2"] > .action-cell > [data-action="rebuild"]').click();
            cy.get('.modal-message').should('contain', 'Are you sure you want to queue the rebuild task the selected repository for this tenant?')
            cy.get('.btn-critical').click({ force: true });



            cy.visit("http://fodqa11-iis1/TaskService/Tasks?tenant=" + tenant + "&tt=13&ts=0+3")


            cy.log("TenantID:  " + tenant)


            var tasksFound = Cypress.$('.paging-section-total > span').text()

            let found = false
            let count = 0
            while (!found) {
                if (tasksFound !== "0 found") {
                    cy.reload()
                    found = false
                    count = count + 1
                    cy.wait(1000)
                    if (count === 35) {
                        found = true;
                        cy.log("The page still displaying more task after 35 seconds please verify tenant Id:  " + tenant)
                        
                    }
                }
                else {
                    found = true;

                }
            }

            cy.get('.paging-section-total > span').should('contain', '0 found')
            cy.get('.empty-table').should('exist')

            var results = "[" + deletedTime + "]:" + "Tenant [" + tenant + "] scan repo deleted and [" + dateTime + "]:" + "Tenant [" + tenant + "] scan repo rebuilt\n"
            cy.writeFile("./results/tenantScanDeleteRebuild.txt", results, { flag: 'a+' })


        })
    })
})