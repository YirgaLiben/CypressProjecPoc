describe('test123', ()=>{

//it('test', ()=>{

    let number  = Cypress._.random(100, 100000)

    
    Cypress._.times(10, (i) => {
        it(`num ${i + 1} - test the thing conditionally`, () => {
            cy.reload(i)
            cy.log(number)

      })
})


})