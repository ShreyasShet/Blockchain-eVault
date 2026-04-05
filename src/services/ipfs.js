import axios from 'axios'

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT
const GATEWAY = 'https://gateway.pinata.cloud/ipfs'

export async function uploadToIPFS(encryptedBlob, metadata) {
  const formData = new FormData()
  formData.append('file', encryptedBlob, metadata.fileName)
  formData.append('pinataMetadata', JSON.stringify({
    name: metadata.fileName,
    keyvalues: {
      docType:    metadata.docType,
      owner:      metadata.owner,
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

export async function retrieveFromIPFS(cid) {
  const res = await axios.get(`${GATEWAY}/${cid}`, {
    responseType: 'arraybuffer'
  })
  return res.data
}
