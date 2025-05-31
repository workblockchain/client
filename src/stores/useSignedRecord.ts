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
import {t} from "i18next"
import {toast} from "react-toastify"
import {v4} from "uuid"
import {create} from "zustand"
import {
  ProjectData,
  Record,
  RequirementData,
  SignedRecord,
  WorkData,
} from "../interfaces/records"
import {fromBase64, toBase64} from "../utils"
import {useUserProfile} from "./useUserProfile"

interface SignedRecordStore {
  currentRecord: Record | null
  workRecords: WorkData[]
  requirementRecords: RequirementData[]
  projectRecords: ProjectData[]

  // Record operations
  createRecord: (message: string, createdBy: string) => Promise<SignedRecord>
  signRecord: (record: Record) => Promise<SignedRecord>
  verifyRecord: (record: SignedRecord) => Promise<boolean>

  // WorkRecord operations
  addWorkRecord: (workRecord: WorkData) => void
  getWorkRecord: (id: string) => WorkData | undefined
  updateWorkRecord: (id: string, updates: Partial<WorkData>) => void
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
}

const SIGNED_RECORD_KEY = "SIGNED_RECORDS" as const

export const useSignedRecord = create<SignedRecordStore>((set, get) => ({
  currentRecord: null,
  workRecords: [],
  requirementRecords: [],
  projectRecords: [],

  createRecord: async (message) => {
    const {uid} = useUserProfile.getState()
    const record: Omit<Record, "signature"> = {
      id: v4(),
      data: message,
      createdBy: uid,
      createdAt: Date.now(),
    }
    return await get().signRecord(record)
  },

  signRecord: async (record) => {
    const {secretKey} = useUserProfile.getState()
    if (!secretKey) {
      toast.error(t`record.noSecretKey`)
      throw new Error("No secret key available")
    }
    const secretKeyBytes = fromBase64(secretKey)
    const msgBytes = new TextEncoder().encode(JSON.stringify(record))
    const signature = await ed.signAsync(msgBytes, secretKeyBytes)
    return {
      ...record,
      signature: toBase64(signature),
      algorithm: "ed25519",
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
  save: () => {
    const {workRecords, requirementRecords, projectRecords} = get()
    localStorage.setItem(
      SIGNED_RECORD_KEY,
      JSON.stringify({
        workRecords,
        requirementRecords,
        projectRecords,
      })
    )
  },

  load: () => {
    const dataStr = localStorage.getItem(SIGNED_RECORD_KEY)
    if (dataStr) {
      const {workRecords, requirementRecords, projectRecords} =
        JSON.parse(dataStr)
      set({workRecords, requirementRecords, projectRecords})
    }
  },

  clear: () => {
    localStorage.removeItem(SIGNED_RECORD_KEY)
    set({
      currentRecord: null,
      workRecords: [],
      requirementRecords: [],
      projectRecords: [],
    })
  },
}))
