describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })
    
    it('Test for search input', () => {
        cy.visit('/')
        cy.get('#searchBar #myInput')
        .type('a').should('have.value', 'a')
    })
    it('Selecting suggestion from autosuggest panel on search', () => {
        cy.visit('/')
        cy.get('#searchBar #myInput')
        .type('s')
        cy.get('#autosuggestPanel .suggestionRow').eq(1).click()
    })
    it('Searching for selected suggestion from autosuggest panel on search', () => {
        cy.visit('/')
        cy.get('#searchBar #myInput')
        .type('s')
        cy.get('#autosuggestPanel .suggestionRow').eq(0).click()
        cy.get('#searchBar button').click()
        
    })
    
})
  
