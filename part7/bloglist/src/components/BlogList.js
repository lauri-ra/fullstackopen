import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogList = [...blogs]

  return (
    <div>
      <h2 className="bold ml-1 mt-3 mb-2 text-2xl">Bloglist</h2>
      {blogList
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div
            className="my-1.5 ml-1 border-2 border-solid border-sky-400 py-1 pl-2 hover:border-dotted hover:bg-sky-50"
            key={blog.id}
          >
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
