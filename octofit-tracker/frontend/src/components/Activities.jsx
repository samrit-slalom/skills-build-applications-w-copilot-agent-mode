import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const fetch = fetchResource

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/activities/')
      .then((records) => active && setActivities(records))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / TRACKER</p>
      <h1 className="page-title">Activities</h1>
      <ResourceState error={error} loading={loading}>
        <div className="resource-list">
          {activities.map((activity) => (
            <article className="resource-row" key={activity._id ?? activity.id}>
              <div>
                <h2>{activity.type}</h2>
                <p>{activity.durationMinutes} minutes</p>
              </div>
              <strong>{activity.calories ?? 0} cal</strong>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}