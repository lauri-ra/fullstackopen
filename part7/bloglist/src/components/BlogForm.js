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
      <h2>create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text" id="title" placeholder={'title'} />
        </div>

        <div>
          author
          <input type="text" id="author" placeholder={'author'} />
        </div>

        <div>
          url
          <input type="text" id="url" placeholder={'url'} />
        </div>

        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

