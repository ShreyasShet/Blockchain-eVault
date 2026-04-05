import { useState, useEffect } from 'react'
import { connectWallet, getWalletAddress, onAccountChange } from '../services/wallet'

export function useWallet() {
  const [address, setAddress]   = useState(null)
  const [signer, setSigner]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  useEffect(() => {
    getWalletAddress().then(addr => {
      if (addr) setAddress(addr)
    })
    onAccountChange(addr => {
      setAddress(addr)
      if (!addr) setSigner(null)
    })
  }, [])

  async function connect() {
    setLoading(true)
    setError(null)
    try {
      const { signer, address } = await connectWallet()
      setSigner(signer)
      setAddress(address)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { address, signer, loading, error, connect }
}
