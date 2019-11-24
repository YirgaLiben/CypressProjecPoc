import BasePage from '../../../BasePage'

class AttributesPage extends BasePage
{

    navigateToSettingsAttributesPage()
    {
        cy.get('.navbar-nav a').contains('Administration').click()
        cy.get('div.nav-tabs li>a[data-tabaction="SettingsAttributes"]').click({force:true})
        
    }


    clickAddAttributeButton()
    {
        cy.get('[data-action="add"]').click()
    }

    enterAttributeName(name)
    {
        cy.get('#attributeName').type(name)
    }

    selectAttributeDataType(dataType)
    {
        cy.get('#attributeDataType').select(dataType)
    }

    setRequired()
    {
    
        cy.get('#labelIsRequired > .control > .control-indicator').click()
   
    }

    clickSaveButton()
    {
        cy.get('[data-action="save"]').click()
    }

    addAttributes(name,datatype,required)
    {
        this.clickAddAttributeButton()
        this.enterAttributeName(name)
        this.selectAttributeDataType(datatype)
        if(required === 'isRequired')
        {
          this.setRequired()
        }
        
        this.clickSaveButton()
        cy.reload()
  
    }

    setPickListValues(name,value)
    {
        this.clickAddAttributeButton()
        this.enterAttributeName(name)

        cy.get('[data-action="newvalue"]').click()
        cy.get('#attributePicklistValue').type(value)
        cy.get('[data-action="savevalue"]').click()

    }




}

export default AttributesPage