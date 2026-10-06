import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const fetch = fetchResource

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/users/')
      .then((records) => active && setUsers(records))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / PEOPLE</p>
      <h1 className="page-title">Users</h1>
      <ResourceState error={error} loading={loading}>
        <div className="resource-list">
          {users.map((user) => (
            <article className="resource-row" key={user._id ?? user.id}>
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}