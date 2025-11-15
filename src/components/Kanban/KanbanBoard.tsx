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
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"

import {useSignedRecord} from "@/stores/useSignedRecord"
import {sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import {useCallback, useEffect, useMemo, useState} from "react"
import styled from "styled-components"
import {Drawer} from "../Drawer"
import StoryCard from "../StoryCard"
import {DndData} from "./KanbanCard"
import {Props as ColumnProps, KanbanColumn} from "./KanbanColumn"
import {KanbanForm} from "./KanbanForm"

export interface moveType {
  state: number
  index: number
  cid: string
}

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
  const {cardIndex: storeIndex, setIndex} = useSignedRecord()
  const initialColumns = useMemo(() => {
    if (storeIndex.length > 0) {
      return storeIndex
    }
    return column.map((col) => col.cards.map((c) => c.cid))
  }, [column, storeIndex])

  const [columnIndex, setColumnIndex] = useState<string[][]>(initialColumns)
  const [activeCard, setActiveCard] = useState<StoryCardWithCid | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState<RequirementStatusType>("todo")
  const [card, setCard] = useState<StoryCardWithCid | undefined>()
  const [mode, setMode] = useState<"create" | "edit">("create")
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setIndex(columnIndex)
  }, [columnIndex, setIndex])

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

  const handleDragStart = (event: DragStartEvent) => {
    const {active} = event
    setActiveCard(active.data.current?.content)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event
    if (!over) return

    const activeData = active.data.current as DndData
    const activeCid = activeData.content.cid

    // 确定目标位置
    let toColumnIdx: number
    let toIndex: number

    const overId = over.id.toString()
    if (overId.startsWith("KanbanColumn-")) {
      const state = overId.replace("KanbanColumn-", "") as RequirementStatusType
      toColumnIdx = column.findIndex((i) => i.id === state)
      toIndex = columnIndex[toColumnIdx].length
    } else {
      const overData = over.data.current as DndData
      toColumnIdx = column.findIndex((i) => i.id === overData.state)
      toIndex = columnIndex[toColumnIdx].findIndex(
        (i) => i === overData.content.cid
      )
    }

    const fromColumnIdx = column.findIndex((i) => i.id === activeData.state)
    const fromIndex = columnIndex[fromColumnIdx].findIndex(
      (i) => i === activeCid
    )

    // 更新 columnIndex
    setColumnIndex((prev) => {
      const newCols = prev.map((arr) => [...arr])

      // 移除
      newCols[fromColumnIdx].splice(fromIndex, 1)
      // 插入
      newCols[toColumnIdx].splice(toIndex, 0, activeCid)

      return newCols
    })

    // 持久化（跨列才需要）
    if (fromColumnIdx !== toColumnIdx) {
      updateCard?.(activeCid, column[toColumnIdx].id, activeData.content)
    }

    setActiveCard(null)
  }

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
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        {title && <Title>{title}</Title>}

        {isLoading && <Loading>正在加载...</Loading>}

        {!isLoading && (
          <Container>
            {column.map((col, index) => (
              <KanbanColumn
                key={col.id}
                items={columnIndex[index]}
                id={col.id}
                columnTitle={col.columnTitle}
                cards={col.cards}
                addCard={handleAddCard}
                clickCard={handleOpenCard}
              />
            ))}
          </Container>
        )}
        <DragOverlay style={{zIndex: 999}}>
          {activeCard ? <StoryCard {...activeCard} /> : null}
        </DragOverlay>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <KanbanForm
            mode={mode}
            initData={card}
            onCancel={() => setIsOpen(false)}
            deleteCard={deleteCard}
            callback={callback}
          />
        </Drawer>
      </DndContext>
    </>
  )
}

KanbanBoard.displayName = "KanbanBoard"

const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 0 16px;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  padding: 0 16px;
  margin-bottom: 16px;
  color: #2c3e50;
`

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 16px;
`
