import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        likes: '1',
        url: 'google.com'
    }

    const mockUpdate = jest.fn()
    const mockRemove = jest.fn()

    render(<Blog blog={blog} updateBlog={mockUpdate} removeBlog={mockRemove}/>)

    const title = screen.getByText(
        'test title', { exact: false }
    )
    expect(title).toBeDefined()

    const author = screen.getByText(
        'test author', { exact: false }
    )
    expect(author).toBeDefined()

    const likes = screen.queryByText('1')
    expect(likes).toBeNull()

    const url = screen.queryByText('google.com')
    expect(url).toBeNull()
})