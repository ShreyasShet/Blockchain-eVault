export default function StatsBar({ records = 3, verified = 100, parties = 2 }) {
  const stats = [
    { value: records,          label: 'Records vaulted' },
    { value: `${verified}%`,   label: 'Verified on-chain' },
    { value: parties,          label: 'Authorized parties' },
  ]
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 12,
      padding: '20px 2rem',
      borderBottom: '1px solid var(--border)'
    }}>
      {stats.map(s => (
        <div key={s.label} style={{
          background: 'var(--bg-card)',
          borderRadius: 10, padding: '16px 20px'
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}>
            {s.value}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  )
}
