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

import {BaseList} from "@/interfaces"
import {useCallback, useState} from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import {KanbanList} from "./KanbanList"

export interface Props {
  id: string
  title: string // 看板标题
  list: BaseList[]
}

export const KanbanBoard = ({title, list}: Props) => {
  const [boardData, setBoardData] = useState<BaseList[]>(list)

  // 处理卡片移动的逻辑
  const handleCardMove = useCallback(
    (
      dragID: string,
      sourceListId: string,
      targetListId: string,
      targetIndex: number
    ) => {
      setBoardData((prevBoards) => {
        const newBoards = [...prevBoards]

        const sourceList = list.find((c) => c.id === sourceListId)
        const targetList = list.find((c) => c.id === targetListId)

        if (!sourceList || !targetList) return prevBoards

        const card = sourceList.cards.find((c) => c.id === dragID)
        if (!card) return prevBoards

        sourceList.cards = sourceList.cards.filter((c) => c.id !== dragID)
        targetList.cards.splice(targetIndex, 0, card)

        return newBoards
      })
    },
    [list]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Title>{title}</Title>
      <Container>
        {boardData.map((kanbanList) => (
          <KanbanList
            key={kanbanList.id}
            id={kanbanList.id}
            title={kanbanList.title}
            cards={kanbanList.cards}
            onCardMove={handleCardMove}
          />
        ))}
      </Container>
    </DndProvider>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const Title = styled.h2`
  font-size: 18px;
  padding: 0 16px;
`
