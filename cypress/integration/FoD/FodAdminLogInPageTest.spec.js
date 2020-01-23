import AdminLogInPage from '../../page-objects/adminSite/AdminLogInPage'

describe('Admin Site Login Page Test',()=>{

    const adminLoginPage = new AdminLogInPage()

    it('Verify admin site login page displayed', ()=>{

        adminLoginPage.verifyAdminLoginPageDisplayed()
        Cypress.currentTest.retries(1)

    })

    it('Error message should display when tying to login without user name and password',()=>{

        adminLoginPage.verifyErrorMessageDisplayedWithoutEnteringUserNameandPassword()
    })

    it('Error message should display when trying to login without password',()=>{

        adminLoginPage.verifyErrorMessageDisplayedWithoutEnteringPassword()
    })

    it('Error message should display when trying to login without username', ()=>{

        adminLoginPage.verifyErrorMessageDisplayedWithoutEnteringUsername()
    })

    it('Error message should display when try to login with invalid username and password',()=>{

        adminLoginPage.verifyErrorMessageDisplayedForInvalidUsernameAndPassword()
    })

    it('Verify Admin user can login to the site',()=>{

        adminLoginPage.verifyAdminUserCanLoginToTheSite()
    })


})