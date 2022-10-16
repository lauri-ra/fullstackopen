import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogList = [...blogs]

  return (
    <div>
      <h2>bloglist</h2>
      {blogList
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogList
