import { useState } from "react"

const Blog = ({blog, updateBlog, removeBlog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
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
    console.log('clicked remove')

    if(window.confirm(`Remove blog ${blog.title}`)) {
      console.log('confirmed remove')
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
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>  
  )

  return (
    <div style={blogStyle}>
      {showDetails ? detailedBlog : simpleBlog}
    </div>
  ) 
}

export default Blog