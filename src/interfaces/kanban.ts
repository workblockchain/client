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

export interface Task {
  label: string
  state: "finished" | "unfinished"
}

export interface DragItem<T extends {id: string}> {
  id: string
  /** 被拖拽的卡片数据 */
  data: T
  /** 源列表ID */
  listId: string
  /** 卡片在源列表中的索引 */
  index: number
}

export interface DropResult<T extends {id: string}> {
  /** 被拖拽的卡片 */
  item: DragItem<T>
  /** 目标列表ID */
  toListId: string
  /** 卡片在目标列表的新索引 */
  toIndex: number
  /** 可选的放置目标卡片（用于插入到特定卡片前后） */
  targetCard?: T
}

export interface CardProps<T extends {id: string}> {
  id: string
  data: T
  index: number
  listId: string
  onMove?: (result: DropResult<T>) => void
}

export interface ListProps<T extends {id: string}> {
  id: string
  title: string
  cards: T[]
  onAdd?: (listId: string, data: T) => void
  onMove?: (props: DropResult<T>) => void
  onRemove?: (card: DropResult<T>) => void
  onChange?: (card: DropResult<T>) => void
}

export interface BoardProps<T extends {id: string}> {
  id: string
  title?: string
  list: ListProps<T>[]
  isLoading?: boolean
  onAdd?: (listId: string, data: T) => void
  onMove?: (props: DropResult<T>) => void
  onRemove?: (card: DropResult<T>) => void
  onChange?: (card: DropResult<T>) => void
}
