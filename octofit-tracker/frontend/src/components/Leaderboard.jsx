import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const fetch = fetchResource

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/leaderboard/')
      .then((records) => active && setLeaderboard(records))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / COMPETE</p>
      <h1 className="page-title">Leaderboard</h1>
      <ResourceState error={error} loading={loading}>
        <div className="resource-list">
          {leaderboard.map((entry, index) => (
            <article className="resource-row" key={entry._id ?? entry.id}>
              <div>
                <h2>Rank {index + 1}</h2>
                <p>{entry.period}</p>
              </div>
              <strong>{entry.points} pts</strong>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}