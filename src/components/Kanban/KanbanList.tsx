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
  onDrop: (dragId: string, dropId: string) => void
}

export const KanbanList = ({id, cards, title, onDrop}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  // 实现列表作为放置目标
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item: {id: string}) => {
      if (!ref.current) return
      if (
        cards.some((card) => {
          return card.id === item.id
        })
      )
        return
      onDrop(item.id, cards[cards.length - 1].id)
    },
  })

  drop(ref)

  return (
    <Container ref={ref}>
      <Title>{title}</Title>
      <CardList>
        {cards.map((card) => (
          <KanbanCard key={card.id} {...card} onDrop={onDrop} />
        ))}
      </CardList>
    </Container>
  )
}

const Container = styled.div`
  background-color: #f6f8f9;
  border-radius: 4px;
  width: 356px;
  padding: 12px 8px;
  transition: opacity 0.2s ease;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Title = styled.h3`
  font-size: 24px;
  color: #767676;
  margin: 0 0 8px 0;
  padding: 8px;
`
