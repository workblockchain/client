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

import {
  DropItem,
  BoardProps as Props,
  RequirementStatusType,
  StoryCardWithCid,
} from "@/interfaces"
import {useCallback, useState} from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import {Drawer} from "../Drawer"
import {KanbanColumn} from "./KanbanColumn"
import {KanbanForm} from "./KanbanForm"

export const KanbanBoard = ({
  title,
  column,
  isLoading,
  addCard,
  moveCard,
  deleteCard,
  updateCard,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<RequirementStatusType>("todo")
  const [cardData, setCardData] = useState<DropItem>()
  const [mode, setMode] = useState<"create" | "edit">("create")

  const callback = useCallback(
    (type: "create" | "edit", data: StoryCardWithCid) => {
      if (type === "create") {
        addCard ? addCard(state, data) : null
      } else {
        if (!cardData) {
          console.log("cardData is null", cardData)
          return
        }
        updateCard ? updateCard(data.cid, cardData.state, data) : null
      }
      setIsOpen(false)
      setCardData(undefined)
    },
    [state, cardData, addCard, updateCard]
  )

  return (
    <DndProvider backend={HTML5Backend}>
      {title ? <Title>{title}</Title> : null}
      {isLoading ? (
        "正在加载"
      ) : (
        <>
          <Container>
            {column.map(({id, columnTitle, cards}, index) => (
              <KanbanColumn
                key={index}
                id={id}
                columnTitle={columnTitle}
                cards={cards}
                addCard={addCard}
                moveCard={moveCard}
                deleteCard={deleteCard}
                openDrawer={(state) => {
                  setState(state)
                  setMode("create")
                  setIsOpen(!isOpen)
                }}
                clickCard={(data) => {
                  setCardData(data)
                  setMode("edit")
                  setIsOpen(!isOpen)
                }}
              />
            ))}
          </Container>
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
            <KanbanForm
              mode={mode}
              onCancel={() => {
                setIsOpen(!isOpen)
              }}
              initData={cardData?.content}
              callback={callback}
              deleteCard={() =>
                deleteCard
                  ? deleteCard(cardData?.content.cid!)
                  : console.log("deleteCard is null")
              }
            />
          </Drawer>
        </>
      )}
    </DndProvider>
  )
}

KanbanBoard.displayName = "KanbanBoard"

const Container = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  transition: opacity 0.2s ease;
`

const Title = styled.h2`
  font-size: 18px;
  padding: 0 16px;
  margin-bottom: 16px;
`
