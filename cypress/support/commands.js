// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
Cypress.Commands.add('loginTenant', () => {

  cy.get('#loginEmail').type('AUTO-TAM')
  cy.get('#loginPassword').type('Spi!pass007^')
  cy.get('#loginTenantID').type('tenantid')
  cy.get('#btnLogin').click()
  cy.get('input[type=submit][value=OK]').click()

});

Cypress.Commands.add('LoginToAdminSite', (username, password) => {
  cy.visit(Cypress.env("adminSite"))
  cy.get('#loginEmail').type(username)
  cy.get('#loginPassword').type(password)
  cy.get('#btnAdminLogin').click()
  cy.wait(1000)

});

Cypress.Commands.add('logout', () => {
  cy.get(':nth-child(6) > a > span').click({ force: true })
});
//

Cypress.Commands.add('MobileScanApplicationName', () => {

  var anysize = 5;//the size of string 
  var charset = "abcdefghijklmnopqrstuvwxyz"; //from where to create
  var i = 0, applicationName;
  while (i++ < anysize)
    applicationName += charset.charAt(Math.random() * charset.length)
  cy.get('#createApplicationName').type("Mobile" + applicationName)

})
Cypress.Commands.add('iframe', (iframeSelector, elSelector) => {
  return cy
    .get(`iframe${iframeSelector || ''}`, { timeout: 10000 })
    .should($iframe => {
      expect($iframe.contents().find(elSelector || 'body')).to.exist
    })
    .then($iframe => {
      return cy.wrap($iframe.contents().find('body'))
    })
})

require('cypress-downloadfile/lib/downloadFileCommand')
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//Iframe work around
// cy.iframe('[title="Calendar"]').as('calenderIframe') // create alias
// cy.get('@calenderIframe') // use alias to efficiently chain commands
//       .find('.Calendar__day')
//       .eq(0)
//       .click()
// cy.get('@calenderIframe')
//       .find('.Calendar__day')
//       .eq(1)
//       .click()
// cy.get('@calenderIframe')
//       .find('.Calendar__day')
//       .eq(2)
//       .click()
import 'cypress-wait-until';

//import 'cypress-drag-drop';

import 'cypress-file-upload';

import 'cypress-capybara/add-commands';


// Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
//   cy.get(selector).then(subject => {
//     cy.fixture(fileName, 'base64')
//       .then(Cypress.Blob.base64StringToBlob)
//       .then(blob => {
//         const el = subject[0]
//         const testFile = new File([blob], fileName, { type: fileType })
//         const dataTransfer = new DataTransfer()
//         dataTransfer.items.add(testFile)
//         el.files = dataTransfer.files
//       })
//   })
// })


Cypress.Commands.add('uploadFile', (fixtureFileName, inputSelector, mimeType = '') => {
  return cy.get(inputSelector).then(subject => {
    return cy.fixture(fixtureFileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const nameSegments = fixtureFileName.split('/');
        const name = nameSegments[nameSegments.length - 1];
        const testFile = new File([blob], name, { type: mimeType });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        el.dispatchEvent(new Event('change'));
        return subject;
      })
      .then(_ => cy.wait(1000));
  });
})


Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
  if (fileType = "pdf") {
    fileType = 'application/pdf';
  } else if (fileType = "rar") {
    fileType = 'application/x-rar-compressed';
  } else if (fileType = "xls") {
    fileType = 'application / vnd.ms - excel';
  } else if (fileType = "doc") {
    fileType = 'application / msword'
  } else if (fileType = "docx") {
    fileType = 'application / msword'
  }
  return cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: fileType
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
      });
  });

});


//API

Cypress.Commands.add('GetAccessToken', () => {
  Cypress.log({
    name: 'access_token',
  });

  const options = {
    method: 'POST',
    url: 'http://fodqa11-iis3/oauth/token',
    form: true, 
    body: {
        grant_type: 'client_credentials',
        scope: 'api-tenant',
        client_id: '08f144a6-2823-46d3-856d-15a5db8a5320',
        client_secret: 'aG14NGpAV1gyWjJ0WnBzeiZGZy40b00zZmxodEJV0'
        
    },
  };
  cy.request(options).then(response => {
    localStorage.setItem("access_token", response.body.access_token);
    return response.body.access_token;
  })

})

//test
Cypress.Commands.add('GetToken', ()=>{
  cy.request({
    method: 'POST',
    url: 'http://fodqa11-iis3/oauth/token',
    form: true, 
    body: {
        grant_type: 'client_credentials',
        scope: 'api-tenant',
        client_id: '08f144a6-2823-46d3-856d-15a5db8a5320',
        client_secret: 'aG14NGpAV1gyWjJ0WnBzeiZGZy40b00zZmxodEJV0'
        
    }
})

    .then((response) => {
        cy.log(response.body)
        assert.equal(response.status, 200);  
        expect(response.body).to.not.be.null;  
        cy.log(response.body.expires_in)
        window.localStorage.setItem('access_token',response.body.access_token)
        var access_token = response.body.access_token;
        cy.writeFile('cypress/fixtures/access_token.json', { accessToken: access_token})

    })

  });


let LOCAL_STORAGE_MEMORY = {};
Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});


Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});


Cypress.Commands.add('CreateTenants', () =>{

  const tenantId = 'AUTO-TENANT1-' + Date.now();
  const appName = 'appName' + + Date.now();
  
 
  cy.get('.navbar-nav a').contains('Administration').click()
  cy.get('.dropdown-menu').contains('Tenants').click()
  cy.get('[data-action="add-tenant"]').click()
  //Security Lead
  cy.get('#secLeadUserName').type("AUTO-SL" + Date.now())
  cy.get('#secLeadEmail').type(tenantId + '@fod.auto')
  cy.get('#secLeadFirstName').type('AUTO-SL1')
  cy.get('#secLeadLastName').type('AUTO-SL1')
  cy.get('[data-action="next"]').click()
  //Tenant Details
  cy.get('#tenantName').type(tenantId)
  cy.get('#tenantCode').type(tenantId)
  cy.get('#addressStreet1').type('5555 Windward Pkwy"')
  cy.get('#addressCity').type('Alpharetta')
  cy.get('#addressCountry').select('Uganda')
  cy.get('#timeZone').select('(UTC) Coordinated Universal Time')
  cy.get('[data-action="next"]').click()
  //Tenant Entitlement info
  cy.get('#entitlementPaymentType').select('Other')
  cy.get('[data-action="next"]').click()
  //Additional Tenant Info
  cy.get('#industryType').select('Information Technology')
  cy.get('[data-action="next"]').click()
  cy.get('[data-action="save"]').click()
  cy.get('#btnSaveTenantDetails')

  cy.get('.navbar-nav a').contains('Administration').click()
  cy.get('.dropdown-menu').contains('Users').click()

  cy.get('[data-role="searchText"]').type('AUTO-TAM{enter}')
  cy.get('[data-user-name="AUTO-TAM"] > .action-cell > [data-action="edit-user"]').click()
  cy.get('select[name="countryid"]').select('Albania')
  cy.get('#tenantSearch').type(tenantId)
  cy.get('div#selectedTenants > table > thead > tr > th > label > span').click()
  cy.get('[data-action="save-user"]').click()

  cy.get('#modalAddTenant').should('not.exist')
  cy.get('[data-role="searchText"]').should('have.value', 'AUTO-TAM')
  cy.writeFile('cypress/fixtures/TenantId.json', { tenantId: tenantId })
  cy.writeFile('cypress/fixtures/TenantId.csv', tenantId)

});
