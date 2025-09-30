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
import {Ratio} from "./Ratio"
import {RatioOption, RatioProps} from "./types"

const meta = {
  title: "Components/Ratio",
  component: Ratio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {type: "select"},
      options: ["x-small", "small", "medium", "large"],
    },
    align: {
      control: {type: "select"},
      options: ["start", "center", "end"],
    },
    disabled: {
      control: {type: "boolean"},
    },
    options: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Ratio>

export default meta
type Story = StoryObj<typeof meta>

// 基础选项数据
const basicOptions: RatioOption[] = [
  {key: "option1", value: "选项一"},
  {key: "option2", value: "选项二"},
  {key: "option3", value: "选项三"},
]

const numberOptions: RatioOption[] = [
  {key: "low", value: 1},
  {key: "medium", value: 2},
  {key: "high", value: 3},
]

const booleanOptions: RatioOption[] = [
  {key: "true", value: true},
  {key: "false", value: false},
]

const multipleOptions: RatioOption[] = [
  {key: "opt1", value: "第一项"},
  {key: "opt2", value: "第二项"},
  {key: "opt3", value: "第三项"},
  {key: "opt4", value: "第四项"},
  {key: "opt5", value: "第五项"},
]

// 交互式组件
const InteractiveRatio = (args: RatioProps) => {
  const [value, setValue] = useState(args.value || basicOptions[0].key)
  return <Ratio {...args} value={value} onChange={setValue} />
}

export const Default: Story = {
  args: {
    options: basicOptions,
    value: "option1",
  },
  render: (args) => <InteractiveRatio {...args} />,
}

export const Variants: Story = {
  args: {
    options: basicOptions,
    value: "option1",
  },
  argTypes: {
    options: {
      control: {type: "select"},
      options: ["basic", "numbers", "booleans", "multiple"],
      mapping: {
        basic: basicOptions,
        numbers: numberOptions,
        booleans: booleanOptions,
        multiple: multipleOptions,
      },
    },
  },
  render: (args) => <InteractiveRatio {...args} />,
}

export const States: Story = {
  args: {
    options: basicOptions,
    value: "option1",
    disabled: false,
    size: "medium",
  },
  render: (args) => <InteractiveRatio {...args} />,
}
