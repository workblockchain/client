import React, {forwardRef} from "react"
import {useDrop} from "react-dnd"
import styled from "styled-components"
import KanbanCard from "./KanbanCard"
import {Card, Column} from "./types"

const ColumnContainer = styled.div<{$isOver: boolean}>`
  background-color: #ebecf0;
  border-radius: 4px;
  width: 300px;
  padding: 8px;
  opacity: ${({$isOver}) => ($isOver ? 0.8 : 1)};
  transition: opacity 0.2s ease;
`

const ColumnTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 8px 0;
  padding: 8px;
`

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100px;
`

interface KanbanColumnProps {
  boardId: string
  column: Column
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

const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(
  (
    {boardId, column, onCardClick, onCardMove, onCardMoveBetweenBoards},
    ref
  ) => {
    const [{isOver}, drop] = useDrop({
      accept: "CARD",
      drop: (
        item: {id: string; boardId: string; columnId: string},
        _monitor
      ) => {
        if (item.boardId !== boardId) {
          onCardMoveBetweenBoards?.(
            item.id,
            item.boardId,
            boardId,
            column.id,
            column.cards.length
          )
        } else if (item.columnId !== column.id) {
          onCardMove?.(
            boardId,
            item.id,
            item.columnId,
            column.id,
            column.cards.length
          )
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    })

    const combinedRef = (node: HTMLDivElement | null) => {
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }
      drop(node)
    }

    return (
      <ColumnContainer ref={combinedRef} $isOver={isOver}>
        <ColumnTitle>{column.title}</ColumnTitle>
        <CardsContainer>
          {column.cards.map((card, index) => (
            <KanbanCard
              key={card.id}
              boardId={boardId}
              columnId={column.id}
              card={card}
              index={index}
              onCardClick={onCardClick}
              onCardMove={onCardMove}
            />
          ))}
        </CardsContainer>
      </ColumnContainer>
    )
  }
)

KanbanColumn.displayName = "KanbanColumn"

export default KanbanColumn
