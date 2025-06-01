import type {Meta, StoryObj} from "@storybook/react"
import {Table} from "./Table"
import {CellProps} from "./TableRow"

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
    },
  },
} satisfies Meta<typeof Table>

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

const sampleData = [
  {
    groupName: "劳动记录组1",
    expanded: true,
    onClick: () => console.log("Group clicked"),
    cells: sampleCells,
  },
  {
    groupName: "劳动记录组1",
    expanded: true,
    onClick: () => console.log("Group clicked"),
    cells: sampleCells,
  },
]

export const Basic: Story = {
  args: {
    data: sampleData,
    titles: [
      "劳动描述",
      "劳动分类",
      "人员",
      "状态",
      "提出日期",
      "持续时间",
      "关联项",
    ],
  },
}

export const Empty: Story = {
  args: {
    data: [],
  },
}

export const SingleGroup: Story = {
  args: {
    data: [sampleData[0]],
  },
}
