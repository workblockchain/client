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
import type {CommitLayoutProps} from "./CommitLayout"
import {CommitLayout} from "./CommitLayout"

interface StoryControls {
  // 故事专用控制参数
  messageCommit: string
  messageAbort: string
  defaultDescription: string
  remainingTime: number
  timePassed: string
  onBack: () => void
}

const meta: Meta<CommitLayoutProps & StoryControls> = {
  title: "Components/CommitLayout",
  component: CommitLayout,
  parameters: {
    controls: {
      exclude: ["onCommitConfirm", "onAbort", "onDescriptionChange"], // 隐藏组件原生属性
    },
  },
  argTypes: {
    messageCommit: {
      control: "text",
      description: "确认提交按钮的日志消息",
    },
    messageAbort: {
      control: "text",
      description: "取消按钮的日志消息",
    },
    defaultDescription: {
      control: "text",
      description: "默认描述内容",
    },
    remainingTime: {
      control: "number",
      description: "剩余时间（秒）",
    },
    timePassed: {
      control: "text",
      description: "已用时间显示文本",
    },
    onBack: {
      action: "onBack",
      description: "返回按钮回调",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: "",
    onCommitConfirm: () => console.log("[CommitLayout] onCommitConfirm"),
    onAbort: () => console.log("[CommitLayout] onAbort"),
    messageCommit: "提交记录",
    messageAbort: "取消操作",
    defaultDescription: "示例描述内容",
    remainingTime: 1500, // 25分钟
    timePassed: "25:00",
  },
  render: (args) => (
    <CommitLayout
      description={args.defaultDescription}
      remainingTime={args.remainingTime}
      timePassed={args.timePassed}
      onDescriptionChange={(value) =>
        console.log(`[CommitLayout] 描述更新: ${value}`)
      }
      onCommitConfirm={() =>
        console.log(`[CommitLayout] ${args.messageCommit}`)
      }
      onAbort={() => console.log(`[CommitLayout] ${args.messageAbort}`)}
      onBack={() => console.log("[CommitLayout] onBack")}
    />
  ),
}
