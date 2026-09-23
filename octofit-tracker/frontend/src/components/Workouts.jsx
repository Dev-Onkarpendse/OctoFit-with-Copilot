import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('workouts')
      .then((items) => { setWorkouts(items); setStatus('ready') })
      .catch((loadError) => { setError(loadError.message); setStatus('error') })
  }, [])

  return (
    <section className="page-section">
      <div className="section-heading"><div><p className="eyebrow">Made for your next win</p><h1>Workout library</h1></div><span className="count-pill">{workouts.length} plans</span></div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message error-message">{error}</p>}
      {status === 'ready' && <div className="workout-grid">
        {workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.title}>
          <div className="workout-top"><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div>
          <h2>{workout.title}</h2><p>{workout.description}</p><footer><span>{workout.activityType}</span><span className="arrow-mark">Start ↗</span></footer>
        </article>)}
      </div>}
    </section>
  )
}

export default Workouts
