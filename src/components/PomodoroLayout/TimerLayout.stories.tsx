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
import type {TimerLayoutProps} from "./TimerLayout"
import {TimerLayout} from "./TimerLayout"

interface StoryControls {
  // 故事专用控制参数
  messageStart: string
  messagePause: string
  messageSkip: string
}

const meta: Meta<TimerLayoutProps & StoryControls> = {
  title: "Layouts/TimerLayout",
  component: TimerLayout,
  tags: ["autodocs"],
  parameters: {
    controls: {
      exclude: ["onCountStart", "onCountEnd", "onSkip"], // 隐藏组件原生属性
    },
  },
  argTypes: {
    messageStart: {
      control: "text",
      description: "开始/继续按钮的日志消息",
    },
    messagePause: {
      control: "text",
      description: "暂停按钮的日志消息",
    },
    messageSkip: {
      control: "text",
      description: "跳过按钮的日志消息",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const args = {
  onCountStart: () => console.log("[TimerLayout] onCountStart"),
  onCountEnd: () => console.log("[TimerLayout] onCountEnd"),
  onSkip: () => console.log("[TimerLayout] onSkip"),
  messageStart: "开始计时",
  messagePause: "暂停计时",
  messageSkip: "跳过当前阶段",
}

export const Break: Story = {
  args,
  render: (args) => (
    <TimerLayout
      onCountStart={() => console.log(`[TimerLayout] ${args.messageStart}`)}
      onCountPause={() => console.log(`[TimerLayout] ${args.messagePause}`)}
      onSkip={() => console.log(`[TimerLayout] ${args.messageSkip}`)}
      remainingTime={100}
      status={"paused"}
      phase={"break"}
    />
  ),
}
