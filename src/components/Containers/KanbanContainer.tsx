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
import {BoardProps, DropResult} from "@/interfaces/kanban"
import {useReducer} from "react"
import {KanbanBoard} from "../Kanban/KanbanBoard"

export function KanbanContainer() {
  let initialArg: BoardProps<StoryCardProps> = {
    id: "kanbanBoard",
    list: [
      {
        id: "card 1",
        title: "To do",
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
          {id: "eat11", title: "吃", children: "3"},
          {id: "eat1111", title: "吃", children: "4"},
          {id: "eat11111", title: "吃", children: "5"},
        ],
      },
      {
        id: "card 2",
        title: "进行中",
        cards: [{id: "card4643", title: "Task 3"}],
      },
      {
        id: "card 3",
        title: "完成",
        cards: [{id: "car45645664d3", title: "Task 3"}],
      },
    ],
  }

  const reducer = (
    state: BoardProps<StoryCardProps>,
    action: {
      type: string
      payload: DropResult<StoryCardProps>
    }
  ) => {
    const {item, toListId, toIndex} = action.payload
    switch (action.type) {
      case "MOVE_CARD": {
        console.log("Moving card", action.payload)
        const stateCopy = structuredClone(state)

        let fromList = stateCopy.list.find((list) => list.id === item.listId)

        let toList = fromList
        if (item.listId !== toListId) {
          // 不同列表
          toList = stateCopy.list.find((list) => list.id === toListId)
        }

        if (fromList && toList) {
          // 移除
          fromList.cards = fromList.cards.filter(
            (card) => card.id !== item.data.id
          )
          // 添加
          toList.cards.splice(toIndex, 0, item.data)
        }

        return stateCopy
      }
      case "ADD_CARD": {
        console.log("Adding card", action.payload)
        const stateCopy = structuredClone(state)
        const {item, toListId, toIndex} = action.payload
        const targetList = stateCopy.list.find((l) => l.id === toListId)

        if (!targetList) return stateCopy

        targetList.cards.splice(toIndex, 0, item.data)
        return stateCopy
      }
      case "REMOVE_CARD": {
        console.log("Removing card", action.payload)
        const stateCopy = structuredClone(state)
        const {item} = action.payload
        const sourceList = stateCopy.list.find((l) => l.id === item.listId)

        if (!sourceList) return stateCopy

        sourceList.cards.splice(item.index, 1)
        return stateCopy
      }
      case "CHANGE_CARD": {
        console.log("Changing card", action.payload)
        const stateCopy = structuredClone(state)
        const {item} = action.payload
        const sourceList = stateCopy.list.find((l) => l.id === item.listId)

        if (!sourceList || !sourceList.cards[item.index]) return stateCopy

        sourceList.cards[item.index] = {
          ...sourceList.cards[item.index],
          ...item.data,
        }
        return stateCopy
      }
      default:
        return state
    }
  }

  const [kanbanState, dispatch] = useReducer(reducer, initialArg)

  const handleAddCard = (listId: string, data: StoryCardProps) => {
    dispatch({
      type: "ADD_CARD",
      payload: {
        item: {
          data: data,
          listId,
          index: 0,
          id: "",
        },
        toListId: listId,
        toIndex: 0,
      },
    })
  }

  const handleMoveCard = (props: DropResult<StoryCardProps>) => {
    dispatch({type: "MOVE_CARD", payload: props})
  }

  const handleRemoveCard = (props: DropResult<StoryCardProps>) => {
    dispatch({type: "REMOVE_CARD", payload: props})
  }

  const handleChangeCard = (props: DropResult<StoryCardProps>) => {
    dispatch({type: "CHANGE_CARD", payload: props})
  }

  return (
    <KanbanBoard<StoryCardProps>
      id={kanbanState.id}
      title={kanbanState.title}
      list={kanbanState.list}
      onAdd={handleAddCard}
      onMove={handleMoveCard}
      onRemove={handleRemoveCard}
      onChange={handleChangeCard}
    ></KanbanBoard>
  )
}

export default KanbanContainer
