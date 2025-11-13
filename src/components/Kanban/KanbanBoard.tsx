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
  ColumnProps,
  RequirementStatusType,
  StoryCardWithCid,
} from "@/interfaces"
import {DndContext, DragEndEvent} from "@dnd-kit/core"
import {useCallback, useState} from "react"
import styled from "styled-components"
import {Drawer} from "../Drawer"
import {KanbanColumn} from "./KanbanColumn"
import {KanbanForm} from "./KanbanForm"

export interface Props {
  id: string
  title?: string
  column: ColumnProps[]
  isLoading?: boolean
  addCard?: (state: RequirementStatusType, cardData: StoryCardWithCid) => void
  deleteCard?: (id: string) => void
  updateCard?: (
    cardId: string,
    state: RequirementStatusType,
    cardData: StoryCardWithCid
  ) => void
}

export const KanbanBoard = ({
  title,
  column,
  isLoading,
  addCard,
  deleteCard,
  updateCard,
}: Props) => {
  // 点击卡片弹出的模态框
  const [isOpen, setIsOpen] = useState(false)
  // 操作的看板类型
  const [state, setState] = useState<RequirementStatusType>("todo")
  // 操作的卡片数据
  const [card, setCard] = useState<StoryCardWithCid>()
  // 模态框编辑状态
  const [mode, setMode] = useState<"create" | "edit">("create")

  const callback = useCallback(
    (type: "create" | "edit", data: StoryCardWithCid) => {
      if (type === "create") {
        addCard?.(state, data)
      } else {
        if (!card) {
          console.log("cardData is null", card)
          return
        }
        updateCard?.(data.cid, state, data)
      }
      setIsOpen(false)
      setCard(undefined)
    },
    [state, card, addCard, updateCard]
  )

  function handleDragEnd(event: DragEndEvent) {}

  function handleAddCard(type: RequirementStatusType) {
    setState(type)
    setMode("create")
    setIsOpen(true)
  }

  function handleOpenCard(
    type: RequirementStatusType,
    content: StoryCardWithCid
  ) {
    setState(type)
    setMode("edit")
    setCard(content)
    setIsOpen(true)
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        {title ? <Title>{title}</Title> : null}

        {isLoading ? "正在加载" : null}

        {!isLoading ? (
          <>
            <Container>
              {column.map(({id, columnTitle, cards}) => (
                <KanbanColumn
                  key={id}
                  id={id}
                  columnTitle={columnTitle}
                  cards={cards}
                  addCard={(type) => handleAddCard(type)}
                  clickCard={(type, content) => handleOpenCard(type, content)}
                />
              ))}
            </Container>
            <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <KanbanForm
                mode={mode}
                onCancel={() => setIsOpen(false)}
                initData={card}
                deleteCard={(card) => deleteCard?.(card)}
                callback={callback}
              />
            </Drawer>
          </>
        ) : null}
      </DndContext>
    </>
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
