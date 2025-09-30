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
import {ConditionRow} from "./ConditionRow"
import {BaseCondition, ConditionDefinition} from "./types"

const meta: Meta<typeof ConditionRow> = {
  title: "Components/DataConditionBuilder/ConditionRow",
  component: ConditionRow,
  parameters: {
    layout: "centered",
  },
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
  },
}

export default meta

type Story = StoryObj<typeof ConditionRow>

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

// 交互式模板组件
const InteractiveTemplate: Story["render"] = (args) => {
  const [condition, setCondition] = useState<BaseCondition>(() => {
    // 根据模式设置初始条件
    if (args?.mode === "filter") {
      return {
        id: "1",
        field: "project",
        condition: "equal",
        value: "project-a",
      }
    } else {
      return {
        id: "1",
        field: "project",
        condition: "asc",
        value: null,
      }
    }
  })

  const handleUpdate = (id: string, updates: Partial<BaseCondition>) => {
    setCondition({...condition, ...updates})
    console.log("Condition updated:", {
      id,
      updates,
      newCondition: {...condition, ...updates},
    })
  }

  const handleRemove = (id: string) => {
    console.log("Condition removed:", id)
  }

  return (
    <div
      style={{
        minWidth: "400px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <ConditionRow
        {...args}
        condition={condition}
        onUpdate={handleUpdate}
        onRemove={handleRemove}
      />
      <div
        style={{
          marginTop: "16px",
          padding: "8px",
          background: "#f5f5f5",
          borderRadius: "4px",
        }}
      >
        <strong>当前条件状态:</strong>
        <pre style={{fontSize: "12px", margin: "8px 0 0 0"}}>
          {JSON.stringify(condition, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    availableFields: sampleFields,
    mode: "sort",
    disabled: false,
  },
}

export const FilterMode: Story = {
  render: InteractiveTemplate,
  args: {
    availableFields: sampleFields,
    mode: "filter",
    disabled: false,
  },
}
