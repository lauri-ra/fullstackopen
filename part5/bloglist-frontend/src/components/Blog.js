import { useState } from "react"

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
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
          <button>like</button>
        </div>
        <button onClick={toggleVisibility}>hide</button>
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