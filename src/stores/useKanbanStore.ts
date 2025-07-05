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

import {BoardProps} from "@/interfaces/kanban"
import {create} from "zustand"

const KANBAN_STORAGE_KEY = "KANBAN_DATA" as const

interface KanbanStore {
  board: BoardProps
  setBoard: (board: BoardProps) => void
  moveCard: (payload: {
    dragIndex: number
    hoverIndex: number
    sourceColumnId: string
    targetColumnId: string
  }) => void
  addCard: (payload: {
    columnId: string
    content: any
    targetIndex: number
  }) => void
  removeCard: (payload: {columnId: string; targetIndex: number}) => void
  updateCard: (payload: {
    columnId: string
    targetIndex: number
    content: any
  }) => void
  save: () => void
  load: () => void
}

export const useKanbanStore = create<KanbanStore>((set, get) => ({
  board: {
    id: "kanbanBoard",
    column: [],
  },

  setBoard: (board) => {
    console.log(`[KanbanStore] setBoard at ${new Date().toISOString()}`, board)
    set({board})
    get().save()
  },

  moveCard: (payload) => {
    console.log(
      `[KanbanStore] moveCard at ${new Date().toISOString()}`,
      payload
    )
    const {sourceColumnId, targetColumnId, dragIndex, hoverIndex} = payload
    const stateCopy = structuredClone(get().board)

    const fromList = stateCopy.column.find((list) => list.id === sourceColumnId)
    const toList = stateCopy.column.find((list) => list.id === targetColumnId)

    if (
      !fromList ||
      !toList ||
      dragIndex === undefined ||
      hoverIndex === undefined ||
      dragIndex < 0 ||
      dragIndex >= fromList.cards.length ||
      hoverIndex < 0
    ) {
      console.warn("Invalid move operation", payload)
      return
    }

    const [movedCard] = fromList.cards.splice(dragIndex, 1)
    toList.cards.splice(hoverIndex, 0, movedCard)

    set({board: stateCopy})
    get().save()
  },

  addCard: (payload) => {
    console.log(`[KanbanStore] addCard at ${new Date().toISOString()}`, payload)
    const {columnId, content, targetIndex} = payload
    const stateCopy = structuredClone(get().board)
    const targetList = stateCopy.column.find((l) => l.id === columnId)

    if (!targetList || targetIndex === undefined || !content) return

    targetList.cards.splice(targetIndex, 0, content)
    set({board: stateCopy})
    get().save()
  },

  removeCard: (payload) => {
    console.log(
      `[KanbanStore] removeCard at ${new Date().toISOString()}`,
      payload
    )
    const {columnId, targetIndex} = payload
    const stateCopy = structuredClone(get().board)
    const sourceList = stateCopy.column.find((l) => l.id === columnId)

    if (!sourceList || targetIndex === undefined) return

    sourceList.cards.splice(targetIndex, 1)
    set({board: stateCopy})
    get().save()
  },

  updateCard: (payload) => {
    console.log(
      `[KanbanStore] updateCard at ${new Date().toISOString()}`,
      payload
    )
    const {columnId, targetIndex, content} = payload
    const stateCopy = structuredClone(get().board)
    const sourceList = stateCopy.column.find((l) => l.id === columnId)

    if (!sourceList || targetIndex === undefined) return

    sourceList.cards[targetIndex] = {
      ...sourceList.cards[targetIndex],
      ...content,
    }
    set({board: stateCopy})
    get().save()
  },

  save: () => {
    console.log(
      `[KanbanStore] save at ${new Date().toISOString()}`,
      get().board
    )
    localStorage.setItem(KANBAN_STORAGE_KEY, JSON.stringify(get().board))
  },

  load: () => {
    console.log(`[KanbanStore] load at ${new Date().toISOString()}`)
    const dataStr = localStorage.getItem(KANBAN_STORAGE_KEY)
    if (dataStr) {
      const board = JSON.parse(dataStr)
      set({board})
    }
  },
}))
