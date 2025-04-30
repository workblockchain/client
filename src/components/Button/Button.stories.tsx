import type {Meta, StoryObj} from "@storybook/react"
import {Button} from "./Button"

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    $variant: {
      control: {type: "radio"},
      options: ["solid", "outline", "text", "icon"],
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

export const Icon: Story = {
  args: {
    ...Primary.args,
    $variant: "icon",
    children: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
}
