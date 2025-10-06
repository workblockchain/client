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

import type {BaseCondition} from "@/components/DataConditionBuilder/types"
import {PERSIST_KEYS} from "@/stores/persistKeys"
import {create} from "zustand"
import {persist} from "zustand/middleware"

interface ViewPreference {
  filterConditions: BaseCondition[]
  groupConditions: BaseCondition[]
  sortConditions: BaseCondition[]
}

interface ViewPreferenceStore extends ViewPreference {
  pageKey: string
  setPageKey: (pageKey: string) => void
  setFilterConditions: (conditions: BaseCondition[]) => void
  setGroupConditions: (conditions: BaseCondition[]) => void
  setSortConditions: (conditions: BaseCondition[]) => void
}

export const useViewPreference = create<ViewPreferenceStore>()(
  persist(
    (set, get) => ({
      filterConditions: [],
      groupConditions: [],
      sortConditions: [],
      pageKey: "dashboard",
      setFilterConditions: (conditions) => set({filterConditions: conditions}),
      setGroupConditions: (conditions) => set({groupConditions: conditions}),
      setSortConditions: (conditions) => set({sortConditions: conditions}),
      setPageKey: (pageKey) => {
        usePrefConfig.getState().setPref(pageKey, get())
        set({pageKey, ...usePrefConfig.getState().history[pageKey]})
      },
    }),
    {
      name: PERSIST_KEYS.VIEW_PREFERENCE,
    }
  )
)

interface PrefHistory {
  history: Record<string, ViewPreference>
}

interface PrefHistoryStore extends PrefHistory {
  setPref: (pageKey: string, pref: ViewPreference) => void
}

const usePrefConfig = create<PrefHistoryStore>()(
  persist(
    (set) => ({
      history: {},
      setPref: (pageKey, pref) =>
        set((state) => ({history: {...state.history, [pageKey]: pref}})),
    }),
    {
      name: PERSIST_KEYS.VIEW_PREF_CONFIG,
    }
  )
)
