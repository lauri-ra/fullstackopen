import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logUserOut } from '../reducers/loginReducer'
import '../index.css'

const Menu = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logUserOut())
  }

  return (
    <div className="inline-block">
      <Link className="mx-1 my-1 underline" to={'/'}>
        Blogs
      </Link>
      <Link className="mx-1 my-1 underline" to={'/users'}>
        Users
      </Link>
      <div className="mx-4 inline-block">
        {user.username} logged in
        <button
          className="mx-1 w-full rounded-lg bg-red-400 px-1 py-0.5 text-center hover:bg-red-500 sm:w-auto"
          type="button"
          id="logout-button"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
    </div>
  )
}

export default Menu
