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

import {CardProps, DragItem} from "@/interfaces/kanban"
import {ReactNode, useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import StoryCard from "../StoryCard"
import {ItemTypes} from "./types"

export const KanbanCard = <T extends {id: string; children?: ReactNode}>({
  data,
  index,
  listId,
  onMove,
}: CardProps<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  // 拖拽源配置
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {data, index, listId},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // 放置目标配置
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: (item: DragItem<T>) => {
      if (!ref.current || item.data.id === data.id) return
      onMove!({
        item,
        toListId: listId,
        toIndex: index,
        targetCard: data,
      })
    },
  })

  drag(drop(ref))

  return (
    <StoryCard draggable isDragging={isDragging} ref={ref} {...data}>
      {data.children}
    </StoryCard>
  )
}
