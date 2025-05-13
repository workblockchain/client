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

import {useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import styled from "styled-components"
import {ItemTypes} from "./types"

export interface BaseCard {
  id: string
  title: string // 卡片标题
  description?: string // 卡片内容描述
}

interface Props extends BaseCard {
  index: number // 卡片在列表中的索引
  listId: string // 卡片所属的列表 ID
  moveCard: (
    dragId: string,
    hoverId: string,
    sourceListId: string,
    targetListId: string
  ) => void
  children?: React.ReactNode
}

export const KanbanCard = ({
  id,
  title,
  index,
  listId,
  description,
  moveCard,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {id: id, index, listId},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item: {id: string; index: number; listId: string}, monitor) => {
      if (!ref.current) return
      if (item.id === id) return // 防止卡片与自身交互

      const dragIndex = item.index // 拖拽卡片的索引
      const hoverIndex = index // 当前卡片的索引

      if (dragIndex === hoverIndex) return // 不能是自己

      const sourceListId = item.listId // 拖拽卡片的来源列表
      const targetListId = listId // 目标卡片的列表

      // 如果卡片在同一列表内且索引相同，不处理
      if (sourceListId === targetListId && dragIndex === hoverIndex) return

      // 获取鼠标位置和卡片边界，判断拖拽方向
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // 仅当鼠标移动超过卡片高度的中间点时触发排序
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      // 调用父组件的 moveCard 函数，更新卡片顺序
      moveCard(item.id, id, sourceListId, targetListId)

      // 更新拖拽卡片的索引，防止重复触发
      item.index = hoverIndex
      item.listId = targetListId
    },
    drop: (item: {id: string; index: number; listId: string}, _monitor) => {
      // 确认放置，调用 moveCard
      moveCard(item.id, id, item.listId, listId)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  drag(drop(ref))

  return (
    <Container ref={ref} $isDragging={isDragging}>
      <CardTitle>{title}</CardTitle>
      {description || props.children}
      <MoveButton></MoveButton>
    </Container>
  )
}

const Container = styled.div<{$isDragging: boolean}>`
  background-color: white;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: ${({$isDragging}) => ($isDragging ? "move" : "grab")};
  opacity: ${({$isDragging}) => ($isDragging ? 0.4 : 1)};
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

const CardTitle = styled.h4`
  margin: 0 0 8px 0;
  font-size: 14px;
`

const MoveButton = styled.div`
  height: 15px;
  width: 15px;
  background-color: red;
  opacity: 0.3;
  position: absolute;
  right: 10px;
  bottom: 10px;
`
