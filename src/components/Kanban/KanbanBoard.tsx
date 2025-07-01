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
import {useState} from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import {Drawer} from "../Drawer"
import {KanbanColumn} from "./KanbanColumn"

export const KanbanBoard = ({
  title,
  column,
  isLoading,
  addCard,
  moveCard,
  deleteCard,
  upDateCard,
  renderCard,
  renderFrom,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColumnId, setSelectedColumnId] = useState<string>("")
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
                upDateCard={upDateCard}
                renderCard={renderCard}
                openDrawer={(id) => {
                  setIsOpen(!isOpen)
                  setSelectedColumnId(id)
                }}
              />
            ))}
          </Container>
          <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(!isOpen)}
            children={
              renderFrom && addCard
                ? renderFrom((data: any) => addCard(selectedColumnId, data))
                : null
            }
          ></Drawer>
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
