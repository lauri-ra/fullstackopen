import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({blog, updateBlog, removeBlog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const permToRemove = () => {
    if(blog.user === null && !blog.user) {
      return false
    }

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)
    
    return blog.user.username === user.username
  }

  const handleLike = () => {
    const updatedBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url
    }
    console.log(updatedBlog)

    updateBlog(updatedBlog)
  }

  const handleRemove = () => {
    if(window.confirm(`Remove blog ${blog.title}`)) {
      removeBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const simpleBlog = (
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
  )

  const detailedBlog = (
    <div>
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <button onClick={toggleVisibility}>hide</button>
        {permToRemove() ? <button onClick={handleRemove}>remove</button> : ''}
      </div>
    </div>  
  )

  return (
    <div style={blogStyle}>
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