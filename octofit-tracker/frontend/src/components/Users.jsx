import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('users')
      .then((items) => {
        setUsers(items)
        setStatus('ready')
      })
      .catch((loadError) => {
        setError(loadError.message)
        setStatus('error')
      })
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community directory</p>
          <h1>Members</h1>
        </div>
        <span className="count-pill">{users.length} active</span>
      </div>
      {status === 'loading' && <p className="state-message">Loading members...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Member</th><th>Username</th><th>Email</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || user.username}>
                  <td><div className="member-cell"><img src={user.avatarUrl} alt="" /><strong>{user.displayName}</strong></div></td>
                  <td>@{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
