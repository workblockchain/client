import type {Meta, StoryObj} from "@storybook/react"
import {TimeDisplay} from "./TimeDisplay"

const meta: Meta<typeof TimeDisplay> = {
  title: "Components/TimeDisplay",
  component: TimeDisplay,
  tags: ["autodocs"],
  argTypes: {
    seconds: {
      control: {type: "number", min: 0},
    },
  },
}

export default meta

type Story = StoryObj<typeof TimeDisplay>

export const Base: Story = {
  args: {
    seconds: 0,
  },
}

export const HalfMinute: Story = {
  args: {
    seconds: 30,
  },
}

export const FullMinute: Story = {
  args: {
    seconds: 90,
  },
}

export const LongDuration: Story = {
  args: {
    seconds: 3599,
  },
}
