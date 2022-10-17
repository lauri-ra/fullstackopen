import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const permToRemove = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (blog.user === null || !blog.user || !loggedUser) {
      return false
    }

    const user = JSON.parse(loggedUser)

    return blog.user.username === user.username
  }

  const handleLike = () => {
    const id = blog.id
    dispatch(vote(id))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      const removedID = blog.id
    }
  }

  const simpleBlog = (
    <div>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} id="view-button">
        view
      </button>
    </div>
  )

  const detailedBlog = (
    <div>
      <div>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLike} id="like-button">
            like
          </button>
        </div>
        <button onClick={toggleVisibility} id="hide-button">
          hide
        </button>
        {permToRemove() ? (
          <button onClick={handleRemove} id="remove-button">
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  )

  return <div className="blog">{showDetails ? detailedBlog : simpleBlog}</div>
}

export default Blog

