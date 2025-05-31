import type {Meta, StoryObj} from "@storybook/react"
import {Checkbox} from "./Checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    descriptor: "任务1",
  },
}

export const WithClickCallback: Story = {
  args: {
    descriptor: "可点击复选框",
    onClick: (e) => {
      console.log("Checkbox clicked", e.currentTarget.checked)
      alert(`复选框状态: ${e.currentTarget.checked}`)
    },
  },
}
