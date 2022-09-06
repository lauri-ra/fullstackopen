describe('Blog ', function() {
    beforeEach('Blog app', function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        // create user here
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
      cy.visit('http://localhost:3000')
      cy.contains('login')
    })
  })