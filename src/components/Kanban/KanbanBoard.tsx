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

import {BaseCard, BaseList} from "@/interfaces"
import {useCallback, useState} from "react"
import {DndProvider} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import styled from "styled-components"
import {KanbanList} from "./KanbanList"

export interface Props {
  id: string
  title: string // 看板标题
  list: BaseList[]
}

export const KanbanBoard = ({title, list}: Props) => {
  const [boardData, setBoardData] = useState<BaseList[]>(list)

  // 处理卡片移动的逻辑
  const onDrop = useCallback(
    (dragID: string, dropId: string) => {
      setBoardData((prevBoards) => {
        // 1. 创建新数组避免直接修改状态
        const newBoards = [...prevBoards]

        // 2. 相同卡片不处理
        if (dragID === dropId) return newBoards

        // 3. 优化查找逻辑 - 使用对象缓存提高性能
        let dragCard: BaseCard | undefined
        let dragListIndex = -1
        let dropListIndex = -1
        let dropIndex = -1

        // 4. 单次遍历查找源卡片和目标位置
        for (let i = 0; i < newBoards.length; i++) {
          const list = newBoards[i]

          // 查找拖拽卡片
          const cardIndex = list.cards.findIndex((card) => card.id === dragID)
          if (cardIndex !== -1) {
            dragCard = list.cards[cardIndex]
            dragListIndex = i
          }

          // 查找放置位置
          const dropCardIndex = list.cards.findIndex(
            (card) => card.id === dropId
          )
          if (dropCardIndex !== -1) {
            dropListIndex = i
            dropIndex = dropCardIndex
          }

          // 如果都找到则提前退出循环
          if (dragCard && dropListIndex !== -1) break
        }

        // 5. 边界条件检查
        if (!dragCard || dragListIndex === -1 || dropListIndex === -1) {
          console.warn("Invalid drag/drop operation - card not found")
          return prevBoards
        }

        // 6. 执行卡片移动
        try {
          // 从源列表移除卡片
          newBoards[dragListIndex].cards = newBoards[
            dragListIndex
          ].cards.filter((card) => card.id !== dragID)

          // 添加到目标列表
          // 如果拖拽到同一列表，需要调整插入位置
          const insertIndex =
            dragListIndex === dropListIndex && dropIndex > -1
              ? dropIndex
              : dropIndex + 1

          newBoards[dropListIndex].cards.splice(insertIndex, 0, dragCard)

          return newBoards
        } catch (error) {
          console.error("Card move failed:", error)
          return prevBoards
        }
      })
    },
    [] // 移除 list 依赖，避免不必要的重渲染
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <Title>{title}</Title>
      <Container>
        {boardData.map((kanbanList) => (
          <KanbanList
            key={kanbanList.id}
            id={kanbanList.id}
            title={kanbanList.title}
            cards={kanbanList.cards}
            onDrop={onDrop}
          />
        ))}
      </Container>
    </DndProvider>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
`

const Title = styled.h2`
  font-size: 18px;
  padding: 0 16px;
`
