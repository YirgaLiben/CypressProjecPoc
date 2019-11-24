
describe('Get access token', () => {

    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    //   });

    it('Get access token', () => {

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
    })


    // afterEach(() => {
    //     cy.saveLocalStorage();
    //   });
 

})
