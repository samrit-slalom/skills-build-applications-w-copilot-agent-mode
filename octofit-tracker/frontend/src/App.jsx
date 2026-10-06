import { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const sections = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Teams', path: '/teams' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
]

function ApiStatus() {
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    let active = true

    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then(() => active && setStatus('online'))
      .catch(() => active && setStatus('offline'))

    return () => {
      active = false
    }
  }, [])

  return (
    <span className="api-status" data-status={status}>
      <span className="api-status-dot" aria-hidden="true" />
      API {status}
    </span>
  )
}

function Overview() {
  return (
    <>
      <div className="d-flex flex-column flex-sm-row align-items-sm-end justify-content-between gap-2 mb-5">
        <div>
          <p className="eyebrow mb-2">OCTOFIT / PERSONAL</p>
          <h1 className="page-title mb-0">Overview</h1>
        </div>
        <span className="text-secondary">TODAY</span>
      </div>
      <div className="row g-0 section-grid border-top border-bottom">
        {sections.slice(1).map(({ label, path }) => (
          <section className="col-12 col-sm-6 col-lg-3 section-summary" key={path}>
            <div className="d-flex align-items-center justify-content-between gap-3">
              <h2 className="section-title mb-0">{label}</h2>
              <NavLink className="section-link" to={path} aria-label={`Open ${label}`}>
                <span aria-hidden="true">↗</span>
              </NavLink>
            </div>
            <p className="text-secondary mt-4 mb-0">No records yet</p>
          </section>
        ))}
      </div>
    </>
  )
}

function SectionPage({ title }) {
  return (
    <section>
      <p className="eyebrow mb-2">OCTOFIT / TRACKER</p>
      <h1 className="page-title">{title}</h1>
      <p className="text-secondary">No records yet</p>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header border-bottom">
          <nav className="container app-nav" aria-label="Main navigation">
            <NavLink className="brand" to="/" aria-label="OctoFit Tracker overview">
              <img src={octofitLogo} alt="" width="38" height="38" />
              <span>OctoFit</span>
            </NavLink>
            <div className="nav-links">
              {sections.map(({ label, path }) => (
                <NavLink
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  end={path === '/'}
                  key={path}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <ApiStatus />
          </nav>
        </header>
        <main className="container py-5">
          <Routes>
            <Route element={<Overview />} path="/" />
            <Route element={<SectionPage title="Activities" />} path="/activities" />
            <Route element={<SectionPage title="Teams" />} path="/teams" />
            <Route element={<SectionPage title="Leaderboard" />} path="/leaderboard" />
            <Route element={<SectionPage title="Workouts" />} path="/workouts" />
            <Route element={<SectionPage title="Not found" />} path="*" />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
