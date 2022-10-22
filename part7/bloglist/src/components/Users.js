import { useSelector } from 'react-redux'

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const getUsers = useSelector((state) => state.users)
  const userList = [...getUsers]
  const users = userList.sort((a, b) => {
    return b.blogs.length - a.blogs.length
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>

          {users.map((user) => (
            <User key={user.username} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
