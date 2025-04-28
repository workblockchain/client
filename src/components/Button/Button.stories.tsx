import type {Meta, StoryObj} from "@storybook/react"
import {Button} from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    $variant: {
      control: {type: "radio"},
      options: ["solid", "outline", "text"],
    },
    $size: {
      control: {type: "radio"},
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: "Primary Button",
    $variant: "solid",
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
    $variant: "outline",
  },
}

export const Text: Story = {
  args: {
    ...Primary.args,
    $variant: "text",
  },
}

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
}
