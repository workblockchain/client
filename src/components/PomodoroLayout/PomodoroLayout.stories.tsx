import type {Meta, StoryObj} from "@storybook/react"
import {PomodoroLayout} from "./PomodoroLayout"

const meta: Meta<typeof PomodoroLayout> = {
  title: "Components/PomodoroLayout",
  component: PomodoroLayout,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof PomodoroLayout>

export const Working: Story = {
  args: {},
}
