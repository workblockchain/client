import type {Meta, StoryObj} from "@storybook/react"
import {Descriptor} from "./Descriptor"

const meta: Meta<typeof Descriptor> = {
  title: "Components/Descriptor",
  component: Descriptor,
}

export default meta

type Story = StoryObj<typeof Descriptor>

export const Default: Story = {
  args: {
    children: <input type="checkbox" />,
    descriptor: "123",
    labelPosition: "left",
  },
}
