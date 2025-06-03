// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {BlockHeader, SignedRecord, Record as WorkRecord} from "@/interfaces"
import * as ed from "@noble/ed25519"
import {t} from "i18next"
import {sha256} from "js-sha256"
import {toast} from "react-toastify"
import {fromBase64, toBase64} from "./base64"

export async function signRecord(
  record: WorkRecord,
  secretKey: string
): Promise<SignedRecord> {
  const secretKeyBytes = fromBase64(secretKey)
  const msgBytes = new TextEncoder().encode(JSON.stringify(record))
  const signature = await ed.signAsync(msgBytes, secretKeyBytes)
  return {
    ...record,
    signature: toBase64(signature),
  }
}

export async function signContent(
  content: string,
  secretKey: string
): Promise<string> {
  const secretKeyBytes = fromBase64(secretKey)
  const msgBytes = new TextEncoder().encode(content)
  const signature = await ed.signAsync(msgBytes, secretKeyBytes)
  return toBase64(signature)
}

async function verifySignature(
  message: string,
  signature: string,
  publicKey: string
) {
  const publicKeyBytes = fromBase64(publicKey)
  const msgBytes = new TextEncoder().encode(message)
  const signatureBytes = fromBase64(signature)
  return await ed.verifyAsync(signatureBytes, msgBytes, publicKeyBytes)
}

function getRecordDoubleHash(record: WorkRecord) {
  const msgBytes = new TextEncoder().encode(JSON.stringify(record))
  const x1 = sha256(msgBytes)
  const hash = sha256(x1)
  return hash
}

function calculateMerkleRoot(hashes: string[]): string {
  if (hashes.length === 0) return ""
  if (hashes.length === 1) return hashes[0]

  let currentLevelHashes = [...hashes]
  while (currentLevelHashes.length > 1) {
    const nextLevel: string[] = []
    for (let i = 0; i < currentLevelHashes.length; i += 2) {
      const left = currentLevelHashes[i]
      const right =
        i + 1 < currentLevelHashes.length ? currentLevelHashes[i + 1] : left

      const combined = left + right
      const combinedHash = sha256(combined)
      nextLevel.push(combinedHash)
    }
    currentLevelHashes = nextLevel
  }
  return currentLevelHashes[0] // return the root hash of the last level (nextLevel)
}

const LAST_BLOCK_KEY = "LAST_BLOCK_KEY" as const

export async function packInBlock({
  signedRecords,
  publicKey,
  secretKey,
}: {
  publicKey: string
  secretKey: string
  signedRecords: SignedRecord[]
}): Promise<BlockHeader> {
  const hashes = signedRecords.map((r) => {
    const data = {
      id: r.id,
      data: r.data,
      createdBy: r.createdBy,
      createdAt: r.createdAt,
    }
    const res = verifySignature(JSON.stringify(data), r.signature, r.createdBy)
    if (!res) {
      toast.error(t`record.invalidSignature`)
      throw new Error("Invalid signature")
    }
    return getRecordDoubleHash(data)
  })

  const merkleRoot = calculateMerkleRoot(hashes)

  const previousHash = localStorage.getItem(LAST_BLOCK_KEY) || ""

  const base = {
    data: merkleRoot,
    previousHash,
    timestamp: Date.now(),
    packer: publicKey,
  }
  const mid = sha256(JSON.stringify(base))
  const signature = await signContent(mid, secretKey)
  const header = {
    ...base,
    signature,
  }

  const headerHash = sha256(JSON.stringify(header))
  const blockHeader = {
    ...header,
    hash: headerHash,
  }
  localStorage.setItem(LAST_BLOCK_KEY, blockHeader.hash)

  return blockHeader
}
