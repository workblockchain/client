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
import {useRef} from "react"
import {useDrop} from "react-dnd"
import styled from "styled-components"
import {KanbanCard} from "./KanbanCard"
import {ItemTypes} from "./types"

interface Props extends BaseList {
  onCardMove?: (
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void
}

export const KanbanList = ({id, cards, title, onCardMove}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  // 实现列表作为放置目标
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (dropItem: {id: string; listId: string}, monitor) => {
      if (!monitor.didDrop()) {
        // 如果没有在卡片上放下，则将卡片添加到列表末尾
        onCardMove?.(dropItem.id, dropItem.listId, id, cards.length)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({shallow: true}),
    }),
  })

  // 卡片移动逻辑，供 KanbanCard 使用
  const moveCard = (
    dragId: string,
    hoverId: string,
    sourceListId: string,
    targetListId: string
  ) => {
    const targetIndex = cards.findIndex((card) => card.id === hoverId)
    onCardMove?.(
      dragId,
      sourceListId,
      targetListId,
      targetIndex === -1 ? cards.length : targetIndex
    )
  }
  drop(ref)

  return (
    <Container ref={ref}>
      <Title>{title}</Title>
      <CardList>
        {cards.map((card, index) => (
          <KanbanCard
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            index={index}
            listId={id}
            moveCard={moveCard}
          />
        ))}
      </CardList>
    </Container>
  )
}

const Container = styled.div`
  background-color: #ebecf0;
  border-radius: 4px;
  width: 300px;
  padding: 8px;
  transition: opacity 0.2s ease;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.h3`
  font-size: 14px;
  margin: 0 0 8px 0;
  padding: 8px;
`
