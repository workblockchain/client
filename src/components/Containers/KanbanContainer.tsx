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
import {useMemo, useState} from "react"
import {FilterBar, FilterConfig} from "../Filter"
import {KanbanBoard} from "../Kanban/KanbanBoard"
import {Props as StoryCard} from "../StoryCard"
import {Container} from "./common/styles"

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

  // 筛选状态
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    tags: [] as string[],
  })

  // 应用筛选
  const filteredRequirements = useMemo(() => {
    return requirementRecords.filter((req) => {
      if (filters.status && req.status !== filters.status) return false
      if (filters.priority && req.priority !== filters.priority) return false
      if (filters.assignedTo && req.assignedTo !== filters.assignedTo)
        return false
      if (filters.tags.length > 0 && req.tags) {
        const hasMatchingTag = filters.tags.some((tag) =>
          req.tags.includes(tag)
        )
        if (!hasMatchingTag) return false
      }
      return true
    })
  }, [requirementRecords, filters])

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
    cards: filteredRequirements
      .filter((req) => req.status === status)
      .map((req) => convertToCardProps(req)),
  }))

  // 筛选器配置
  const filterConfig: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      label: "状态",
      options: [
        {value: "", label: "全部"},
        {value: "todo", label: "待办"},
        {value: "doing", label: "进行中"},
        {value: "done", label: "已完成"},
      ],
    },
    {
      type: "select",
      key: "priority",
      label: "优先级",
      options: [
        {value: "", label: "全部"},
        {value: "high", label: "高"},
        {value: "medium", label: "中"},
        {value: "low", label: "低"},
      ],
    },
    {
      type: "text",
      key: "assignedTo",
      label: "负责人",
      placeholder: "负责人ID",
    },
    {
      type: "tags",
      key: "tags",
      label: "标签",
      placeholder: "输入标签，用逗号分隔",
    },
  ]

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  return (
    <Container>
      {/* 筛选器组件 */}
      <FilterBar
        filters={filterConfig}
        values={filters}
        onChange={handleFilterChange}
      />

      <KanbanBoard
        id="kanban-container"
        title="需求看板"
        column={kanbanColumns}
        addCard={handleAddCard}
        deleteCard={handleDelete}
        moveCard={handleMoveCard}
        updateCard={handleUpdateCard}
      />
    </Container>
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
