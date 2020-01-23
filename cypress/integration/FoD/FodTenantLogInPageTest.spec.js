import LogInPage from '../../page-objects/tenantSite/LogInPage'

describe('Tenant Site Login Page Test', () => {

    const loginPage = new LogInPage()

    it('Verify Tenants site login page displayed', () => {

        loginPage.verifyTenantsLoginPageDisplayed()
        Cypress.currentTest.retries(1)

    })

    it('Error message should display when tying to login without user name and password', () => {

        loginPage.verifyErrorMessageDisplayedWithoutEnteringUserNameandPassword()
    })


    it('Error message should display when trying to login without password', () => {

        loginPage.verifyErrorMessageDisplayedWithoutEnteringPassword()
    })


    it('Error message should display when trying to login without username', () => {

        loginPage.verifyErrorMessageDisplayedWithoutEnteringUserName()
    })


    it('Error message should display when trying to login without tenantID', () => {

        loginPage.verifyErrorMessageDisplayedWithoutEnteringTenant()
    })

    it('Error message should display when try to login with invalid username, password and tenantID', () => {

        loginPage.verifyErrorMessageDisplayedForInvalidUserNamePasswordAndTenant()
    })

    it('Choose Tenant Page should Display for valid Tenant Users', () => {

        loginPage.verifyChooseTenantPageDisplayedForValidUsers()

    })


    it('Verify Tenant user can login to the site after selecting a tenant', () => {

        loginPage.verifyValidTenantsCanLoginToTheSite()
    })


})