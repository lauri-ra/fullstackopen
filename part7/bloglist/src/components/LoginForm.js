import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin,
    handleUsername,
    handlePassword,
    username,
    password
}) => {
    return(
        <form onSubmit={handleLogin}>
            <h2>Login to application</h2>

            <div>
            username
            <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={handleUsername}
            />
            </div>
            <div>
            password
            <input
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={handlePassword}
            />
            </div>
            <button type="submit" id='login-button'>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUsername: PropTypes.func.isRequired,
    handlePassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm