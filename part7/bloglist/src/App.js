import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import Notification from './components/Notification'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import { setLogin } from './reducers/loginReducer'
import './index.css'
import blogService from './services/blogs'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  const user = useSelector((state) => state.login)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const storageUser = window.localStorage.getItem('loggedUser')

    if (storageUser) {
      const loggedUser = JSON.parse(storageUser)
      blogService.setToken(loggedUser.token)
      dispatch(setLogin(loggedUser))
    }
  }, [])

  return (
    <div>
      <h1>blogs</h1>
      {user === null && (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )}
      {user !== null && (
        <div>
          <Notification />
          <Header />
          {/* <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable> */}
          {/* <BlogList /> */}
          {/* <Users /> */}

          <Routes>
            <Route path="/users/:id" element={<User />}></Route>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                  <Users />
                </div>
              }
            ></Route>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
