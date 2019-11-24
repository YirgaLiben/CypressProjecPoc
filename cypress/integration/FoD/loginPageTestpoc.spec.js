
describe('Verify tenant login page - ', () => {

    it('Verify tenant page displayed and check all the elements displayed  ', () => {
        cy.visit(Cypress.env("tenantSite"));
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
        cy.get('#btnLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Username is required.')
        cy.get('#loginEmail').type('fake')
        cy.get('#btnLogin').click()
        cy.get('#login-error > ul > li').should('exist').and('contain', 'Password is required.')
        cy.get('.catch_phrase').should('exist').and('contain', 'Find Fix')
        cy.xpath('//a[text()="Fortify"]').should('have.attr', 'href', 'https://software.microfocus.com/en-us/software/fortify-on-demand').and()
       // Cypress.currentTest.retries(2)


    })

})

// describe('Testing the excel form', function () {
//     it ('Uploading the right file imports data from the excel successfully', function() {

//         const testUrl = 'http://localhost:3000/excel_form';
//         const fileName = 'your_file_name.xlsx';
//         const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//         const fileInput = 'input[type=file]';

//         cy.visit(testUrl);
//         cy.upload_file(fileName, fileType, fileInput);
//         cy.get('#other_form_input2').type('input_content2');
   
//         cy.get('button').contains('Submit').click();

//         cy.get('.result-dialog').should('contain', 'X elements from the excel where successfully imported');
//     })

//     const fileName = 'data.json';

// cy.fixture(fileName).then(fileContent => {
//   cy.get('[data-cy="file-input"]').upload({ fileContent, fileName, mimeType: 'application/json' });
// });
// })
