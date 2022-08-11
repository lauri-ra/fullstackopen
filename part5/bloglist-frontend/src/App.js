import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
 
  const [message, setMessage] = useState(null)
  const [errorStatus, setErrorStatus] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      await blogService.create(blogObject)

      setMessage(`New blog ${blogObject.title} by ${blogObject.author} created`)
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
      <Notification message={message} errorStatus={errorStatus}/>

      <p>
        {user.username} logged in
        <button 
          type="button" 
          onClick={handleLogout}>
          logout
        </button>
      </p>

      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>
      {user === null && loginForm()}
      {user !== null && blogView()}
    </div>
  )
}

export default App
