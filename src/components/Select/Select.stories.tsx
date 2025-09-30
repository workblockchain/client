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

import type {Meta, StoryObj} from "@storybook/react-vite"
import {useState} from "react"
import {userEvent, within} from "storybook/test"
import {Select} from "./Select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    options: [
      {value: "1", label: "选项 1"},
      {value: "2", label: "选项 2"},
      {
        value: "3",
        label:
          "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长选项 3",
      },
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
  render: function Render(args) {
    const [value, setValue] = useState<string | string[] | undefined>()

    return <Select {...args} value={value} onChange={setValue} />
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("combobox"))
  },
}

export const MultiSelect: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | string[] | undefined>([
      "1",
      "2",
    ])

    return <Select {...args} value={value} onChange={setValue} />
  },
  args: {
    isMulti: true,
  },
  argTypes: {
    value: {
      control: "object",
    },
  },
}

export const Searchable: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | string[] | undefined>()

    return <Select {...args} value={value} onChange={setValue} />
  },
  args: {
    isSearchable: true,
  },
}

export const VariantSize: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | string[] | undefined>()

    return (
      <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
        <Select
          {...args}
          size="x-small"
          value={value}
          onChange={setValue}
          placeholder="超小尺寸"
        />
        <Select
          {...args}
          size="small"
          value={value}
          onChange={setValue}
          placeholder="小尺寸"
        />
        <Select
          {...args}
          size="medium"
          value={value}
          onChange={setValue}
          placeholder="中尺寸"
        />
        <Select
          {...args}
          size="large"
          value={value}
          onChange={setValue}
          placeholder="大尺寸"
        />
      </div>
    )
  },
}

export const CustomPlaceholder: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string | string[] | undefined>()

    return <Select {...args} value={value} onChange={setValue} />
  },
  args: {
    placeholder: "请选择选项...",
  },
}

export const MultipleInRow: Story = {
  render: function Render(args) {
    const [value1, setValue1] = useState<string | string[] | undefined>([])
    const [value2, setValue2] = useState<string | string[] | undefined>([])
    const [value3, setValue3] = useState<string | string[] | undefined>([])

    return (
      <div style={{display: "flex", gap: "8px", maxWidth: "500px"}}>
        <Select
          {...args}
          value={value1}
          onChange={setValue1}
          placeholder="选择1"
          isMulti
        />
        <Select
          {...args}
          value={value2}
          onChange={setValue2}
          placeholder="选择2"
          isMulti
        />
        <Select
          {...args}
          value={value3}
          onChange={setValue3}
          placeholder="选择3"
          isMulti
        />
      </div>
    )
  },
}
