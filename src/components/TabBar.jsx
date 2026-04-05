export default function TabBar({ active, onChange }) {
  const tabs = ['Vault records', 'Upload document', 'Verify integrity', 'How it works']
  return (
    <div style={{
      display: 'flex', gap: 8,
      padding: '16px 2rem',
      borderBottom: '1px solid var(--border)'
    }}>
      {tabs.map(tab => (
        <button key={tab} onClick={() => onChange(tab)} style={{
          padding: '8px 18px', fontSize: 13, fontWeight: 500,
          borderRadius: 8, border: '1px solid',
          borderColor: active === tab ? 'var(--text-secondary)' : 'transparent',
          background: active === tab ? 'var(--bg-card)' : 'transparent',
          color: active === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
          transition: 'all 0.15s'
        }}>
          {tab}
        </button>
      ))}
    </div>
  )
}
