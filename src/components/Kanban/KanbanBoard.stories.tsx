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

import {Meta, StoryObj} from "@storybook/react"
import {useState} from "react"
import KanbanBoard from "./KanbanBoard"
import {Board, Card} from "./types"

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof KanbanBoard>

const initialBoards: Board[] = [
  {
    id: "board1",
    title: "Board 1",
    columns: [
      {
        id: "col1",
        title: "To Do",
        cards: [
          {id: "card1", title: "Task 1", description: "222"},
          {id: "card2", title: "Task 2"},
        ],
      },
      {
        id: "col2",
        title: "In Progress",
        cards: [{id: "card3", title: "Task 3"}],
      },
    ],
  },
  {
    id: "board2",
    title: "Board 2",
    columns: [
      {
        id: "col3",
        title: "Backlog",
        cards: [{id: "card4", title: "Task 4"}],
      },
    ],
  },
]

const KanbanBoardWithState = () => {
  const [boards, setBoards] = useState(initialBoards)

  const handleCardClick = (card: Card) => {
    alert(`Clicked card: ${card.title}`)
  }

  const handleCardMove = (
    boardId: string,
    cardId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => {
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards]
      const board = newBoards.find((b) => b.id === boardId)
      if (!board) return prevBoards

      const sourceColumn = board.columns.find((c) => c.id === sourceColumnId)
      const targetColumn = board.columns.find((c) => c.id === targetColumnId)
      if (!sourceColumn || !targetColumn) return prevBoards

      const card = sourceColumn.cards.find((c) => c.id === cardId)
      if (!card) return prevBoards

      sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== cardId)
      targetColumn.cards.splice(targetIndex, 0, card)

      return newBoards
    })
  }

  const handleCardMoveBetweenBoards = (
    cardId: string,
    sourceBoardId: string,
    targetBoardId: string,
    targetColumnId: string,
    targetIndex: number
  ) => {
    setBoards((prevBoards) => {
      const newBoards = [...prevBoards]
      const sourceBoard = newBoards.find((b) => b.id === sourceBoardId)
      const targetBoard = newBoards.find((b) => b.id === targetBoardId)
      if (!sourceBoard || !targetBoard) return prevBoards

      let card: Card | undefined
      let sourceColumnId: string | undefined

      for (const column of sourceBoard.columns) {
        card = column.cards.find((c) => c.id === cardId)
        if (card) {
          sourceColumnId = column.id
          column.cards = column.cards.filter((c) => c.id !== cardId)
          break
        }
      }

      if (!card || !sourceColumnId) return prevBoards

      const targetColumn = targetBoard.columns.find(
        (c) => c.id === targetColumnId
      )
      if (!targetColumn) return prevBoards

      targetColumn.cards.splice(targetIndex, 0, card)
      return newBoards
    })
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "24px"}}>
      {boards.map((board) => (
        <KanbanBoard
          key={board.id}
          board={board}
          onCardClick={handleCardClick}
          onCardMove={handleCardMove}
          onCardMoveBetweenBoards={handleCardMoveBetweenBoards}
        />
      ))}
    </div>
  )
}

export const Default: Story = {
  render: () => <KanbanBoardWithState />,
}
