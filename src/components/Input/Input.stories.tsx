import type {Meta, StoryObj} from "@storybook/react"
import Input from "./Input"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

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
