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
import {v4} from "uuid"
import {create} from "zustand"
import {
  ProjectData,
  RequirementData,
  RuntimeRecord,
  SignedRecord,
  WorkData,
  Record as WorkRecord,
} from "../interfaces/records"
import {useUserProfile} from "./useUserProfile"

interface SignedRecordStore {
  workRecords: RuntimeRecord<WorkData>[]
  requirementRecords: RuntimeRecord<RequirementData>[]
  projectRecords: RuntimeRecord<ProjectData>[]
  signedRecords: SignedRecord[]
  cardIndex: string[][]

  // Record operations
  signWorkRecord: (id: string) => Promise<SignedRecord>

  // WorkRecord operations
  addWorkRecord: (workRecord: Omit<WorkData, "wid">) => string
  getWorkRecord: (id: string) => RuntimeRecord<WorkData> | undefined
  updateWorkRecord: (id: string, updates: Partial<WorkData>) => void
  deleteWorkRecord: (id: string) => void

  // RequirementRecord operations
  addRequirementRecord: (requirementRecord: RequirementData) => void
  drawRequirementId: (prefix?: string) => string
  getRequirementRecord: (
    id: string
  ) => RuntimeRecord<RequirementData> | undefined
  updateRequirementRecord: (
    id: string,
    updates: Partial<RequirementData>
  ) => void
  deleteRequirementRecord: (id: string) => void

  // ProjectRecord operations
  addProjectRecord: (projectRecord: ProjectData) => void
  getProjectRecord: (id: string) => RuntimeRecord<ProjectData> | undefined
  updateProjectRecord: (id: string, updates: Partial<ProjectData>) => void
  deleteProjectRecord: (id: string) => void

  // Persistence
  save: () => void
  load: () => void
  clear: () => void

  setIndex: (index: string[][]) => void

  // block chain
  packed: Record<string, ChainBlock> // 已经打包的数据
  packIn: () => Promise<string>
  localBlockKeys: string[] // timestamp_hash
  loadPacked: (keys: string[]) => void
}

const STASHED_RECORD_KEY = "RECORDS" as const
const SIGNED_RECORD_KEY = "SIGNED_RECORDS" as const
const LOCAL_BLOCK_KEY = "LOCAL_BLOCK_KEYS" as const
const SORT_KEY = "SORT_KEY" as const

