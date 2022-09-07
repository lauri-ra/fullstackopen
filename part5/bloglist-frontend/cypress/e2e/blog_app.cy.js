describe('Blog ', function() {
    beforeEach('Blog app', function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        // create user here
        const user = {
          username: 'root',
          name: 'admin',
          password: 'secret',
          blogs: []
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form is shown', function() {
      cy.visit('http://localhost:3000')
      cy.contains('Login to application')
    })

    describe('Login tests', function() {
      it('logging in with incorrect credentials fails', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('test')
        cy.get('#password').type('test')

        cy.get('#login-button').click()
        cy.get('.error').contains('Incorrect credentials')
      })

      it('user can log in with correct credentials', function() {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('root')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()
      })
    })

    describe('When logged in', function() {
/*       beforeEach(function() {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('root')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()
      }) */

      it('a blog can be created', function() {
        cy.contains('New blog').click()

        cy.get('#title').type('test title')
        cy.get('#author').type('test author')
        cy.get('#url').type('test url')

        cy.get('#create-button').click()


      })
    })
  })