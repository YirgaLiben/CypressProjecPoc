describe('File upload test', () => {
    it('login to Fod site as a tenant', () => {
        cy.visit(Cypress.env("tenantSite"))
        cy.get('#loginEmail').type('AUTO-TAM')
        cy.get('#loginPassword').type('Spi!pass007^')
        cy.get('#loginTenantID').type('tenantid')
        cy.get('#btnLogin').click()

        cy.get('input[type=submit][value=OK]').click()


        cy.get('[data-application-id="6"] > :nth-child(1) > h4 > a').click()
        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').click()
        cy.get('[data-release-id="6"][data-scan-id="9"] > :nth-child(1) > a').click()
        cy.get(':nth-child(4) > .nav-tab > :nth-child(1) > .nav-tab-icon > .ff').click()

        cy.get('.section-right > .dropdown > .btn').click()
        cy.get('.section-right > .dropdown > .dropdown-menu > :nth-child(1) > a').click()
        cy.get("#fprscanUploadBrowse").click()
        // const fileName = 'upload.pdf';

        // cy.fixture(fileName).then(fileContent => {
        //     cy.get('.section-right > .dropdown > .btn').uploadFile({ fileContent, fileName, mimeType: 'application/pdf' }, { subjectType: 'input-group-btn' });
        // });



        cy.get("#fprscanUploadBrowse").click({ force: true })
        cy.uploadFile('static.java.fpr','#fprscanUploadBrowse > input[type=file]','application/fpr')
        cy.get('#fprscanUpload').click();
        // const fileName = 'static.java.fpr';

        // cy.fixture(fileName).then(fileContent => {
        //     cy.get('#fprscanUploadBrowse > input[type=file]').upload({ fileContent, fileName, mimeType: 'application/fpr' });
        // });

        // cy.fixture('static.java.fpr', 'hex').then((excelHex) => {
        //     const excelBytes = hexStringToByte(excelHex);
        //     //create a File object
        //     const file = new File([excelBytes], 'static.java.fpr', {
        //         type: 'application/fpr'
        //     });
        //     //and make the drop
        //     cy.get('#fprscanUploadBrowse > input[type=file]').trigger('drop', {
        //         dataTransfer: {
        //             files: [file],
        //         },
        //     });
        // });

        // const selector = '#fprscanUploadFileName'
        // const fixturePath = 'static.java.fpr' // fixtures/dummy.pdf
        // const type = 'application/fpr' // image/png, etc (content_type)

        // cy.get(selector).then(subject => cy.window().then(win => cy
        //   .fixture(fixturePath, 'base64')
        //   .then(Cypress.Blob.base64StringToBlob)
        //   .then((blob) => {
        //     const el = subject[0]
        //     const testFile = new win.File([blob], name, { type })
        //     const dataTransfer = new win.DataTransfer()
        //     dataTransfer.items.add(testFile)
        //     el.files = dataTransfer.files
        //     cy.wrap(subject).trigger('change', { force: true })
        //   })))

    })


})