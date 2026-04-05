const RECORDS = [
  {
    name: 'Property Deed — 42 Rajpur Road, Delhi',
    meta: '0x9A3c...F21b · Feb 12, 2025 · 1.2 MB · PDF',
    hash: 'SHA-256: a3f8c21e9b4d7e6f01a28394c5b6d7e8f9a0b1c2d3e4f5061728394a5b6c7d8'
  },
  {
    name: 'Last Will & Testament — Rajesh Mehta',
    meta: '0x9A3c...F21b · Mar 04, 2025 · 340 KB · PDF',
    hash: 'SHA-256: 7b2df90a1c3e5a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1'
  },
  {
    name: 'NDA — Innovate Solutions Pvt. Ltd.',
    meta: '0xB7d1...3A9f · Mar 28, 2025 · 210 KB · PDF',
    hash: 'SHA-256: e1c94d7b2f3a5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5'
  }
]

export default function VaultRecords() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {RECORDS.map((r, i) => (
        <div key={i} style={{
          background: 'var(--bg-card)', borderRadius: 10,
          border: '1px solid var(--border)',
          padding: '14px 16px',
          display: 'flex', alignItems: 'flex-start', gap: 12
        }}>
          {/* Icon */}
          <div style={{
            width: 34, height: 34, borderRadius: 6,
            background: '#0f1f33', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#3b8bd4" strokeWidth="1.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          {/* Body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>
              {r.name}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{r.meta}</div>
            <div style={{
              fontSize: 10, fontFamily: 'var(--font-mono)',
              color: 'var(--accent-blue)', marginTop: 5,
              wordBreak: 'break-all'
            }}>{r.hash}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 7 }}>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
                background: '#1a2e0a', color: '#4ade80' }}>Verified</span>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
                background: '#0f1f33', color: '#3b8bd4' }}>Immutable</span>
            </div>
          </div>
          <button style={{
            padding: '5px 12px', fontSize: 12, fontWeight: 500,
            background: 'transparent', color: 'var(--text-secondary)',
            border: '1px solid var(--border)', borderRadius: 6
          }}>Share</button>
        </div>
      ))}
    </div>
  )
}
