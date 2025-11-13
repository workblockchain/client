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

import {RequirementStatusType, StoryCardWithCid} from "@/interfaces"
import {useDroppable} from "@dnd-kit/core"
import {memo} from "react"
import styled from "styled-components"
import {svgIcons} from "../Icons/svgIcons"
import {KanbanCard} from "./KanbanCard"

export interface Props {
  id: RequirementStatusType
  columnTitle: string
  cards: StoryCardWithCid[]
  addCard?: (state: RequirementStatusType) => void
  clickCard?: (type: RequirementStatusType, content: StoryCardWithCid) => void
}

// 主组件
export const KanbanColumn = memo(
  ({id, cards, columnTitle, addCard, clickCard}: Props) => {
    const {isOver, setNodeRef} = useDroppable({
      id: "KanbanColumn-" + id,
    })

    return (
      <Container ref={setNodeRef}>
        <Header>
          <Title>{columnTitle}</Title>
          <CardCount>{cards.length} 张卡片</CardCount>
        </Header>
        <CardList>
          {cards.map((card, index) => (
            <KanbanCard
              key={index}
              content={card}
              state={id}
              onClick={(content) => clickCard?.(id, content)}
            />
          ))}
        </CardList>
        {addCard && (
          <AddCard onClick={() => addCard(id)}>
            <svgIcons.Plus width={20} height={20} />
            <span>添加卡片</span>
          </AddCard>
        )}
      </Container>
    )
  }
)

const Container = styled.div`
  background-color: #f6f8f9;
  border-radius: 8px;
  width: 356px;
  padding: 8px;
  transition: all 0.2s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`

const Title = styled.h3`
  font-size: 18px;
  color: #2c3e50;
  margin: 0 0 4px 0;
  padding: 8px;
  font-weight: 600;
`

const CardCount = styled.div`
  font-size: 12px;
  color: #6c757d;
  padding: 0 8px 8px;
  margin-bottom: 8px;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  flex: 1;
  min-height: 0;
`

const AddCard = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #6b778c;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`
