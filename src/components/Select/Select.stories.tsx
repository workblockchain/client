import type {Meta, StoryObj} from "@storybook/react"
import {userEvent, within} from "@storybook/test"
import Select from "./Select"

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    options: [
      {value: "1", label: "Option 1"},
      {value: "2", label: "Option 2"},
      {value: "3", label: "Option 3"},
    ],
  },
  argTypes: {
    value: {
      control: "select",
      options: ["1", "2", "3"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("combobox"))
  },
}

export const Controlled: Story = {
  args: {
    value: "2",
  },
}

export const DisabledState: Story = {
  args: {
    disabled: true,
  },
}
