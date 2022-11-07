import { useDispatch, useSelector } from 'react-redux'
import { vote, remove } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (!blog) {
    return null
  }

  const permToRemove = () => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (blog.user === null || !blog.user || !loggedUser) {
      return false
    }

    const user = JSON.parse(loggedUser)

    if (blog.user.username === user.username) {
      return true
    }
  }

  const handleLike = () => {
    dispatch(vote(blog.id))
    dispatch(createNotification(`Voted blog: ${blog.title}`, 5))
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(remove(blog.id))
      dispatch(createNotification(`Removed blog: ${blog.title}`, 5))
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}
        <button onClick={handleLike} id="like-button">
          like
        </button>
      </div>
      {permToRemove() ? (
        <button onClick={handleRemove} id="remove-button">
          remove
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default Blog
