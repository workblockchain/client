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
import {useState} from "react"
import {DataConditionBuilder} from "./DataConditionBuilder"
import {BaseCondition, ConditionDefinition} from "./types"

const meta: Meta<typeof DataConditionBuilder> = {
  title: "Components/DataConditionBuilder",
  component: DataConditionBuilder,
  argTypes: {
    mode: {
      control: {type: "select"},
      options: ["filter", "sort", "group"],
      description: "选择组件模式",
    },
    disabled: {
      control: {type: "boolean"},
      description: "禁用状态",
    },
    buttonLabel: {
      control: {type: "text"},
      description: "按钮标签",
    },
    flyoutTitle: {
      control: {type: "text"},
      description: "弹窗标题",
    },
  },
}

export default meta

type Story = StoryObj<typeof DataConditionBuilder>

// 模拟可用的字段定义
const sampleFields: ConditionDefinition[] = [
  {
    key: "project",
    label: "项目",
    type: "select",
    options: [
      {value: "project-a", label: "项目A"},
      {value: "project-b", label: "项目B"},
    ],
  },
  {
    key: "status",
    label: "状态",
    type: "select",
    options: [
      {value: "todo", label: "待办"},
      {value: "in-progress", label: "进行中"},
      {value: "done", label: "已完成"},
    ],
  },
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
    key: "score",
    label: "分数",
    type: "number",
  },
  {
    key: "name",
    label: "名称",
    type: "text",
  },
  {
    key: "createdAt",
    label: "创建时间",
    type: "date",
  },
]

export const AllModes: Story = {
  render: () => {
    const [filterConditions, setFilterConditions] = useState<BaseCondition[]>([
      {
        id: "1",
        field: "project",
        condition: "equal",
        value: "project-a",
      },
    ])

    const [sortConditions, setSortConditions] = useState<BaseCondition[]>([
      {
        id: "1",
        field: "score",
        condition: "asc",
        value: null,
      },
    ])

    const [groupConditions, setGroupConditions] = useState<BaseCondition[]>([
      {
        id: "1",
        field: "project",
        condition: "asc",
        value: null,
      },
    ])

    return (
      <>
        <div>
          <h4>筛选模式 (Filter)</h4>
          <DataConditionBuilder
            conditions={filterConditions}
            availableFields={sampleFields}
            onConditionsChange={setFilterConditions}
            mode="filter"
            buttonLabel="筛选"
            flyoutTitle="筛选条件"
          />
        </div>

        <div>
          <h4>排序模式 (Sort)</h4>
          <DataConditionBuilder
            conditions={sortConditions}
            availableFields={sampleFields}
            onConditionsChange={setSortConditions}
            mode="sort"
            buttonLabel="排序"
            flyoutTitle="排序设置"
          />
        </div>

        <div>
          <h4>分组模式 (Group)</h4>
          <DataConditionBuilder
            conditions={groupConditions}
            availableFields={sampleFields}
            onConditionsChange={setGroupConditions}
            mode="group"
            buttonLabel="分组"
            flyoutTitle="分组设置"
          />
        </div>
      </>
    )
  },
  args: {
    availableFields: sampleFields,
  },
}
