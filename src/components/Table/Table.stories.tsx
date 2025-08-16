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
    name: null,
    age: null,
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
      {accessorKey: "name", header: "Name", size: 100},
      {accessorKey: "age", header: "Age", size: 80},
      {accessorKey: "department", header: "Department", size: 120},
      {accessorKey: "status", header: "Status", size: 80},
      {accessorKey: "joinDate", header: "Join Date", size: 120},
    ],
  },
}

export const CompactTable: Story = {
  args: {
    data: sampleData,
    columns: [
      {accessorKey: "name", header: "Name"},
      {accessorKey: "age", header: "Age"},
      {accessorKey: "department", header: "Dept"},
      {accessorKey: "status", header: "Status"},
    ],
  },
}

export const GroupedByStatus: Story = {
  args: {
    data: sampleData,
    columns: [
      {accessorKey: "name", header: "Name"},
      {accessorKey: "age", header: "Age"},
      {accessorKey: "department", header: "Department"},
    ],
    // groupBy: ["status"],
    // renderGroupHeader: (groupKey) => (
    //   <div
    //     style={{
    //       display: "flex",
    //       alignItems: "center",
    //       gap: "8px",
    //       color: groupKey === "Active" ? colors.Neutral800 : colors.Neutral500,
    //     }}
    //   >
    //     <span style={{fontWeight: "bold"}}>Status:</span>
    //     <span>{groupKey}</span>
    //   </div>
    // ),
  },
}

export const WithCustomRender: Story = {
  args: {
    data: sampleData,
    columns: [
      {accessorKey: "name", header: "Name"},
      {
        accessorKey: "age",
        header: "Age",
        // render: (value) => `${value} years old`,
      },
      {accessorKey: "department", header: "Department"},
    ],
  },
}

export const GroupedByDepartment: Story = {
  args: {
    data: sampleData,
    columns: [
      {accessorKey: "name", header: "Name"},
      {accessorKey: "age", header: "Age"},
    ],
    // groupBy: ["department"],
    // renderGroupHeader: (groupKey) => (
    //   <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
    //     <span style={{fontWeight: "bold"}}>Department:</span>
    //     <span>{groupKey}</span>
    //   </div>
    // ),
  },
}
