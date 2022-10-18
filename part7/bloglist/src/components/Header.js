import { useSelector, useDispatch } from 'react-redux'
import { logUserOut } from '../reducers/loginReducer'

const Header = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logUserOut())
  }

  return (
    <p>
      {user.username} logged in
      <button type="button" id="logout-button" onClick={handleLogout}>
        logout
      </button>
    </p>
  )
}

export default Header
