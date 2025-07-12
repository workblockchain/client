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
      options: ["small", "medium", "large"],
      description: "尺寸",
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Primary: Story = {
  args: {
    checked: false,
    size: "medium",
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const WithLabel: Story = {
  args: {
    label: "Checkbox Label",
    checked: true,
    size: "medium",
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}

export const WithSize: Story = {
  render: () => (
    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      <Checkbox
        size="small"
        label="Small Checkbox"
        checked={false}
        onChange={(checked) => console.log("Small checkbox toggled:", checked)}
      />
      <Checkbox
        size="medium"
        label="Medium Checkbox"
        checked={false}
        onChange={(checked) => console.log("Medium checkbox toggled:", checked)}
      />
      <Checkbox
        size="large"
        label="Large Checkbox"
        checked={false}
        onChange={(checked) => console.log("Large checkbox toggled:", checked)}
      />
    </div>
  ),
}
export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled Checkbox",
    onChange: (checked) => console.log("Switch toggled:", checked),
  },
}
