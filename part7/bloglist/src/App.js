import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorStatus(true)
      // setMessage('Incorrect credentials')
      // setTimeout(() => {
      //   setErrorStatus(false)
      //   setMessage(null)
      // }, 5000)
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

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      // setErrorStatus(true)
      // setMessage('Error creating a new blog. Fill in all all the details!')
      // setTimeout(() => {
      //   setErrorStatus(false)
      //   setMessage(null)
      // }, 5000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id, blogObject)
    } catch (exception) {
      // setErrorStatus(true)
      // setMessage('Error updating the blog')
      // setTimeout(() => {
      //   setErrorStatus(false)
      //   setMessage(null)
      // }, 5000)
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      await blogService.remove(blogObject.id)
      // setMessage('Blog removed')
    } catch (exception) {
      console.log('error while removing')
    }
  }

  const blogView = () => (
    <div>
      <Notification />

      <p>
        {user.username} logged in
        <button type="button" id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </p>

      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  )

  return (
    <div>
      <h1>blogs</h1>
      {user === null && (
        <div>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </div>
      )}
      {user !== null && blogView()}
    </div>
  )
}

export default App

