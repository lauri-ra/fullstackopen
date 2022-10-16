import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      console.log('error in handlelogin')
    }
  }

  const handleLogout = () => {
    console.log('logout')
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
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

      <BlogList />
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

