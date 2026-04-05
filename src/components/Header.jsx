import WalletConnect from './WalletConnect'

export default function Header() {
  return (
    <div style={{
      background: var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      padding: '0 2rem',
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }}>
      {/* Logo + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44,
          background: '#042C53',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            stroke="#B5D4F4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            <circle cx="12" cy="16" r="1" fill="#B5D4F4"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>
            LexVault — Blockchain eVault
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            Immutable legal record storage on distributed ledger · Ethereum Testnet (Sepolia)
          </div>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <WalletConnect />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#0f2a0f', border: '1px solid #1a4a1a',
          borderRadius: 20, padding: '5px 12px'
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80' }} />
          <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 500 }}>Node online</span>
        </div>
      </div>
    </div>
  )
}
