import React, { useState, useEffect } from 'react'
import { projects } from './projects'
import './styles.css'

const techColors = {
  Python: '#3776AB', Go: '#00ADD8', Rust: '#CE422B',
  JavaScript: '#F7DF1E', TypeScript: '#3178C6', React: '#61DAFB',
  Security: '#E53E3E', Network: '#4299E1'
}

function ProjectCard({ project }) {
  const [stats, setStats] = useState(null)
  useEffect(() => {
    fetch(`https://api.github.com/repos/mojojojobeat26-arch/${project.repo}`)
      .then(r => r.json())
      .then(d => setStats({ stars: d.stargazers_count, forks: d.forks_count, updated: d.pushed_at }))
      .catch(() => setStats({ stars: 0, forks: 0, updated: project.updated }))
  }, [project.repo])

  return (
    <div className="card">
      <div className="card-header">
        <h3>{project.name}</h3>
        <span className="tag">{project.stack}</span>
      </div>
      <p>{project.desc}</p>
      <div className="card-meta">
        {stats && (
          <> <span>⭐ {stats.stars}</span> <span>🍴 {stats.forks}</span> </>
        )}
        <a href={`https://github.com/mojojojobeat26-arch/${project.repo}`} target="_blank" rel="noopener">View</a>
      </div>
    </div>
  )
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const stacks = ['all', ...new Set(projects.map(p => p.stack))]
  
  return (
    <div className="container">
      <header>
        <h1>📊 Project Dashboard</h1>
        <p>A personal dashboard I built to track my own projects with live GitHub stats</p>
      </header>
      <div className="filters">
        {stacks.map(s => (
          <button key={s} className={filter === s ? 'active' : ''} onClick={() => setFilter(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid">
        {projects.filter(p => filter === 'all' || p.stack === filter).map(p => (
          <ProjectCard key={p.repo} project={p} />
        ))}
      </div>
    </div>
  )
}