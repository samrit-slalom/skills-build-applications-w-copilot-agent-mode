import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'
import { ResourceState } from './ResourceState.jsx'

const fetch = fetchResource

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    fetch('/api/workouts/')
      .then((records) => active && setWorkouts(records))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / TRAINING</p>
      <h1 className="page-title">Workouts</h1>
      <ResourceState error={error} loading={loading}>
        <div className="resource-list">
          {workouts.map((workout) => (
            <article className="resource-row" key={workout._id ?? workout.id}>
              <div>
                <h2>{workout.name}</h2>
                <p>{workout.description}</p>
              </div>
              <strong>{workout.difficulty}</strong>
            </article>
          ))}
        </div>
      </ResourceState>
    </section>
  )
}