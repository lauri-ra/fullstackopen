import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { logUserIn } from '../reducers/loginReducer'

const LoginForm = () => {
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
      <h2 className="bold mt-2 mb-2 ml-1 text-lg">Login to application</h2>

      <div className="m-1">
        username
        <input
          className="ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
          {...username}
        />
      </div>
      <div className="m-1">
        password
        <input
          className="ml-1 rounded-lg border border-gray-300 bg-gray-50 p-0.5 text-sm text-gray-900"
          {...password}
        />
      </div>
      <button
        className="my-1 mx-1 w-full rounded-lg bg-blue-600 px-4 py-1 text-center text-sm text-white hover:bg-blue-800 sm:w-auto"
        onClick={handleLogin}
        id="login-button"
      >
        login
      </button>
    </form>
  )
}

export default LoginForm
