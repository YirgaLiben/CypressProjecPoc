import BasePage from '../../../BasePage'

export default class ApplicationsPage extends BasePage{

    clickApplicationsTab() {
        cy.get('div.nav-tabs li>a[data-tabaction="Applications"]').click({ force: true })
    }

    isTheSelectedTenantDisplayedOnThePage(tenantId)
    {
        cy.get('.breadcrumb > .active').contains(`${tenantId}`).should('be.visible').and('exist')
    }

    isApplicationTitleDisplayed()
    {
        cy.get('div.contextbar.row.lower.no-bottom-margin > div.section').should('contain','Applications')
    }

    isApplicationsTableDisplayed() {
        cy.get('table.prettygrid').should('be.visible').and('exist')

    }

    isApplicationsIDColumnDisplayed() {
        cy.get('table').find('th').first().should('contain', 'Application Id').should('exist').and('be.visible')

    }

    isNameColumnDisplayed() {
        cy.get('table').find('th').contains('Name').should('exist').and('be.visible')
    }
    isNameColumnSortable(){
        cy.get('table').find('th').contains('Name').click()
        cy.get('i.ff.ff-chevron-down').should('be.visible').invoke('trigger', 'mouseover')//.and('have.attr','title','Sort Descending')
        cy.get('tbody tr').children('td').eq(1).then(($text)=>{
            var appRow0 = $text.text()
             cy.get('tbody tr').children('td').eq(6).should(($text2)=>{
                 expect($text2.text().trim()).to.be.greaterThan(appRow0)
             })


        })
        cy.get('tbody tr').children('td').eq(1).should('contain','appName456')
        cy.get('tbody tr').children('td').eq(6).should('contain','appName123')
        cy.get('table').find('th').contains('Name').click()


    }

    isModifiedDateColumnDisplayed() {
        cy.get('table').find('th').contains('Modified Date').should('exist').and('be.visible')
    }

    isDeletedColumnDisplayed() {
        cy.get('table').find('th').contains('Deleted').should('exist').and('be.visible')
    }


    isPagingSectionDisplayed() {
        cy.get('.paging-section-count').should('exist').and('be.visible')
    }

    isReleaseButtonEnabled(){
        cy.get('td.action-cell').contains('Releases').should('exist').and('be.visible').and('have.attr','href')
    }

    isAdditionalDataLinkDisplayed() {
        cy.get('[data-action="additional-data"]').should('exist').and('be.visible').and('be.enabled')
    }
    
    isSearchSectionDisplayed(){
        cy.get('[data-role="searchText"]').should('exist').and('be.visible').and('have.attr', 'placeholder', 'Search Text')
        cy.get('[data-action="searchSubmit"]').should('exist').and('be.visible').and('be.enabled')

    }
    verifySearchFunction(appName){
        
        cy.get('[data-role="searchText"]').type(`${appName}{enter}`)
        this.isApplicationsTableDisplayed()
        this.isApplicationsIDColumnDisplayed()
        this.isNameColumnDisplayed()
        this.isModifiedDateColumnDisplayed()
        this.isDeletedColumnDisplayed()
        cy.get('tbody tr').children('td').eq(1).invoke('text').then((text)=>{
            expect(text.trim()).equal(`${appName}`)
            
        })
        cy.get('.paging-section-total > span').should('contain', '1 found')
        cy.get('[data-role="searchText"]').clear()


    }

    // check(){
    //     cy.get('.prettygrid').find('tbody').children().then($elements =>{
    //         return $elements.rows(())

    //         }
    //         cy.wrap(strings).should('deep.equal
    //     })
    // }

    getCellTextAsArray(){
        let cellContents = []
        return new Cypress.Promise(resolve => {
            cy.get('.prettygrid').find('tbody').children()
                .each(($el, $index) => {
                    //some logic to select the elements you want
                   // $index % 4 == 0
                    if($index>=0) {
                        cellContents.push($el.text())
                    }
                })
                .then(() => resolve(cellContents))
        })
    }

     verifyTableDisplayedIsSorted(){
        
         this.getCellTextAsArray()
         
        .then(cellContents => {
            let actual = cellContents.slice()
            cy.wrap(actual)
                .should('deep.eq', cellContents.sort())})   
        }


         sortTable(){
            var rows = Cypress.$('.prettygrid tbody tr').get();
           
            rows.sort(function(a, b) {
           
            var A = Cypress.$(a).children('td').eq(0).text().toUpperCase();
            var B = Cypress.$(b).children('td').eq(1).text().toUpperCase();
            cy.log(A)
           
            if(A < B) {
            return -1;
            }
           
            if(A > B) {
            return 1;
            }
           
           return 0;
           
            });

        }


}

