const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
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

        const newBlogList = await helper.notesInDb()
        const listLength = helper.initialBlogs.length
        const lastBlog = newBlogList[listLength]

        expect(newBlogList).toHaveLength(listLength + 1)
        expect(lastBlog.title).toContain('Test blog')
    })
})

afterAll(() => {
    mongoose.connection.close()
})