import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, blogs, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const permToRemove = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if(blog.user === null || !blog.user || !loggedUser) {
      return false
    }

    const user = JSON.parse(loggedUser)

    return blog.user.username === user.username
  }

  const handleLike = () => {
    setLikes(likes + 1)

    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: likes + 1,
      url: blog.url
    }
    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title}`)) {
      const removedID = blog.id

      removeBlog(blog)

      blogs = blogs.filter(b => b.id !== removedID)
      setBlogs(blogs)
    }
  }

  const simpleBlog = (
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} id='view-button'>view</button>
    </div>
  )

  const detailedBlog = (
    <div>
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes: {likes}
          <button onClick={handleLike} id='like-button'>like</button>
        </div>
        <button onClick={toggleVisibility} id='hide-button'>hide</button>
        {permToRemove() ? <button onClick={handleRemove} id='remove-button'>remove</button> : ''}
      </div>
    </div>
  )

  return (
    <div className="blog">
      {showDetails ? detailedBlog : simpleBlog}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog