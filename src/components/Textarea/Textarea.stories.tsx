import type {Meta, StoryObj} from "@storybook/react"
import Textarea from "./Textarea"

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    rows: {
      control: "number",
    },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: "请输入内容...",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "禁用状态",
    disabled: true,
  },
}

export const Focused: Story = {
  args: {
    placeholder: "聚焦状态",
  },
  parameters: {
    pseudo: {focus: true},
  },
}
