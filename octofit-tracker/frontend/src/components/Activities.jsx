import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const activityLabels = { running: 'Run', walking: 'Walk', strength: 'Strength', cycling: 'Ride', other: 'Other' }

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities')
      .then((items) => { setActivities(items); setStatus('ready') })
      .catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">The movement log</p><h1>Recent activity</h1></div><span className="count-pill">{activities.length} sessions</span></div>
      {status === 'loading' && <p className="state-message">Loading activity...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="activity-list">
        {activities.map((activity) => {
          const member = typeof activity.userId === 'object' ? activity.userId : null
          return <article className="activity-row" key={activity._id || activity.id}>
            <div className={`activity-icon activity-${activity.type}`}>{(activity.type || '?')[0].toUpperCase()}</div>
            <div className="activity-main"><strong>{member?.displayName || 'OctoFit member'}</strong><span>{activityLabels[activity.type] || activity.type} · {activity.durationMinutes} min</span></div>
            <div className="activity-meta"><strong>+{activity.points} pts</strong><span>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Recently'}</span></div>
          </article>
        })}
      </div>}
    </section>
  )
}

export default Activities
