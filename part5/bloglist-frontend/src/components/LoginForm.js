const LoginForm = ({
    handleLogin,
    handleUsername,
    handlePassword,
    username,
    password
}) => {
    <form onSubmit={handleLogin}>
        <h2>Login to application</h2>

        <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsername}
        />
        </div>
        <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePassword}
        />
        </div>
        <button type="submit">login</button>
    </form>
}

export default LoginForm