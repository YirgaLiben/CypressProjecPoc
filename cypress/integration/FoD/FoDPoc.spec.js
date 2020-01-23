
const tenantId = 'AUTO-TENANT1-' + Date.now();
const appName = 'appName' + + Date.now();

var sql = require('mssql');

describe('POC for Task', () => {

    beforeEach(() => {
        cy.restoreLocalStorage();
    });


    it.skip('Creat tenant', () => {

        cy.LoginToAdminSite("zeusadmin", "Spi!pass007^");
        cy.CreateTenants();

    })


    it('Create application', () => {
        cy.visit(Cypress.env("tenantSite"))
        cy.get('#loginEmail').type('AUTO-TAM')
        cy.get('#loginPassword').type('Spi!pass007^')
        cy.get('#loginTenantID').type('tenantId')
        cy.get('#btnLogin').click()

        cy.readFile('cypress/fixtures/TenantId.json').then((tenant) => {

            cy.get('#SelectedValue').should('be.visible').select(tenant.tenantId)
            cy.get('input[type=submit][value=OK]').click()

        })


        cy.get('[data-action="add-application"]').should('be.visible').click()
        cy.get('#createApplicationName').type(appName)
        cy.get('#createApplicationBusinessCriticality').select('High')
        cy.get('#createApplicationApplicationType').select('Web / Thick-Client')
        cy.get('#createApplicationDescription').type('The most epic App ever')
        cy.get('[data-action="next"]').click()

        cy.get('#createApplicationReleaseName').type('APP-RELEASE')
        cy.get('#createApplicationReleaseSDLC').select('Production')
        cy.get('#createApplicationReleaseDescription').type('Auto App Release')
        cy.get('[data-action="next"]').click()
        cy.get('[data-action="save"]').click()

        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').click({ force: true });
        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click();
        cy.get('.section-right > .dropdown > .btn').click()
        cy.get('.section-right > .dropdown > .dropdown-menu > :nth-child(1) > a').click()
        cy.get("#fprscanUploadBrowse").click()

        cy.get("#fprscanUploadBrowse").click({ force: true })
        cy.uploadFile('static.java.fpr', '#fprscanUploadBrowse > input[type=file]', 'application/fpr')
        cy.get('#fprscanUpload').click();
        cy.get(':nth-child(2) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click()
        cy.reload()
        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click();
        cy.reload()
        cy.get(':nth-child(2) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click()
    
        cy.reload()
        cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').then(($div) => {
  
            
            let found = false
            let count = 0
            while (!found) {
                let scanStatus1 = $div.text()
                if (scanStatus1 !== "Completed") {
                    cy.reload()
         
                    found = false
                    count = count + 1
                    cy.wait(1000)
                    scanStatus1 = $div.text()
                    if (count === 17) {
                        cy.log(scanStatus1)
                        found = true;
                        
                        
                    }
                }
                else {
                    found = true;
                    cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text', "Completed")


                }
            }
        })

        

        // cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').then(($body) => {
        //     if ($body.text().includes('Completed')) {
        //         cy.log($body.text())
        //         cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text', "Completed")
        //     } else {
                
        //         while (!($body.text().includes('Completed'))) {
        //             cy.reload()
        //             if ($body.text().includes('Completed')) {
        //                 cy.log($body.text())
        //                 cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text', "Completed")
        //                 break;
        //             }
        //             else 
        //             {
        //                 if(count < 15)
        //                 count++;
        //                 cy.reload()
        //                 cy.log($body.text())
        //             }
        //         }


        //     }

        // })


       

        //  cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text',"Completed")

        // var getScanStatus = Cypress.$('.scan-status-icon > .scan-status > a > div').text();
        //cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').invoke('text').then((getScanStatus) =>{

        // cy.waitUntil(() =>  cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').then((getScanStatus) =>
        //     getScanStatus == 'Completed')
        // , {
        //     errorMsg: 'This is a custom error message', // overrides the default error message
        //     timeout: 6000, // waits up to 2000 ms, default to 5000
        //     interval: 500 // performs the check every 500 ms, default to 200
        //   })

        // // let found = false
        // let count = 0
        // while (!found) {
        //     if (getScanStatus !== "Completed") {
        //         cy.reload()
        //         cy.log(getScanStatus)

        //         found = false
        //         count = count + 1
        //         cy.wait(1000)
        //         if (count === 10) {
        //             found = true;
        //             cy.log("Scan still in progress after 10sec wait")

        //         }
        //     }
        //     else {
        //         found = true;
        //         cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text',"Completed")

        //     }
        // }


        // })
        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click();
        cy.reload()
        cy.get(':nth-child(2) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click()
        cy.reload()
        cy.reload()
        cy.reload()

        // cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('have.text',"Completed")

        //    // cy.get(':nth-child(1) > .scan-status-icon > .scan-status > a > div').should('contain','Completed')
        //     cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').should('be.visible').click();
        //     cy.get('tbody > tr > :nth-child(4)').invoke('text').then((text) => {
        //         expect(text).to.contain('Completed')

        //     })

        //     const scanpageIssuecount  = Cypress.$('.severity-badge-total').text()
        //     cy.log(scanpageIssuecount)

        //     cy.get(':nth-child(3) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').click()
        //     const issuepageIssuesCount = Cypress.$(':nth-child(5) > a > .badge').text()  //.category-badge-all

        //     cy.log(issuepageIssuesCount)


    })



    afterEach(() => {
        cy.saveLocalStorage();
    });


})