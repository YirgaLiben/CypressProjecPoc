var chalk = require("chalk");

var JSONStream = require("JSONStream");


describe('sql run poc', () => {


  it('execute sql script and save the results in json format', () => {


    cy.exec('node sql2.js').then((result) => {

      cy.exec(`echo ${JSON.stringify(result.stdout)} >cypress/fixtures/sql.json`)
      cy.log(result.stdout.JSON.stringify)
    

    })

  })

  it('read saved sql results',()=> {

    cy.readFile('cypress/fixtures/sql.json').then((tenantID) =>{
      cy.log(tenantID)
  
    })
  })


})










