import type {Meta, StoryObj} from "@storybook/react"
import {Layout} from "./Layout"

const meta: Meta<typeof Layout> = {
  component: Layout,
}

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {}
