export function ResourceState({ error, loading, children }) {
  if (loading) {
    return <p className="resource-muted">Loading...</p>
  }

  if (error) {
    return <p className="resource-error">{error}</p>
  }

  return children
}