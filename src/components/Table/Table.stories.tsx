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
import {Table} from "./Table"

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  {
    groupName: "劳动1",
    items: [
      {
        description: "整理文档",
        category: "文档工作",
        person: "张三",
        status: "进行中",
        date: "2023-05-01",
        duration: "2小时",
        relatedItem: "项目A",
      },
      {
        description: "代码审查",
        category: "开发工作",
        person: "李四",
        status: "已完成",
        date: "2023-05-02",
        duration: "1小时",
        relatedItem: "项目B",
      },
    ],
  },
  {
    groupName: "劳动2",
    items: [
      {
        description: "会议记录",
        category: "会议",
        person: "王五",
        status: "已完成",
        date: "2023-05-03",
        duration: "1.5小时",
        relatedItem: "项目C",
      },
    ],
  },
]

export const Basic: Story = {
  args: {
    data: sampleData,
  },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}

export const SingleGroup: Story = {
  args: {
    data: [sampleData[0]],
  },
}
