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

import {DropItem, StoryCardWithCid} from "@/interfaces/kanban"
import {useDraggable} from "@dnd-kit/core"
import {CSS} from "@dnd-kit/utilities"
import {forwardRef, memo} from "react"
import StoryCard from "../StoryCard"
export interface Props extends DropItem {
  onClick?: (content: StoryCardWithCid) => void
}

export const KanbanCard = memo(
  forwardRef<HTMLDivElement, Props>(({onClick, content}) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: "StoryCard-" + content.cid,
    })

    const style = {
      transform: CSS.Translate.toString(transform),
    }
    return (
      <StoryCard
        style={style}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        onClick={() => onClick?.(content)}
        {...content}
      />
    )
  })
)
