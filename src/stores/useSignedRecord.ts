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

import {ChainBlock} from "@/interfaces"
import {packInBlock, signRecord} from "@/utils/cryptos"
import {t} from "i18next"
import {toast} from "react-toastify"
import {create} from "zustand"
import {
  ProjectData,
  RequirementData,
  SignedRecord,
  WorkData,
  Record as WorkRecord,
} from "../interfaces/records"
import {useUserProfile} from "./useUserProfile"

interface SignedRecordStore {
  workRecords: WorkData[]
  requirementRecords: RequirementData[]
  projectRecords: ProjectData[]
  signedRecords: SignedRecord[]

  // Record operations
  createRecord: (id: string, message: string) => Promise<SignedRecord>

  // WorkRecord operations
  addWorkRecord: (workRecord: WorkData) => void
  getWorkRecord: (id: string) => WorkData | undefined
  updateWorkRecord: (id: string, updates: Partial<WorkData>) => void
  setWorkSigned: (id: string, isSigned: boolean) => void
  deleteWorkRecord: (id: string) => void

  // RequirementRecord operations
  addRequirementRecord: (requirementRecord: RequirementData) => void
  getRequirementRecord: (id: string) => RequirementData | undefined
  updateRequirementRecord: (
    id: string,
    updates: Partial<RequirementData>
  ) => void
  deleteRequirementRecord: (id: string) => void

  // ProjectRecord operations
  addProjectRecord: (projectRecord: ProjectData) => void
  getProjectRecord: (id: string) => ProjectData | undefined
  updateProjectRecord: (id: string, updates: Partial<ProjectData>) => void
  deleteProjectRecord: (id: string) => void

  // Persistence
  save: () => void
  load: () => void
  clear: () => void

  // block chain
  packed: Record<string, ChainBlock> // 已经打包的数据
  packIn: () => Promise<string>
  localBlockKeys: string[] // timestamp_hash
  loadPacked: (keys: string[]) => void
}

const STASHED_RECORD_KEY = "RECORDS" as const
const SIGNED_RECORD_KEY = "SIGNED_RECORDS" as const
const LOCAL_BLOCK_KEY = "LOCAL_BLOCK_KEYS" as const

