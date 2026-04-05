import { useState } from 'react'
import { computeHash, encryptFile } from '../services/crypto'
import { uploadToIPFS } from '../services/ipfs'
import { vaultDocument } from '../services/contract'

export function useVault(signer, walletAddress) {
  const [status, setStatus]   = useState('idle')
  const [progress, setProgress] = useState('')
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  async function vault(file, metadata) {
    setStatus('loading')
    setError(null)
    setResult(null)

    try {
      // Step 1: Hash the original file
      setProgress('Computing document fingerprint...')
      const hash = await computeHash(file)

      // Step 2: Encrypt before it leaves the browser
      setProgress('Encrypting document...')
      const encrypted = await encryptFile(file, walletAddress)

      // Step 3: Upload encrypted file to IPFS
      setProgress('Uploading to IPFS...')
      const cid = await uploadToIPFS(encrypted, {
        fileName: file.name,
        docType:  metadata.docType,
        owner:    walletAddress
      })

      // Step 4: Anchor on blockchain (skipped if contract not ready yet)
      let txHash = null
      if (signer && import.meta.env.VITE_CONTRACT_ADDRESS) {
        setProgress('Anchoring on Ethereum...')
        const receipt = await vaultDocument(signer, hash, cid, metadata.docType)
        txHash = receipt.hash
      }

      const vaultResult = { hash, cid, txHash, fileName: file.name, docType: metadata.docType, timestamp: new Date().toISOString() }
      setResult(vaultResult)
      setStatus('success')
      return vaultResult

    } catch (err) {
      setError(err.message)
      setStatus('error')
    } finally {
      setProgress('')
    }
  }

  return { vault, status, progress, result, error }
}
