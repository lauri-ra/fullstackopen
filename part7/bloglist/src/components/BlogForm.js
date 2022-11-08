import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    dispatch(createBlog(blogObject))
    dispatch(createNotification(`Created blog: ${blogObject.title}`, 5))
  }

  return (
    <div>
      <h2 className="mx-1 mt-3 mb-1 text-lg">Create new blog</h2>

      <form onSubmit={addBlog}>
        <div className="mx-1 my-1">
          title
          <input
            className="ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
            type="text"
            id="title"
            placeholder={'title'}
          />
        </div>

        <div className="mx-1 my-1">
          author
          <input
            className="ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
            type="text"
            id="author"
            placeholder={'author'}
          />
        </div>

        <div className="mx-1 my-1">
          url
          <input
            className="ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
            type="text"
            id="url"
            placeholder={'url'}
          />
        </div>

        <button
          className="my-1 mx-1 w-full rounded-lg bg-blue-600 px-4 py-1 text-center text-sm text-white hover:bg-blue-800 sm:w-auto"
          type="submit"
          id="create-button"
        >
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
