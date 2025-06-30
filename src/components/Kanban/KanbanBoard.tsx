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

import {BoardProps as Props} from "@/interfaces"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import {KanbanList} from "./KanbanList"

export const KanbanBoard = <T extends {id: string}>({
  title,
  list,
  isLoading,
  onAdd,
  onMove,
  onRemove,
  onChange,
}: Props<T>) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Title>{title}</Title>
      <Container $isLoading={isLoading}>
        {list.map((item, index) => (
          <KanbanList<T>
            key={index}
            id={item.id}
            title={item.title}
            cards={item.cards}
            onAdd={onAdd}
            onMove={onMove}
            onRemove={onRemove}
            onChange={onChange}
          />
        ))}
      </Container>
    </DndProvider>
  )
}

KanbanBoard.displayName = "KanbanBoard"

// 样式组件
const Container = styled.div<{$isLoading?: boolean}>`
  display: flex;
  gap: 10px;
  position: relative;
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};
  pointer-events: ${(props) => (props.$isLoading ? "none" : "auto")};
  transition: opacity 0.2s ease;
`

const Title = styled.h2`
  font-size: 18px;
  padding: 0 16px;
  margin-bottom: 16px;
`
