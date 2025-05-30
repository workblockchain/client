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

import * as ed from "@noble/ed25519"
import {create} from "zustand"
import {
  ProjectRecord,
  Record,
  RequirementRecord,
  WorkRecord,
} from "../interfaces/records"
import {fromBase64, toBase64} from "../utils"
import {useUserProfile} from "./useUserProfile"

interface SignedRecordStore {
  records: Record[]
  currentRecord: Record | null
  workRecords: WorkRecord[]
  requirementRecords: RequirementRecord[]
  projectRecords: ProjectRecord[]

  // Record operations
  createRecord: (message: string, createdBy: string) => Promise<Record>
  signRecord: (record: Omit<Record, "signature">) => Promise<Record>
  verifyRecord: (record: Record) => Promise<boolean>

  // CRUD operations
  addRecord: (record: Record) => void
  getRecord: (id: string) => Record | undefined
  updateRecord: (id: string, updates: Partial<Record>) => void
  deleteRecord: (id: string) => void

  // WorkRecord operations
  addWorkRecord: (workRecord: WorkRecord) => void
  getWorkRecord: (id: string) => WorkRecord | undefined
  updateWorkRecord: (id: string, updates: Partial<WorkRecord>) => void
  deleteWorkRecord: (id: string) => void

  // RequirementRecord operations
  addRequirementRecord: (requirementRecord: RequirementRecord) => void
  getRequirementRecord: (id: string) => RequirementRecord | undefined
  updateRequirementRecord: (
    id: string,
    updates: Partial<RequirementRecord>
  ) => void
  deleteRequirementRecord: (id: string) => void

  // ProjectRecord operations
  addProjectRecord: (projectRecord: ProjectRecord) => void
  getProjectRecord: (id: string) => ProjectRecord | undefined
  updateProjectRecord: (id: string, updates: Partial<ProjectRecord>) => void
  deleteProjectRecord: (id: string) => void

  // Persistence
  save: () => void
  load: () => void
  clear: () => void
}

const SIGNED_RECORD_KEY = "SIGNED_RECORDS" as const

export const useSignedRecord = create<SignedRecordStore>((set, get) => ({
  records: [],
  currentRecord: null,
  workRecords: [],
  requirementRecords: [],
  projectRecords: [],

  createRecord: async (message, createdBy) => {
    const record: Omit<Record, "signature"> = {
      id: crypto.randomUUID(),
      message,
      createdBy,
      createdAt: Date.now(),
    }
    return await get().signRecord(record)
  },

  signRecord: async (record) => {
    const {secretKey} = useUserProfile.getState()
    if (!secretKey) throw new Error("No secret key available")
    const secretKeyBytes = fromBase64(secretKey)
    const msgBytes = new TextEncoder().encode(JSON.stringify(record))
    const signature = await ed.signAsync(msgBytes, secretKeyBytes)
    return {
      ...record,
      signature: toBase64(signature),
    }
  },

  verifyRecord: async (record) => {
    const {signature, ...unsignedRecord} = record
    const {publicKey} = useUserProfile.getState()
    if (!publicKey) throw new Error("No public key available")
    const publicKeyBytes = fromBase64(publicKey)
    const msgBytes = new TextEncoder().encode(JSON.stringify(unsignedRecord))
    const signatureBytes = fromBase64(signature)
    return await ed.verifyAsync(signatureBytes, msgBytes, publicKeyBytes)
  },

  addRecord: (record) =>
    set((state) => ({
      records: [...state.records, record],
      currentRecord: record,
    })),

  getRecord: (id) => get().records.find((r) => r.id === id),

  updateRecord: (id, updates) =>
    set((state) => ({
      records: state.records.map((r) => (r.id === id ? {...r, ...updates} : r)),
      currentRecord:
        state.currentRecord?.id === id
          ? {...state.currentRecord, ...updates}
          : state.currentRecord,
    })),

  deleteRecord: (id) =>
    set((state) => ({
      records: state.records.filter((r) => r.id !== id),
      currentRecord:
        state.currentRecord?.id === id ? null : state.currentRecord,
    })),

  // WorkRecord methods
  addWorkRecord: (workRecord) =>
    set((state) => ({
      workRecords: [...state.workRecords, workRecord],
    })),

  getWorkRecord: (userId) => get().workRecords.find((w) => w.userId === userId),

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

  // RequirementRecord methods
  addRequirementRecord: (requirementRecord) =>
    set((state) => ({
      requirementRecords: [...state.requirementRecords, requirementRecord],
    })),

  getRequirementRecord: (id) =>
    get().requirementRecords.find((r) => r.id === id),

  updateRequirementRecord: (id, updates) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.map((r) =>
        r.id === id ? {...r, ...updates} : r
      ),
    })),

  deleteRequirementRecord: (id) =>
    set((state) => ({
      requirementRecords: state.requirementRecords.filter((r) => r.id !== id),
    })),

  // ProjectRecord methods
  addProjectRecord: (projectRecord) =>
    set((state) => ({
      projectRecords: [...state.projectRecords, projectRecord],
    })),

  getProjectRecord: (id) => get().projectRecords.find((p) => p.id === id),

  updateProjectRecord: (id, updates) =>
    set((state) => ({
      projectRecords: state.projectRecords.map((p) =>
        p.id === id ? {...p, ...updates} : p
      ),
    })),

  deleteProjectRecord: (id) =>
    set((state) => ({
      projectRecords: state.projectRecords.filter((p) => p.id !== id),
    })),

  // Persistence methods
  save: () => {
    const {records, workRecords, requirementRecords, projectRecords} = get()
    localStorage.setItem(
      SIGNED_RECORD_KEY,
      JSON.stringify({
        records,
        workRecords,
        requirementRecords,
        projectRecords,
      })
    )
  },

  load: () => {
    const dataStr = localStorage.getItem(SIGNED_RECORD_KEY)
    if (dataStr) {
      const {records, workRecords, requirementRecords, projectRecords} =
        JSON.parse(dataStr)
      set({records, workRecords, requirementRecords, projectRecords})
    }
  },

  clear: () => {
    localStorage.removeItem(SIGNED_RECORD_KEY)
    set({
      records: [],
      currentRecord: null,
      workRecords: [],
      requirementRecords: [],
      projectRecords: [],
    })
  },
}))
