import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('teams')
      .then((items) => { setTeams(items); setStatus('ready') })
      .catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div><span className="count-pill">{teams.length} squads</span></div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="team-grid">
        {teams.map((team) => <article className="team-card" key={team._id || team.id || team.name}>
          <div className="team-mark">{team.name.slice(0, 1)}</div>
          <h2>{team.name}</h2><p>{team.description || 'A team that moves together.'}</p>
          <div className="team-footer"><span>{team.memberIds?.length || 0} members</span><span className="arrow-mark">↗</span></div>
        </article>)}
      </div>}
    </section>
  )
}

export default Teams
