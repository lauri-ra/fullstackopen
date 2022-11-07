import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogList = [...blogs]

  return (
    <div>
      <h2>bloglist</h2>
      {blogList
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="blog" key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
