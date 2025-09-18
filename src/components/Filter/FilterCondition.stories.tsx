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

import {Meta, StoryObj} from "@storybook/react-vite"
import {operatorOptions} from "./Filter.utils"
import {FilterCondition} from "./FilterCondition"
import {FilterCondition as FilterConditionType, FilterDefinition} from "./types"

const meta: Meta<typeof FilterCondition> = {
  title: "Components/Filter/FilterCondition",
  component: FilterCondition,
}

export default meta

type Story = StoryObj<typeof FilterCondition>

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
    key: "joinDate",
    label: "加入日期",
    type: "date",
  },
]

const defaultCondition: FilterConditionType = {
  id: "1",
  field: "name",
  operator: "contains",
  value: "John",
}

export const Basic: Story = {
  args: {
    condition: defaultCondition,
    filters: sampleFilters,
    onUpdate: (id, updates) => console.log("Update condition:", id, updates),
    onRemove: (id) => console.log("Remove condition:", id),
    operatorOptions,
  },
}
