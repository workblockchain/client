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

import {BaseCard} from "@/interfaces"
import {useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import StoryCard from "../StoryCard"
import {ItemTypes} from "./types"

export interface Props extends BaseCard {
  onDrop: (dragId: string, dropId: string) => void
  children?: React.ReactNode
}

export const KanbanCard = ({
  id,
  tags,
  subTasks,
  description,
  onDrop,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: {id},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          onDrop(item.id, id)
        }
      },
    }),
    [id, onDrop]
  )

  const [_, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover: (item: {id: string}) => {
        if (!ref.current) return
        onDrop(item.id, id)
      },
    }),
    [onDrop, id]
  )

  drag(drop(ref))

  return (
    <StoryCard
      draggable
      isDragging={isDragging}
      tags={tags}
      subTasks={subTasks}
      ref={ref}
    >
      {description}
      {props.children}
    </StoryCard>
  )
}
