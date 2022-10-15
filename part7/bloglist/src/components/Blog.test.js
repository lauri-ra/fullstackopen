import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog content', () => {
    beforeEach(() => {
        const blog = {
            title: 'test title',
            author: 'test author',
            likes: 714,
            url: 'google.com'
        }

        const mockUpdate = jest.fn()
        const mockRemove = jest.fn()

        render(<Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove}/>)
    })

    test('renders collapsed content', () => {
        const title = screen.getByText(
            'test title', { exact: false }
        )
        expect(title).toBeDefined()

        const author = screen.getByText(
            'test author', { exact: false }
        )
        expect(author).toBeDefined()

        const likes = screen.queryByText('714')
        expect(likes).toBeNull()

        const url = screen.queryByText('google.com')
        expect(url).toBeNull()
    })

    test('renders extended content', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const likes = screen.getByText(
            '714', { exact: false }
        )
        expect(likes).toBeDefined()

        const url = screen.getByText(
            'google.com', { exact: false }
        )
        expect(url).toBeDefined()
    })
})

test('pressing like works correctly', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        likes: 714,
        url: 'google.com'
    }

    const mockUpdate = jest.fn()
    const mockRemove = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove}/>)

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdate.mock.calls).toHaveLength(2)
})