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

import {Props as StoryCardProps} from "@/components/StoryCard"
import {BoardProps} from "@/interfaces/kanban"
import {useCallback, useReducer} from "react"
import {KanbanBoard} from "../Kanban/KanbanBoard"
import {KanbanForm} from "../Kanban/KanbanForm"

export function KanbanContainer() {
  let initialArg: BoardProps = {
    id: "kanbanBoard",
    column: [
      {
        id: "card 1",
        columnTitle: "To do",
        cards: [
          {
            id: "eat",
            children: "1",
            subTasks: [{label: "123"}, {label: "123"}],
          },
          {
            id: "sleep 1",
            children: "2",
          },
          {id: "eat11", children: "3"},
          {id: "eat1111", children: "4"},
          {id: "eat11111", children: "5"},
        ],
      },
      {
        id: "card 2",
        columnTitle: "进行中",
        cards: [{id: "card4643"}],
      },
      {
        id: "card 3",
        columnTitle: "完成",
        cards: [{id: "car45645664d3"}],
      },
    ],
  }

  type KanbanAction =
    | {
        type: "MOVE_CARD"
        payload: {
          dragIndex: number
          hoverIndex: number
          sourceColumnId: string
          targetColumnId: string
        }
      }
    | {
        type: "ADD_CARD"
        payload: {
          columnId: string
          content: StoryCardProps
          targetIndex: number
        }
      }
    | {
        type: "REMOVE_CARD"
        payload: {
          columnId: string
          targetIndex: number
        }
      }
    | {
        type: "CHANGE_CARD"
        payload: {
          columnId: string
          targetIndex: number
          content: Partial<StoryCardProps>
        }
      }

  const reducer = (state: BoardProps, action: KanbanAction) => {
    switch (action.type) {
      case "MOVE_CARD": {
        const {sourceColumnId, targetColumnId, dragIndex, hoverIndex} =
          action.payload
        console.log("Moving card", action.payload)
        const stateCopy = structuredClone(state)
        // 找到源列和目标列
        const fromList = stateCopy.column.find(
          (list) => list.id === sourceColumnId
        )
        const toList = stateCopy.column.find(
          (list) => list.id === targetColumnId
        )

        // 边界检查
        if (
          !fromList ||
          !toList ||
          dragIndex === undefined ||
          hoverIndex === undefined ||
          dragIndex < 0 ||
          dragIndex >= fromList.cards.length ||
          hoverIndex < 0
        ) {
          console.warn("Invalid move operation", action.payload)
          return stateCopy
        }

        // 从源列移除卡片
        const [movedCard] = fromList.cards.splice(dragIndex, 1)

        let adjustedHoverIndex = hoverIndex
        // 是否在同一列内移动

        console.log(dragIndex, hoverIndex, adjustedHoverIndex)

        // 确保 adjustedHoverIndex 在目标列的有效范围内
        adjustedHoverIndex = Math.min(hoverIndex, toList.cards.length)

        // 将卡片插入目标列的 adjustedHoverIndex 位置
        toList.cards.splice(hoverIndex, 0, movedCard)

        return stateCopy
      }
      case "ADD_CARD": {
        const {columnId, content, targetIndex} = action.payload
        console.log("Adding card", action.payload)
        const stateCopy = structuredClone(state)

        const targetList = stateCopy.column.find((l) => l.id === columnId)

        if (!targetList || targetIndex === undefined || !content)
          return stateCopy

        targetList.cards.splice(targetIndex, 0, content)
        return stateCopy
      }
      case "REMOVE_CARD": {
        const {columnId, targetIndex} = action.payload
        console.log("Removing card", action.payload)
        const stateCopy = structuredClone(state)

        const sourceList = stateCopy.column.find((l) => l.id === columnId)

        if (!sourceList || targetIndex === undefined) return stateCopy

        sourceList.cards.splice(targetIndex, 1)
        return stateCopy
      }
      case "CHANGE_CARD": {
        const {columnId, targetIndex, content} = action.payload
        console.log("Changing card", action.payload)
        const stateCopy = structuredClone(state)

        const sourceList = stateCopy.column.find((l) => l.id === columnId)

        if (!sourceList || targetIndex === undefined) return stateCopy

        sourceList.cards[targetIndex] = {
          ...sourceList.cards[targetIndex],
          ...content,
        }
        return stateCopy
      }
      default:
        return state
    }
  }

  const [kanbanState, dispatch] = useReducer(reducer, initialArg)

  const handleAddCard = useCallback(
    (columnId: string, content: StoryCardProps) => {
      dispatch({
        type: "ADD_CARD",
        payload: {
          columnId,
          content,
          targetIndex: 0,
        },
      })
    },
    []
  )

  const handleMoveCard = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      sourceColumnId: string,
      targetColumnId: string
    ) => {
      dispatch({
        type: "MOVE_CARD",
        payload: {dragIndex, hoverIndex, sourceColumnId, targetColumnId},
      })
    },
    []
  )

  const handleRemoveCard = useCallback(
    (columnId: string, targetIndex: number) => {
      dispatch({type: "REMOVE_CARD", payload: {columnId, targetIndex}})
    },
    []
  )

  const handleUpdateCard = useCallback(
    (
      columnId: string,
      targetIndex: number,
      content: Partial<StoryCardProps>
    ) => {
      dispatch({
        type: "CHANGE_CARD",
        payload: {
          columnId,
          targetIndex,
          content,
        },
      })
    },
    []
  )

  const renderFrom = useCallback((submit: (data: StoryCardProps) => void) => {
    return <KanbanForm onSubmit={submit} />
  }, [])

  return (
    <KanbanBoard
      id={kanbanState.id}
      title={kanbanState.title}
      column={kanbanState.column}
      addCard={handleAddCard}
      moveCard={handleMoveCard}
      deleteCard={handleRemoveCard}
      upDateCard={handleUpdateCard}
      renderFrom={renderFrom}
    ></KanbanBoard>
  )
}

export default KanbanContainer
