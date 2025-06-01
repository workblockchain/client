import type {Meta, StoryObj} from "@storybook/react"
import {Button} from "../Button"
import {TableRow} from "./TableRow"

const meta = {
  title: "Components/TableRow",
  component: TableRow,
  tags: ["autodocs"],
  argTypes: {
    cells: {
      description: "表格单元格配置数组",
      control: {
        type: "object",
      },
    },
  },
} satisfies Meta<typeof TableRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    cells: [
      {
        children: "123",
        width: 100,
      },
      {
        type: "tag",
        data: "456",
      },
      {
        children: "789",
      },
    ],
  },
}

export const WithButton: Story = {
  args: {
    cells: [
      {
        children: <Button>123</Button>,
        width: 100,
      },
      {
        children: "456",
      },
      {
        children: "789",
      },
    ],
  },
}
