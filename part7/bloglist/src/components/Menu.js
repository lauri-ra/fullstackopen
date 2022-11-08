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
    <div className="menu">
      <Link to={'/'}>Blogs</Link>
      <Link to={'/users'}>Users</Link>
      <div>
        {user.username} logged in
        <button type="button" id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  )
}

export default Menu
