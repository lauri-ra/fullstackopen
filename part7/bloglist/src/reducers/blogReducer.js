import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const blogToRemove = action.payload
      const removedID = blogToRemove.id

      return state.filter((blog) => blog.id !== removedID)
    },
    voteBlog(state, action) {
      const blogToVote = action.payload
      const id = blogToVote.id

      return state.map((blog) => (blog.id !== id ? blog : blogToVote))
    },
    commentBlog(state, action) {
      const commentedBlog = action.payload
      const id = commentedBlog.id

      return state.map((blog) => (blog.id === id ? commentedBlog : blog))
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const remove = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const blogToRemove = blogs.find((blog) => blog.id === id)

    await blogService.remove(blogToRemove.id)
    dispatch(removeBlog(blogToRemove))
  }
}

export const vote = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    const blogToVote = blogs.find((blog) => blog.id === id)
    const updatedBlog = { ...blogToVote, likes: blogToVote.likes + 1 }

    const blog = await blogService.update(updatedBlog.id, updatedBlog)
    dispatch(voteBlog(blog))
  }
}

export const comment = (id, comment) => {
  return async (dispatch) => {
    const newComment = { comment: comment }
    const updatedBlog = await blogService.comment(id, newComment)

    dispatch(commentBlog(updatedBlog))
  }
}

export const { setBlogs, appendBlog, voteBlog, removeBlog, commentBlog } =
  blogSlice.actions
export default blogSlice.reducer
