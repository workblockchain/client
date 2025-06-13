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
import {colors} from "../../styles/colors"
import {Table} from "./Table"

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

const sampleData = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    department: "Engineering",
    status: "Active",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    department: "Design",
    status: "Active",
    joinDate: "2022-11-20",
  },
  {
    id: 3,
    name: "Charlie",
    age: 28,
    department: "Marketing",
    status: "Inactive",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "David",
    age: 35,
    department: "Engineering",
    status: "Active",
    joinDate: "2021-05-18",
  },
  {
    id: 5,
    name: "Eve",
    age: 27,
    department: "HR",
    status: "Active",
    joinDate: "2023-02-28",
  },
  {
    id: 6,
    name: "Frank",
    age: 32,
    department: "Design",
    status: "Inactive",
    joinDate: "2022-09-05",
  },
  {
    id: 7,
    name: "Grace",
    age: 29,
    department: "Marketing",
    status: "Active",
    joinDate: "2023-04-15",
  },
  {
    id: 8,
    name: "Henry",
    age: 31,
    department: "Engineering",
    status: "Active",
    joinDate: "2022-07-22",
  },
]

export const Basic: Story = {
  args: {
    data: sampleData,
    columns: [
      {key: "name", title: "Name"},
      {key: "age", title: "Age"},
      {key: "department", title: "Department"},
      {key: "status", title: "Status"},
      {key: "joinDate", title: "Join Date"},
    ],
    rowKey: "id",
  },
}

export const CompactTable: Story = {
  args: {
    data: sampleData,
    columns: [
      {key: "name", title: "Name", width: 120},
      {key: "age", title: "Age", width: 80},
      {key: "department", title: "Dept", width: 100},
      {key: "status", title: "Status", width: 100},
    ],
    rowKey: "id",
  },
}

export const GroupedByStatus: Story = {
  args: {
    data: sampleData,
    columns: [
      {key: "name", title: "Name"},
      {key: "age", title: "Age"},
      {key: "department", title: "Department"},
    ],
    rowKey: "id",
    groupBy: "status",
    renderGroupHeader: (groupKey) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: groupKey === "Active" ? colors.Neutral800 : colors.Neutral500,
        }}
      >
        <span style={{fontWeight: "bold"}}>Status:</span>
        <span>{groupKey}</span>
      </div>
    ),
  },
}

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      {key: "name", title: "Name"},
      {
        key: "age",
        title: "Age",
        render: (value) => `${value} years old`,
      },
      {key: "department", title: "Department"},
    ],
    rowKey: "id",
  },
}

export const GroupedByDepartment: Story = {
  args: {
    data: sampleData,
    columns: [
      {key: "name", title: "Name"},
      {key: "age", title: "Age"},
    ],
    rowKey: "id",
    groupBy: "department",
    renderGroupHeader: (groupKey) => (
      <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
        <span style={{fontWeight: "bold"}}>Department:</span>
        <span>{groupKey}</span>
      </div>
    ),
  },
}
