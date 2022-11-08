import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setLogin } from './reducers/loginReducer'

import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Menu from './components/Menu'

import blogService from './services/blogs'

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
      <h1 className="pb-4 pt-2 text-4xl font-bold">Blog app</h1>
      {user === null && (
        <div>
          <Notification />
          <LoginForm />
        </div>
      )}
      {user !== null && (
        <div>
          <Notification />
          <Menu />
          <Routes>
            <Route path="/users/:id" element={<User />}></Route>
            <Route path="/blogs/:id" element={<Blog />}></Route>
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                </div>
              }
            ></Route>
            <Route path="users" element={<Users />}></Route>
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
