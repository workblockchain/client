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

import {Props as StoryCard} from "../components/StoryCard"
import {RequirementStatusType} from "./records"

export interface StoryCard2 extends StoryCard {
  cid: string
}
export interface CardProps extends DropItem {
  moveCard?: (cardId: string) => void
  clickCard?: (data: DropItem) => void
}

export interface DropItem {
  index: number
  content: StoryCard2
  state: RequirementStatusType
}

export interface ColumnProps {
  id: RequirementStatusType
  columnTitle: string
  cards: StoryCard2[]
  addCard?: (state: RequirementStatusType, cardData: StoryCard2) => void
  moveCard?: (cardId: string, state: RequirementStatusType) => void
  deleteCard?: (id: string) => void
  openDrawer?: (state: RequirementStatusType) => void
  clickCard?: (data: DropItem) => void
}

export interface BoardProps {
  id: string
  title?: string
  column: ColumnProps[]
  isLoading?: boolean
  addCard?: (state: RequirementStatusType, cardData: StoryCard2) => void
  moveCard?: (cardId: string, state: RequirementStatusType) => void
  deleteCard?: (id: string) => void
  upDateCard?: (
    cardId: string,
    state: RequirementStatusType,
    cardData: StoryCard2
  ) => void
}
