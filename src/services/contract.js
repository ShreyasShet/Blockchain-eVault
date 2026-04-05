import { ethers } from 'ethers'

// Your friend fills these in after deployment
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS
const CONTRACT_ABI = [
  'function vaultDocument(bytes32 hash, string cid, string docType) returns (uint256)',
  'function grantAccess(uint256 docId, address wallet, string cid)',
  'function verifyDocument(bytes32 hash) view returns (bool, uint256)',
  'function getDocument(uint256 docId) view returns (tuple(bytes32 hash, string cid, address owner, uint256 timestamp, string docType))'
]

export function getContract(signer) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
}

export async function vaultDocument(signer, hash, cid, docType) {
  const contract = getContract(signer)
  const tx = await contract.vaultDocument(hash, cid, docType)
  const receipt = await tx.wait()
  return receipt
}

export async function verifyDocument(signer, hash) {
  const contract = getContract(signer)
  return contract.verifyDocument(hash)
}
