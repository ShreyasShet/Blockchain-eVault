import WalletConnect from './components/WalletConnect'
import UploadForm from './components/UploadForm'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-background-tertiary)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--color-background-primary)',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
        padding: '0 2rem', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#042C53', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="#B5D4F4" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>
            LexVault
          </span>
        </div>
        <WalletConnect />
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 6 }}>
          Vault a legal document
        </h2>
        <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24 }}>
          Your document is encrypted in the browser, stored on IPFS, and its fingerprint anchored on Ethereum.
        </p>
        <div style={{ background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)', borderRadius: 12 }}>
          <UploadForm />
        </div>
      </div>

    </div>
  )
}
