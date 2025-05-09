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

import React from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import KanbanColumn from "./KanbanColumn"
import {Board, Card} from "./types"

const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #f4f5f7;
  border-radius: 8px;
`

const BoardTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 16px 0;
  padding: 0 16px;
`

interface KanbanBoardProps {
  board: Board
  onCardClick?: (card: Card) => void
  onCardMove?: (
    boardId: string,
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void
  onCardMoveBetweenBoards?: (
    cardId: string,
    sourceBoardId: string,
    targetBoardId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  board,
  onCardClick,
  onCardMove,
  onCardMoveBetweenBoards,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BoardTitle>{board.title}</BoardTitle>
      <BoardContainer>
        {board.columns.map((column) => (
          <KanbanColumn
            key={column.id}
            boardId={board.id}
            column={column}
            onCardClick={onCardClick}
            onCardMove={onCardMove}
            onCardMoveBetweenBoards={onCardMoveBetweenBoards}
          />
        ))}
      </BoardContainer>
    </DndProvider>
  )
}

export default KanbanBoard
