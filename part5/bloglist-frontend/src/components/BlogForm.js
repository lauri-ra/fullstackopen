import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm =({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()

        const blogObject = {
            title: title,
            author: author,
            url: url,
            likes: 0
        }

        createBlog(blogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        type='text'
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div>
                    author
                    <input
                        type='text'
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url
                    <input
                        type='text'
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit"> create </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm