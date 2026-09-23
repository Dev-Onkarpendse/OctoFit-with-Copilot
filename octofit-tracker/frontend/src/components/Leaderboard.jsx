import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('leaderboard', leaderboardEndpoint)
      .then((items) => { setLeaders(items); setStatus('ready') })
      .catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><span className="count-pill">This week</span></div>
      {status === 'loading' && <p className="state-message">Loading rankings...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="leaderboard-list">
        {leaders.map((entry, index) => {
          const member = typeof entry.userId === 'object' ? entry.userId : null
          const rank = entry.rank || index + 1
          return <article className={`leader-row rank-${rank}`} key={entry._id || entry.id || entry.userId}>
            <span className="rank-number">{String(rank).padStart(2, '0')}</span>
            <div className="leader-avatar">{(member?.displayName || 'M')[0]}</div>
            <div className="leader-name"><strong>{member?.displayName || 'OctoFit member'}</strong><span>@{member?.username || 'member'}</span></div>
            <strong className="leader-points">{entry.points} <small>pts</small></strong>
          </article>
        })}
      </div>}
    </section>
  )
}

export default Leaderboard
