const BLOCKS = [
  { num: 0,    hash: '0x0000...0000', label: 'Genesis',         date: '2024-01-01', genesis: true },
  { num: 1041, hash: '0xa3f8...c21e', label: 'Property Deed',   date: 'Feb 12, 2025' },
  { num: 1098, hash: '0x7b2d...f90a', label: 'Will & Testament', date: 'Mar 04, 2025' },
  { num: 1134, hash: '0xe1c9...4d7b', label: 'NDA Agreement',   date: 'Mar 28, 2025' },
  { num: 1135, hash: 'pending...',    label: 'Next upload',     date: '—', pending: true },
]

export default function ChainBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 0,
      overflowX: 'auto', padding: '20px 2rem',
      borderBottom: '1px solid var(--border)'
    }}>
      {BLOCKS.map((block, i) => (
        <div key={block.num} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            background: block.genesis ? '#0f2340' : 'var(--bg-card)',
            border: `1px solid ${block.genesis ? '#185FA5' : block.pending ? 'var(--border)' : 'var(--border)'}`,
            borderRadius: 8,
            padding: '10px 14px',
            minWidth: 140,
            opacity: block.pending ? 0.5 : 1
          }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
              BLOCK #{block.num}
            </div>
            <div style={{
              fontSize: 11, color: 'var(--accent-blue)',
              fontFamily: 'var(--font-mono)', marginBottom: 6,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120
            }}>
              {block.hash}
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
              {block.label}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
              {block.date}
            </div>
          </div>
          {i < BLOCKS.length - 1 && (
            <div style={{ color: 'var(--text-muted)', padding: '0 8px', fontSize: 16 }}>→</div>
          )}
        </div>
      ))}
    </div>
  )
}
