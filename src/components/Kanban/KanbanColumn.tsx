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

import {ColumnProps, DropItem} from "@/interfaces"
import {useRef} from "react"
import {useDrop} from "react-dnd"
import styled from "styled-components"
import {svgIcons} from "../Icons/svgIcons"
import {KanbanCard} from "./KanbanCard"
import {ItemTypes} from "./types"

// 主组件
export const KanbanColumn = ({
  id,
  cards,
  columnTitle,
  addCard,
  moveCard,
  openDrawer,
  renderCard,
}: ColumnProps) => {
  const ref = useRef<HTMLDivElement>(null)

  // 作为放置目标
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: (item: DropItem, monitor) => {
      // 如果是当前列表
      if (item.columnId === id) return

      // 如果被其他可拖拽的元素覆盖
      if (!monitor.isOver({shallow: true})) return

      moveCard
        ? moveCard!(item.index, cards.length, item.columnId, id)
        : console.log("moveCard is undefined")
    },
  })

  drop(ref)

  return (
    <Container ref={ref}>
      <Header>
        <Title>{columnTitle}</Title>
        <CardCount>{cards.length} 张卡片</CardCount>
      </Header>
      <CardList>
        {cards.map((card, index) => (
          <KanbanCard
            key={index}
            index={index}
            columnId={id}
            content={card}
            moveCard={(dragIndex, hoverIndex, sourceColumnId) =>
              moveCard
                ? moveCard(dragIndex, hoverIndex, sourceColumnId, id)
                : console.log("moveCard is undefined")
            }
            renderCard={renderCard}
          />
        ))}
      </CardList>
      {addCard ? (
        <AddCard
          onClick={() =>
            openDrawer ? openDrawer(id) : console.log("openDrawer is undefined")
          }
        >
          <svgIcons.Plus width={24} height={24} />
          添加卡片
        </AddCard>
      ) : null}
    </Container>
  )
}

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
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #6b778c;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
  }
`
