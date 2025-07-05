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

import {CardProps, DropItem} from "@/interfaces/kanban"
import {memo, useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import StoryCard from "../StoryCard"
import {ItemTypes} from "./types"

export const KanbanCard = memo((props: CardProps) => {
  const ref = useRef<HTMLDivElement>(null)
  // 拖拽源配置
  const [{isDragging}, drag] = useDrag({
    type: ItemTypes.CARD,
    item: props as DropItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // 放置目标配置
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: (item: DropItem) => {
      if (
        !ref.current ||
        (item.index === props.index && item.state === props.state)
      )
        return
      props.moveCard
        ? props.moveCard(item.content.cid)
        : console.log("moveCard is not defined")
    },
  })

  drag(drop(ref))

  return (
    <>
      <StoryCard
        draggable
        isDragging={isDragging}
        ref={ref}
        onClick={() =>
          props.clickCard
            ? props.clickCard(props)
            : console.log("openCard is not defined")
        }
        {...props.content}
      >
        {props.content.children}
      </StoryCard>
    </>
  )
})
