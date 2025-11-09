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
import {InputWithUnit, TextInputWithUnit} from "./Input"

const meta: Meta<typeof InputWithUnit> = {
  title: "Components/Input/Unit",
  component: InputWithUnit,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    unit: {
      control: "text",
    },
    $size: {
      control: "select",
      options: ["x-small", "small", "medium", "large"],
    },
    $align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
}

export default meta
type Story = StoryObj<typeof InputWithUnit>

export const Sizes: Story = {
  render: () => (
    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      <InputWithUnit placeholder="x-small 尺寸" unit="px" $size="x-small" />
      <InputWithUnit placeholder="small 尺寸" unit="%" $size="small" />
      <InputWithUnit placeholder="medium 尺寸" unit="元" $size="medium" />
      <InputWithUnit placeholder="large 尺寸" unit="小时" $size="large" />
    </div>
  ),
}

export const LimitedWidth: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "200px",
      }}
    >
      <InputWithUnit placeholder="宽度受限" unit="px" />
      <InputWithUnit placeholder="输入较长内容测试" unit="小时" />
      <InputWithUnit placeholder="测试" unit="百分比%" />
    </div>
  ),
}

export const TextInputWithUnitDemo: StoryObj = {
  render: () => (
    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
      <TextInputWithUnit placeholder="文本输入带单位" unit="px" />
      <div style={{maxWidth: "150px"}}>
        <TextInputWithUnit placeholder="宽度受限" unit="小时" />
      </div>
      <TextInputWithUnit placeholder="测试长文本输入" unit="百分比%" />
    </div>
  ),
}
