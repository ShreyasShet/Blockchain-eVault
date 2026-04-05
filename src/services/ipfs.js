import axios from 'axios'

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT
const PINATA_GATEWAY = 'https://gateway.pinata.cloud/ipfs'

export async function computeHash(file) {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return '0x' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function encryptFile(file, walletAddress) {
  const buffer = await file.arrayBuffer()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(walletAddress.padEnd(32, '0')),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new TextEncoder().encode('lexvault-salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  )
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, buffer)
  const combined = new Uint8Array(iv.byteLength + encrypted.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.byteLength)
  return new Blob([combined], { type: 'application/octet-stream' })
}

export async function uploadToIPFS(encryptedBlob, metadata) {
  const formData = new FormData()
  formData.append('file', encryptedBlob, metadata.fileName)
  formData.append('pinataMetadata', JSON.stringify({
    name: metadata.fileName,
    keyvalues: {
      docType: metadata.docType,
      owner: metadata.owner,
      uploadedAt: new Date().toISOString()
    }
  }))
  formData.append('pinataOptions', JSON.stringify({ cidVersion: 1 }))
  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    { headers: { Authorization: `Bearer ${PINATA_JWT}` } }
  )
  return res.data.IpfsHash
}

export async function retrieveFromIPFS(cid, walletAddress) {
  const res = await axios.get(`${PINATA_GATEWAY}/${cid}`, {
    responseType: 'arraybuffer'
  })
  const combined = new Uint8Array(res.data)
  const iv = combined.slice(0, 12)
  const ciphertext = combined.slice(12)
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(walletAddress.padEnd(32, '0')),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: new TextEncoder().encode('lexvault-salt'), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  )
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
  return new Blob([decrypted], { type: 'application/pdf' })
}
