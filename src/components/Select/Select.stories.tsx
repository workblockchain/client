// Copyright (c) 2025-present WorkBlockChain Team.
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//          http://license.coscl.org.cn/MulanPubL-2.0
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
// EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
// === Auto generated, DO NOT EDIT ABOVE ===

import type {Meta, StoryObj} from "@storybook/react"
import {userEvent, within} from "@storybook/test"
import Select from "./Select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    options: [
      {value: "1", label: "Option 1"},
      {value: "2", label: "Option 2"},
      {value: "3", label: "Option 3"},
    ],
  },
  argTypes: {
    value: {
      control: "select",
      options: ["1", "2", "3"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("combobox"))
  },
}

export const Controlled: Story = {
  args: {
    value: "2",
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
}
