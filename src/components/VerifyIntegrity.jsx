import { useState } from 'react'
import { computeHash } from '../services/crypto'

const AUDIT = [
  { color: '#4ade80', label: 'Document vaulted',              sub: 'Feb 12 · by 0x9A3c...F21b' },
  { color: '#3b8bd4', label: 'Access granted to 0xB7d1...3A9f', sub: 'Feb 14 · by 0x9A3c...F21b' },
  { color: '#3b8bd4', label: 'Document viewed',               sub: 'Mar 01 · by 0xB7d1...3A9f' },
  { color: '#ba7517', label: 'Integrity check passed',        sub: 'Apr 05 · automated' },
]

export default function VerifyIntegrity() {
  const [hashInput, setHashInput] = useState('')
  const [result, setResult]       = useState(null)
  const [computing, setComputing] = useState(false)

  async function handleFileHash(e) {
    const file = e.target.files[0]
    if (!file) return
    setComputing(true)
    const hash = await computeHash(file)
    setHashInput(hash)
    setComputing(false)
  }

  function handleVerify() {
    if (!hashInput) return
    // In production this calls contract.verifyDocument(hash)
    // For now we simulate a match against known hashes
    const known = 'a3f8c21e9b4d7e6f01a28394c5b6d7e8f9a0b1c2d3e4f5061728394a5b6c7d8'
    const match = hashInput.replace('0x','').startsWith(known.slice(0,8))
    setResult(match ? 'verified' : 'not_found')
  }

  const inputStyle = {
    width: '100%', padding: '9px 12px', fontSize: 13,
    background: 'var(--bg-primary)', color: 'var(--text-primary)',
    border: '1px solid var(--border)', borderRadius: 8,
    fontFamily: 'var(--font-mono)'
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

      {/* Left: verify */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 10,
        border: '1px solid var(--border)', padding: '18px' }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Verify a document
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 5 }}>
            Paste document hash (SHA-256)
          </label>
          <input style={inputStyle} placeholder="a3f8c21e9b4d..."
            value={hashInput} onChange={e => { setHashInput(e.target.value); setResult(null) }} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 5 }}>
            Or upload document to auto-compute hash
          </label>
          <label style={{
            display: 'block', border: '1px dashed var(--border)',
            borderRadius: 8, padding: '14px', textAlign: 'center', cursor: 'pointer'
          }}>
            <input type="file" style={{ display: 'none' }} onChange={handleFileHash} />
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              {computing ? 'Computing hash...' : 'Drop file to compute hash'}
            </span>
          </label>
        </div>

        {result === 'verified' && (
          <div style={{ background: '#1a2e0a', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#4ade80', marginBottom: 6 }}>
              Verified on Ethereum Sepolia
            </div>
            <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: '#3b6d11', lineHeight: 1.8 }}>
              Block: #1041 · Tx: 0xa3f8c21e9b4d...<br/>
              Timestamp: 2025-02-12T09:41:22Z<br/>
              Owner: 0x9A3c...F21b
            </div>
          </div>
        )}
        {result === 'not_found' && (
          <div style={{ background: '#2a0a0a', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: '#f87171' }}>
              No matching record found on-chain
            </div>
          </div>
        )}

        <button onClick={handleVerify} style={{
          padding: '9px 18px', fontSize: 13, fontWeight: 500,
          background: '#042C53', color: '#B5D4F4',
          border: 'none', borderRadius: 8
        }}>
          Verify on-chain →
        </button>
      </div>

      {/* Right: audit trail */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 10,
        border: '1px solid var(--border)', padding: '18px' }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Audit trail
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {AUDIT.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%',
                background: a.color, marginTop: 4, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', marginTop: 16, paddingTop: 14 }}>
          <button style={{
            width: '100%', padding: '10px', fontSize: 13, fontWeight: 500,
            background: 'var(--bg-primary)', color: 'var(--text-primary)',
            border: '1px solid var(--border)', borderRadius: 8
          }}>
            Generate audit report ↗
          </button>
        </div>
      </div>
    </div>
  )
}
