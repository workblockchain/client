import {colors} from "@/styles/colors"
import type {Meta, StoryObj} from "@storybook/react"
import {Button} from "../Button"
import {Card} from "./Card"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {type: "select"},
      options: ["small", "medium", "large"],
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {
    children: "这是卡片的基础内容",
  },
}

export const WithTitle: Story = {
  args: {
    cardTitle: "卡片标题",
    children: "这是带标题的卡片内容",
  },
}

export const DifferentSizes: Story = {
  render: () => (
    <div style={{display: "flex", gap: "16px", flexDirection: "column"}}>
      <Card size="small" cardTitle="小尺寸卡片">
        这是小尺寸卡片内容
      </Card>
      <Card size="medium" cardTitle="中尺寸卡片">
        这是中尺寸卡片内容
      </Card>
      <Card size="large" cardTitle="大尺寸卡片">
        这是大尺寸卡片内容
      </Card>
    </div>
  ),
}

export const WithFooter: Story = {
  args: {
    cardTitle: "带底部区域的卡片",
    children: "卡片主要内容区域",
    footer: "这是底部区域内容",
  },
}

export const WithActions: Story = {
  args: {
    cardTitle: "带操作按钮的卡片",
    children: "卡片主要内容区域",
    actions: (
      <>
        <Button $size="small">取消</Button>
        <Button $size="small" $variant="solid" $primaryColor={colors.Red400}>
          确认
        </Button>
      </>
    ),
  },
}

export const CompleteExample: Story = {
  args: {
    cardTitle: "完整示例",
    size: "large",
    children: (
      <div>
        <p>这是卡片的主要内容区域</p>
        <p>可以包含任意React节点</p>
      </div>
    ),
    footer: "底部说明文字",
    actions: (
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <Button $size="small" $variant="text">
          更多
        </Button>
        <div style={{display: "flex", gap: "8px"}}>
          <Button $size="small">取消</Button>
          <Button $size="small" $variant="solid" $primaryColor={colors.Red400}>
            确认
          </Button>
        </div>
      </div>
    ),
  },
}
