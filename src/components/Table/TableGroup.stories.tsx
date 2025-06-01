import type {Meta, StoryObj} from "@storybook/react"
import {TableGroup} from "./TableGroup"
import {CellProps} from "./TableRow"

const meta = {
  title: "Components/TableGroup",
  component: TableGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof TableGroup>

export default meta

type Story = StoryObj<typeof meta>

const sampleCells: CellProps[][] = [
  [
    {type: "text", data: "修复首页样式问题"},
    {type: "text", data: "前端开发"},
    {type: "text", data: "张三"},
    {type: "tag", data: "已完成"},
    {type: "time", data: "2023-05-01"},
    {type: "text", data: "2小时"},
    {type: "text", data: "BUG-123"},
  ],
  [
    {type: "text", data: "优化API响应时间"},
    {type: "text", data: "后端开发"},
    {type: "text", data: "李四"},
    {type: "tag", data: "进行中"},
    {type: "time", data: "2023-05-02"},
    {type: "text", data: "4小时"},
    {type: "text", data: "TASK-456"},
  ],
]

export const Default: Story = {
  args: {
    groupName: "劳动记录组1",
    expanded: true,
    onClick: () => console.log("Group clicked"),
    cells: sampleCells,
  },
}

export const Collapsed: Story = {
  args: {
    ...Default.args,
    expanded: false,
  },
}
