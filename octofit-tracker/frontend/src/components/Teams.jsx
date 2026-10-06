import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const fetch = fetchResource

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/teams/')
      .then((records) => active && setTeams(records))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / GROUPS</p>
      <h1 className="page-title">Teams</h1>
      <ResourceState error={error} loading={loading}>
        <div className="resource-list">
          {teams.map((team) => (
            <article className="resource-row" key={team._id ?? team.id}>
              <div>
                <h2>{team.name}</h2>
                <p>{team.members?.length ?? 0} members</p>
              </div>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}