import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
 
  const [message, setMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if(loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorStatus(true)
      setMessage('Incorrect credentials')

      setTimeout(() => {
        setErrorStatus(false)
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  const handleSumbit = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    try {
      await blogService.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`New blog ${title} by ${author} created`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorStatus(true)
      setMessage('Error creating a new blog. Fill in all all the details!')

      setTimeout(() => {
        setErrorStatus(false)
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>

      <Notification message={message} errorStatus={errorStatus}/>

      <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>

      <Notification message={message} errorStatus={errorStatus}/>

      <form onSubmit={handleSumbit}>
        <h2>create new blog</h2>

        <div>
          title
          <input 
            type='text'
            name='title' 
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>

        <div>
          author
          <input 
            type='text'
            name='author' 
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>

        <div>
          url
          <input 
            type='text'
            name='url' 
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>

        <button type="submit"> create </button>
      </form>

      <p>
        {user.username} logged in
        <button 
          type="button" 
          onClick={handleLogout}>
          logout
        </button>
      </p>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogView()}
    </div>
  )
}

export default App
