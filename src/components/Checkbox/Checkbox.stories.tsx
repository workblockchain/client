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
import {useState} from "react"
import {Checkbox} from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {control: "boolean", description: "勾选状态"},
    disabled: {control: "boolean", description: "是否禁用"},
    size: {
      control: "select",
      options: ["small", "medium"],
      description: "尺寸",
    },
    labelPosition: {
      control: "select",
      options: ["left", "right"],
      description: "文本方位",
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  args: {
    checked: false,
    size: "medium",
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

export const WithLabel: Story = {
  args: {
    label: "Checkbox Label",
    checked: true,
    size: "medium",
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

export const SmallSize: Story = {
  args: {
    size: "small",
    label: "Small Checkbox",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Checkbox",
  },
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onChange={setChecked} />
  },
}

// export const FilledPrimary: Story = {
//   play: async ({canvas, userEvent}) => {
//     await canvas.findByRole("span")
//     userEvent
//   },
// }
