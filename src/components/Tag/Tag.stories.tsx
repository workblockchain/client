import type {Meta, StoryObj} from "@storybook/react"
import {Tag} from "./Tag"

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "radio"},
      options: ["primary", "success", "warning", "error"],
    },
    size: {
      control: {type: "radio"},
      options: ["small", "medium", "large"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Primary Tag",
    variant: "primary",
    size: "medium",
  },
}

export const AllVariants = () => (
  <div style={{display: "flex", gap: "8px"}}>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
  </div>
)

export const AllSizes = () => (
  <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
    <Tag size="small">Small</Tag>
    <Tag size="medium">Medium</Tag>
    <Tag size="large">Large</Tag>
  </div>
)
