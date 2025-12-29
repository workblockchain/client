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

import {RequirementStatusType} from "@/interfaces"
import {StoryCardWithCid} from "@/interfaces/kanban"
import {useSortable} from "@dnd-kit/sortable"
import {CSS} from "@dnd-kit/utilities"
import {memo} from "react"
import StoryCard from "../StoryCard"
export interface Props {
  onClick?: (content: StoryCardWithCid) => void
  content: StoryCardWithCid
  state: RequirementStatusType
}

export interface DndData {
  content: StoryCardWithCid
  state: RequirementStatusType
}

export const KanbanCard = memo<Props>(({onClick, content, state}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({
      id: content.cid,
      data: {
        content: content,
        state: state,
      } as DndData,
    })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <StoryCard
      style={style}
      isDragging={isDragging}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
      onClick={() => onClick?.(content)}
      {...content}
    />
  )
})
