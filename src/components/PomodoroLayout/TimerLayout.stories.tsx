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
  title: "Components/TimerLayout",
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
