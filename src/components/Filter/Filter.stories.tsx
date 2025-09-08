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

import {Meta, StoryObj} from "@storybook/react"
import {Filter} from "./Filter"
import {FilterDefinition} from "./types"

const meta: Meta<typeof Filter> = {
  title: "Components/Filter",
  component: Filter,
}

export default meta

type Story = StoryObj<typeof Filter>

const sampleFilters: FilterDefinition[] = [
  {
    key: "name",
    label: "名称",
    type: "text",
    placeholder: "输入名称筛选",
  },
  {
    key: "age",
    label: "年龄",
    type: "number",
    placeholder: "输入年龄筛选",
  },
  {
    key: "department",
    label: "部门",
    type: "select",
    options: [
      {value: "engineering", label: "工程部"},
      {value: "design", label: "设计部"},
      {value: "marketing", label: "市场部"},
      {value: "hr", label: "人力资源"},
    ],
  },
  {
    key: "status",
    label: "状态",
    type: "select",
    options: [
      {value: "active", label: "活跃"},
      {value: "inactive", label: "非活跃"},
    ],
  },
  {
    key: "joinDate",
    label: "加入日期",
    type: "date",
  },
]

export const Basic: Story = {
  args: {
    filters: sampleFilters,
    values: {},
    onChange: (values) => console.log("Filter values changed:", values),
  },
}

export const WithInitialValues: Story = {
  args: {
    filters: sampleFilters,
    values: {
      name: "Alice",
      department: "engineering",
      status: "active",
    },
    onChange: (values) => console.log("Filter values changed:", values),
  },
}

export const Disabled: Story = {
  args: {
    filters: sampleFilters,
    values: {},
    onChange: (values) => console.log("Filter values changed:", values),
    disabled: true,
  },
}

// 劳动记录筛选器示例
const workRecordFilters: FilterDefinition[] = [
  {
    key: "project",
    label: "项目",
    type: "select",
    options: [
      {value: "project-a", label: "项目A"},
      {value: "project-b", label: "项目B"},
      {value: "project-c", label: "项目C"},
    ],
  },
  {
    key: "taskType",
    label: "任务类型",
    type: "select",
    options: [
      {value: "development", label: "开发"},
      {value: "design", label: "设计"},
      {value: "testing", label: "测试"},
      {value: "documentation", label: "文档"},
    ],
  },
  {
    key: "dateRange",
    label: "日期范围",
    type: "date",
  },
  {
    key: "hours",
    label: "工时",
    type: "number",
    placeholder: "筛选工时数",
  },
]

export const WorkRecordFilters: Story = {
  args: {
    filters: workRecordFilters,
    values: {},
    onChange: (values) => console.log("Work record filters changed:", values),
  },
}

// 需求记录筛选器示例
const requirementFilters: FilterDefinition[] = [
  {
    key: "priority",
    label: "优先级",
    type: "select",
    options: [
      {value: "high", label: "高"},
      {value: "medium", label: "中"},
      {value: "low", label: "低"},
    ],
  },
  {
    key: "assignee",
    label: "负责人",
    type: "text",
    placeholder: "输入负责人姓名",
  },
  {
    key: "sprint",
    label: "冲刺周期",
    type: "select",
    options: [
      {value: "sprint-1", label: "Sprint 1"},
      {value: "sprint-2", label: "Sprint 2"},
      {value: "sprint-3", label: "Sprint 3"},
    ],
  },
]

export const RequirementFilters: Story = {
  args: {
    filters: requirementFilters,
    values: {},
    onChange: (values) => console.log("Requirement filters changed:", values),
  },
}

export const FlyoutMode: Story = {
  args: {
    filters: sampleFilters,
    values: {},
    onChange: (values) => console.log("Filter values changed:", values),
    onConditionsChange: (conditions) =>
      console.log("Conditions changed:", conditions),
    mode: "flyout",
  },
}
