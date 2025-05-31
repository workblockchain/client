import type {Meta, StoryObj} from "@storybook/react"
import {Dashboard} from "./Dashboard"

const meta: Meta<typeof Dashboard> = {
  title: "Layouts/Dashboard",
  component: Dashboard,
}

export default meta

type Story = StoryObj<typeof Dashboard>

export const Default: Story = {}
