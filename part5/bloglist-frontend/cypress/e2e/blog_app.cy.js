describe('Blog ', function() {
    beforeEach(function() {
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
      cy.contains('Login to application')
    })

    describe('Login tests', function() {
      it('logging in with incorrect credentials fails', function() {
        cy.get('#username').type('test')
        cy.get('#password').type('test')

        cy.get('#login-button').click()
        cy.get('.error').contains('Incorrect credentials')
      })

      it('user can log in with correct credentials', function() {
        cy.get('#username').type('root')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()
      })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'root', password: 'secret' })
        })

        it('a blog can be created and is visible on the list', function() {
          cy.contains('New blog').click()

          cy.get('#title').type('test title')
          cy.get('#author').type('test author')
          cy.get('#url').type('test url')
          cy.get('#create-button').click()

          cy.contains('test title test author')
      })

      describe('When blog is created', function() {
        beforeEach(function() {
          cy.createBlog({
            title: 'New title',
            author: 'New author',
            url: 'blogs.com',
            likes: 0
          })
        })

        it('blog can be liked', function() {
          cy.get('#view-button').click()
          cy.contains('likes: 0')
          cy.get('#like-button').click()
          cy.contains('likes: 1')
        })

        it('blog can be removed', function() {
          cy.contains('New title New author')
            .get('#view-button').click()
            .get('#remove-button').click()

          cy.get('.noti').contains('Blog removed')
        })
      })

      describe('Multiple blogs', function() {
        it('are in correct order', function() {
          cy.createBlog({
            title: 'Title with most likes',
            author: 'Some Author',
            url: 'google.com',
            likes: 15
          })

          cy.createBlog({
            title: '2nd most liked',
            author: 'Some Author',
            url: 'google.com',
            likes: 10
          })

          cy.createBlog({
            title: 'Least liked blog',
            author: 'Some Author',
            url: 'google.com',
            likes: 4
          })

          cy.get('.blog').eq(0).should('contain', 'Title with most likes')
          cy.get('.blog').eq(1).should('contain', '2nd most liked')
          cy.get('.blog').eq(2).should('contain', 'Least liked blog')
        })
      })
    })
  })