export const useSignedRecord = create<SignedRecordStore>((set, get) => ({
  // records not signed yet
  workRecords: [],
  requirementRecords: [],
  projectRecords: [],
  signedRecords: [], // records not packed yet
  cardIndex: [],
  signWorkRecord: async (id) => {
    const {publicKey, secretKey} = useUserProfile.getState()
    if (!publicKey) {
      toast.error(t`record.noPublicKey`)
      throw new Error("No public key available")
    }
    if (!secretKey) {
      toast.error(t`record.noSecretKey`)
      throw new Error("No secret key available")
    }
    const unsignedRecord = get().getWorkRecord(id)
    if (!unsignedRecord) {
      toast.error(t`record.noData`)
      throw new Error("No data available")
    }
    const message = JSON.stringify(unsignedRecord.data)
    const record: WorkRecord = {
      // TODO: 需要生成一个新的id，使用打包算法，保证id的唯一。目前暂时使用旧id
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
    unsignedRecord.isSigned = true
    get().save()
    return signed
  },

  // WorkRecord methods
  addWorkRecord: (workRecord) => {
    const {publicKey} = useUserProfile.getState()
    const runtimeRecord: RuntimeRecord<WorkData> = {
      id: v4(),
      data: {...workRecord, wid: `work-${Date.now()}`},
      createdBy: publicKey || "",
      createdAt: Date.now(),
    }
    set((state) => ({
      workRecords: [...state.workRecords, runtimeRecord],
    }))
    get().save()
    return runtimeRecord.id
  },

  getWorkRecord: (id) => get().workRecords.find((w) => w.id === id),

  updateWorkRecord: (id, updates) =>
    set((state) => ({
      workRecords: state.workRecords.map((w) =>
        w.id === id ? {...w, data: {...w.data, ...updates}} : w
      ),
    })),

  deleteWorkRecord: (id) =>
    set((state) => ({
      workRecords: state.workRecords.filter((w) => w.id !== id),
    })),

  // RequirementRecord methods
  addRequirementRecord: (requirementRecord) => {
    const {publicKey} = useUserProfile.getState()
    const runtimeRecord: RuntimeRecord<RequirementData> = {
      id: requirementRecord.rid,
      data: requirementRecord,
      createdBy: publicKey || "",
      createdAt: Date.now(),
    }
    set((state) => ({
      requirementRecords: [...state.requirementRecords, runtimeRecord],
    }))
  },

  drawRequirementId: (prefix = "Req-") => {
    const existingIds = get().requirementRecords.map((r) => r.data.rid)
    // 找到当前相同前缀的最大id
    // 过滤出相同前缀的ID并提取数字部分
    const prefixRegex = new RegExp(`^${prefix}(\\d+)$`)
    const numbers = existingIds
      .map((id) => {
        const match = id.match(prefixRegex)
        return match ? parseInt(match[1], 10) : 0
      })
      .filter((n) => !isNaN(n))

    // 计算下一个ID，如果没有匹配项则从0开始
    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : -1
    const next = maxNumber + 1
    const newId = `${prefix}${String(next).padStart(3, "0")}`
    return newId
  },

  getRequirementRecord: (id) =>
    get().requirementRecords.find((r) => r.id === id),

  updateRequirementRecord: (rid, updates) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.map((r) =>
        r.id === rid ? {...r, data: {...r.data, ...updates}} : r
      ),
    })),

  deleteRequirementRecord: (rid) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.filter((r) => r.id !== rid),
    })),

  // ProjectRecord methods
  addProjectRecord: (projectRecord) => {
    const {publicKey} = useUserProfile.getState()
    const runtimeRecord: RuntimeRecord<ProjectData> = {
      id: projectRecord.pid,
      data: projectRecord,
      createdBy: publicKey || "",
      createdAt: Date.now(),
    }
    set((state) => ({
      projectRecords: [...state.projectRecords, runtimeRecord],
    }))
  },

  getProjectRecord: (id) => get().projectRecords.find((p) => p.id === id),

  updateProjectRecord: (pid, updates) =>
    set((state) => ({
      projectRecords: state.projectRecords.map((p) =>
        p.id === pid ? {...p, data: {...p.data, ...updates}} : p
      ),
    })),

  deleteProjectRecord: (pid) =>
    set((state) => ({
      projectRecords: state.projectRecords.filter((p) => p.id !== pid),
    })),
  setIndex: (index: string[][]) => {
    set({cardIndex: index})
    localStorage.setItem(SORT_KEY, JSON.stringify({cardIndex: index}))
  },

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

    const {cardIndex} = get()
    localStorage.setItem(
      SORT_KEY,
      JSON.stringify({
        cardIndex,
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

    const indexData = localStorage.getItem(SORT_KEY)
    if (indexData) {
      try {
        const {cardIndex} = JSON.parse(indexData)
        if (Array.isArray(cardIndex)) {
          set({cardIndex})
        }
      } catch (e) {
        console.warn("加载 Kanban 排序失败", e)
      }
    }
  },

  clear: () => {
    // localStorage.removeItem(STASHED_RECORD_KEY)
    set({
      workRecords: [],
      requirementRecords: [],
      projectRecords: [],
      cardIndex: [],
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
    // TODO: replace with zustand persist, use online packing logic
    // store the packed records in localStorage
    localStorage.setItem(
      `${SIGNED_RECORD_KEY}_${blockHeader.hash}`,
      JSON.stringify(packed[blockHeader.hash])
    )
    localStorage.setItem(LOCAL_BLOCK_KEY, JSON.stringify(localBlockKeys))
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
