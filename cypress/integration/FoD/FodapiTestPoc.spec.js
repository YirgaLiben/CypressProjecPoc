const appName  = 'appName' + + Date.now();


describe('sample test', () => {

    beforeEach(() => {
        cy.fixture('access_token.json').then((Token) => {
            localStorage.setItem('access_token', Token.accessToken);
        });
    });


    // before(() => {
    //     cy.GetAccessToken()
    // });

    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    // });



    it('get request', () => {
        cy.request({
            method: 'GET',
            url: 'http://fodqa11-iis3/api/v3/tenants',
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('access_token')

            }

        }).then((response) => {
            cy.log(response.body)
            assert.equal(response.status, 200);
            expect(response.body).to.not.be.null;
        })


    })



    it('Get Tenants features', () => {
        cy.request({
            method: 'GET',
            url: 'http://fodqa11-iis3/api/v3/tenants/features',
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('access_token')

            }
        }).then((response) => {
            cy.log(response.body)
            assert.equal(response.status, 200);
            expect(response.body).to.not.be.null;
        })

    })

    it('Create application',()=>{
        cy.request({
            method: 'POST',
            url: 'http://FODQA11-IIS3/api/v3/applications',
            headers: {

                Authorization: 'Bearer ' + localStorage.getItem('access_token')

            },
            body: {
                    applicationName: appName,
                    applicationDescription: "The most epic App ever",
                    applicationType: "Web_Thick_Client",
                    releaseName: "TEST 123 ",
                    releaseDescription: "Auto App Release",
                    emailList: "",
                    ownerId: 9,
                    attributes: [
                    ],
                    businessCriticalityType: "High",
                    sdlcStatusType: "Development"
                  }
                  
        }).then((response) => {
            cy.log(response.body)
            assert.equal(response.status, 201);
            expect(response.body).to.not.be.null;
        })

    })

    // afterEach(() => {
    //     cy.saveLocalStorage();
    // });

})