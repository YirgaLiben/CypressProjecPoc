class BasePage {
    pause(milliseconds) {
        cy.wait(milliseconds)
    }

    enterValue(locator, value) {
        cy.get(locator).type(value)
    }


    getTodayDate()
    {
       var today = new Date();
       var dd = String(today.getDate()).padStart(2, '0');
       var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
       var yyyy = today.getFullYear(); 
       return  yyyy +  '/' + mm + '/' + dd;
    }


    uploadFile(fixtureFileName, inputSelector, mimeType = '') {
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
    }


}

export default BasePage