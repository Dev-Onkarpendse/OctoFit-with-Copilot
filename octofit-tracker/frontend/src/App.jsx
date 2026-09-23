import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activity' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/members', label: 'Members' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/activities" aria-label="OctoFit home">
          <img src="/octofitapp-small.png" alt="" />
          <span>octofit<span className="brand-accent">.</span></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={item.to}>{item.label}</NavLink>)}
        </nav>
        <div className="header-status"><span className="status-dot" />Live season</div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/members" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>

      <footer className="app-footer"><span>MERGINGTON HIGH</span><span>Move with intention.</span></footer>
    </div>
  )
}

export default App
