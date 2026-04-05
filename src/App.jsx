import { useState } from 'react'
import Header        from './components/Header'
import ChainBar      from './components/ChainBar'
import StatsBar      from './components/StatsBar'
import TabBar        from './components/TabBar'
import VaultRecords  from './components/VaultRecords'
import UploadForm    from './components/UploadForm'
import VerifyIntegrity from './components/VerifyIntegrity'

function HowItWorks() {
  const stack = [
    ['Smart contracts', 'Solidity + Hardhat'],
    ['Blockchain',      'Ethereum (Sepolia)'],
    ['Storage',         'IPFS + Pinata'],
    ['Encryption',      'AES-256 (client-side)'],
    ['Frontend',        'React + Ethers.js'],
    ['Wallet',          'MetaMask / WalletConnect'],
    ['Ownership NFT',   'ERC-721'],
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 10,
        border: '1px solid var(--border)', padding: 18 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>Tech stack</div>
        {stack.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '8px 10px', borderRadius: 6,
            background: 'var(--bg-primary)', marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 500 }}>{k}</span>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20,
              background: '#0f1f33', color: '#3b8bd4', fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--bg-card)', borderRadius: 10,
        border: '1px solid var(--border)', padding: 18 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 14 }}>
          Smart contract functions
        </div>
        {['vaultDocument(hash, cid, metadata)',
          'grantAccess(docId, walletAddr, expiry)',
          'revokeAccess(docId, walletAddr)',
          'verifyDocument(hash) → bool',
          'getAuditTrail(docId) → Event[]',
          'transferOwnership(docId, newOwner)'
        ].map(fn => (
          <div key={fn} style={{ fontFamily: 'var(--font-mono)', fontSize: 11,
            padding: '8px 10px', background: 'var(--bg-primary)',
            borderRadius: 6, marginBottom: 6, color: 'var(--text-primary)' }}>
            {fn}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [tab, setTab] = useState('Vault records')

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <ChainBar />
      <StatsBar />
      <TabBar active={tab} onChange={setTab} />
      <div style={{ padding: '20px 2rem', maxWidth: 1100, margin: '0 auto' }}>
        {tab === 'Vault records'    && <VaultRecords />}
        {tab === 'Upload document'  && <UploadForm />}
        {tab === 'Verify integrity' && <VerifyIntegrity />}
        {tab === 'How it works'     && <HowItWorks />}
      </div>
    </div>
  )
}
