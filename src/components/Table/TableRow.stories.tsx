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
import {Button} from "../Button"
import {TableRow} from "./TableRow"

const meta = {
  title: "Components/TableRow",
  component: TableRow,
  tags: ["autodocs"],
  argTypes: {
    cells: {
      description: "表格单元格配置数组",
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof TableRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cells: [
      {
        children: "123",
        width: 100,
      },
      {
        type: "tag",
        data: "456",
      },
      {
        children: "789",
      },
    ],
  },
}

export const WithButton: Story = {
  args: {
    cells: [
      {
        children: <Button>123</Button>,
        width: 100,
      },
      {
        children: "456",
      },
      {
        children: "789",
      },
    ],
  },
}
