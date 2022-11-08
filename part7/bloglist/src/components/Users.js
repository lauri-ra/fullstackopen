import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const getUsers = useSelector((state) => state.users)
  const userList = [...getUsers]
  const users = userList.sort((a, b) => {
    return b.blogs.length - a.blogs.length
  })

  return (
    <div>
      <h2 className="bold ml-1 mt-3 mb-3 text-2xl">Users</h2>
      <table className="mx-1">
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>

          {users.map((user) => (
            <tr className="border-2" key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className="text-center">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
