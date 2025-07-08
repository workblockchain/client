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

import {ColumnProps} from "@/interfaces"
import {
  RequirementData,
  requirementStatusList,
  RequirementStatusType,
} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {t} from "i18next"
import {KanbanBoard} from "../Kanban/KanbanBoard"
import {Props as StoryCard} from "../StoryCard"

interface CardProps extends StoryCard {
  cid: string
}

export function KanbanContainer() {
  const requirementRecords = useSignedRecord(
    (state) => state.requirementRecords
  )
  const updateRequirementRecord = useSignedRecord(
    (state) => state.updateRequirementRecord
  )
  const addRequirementRecord = useSignedRecord(
    (state) => state.addRequirementRecord
  )
  const deleteRequirementRecord = useSignedRecord(
    (state) => state.deleteRequirementRecord
  )
  const save = useSignedRecord((state) => state.save)

  // 处理添加卡片
  const handleAddCard = (state: RequirementStatusType, cardData: StoryCard) => {
    const newReq = convertToRequirementData(state, cardData)
    addRequirementRecord(newReq)
    save()
  }

  // 处理更新卡片
  const handleUpdateCard = (
    cardId: string,
    state: RequirementStatusType,
    cardData: StoryCard
  ) => {
    updateRequirementRecord(cardId, convertToRequirementData(state, cardData))
    save()
  }

  const handleDelete = (id: string) => {
    deleteRequirementRecord(id)
    save()
  }

  const handleMoveCard = (cardId: string, state: RequirementStatusType) => {
    updateRequirementRecord(cardId, {status: state})
    save()
  }

  // 构建看板列数据
  const kanbanColumns: ColumnProps[] = requirementStatusList.map((status) => ({
    id: status,
    title: status,
    columnTitle: t(status),
    cards: requirementRecords
      .filter((req) => req.status === status)
      .map((req) => convertToCardProps(req)),
  }))

  return (
    <KanbanBoard
      id="kanban-container"
      title="需求看板"
      column={kanbanColumns}
      addCard={handleAddCard}
      deleteCard={handleDelete}
      moveCard={handleMoveCard}
      updateCard={handleUpdateCard}
    />
  )
}

const convertToCardProps = (req: RequirementData): CardProps => ({
  children: req.description || "",
  tags: req.tags,
  cid: req.rid,
})

const convertToRequirementData = (
  status: RequirementStatusType,
  card: StoryCard
): RequirementData => ({
  rid: card.cid || useSignedRecord.getState().drawRequirementId(),
  priority: "medium",
  status: status,
  assignedTo: "",
  estimated: 0,
  tags: card.tags || [],
  requirementType: "requirement",
  description: card.children?.toString() || "",
  projectIds: [],
  workRecordIds: [],
  relationship: {},
})

export default KanbanContainer
