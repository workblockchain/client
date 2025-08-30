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

import type {Meta, StoryObj} from "@storybook/react"
import {useState} from "react"
import FilterBar, {FilterConfig} from "./FilterBar"

const meta: Meta<typeof FilterBar> = {
  title: "Components/Filter/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FilterBar>

// Example filter configurations
const workFilterConfig: FilterConfig[] = [
  {
    type: "text",
    key: "userId",
    label: "用户ID",
    placeholder: "输入用户ID",
  },
  {
    type: "select",
    key: "isSigned",
    label: "签名状态",
    options: [
      {value: "", label: "全部"},
      {value: "signed", label: "已签名"},
      {value: "unsigned", label: "未签名"},
    ],
  },
  {
    type: "tags",
    key: "workTags",
    label: "标签",
    placeholder: "输入标签，用逗号分隔",
  },
]

const requirementFilterConfig: FilterConfig[] = [
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

const WorkFiltersComponent = () => {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  return (
    <div style={{width: "800px"}}>
      <FilterBar
        filters={workFilterConfig}
        values={filters}
        onChange={handleFilterChange}
      />
      <div style={{marginTop: "20px", padding: "10px", background: "#f5f5f5"}}>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
      </div>
    </div>
  )
}

export const WorkFilters: Story = {
  render: () => <WorkFiltersComponent />,
}

const RequirementFiltersComponent = () => {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  return (
    <div style={{width: "800px"}}>
      <FilterBar
        filters={requirementFilterConfig}
        values={filters}
        onChange={handleFilterChange}
      />
      <div style={{marginTop: "20px", padding: "10px", background: "#f5f5f5"}}>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
      </div>
    </div>
  )
}

export const RequirementFilters: Story = {
  render: () => <RequirementFiltersComponent />,
}

const ProjectFiltersComponent = () => {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  const projectFilterConfig: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      label: "状态",
      options: [
        {value: "", label: "全部"},
        {value: "active", label: "活跃"},
        {value: "completed", label: "已完成"},
        {value: "archived", label: "已归档"},
      ],
    },
    {
      type: "select",
      key: "projectType",
      label: "项目类型",
      options: [
        {value: "", label: "全部"},
        {value: "development", label: "开发"},
        {value: "design", label: "设计"},
        {value: "research", label: "研究"},
      ],
    },
    {
      type: "text",
      key: "assignedTo",
      label: "负责人",
      placeholder: "负责人ID",
    },
  ]

  return (
    <div style={{width: "800px"}}>
      <FilterBar
        filters={projectFilterConfig}
        values={filters}
        onChange={handleFilterChange}
      />
      <div style={{marginTop: "20px", padding: "10px", background: "#f5f5f5"}}>
        <pre>{JSON.stringify(filters, null, 2)}</pre>
      </div>
    </div>
  )
}

export const ProjectFilters: Story = {
  render: () => <ProjectFiltersComponent />,
}
