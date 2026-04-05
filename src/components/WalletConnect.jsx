import { useWallet } from '../hooks/useWallet'

export default function WalletConnect() {
  const { address, loading, error, connect } = useWallet()

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {address ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B6D11' }} />
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      ) : (
        <button onClick={connect} disabled={loading} style={{
          padding: '8px 16px', fontSize: 13, fontWeight: 500,
          background: '#042C53', color: '#B5D4F4',
          border: 'none', borderRadius: 8, cursor: 'pointer'
        }}>
          {loading ? 'Connecting...' : 'Connect wallet'}
        </button>
      )}
      {error && <span style={{ fontSize: 12, color: '#A32D2D' }}>{error}</span>}
    </div>
  )
}
