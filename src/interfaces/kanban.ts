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

import {ReactNode, Ref} from "react"

export interface CardProps extends DropItem {
  moveCard?: (
    dragIndex: number,
    hoverIndex: number,
    sourceColumnId: string
  ) => void
  renderCard?: (
    ref: Ref<HTMLDivElement>,
    props: Record<string, any>
  ) => ReactNode
}

export interface DropItem {
  index: number
  content: Record<string, any>
  columnId: string
}

export interface ColumnProps {
  id: string
  columnTitle: string
  cards: Record<string, any>[]
  addCard?: (columnId: string, content: any) => void
  moveCard?: (
    dragIndex: number,
    hoverIndex: number,
    sourceColumnId: string,
    targetColumnId: string
  ) => void
  deleteCard?: (columnId: string, targetIndex: number) => void
  upDateCard?: (columnId: string, targetIndex: number, content: any) => void
  renderCard?: (
    ref: Ref<HTMLDivElement>,
    props: Record<string, any>
  ) => ReactNode
  openDrawer?: (id: string) => void
}

export interface BoardProps {
  id: string
  title?: string
  column: ColumnProps[]
  isLoading?: boolean
  addCard?: (columnId: string, content: any) => void
  moveCard?: (
    dragIndex: number,
    hoverIndex: number,
    sourceColumnId: string,
    targetColumnId: string
  ) => void
  deleteCard?: (columnId: string, targetIndex: number) => void
  upDateCard?: (columnId: string, targetIndex: number, content: any) => void
  renderCard?: (
    ref: Ref<HTMLDivElement>,
    props: Record<string, any>
  ) => ReactNode
  renderFrom?: (callBack: (data: any) => void) => ReactNode
}
