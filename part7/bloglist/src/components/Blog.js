import { useDispatch, useSelector } from 'react-redux'
import { vote, remove, comment } from '../reducers/blogReducer'
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

  const comments = blog.comments

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

  const addComment = async (event) => {
    event.preventDefault()
    dispatch(comment(blog.id, event.target.comment.value))
  }

  return (
    <div className="ml-1 rounded-lg border-2">
      <h2 className="mt-1 mb-2 text-lg">{blog.title}</h2>
      <div className="my-0.5">{blog.author}</div>
      <div className="my-0.5">{blog.url}</div>
      <div className="my-0.5">
        likes: {blog.likes}
        <button
          className="my-0.5 mx-0.5 w-full rounded-lg bg-blue-600 px-4 py-1 text-center text-sm text-white hover:bg-blue-800 sm:w-auto"
          onClick={handleLike}
          id="like-button"
        >
          like
        </button>
      </div>
      <div>
        {!blog.user ? (
          ''
        ) : (
          <div className="inline-block">added by {blog.user.username}</div>
        )}
        {permToRemove() ? (
          <button
            className="my-1 mx-1 w-full rounded-lg bg-red-600 px-4 py-1 text-center text-sm text-white hover:bg-red-800 sm:w-auto"
            onClick={handleRemove}
            id="remove-button"
          >
            remove
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="mt-5 ml-1 text-lg">Comments</div>
      <form onSubmit={addComment}>
        <input
          className="mt-2 ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
          type="text"
          id="comment"
          placeholder={'comment'}
        ></input>
        <button
          className="my-1 mx-1 w-full rounded-lg bg-blue-600 px-4 py-1 text-center text-sm text-white hover:bg-blue-800 sm:w-auto"
          type="submit"
        >
          Add comment
        </button>
      </form>
      {comments.map((comment) => (
        <li key={Math.random()} className="ml-1 mt-2">
          {comment}
        </li>
      ))}
    </div>
  )
}

export default Blog
