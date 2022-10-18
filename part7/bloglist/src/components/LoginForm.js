import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { logUserIn } from '../reducers/loginReducer'

const LoginForm = ({}) => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    dispatch(logUserIn(credentials))
  }

  return (
    <form>
      <h2>Login to application</h2>

      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button onClick={handleLogin} id="login-button">
        login
      </button>
    </form>
  )
}

export default LoginForm

