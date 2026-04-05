import { useState, useRef } from 'react'
import { useWallet } from '../hooks/useWallet'
import { useVault } from '../hooks/useVault'

export default function UploadForm() {
  const { address, signer } = useWallet()
  const { vault, status, progress, result, error } = useVault(signer, address)

  const [file, setFile]         = useState(null)
  const [docType, setDocType]   = useState('Property deed')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) setFile(dropped)
  }

  async function handleSubmit() {
    if (!file || !address) return
    await vault(file, { docType })
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${dragging ? '#185FA5' : 'var(--color-border-secondary)'}`,
          borderRadius: 12, padding: '2rem', textAlign: 'center',
          cursor: 'pointer', marginBottom: 16,
          background: dragging ? '#E6F1FB' : 'var(--color-background-secondary)'
        }}
      >
        <input ref={inputRef} type="file" accept=".pdf,.docx,.jpg,.png"
          style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
        {file ? (
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)' }}>{file.name}</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              {(file.size / 1024).toFixed(1)} KB
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Drop a file or click to browse</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', marginTop: 4 }}>PDF, DOCX, JPG — max 50MB</div>
          </div>
        )}
      </div>

      {/* Doc type selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
          Document type
        </label>
        <select value={docType} onChange={e => setDocType(e.target.value)}
          style={{ width: '100%', padding: '8px 10px', fontSize: 13, borderRadius: 8,
            border: '0.5px solid var(--color-border-secondary)',
            background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)' }}>
          {['Property deed','Will & testament','NDA / Agreement','Court order',
            'Marriage certificate','Power of attorney','Other'].map(t =>
            <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* Wallet warning */}
      {!address && (
        <div style={{ fontSize: 12, color: '#BA7517', background: '#FAEEDA',
          borderRadius: 8, padding: '8px 12px', marginBottom: 16 }}>
          Connect your wallet first to vault a document
        </div>
      )}

      {/* Progress */}
      {progress && (
        <div style={{ fontSize: 13, color: 'var(--color-text-secondary)',
          background: 'var(--color-background-secondary)',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
          {progress}
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ fontSize: 13, color: '#A32D2D', background: '#FCEBEB',
          borderRadius: 8, padding: '10px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{ background: '#EAF3DE', borderRadius: 12,
          padding: '16px', marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#27500A', marginBottom: 10 }}>
            Document vaulted successfully
          </div>
          <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#3B6D11',
            wordBreak: 'break-all', lineHeight: 1.8 }}>
            <div><strong>Hash:</strong> {result.hash}</div>
            <div><strong>CID:</strong> {result.cid}</div>
            {result.txHash && <div><strong>Tx:</strong> {result.txHash}</div>}
          </div>
        </div>
      )}

      {/* Submit button */}
      <button onClick={handleSubmit}
        disabled={!file || !address || status === 'loading'}
        style={{
          width: '100%', padding: '12px', fontSize: 14, fontWeight: 500,
          background: (!file || !address || status === 'loading') ? 'var(--color-background-secondary)' : '#042C53',
          color: (!file || !address || status === 'loading') ? 'var(--color-text-tertiary)' : '#B5D4F4',
          border: 'none', borderRadius: 8, cursor: (!file || !address) ? 'not-allowed' : 'pointer'
        }}>
        {status === 'loading' ? 'Vaulting...' : 'Vault document'}
      </button>

    </div>
  )
}