export const useSignedRecord = create<SignedRecordStore>((set, get) => ({
  // records not signed yet
  workRecords: [],
  requirementRecords: [],
  projectRecords: [],
  signedRecords: [], // records not packed yet

  createRecord: async (id, message) => {
    const {publicKey, secretKey} = useUserProfile.getState()
    if (!publicKey) {
      toast.error(t`record.noPublicKey`)
      throw new Error("No public key available")
    }
    if (!secretKey) {
      toast.error(t`record.noSecretKey`)
      throw new Error("No secret key available")
    }
    const record: WorkRecord = {
      id,
      // TODO: message事实上是对WorkRecord的JSON字符串化，浪费了存储空间
      // 这是因为设计时，假设了Record可以是任意类型的JSON对象，希望囊括
      // workData, requirementData, projectData等
      // 如果能够直接使用上述三个对象的引用，就不需要再存储一份JSON字符串了
      // 但这样会导致签名验证时需要额外的转换逻辑
      data: message,
      createdBy: publicKey,
      createdAt: Date.now(),
    }
    const signed = await signRecord(record, secretKey)
    get().signedRecords.push(signed)
    get().save()
    return signed
  },

  // WorkRecord methods
  addWorkRecord: (workRecord) => {
    set((state) => ({
      workRecords: [...state.workRecords, workRecord],
    }))
    get().save()
  },

  getWorkRecord: (wid) => get().workRecords.find((w) => w.wid === wid),

  updateWorkRecord: (userId, updates) =>
    set((state) => ({
      workRecords: state.workRecords.map((w) =>
        w.userId === userId ? {...w, ...updates} : w
      ),
    })),

  deleteWorkRecord: (userId) =>
    set((state) => ({
      workRecords: state.workRecords.filter((w) => w.userId !== userId),
    })),

  setWorkSigned: (wid, isSigned) => {
    set((state) => ({
      workRecords: state.workRecords.map((w) =>
        w.wid === wid ? {...w, isSigned} : w
      ),
    }))
    get().save()
  },

  // RequirementRecord methods
  addRequirementRecord: (requirementRecord) =>
    set((state) => ({
      requirementRecords: [...state.requirementRecords, requirementRecord],
    })),

  getRequirementRecord: (rid) =>
    get().requirementRecords.find((r) => r.rid === rid),

  updateRequirementRecord: (rid, updates) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.map((r) =>
        r.rid === rid ? {...r, ...updates} : r
      ),
    })),

  deleteRequirementRecord: (rid) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.filter((r) => r.rid !== rid),
    })),

  // ProjectRecord methods
  addProjectRecord: (projectRecord) =>
    set((state) => ({
      projectRecords: [...state.projectRecords, projectRecord],
    })),

  getProjectRecord: (pid) => get().projectRecords.find((p) => p.pid === pid),

  updateProjectRecord: (pid, updates) =>
    set((state) => ({
      projectRecords: state.projectRecords.map((p) =>
        p.pid === pid ? {...p, ...updates} : p
      ),
    })),

  deleteProjectRecord: (pid) =>
    set((state) => ({
      projectRecords: state.projectRecords.filter((p) => p.pid !== pid),
    })),

  // Persistence methods
  // TODO: optimize this to only save changed records
  // use IndexedDB for better performance
  save: () => {
    const {workRecords, requirementRecords, projectRecords, signedRecords} =
      get()
    localStorage.setItem(
      STASHED_RECORD_KEY,
      JSON.stringify({
        workRecords,
        requirementRecords,
        projectRecords,
        signedRecords,
      })
    )
  },

  // TODO: optimize loading, it could take a long time if there are many records
  // 1. load only the latest records
  // 2. load records in chunks
  // 3. use a web worker to load records in the background
  // 4. use IndexedDB for better performance
  load: () => {
    const dataStr = localStorage.getItem(STASHED_RECORD_KEY)
    if (dataStr) {
      const {workRecords, requirementRecords, projectRecords, signedRecords} =
        JSON.parse(dataStr)
      set({workRecords, requirementRecords, projectRecords, signedRecords})
    }

    const localBlockKeysStr = localStorage.getItem(LOCAL_BLOCK_KEY)
    if (localBlockKeysStr) {
      const localBlockKeys = JSON.parse(localBlockKeysStr)
      set({localBlockKeys})
    }
  },

  clear: () => {
    localStorage.removeItem(STASHED_RECORD_KEY)
    set({
      workRecords: [],
      requirementRecords: [],
      projectRecords: [],
    })
  },

  localBlockKeys: [],
  packed: {},
  packIn: async () => {
    const {signedRecords, packed, localBlockKeys} = get()
    const {publicKey, secretKey} = useUserProfile.getState()

    // calculate Merkle root
    if (signedRecords.length === 0) {
      return ""
    }
    if (signedRecords.length > 100) {
      toast.error(t`record.tooManyRecords`)
      throw new Error("Too many records to pack")
    }

    const blockHeader = await packInBlock({
      signedRecords,
      publicKey,
      secretKey,
    })

    packed[blockHeader.hash] = {
      header: blockHeader,
      records: signedRecords,
    }
    localBlockKeys.push(`${blockHeader.timestamp}_${blockHeader.hash}`)
    localBlockKeys.sort((a, b) => {
      const [aTimestamp] = a.split("_").map(Number)
      const [bTimestamp] = b.split("_").map(Number)
      return bTimestamp - aTimestamp // Sort by timestamp descending
    })
    // TODO: replace with online packing logic
    // store the packed records in localStorage
    localStorage.setItem(
      `${SIGNED_RECORD_KEY}_${blockHeader.hash}`,
      JSON.stringify(packed[blockHeader.hash])
    )
    localStorage.setItem(LOCAL_BLOCK_KEY, JSON.stringify(localBlockKeys))
    // Clear packed workRecords from array workRecords
    const packedIds = signedRecords.map((r) => r.id)
    set((state) => ({
      workRecords: state.workRecords.filter((w) => !packedIds.includes(w.wid)),
      requirementRecords: state.requirementRecords.filter(
        (r) => !packedIds.includes(r.rid)
      ),
      projectRecords: state.projectRecords.filter(
        (p) => !packedIds.includes(p.pid)
      ),
    }))
    set({signedRecords: []}) // Clear after packing

    get().save() // remove signed records from local storage

    return blockHeader.hash
  },
  loadPacked: (keys) => {
    const loaded: Record<string, ChainBlock> = {}
    keys.forEach((key) => {
      const [, hash] = key.split("_")
      const dataStr = localStorage.getItem(`${SIGNED_RECORD_KEY}_${hash}`)
      if (dataStr) {
        const records: SignedRecord[] = JSON.parse(dataStr)
        loaded[hash] = {
          header: JSON.parse(dataStr).header,
          records,
        }
      }
    })
    set({packed: {...get().packed, ...loaded}})
  },
}))
