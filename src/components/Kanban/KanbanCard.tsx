import React, {useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import styled from "styled-components"
import {Button} from "../Button/Button"
import {Card} from "./types"

const CardContainer = styled.div<{$isDragging: boolean}>`
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: move;
  opacity: ${({$isDragging}) => ($isDragging ? 0.5 : 1)};
  transition: opacity 0.2s ease;
`

const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
`

interface KanbanCardProps {
  boardId: string
  columnId: string
  card: Card
  index: number
  onCardClick?: (card: Card) => void
  onCardMove?: (
    boardId: string,
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  boardId,
  columnId,
  card,
  index,
  onCardClick,
  onCardMove,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{isDragging}, drag] = useDrag({
    type: "CARD",
    item: {id: card.id, boardId, columnId, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (item: {
      id: string
      boardId: string
      columnId: string
      index: number
    }) => {
      if (item.id === card.id) return

      if (item.boardId === boardId && item.columnId === columnId) {
        onCardMove?.(boardId, item.id, item.columnId, columnId, index)
        item.index = index
      }
    },
  })

  drag(drop(ref))

  return (
    <CardContainer ref={ref} $isDragging={isDragging}>
      <CardTitle>{card.title}</CardTitle>
      <Button
        $variant="text"
        $primaryColor="#2563eb"
        onClick={() => onCardClick?.(card)}
      >
        {card.description || "空"}
      </Button>
    </CardContainer>
  )
}

export default KanbanCard
