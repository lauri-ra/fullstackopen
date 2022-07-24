const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { update } = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET request', () => {
    test('returns blogs as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('returns a singular blog matching given id', async () => {
        const blogs = await helper.blogsInDb()

        const blogID = blogs[0].id

        await api
            .get(`/api/blogs/${blogID}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })
})

describe('POST request', () => {
    test('adds new blog with correct content', async () => {
        const newBlog = {
            title: 'Test blog',
            author: 'Edsger W. Dijkstra',
            url: 'google.com',
            likes: 3,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlogList = await helper.blogsInDb()
        const listLength = helper.initialBlogs.length
        const lastBlog = newBlogList[listLength]

        expect(newBlogList).toHaveLength(listLength + 1)
        expect(lastBlog.title).toContain('Test blog')
    })

    test('faulty blog returns with code 400', async () => {
        const faultyBlog = {
            author: 'Edsger W. Dijkstra',
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(faultyBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Other REST operations', () => {
    test('DELETE succeeds with status code 204 if id is valid', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const updatedBlogs = await helper.blogsInDb()
    
        expect(updatedBlogs).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = updatedBlogs.map(blog => blog.title)

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('PUT updates a blog correctly', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[1]

        const updatedBlog = {
            title: 'Updated Title',
            author: 'Updated Author',
            url: 'newurl.com',
            likes: 15
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await helper.blogsInDb()
        
        expect(updatedBlogs[1].title).toContain('Updated Title')
    })
})

describe('Bloglist value tests', () => {
    test('blog identifier is named id', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined
    })

    test('blog value likes cant be null', async () => {
        const nullBlog = {
            title: 'Null Blog',
            author: 'Steve Coll',
            url: 'google.com',
            likes: null
        }

        await api
            .post('/api/blogs')
            .send(nullBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()

        expect(blogs[blogs.length-1].likes).toBe(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})