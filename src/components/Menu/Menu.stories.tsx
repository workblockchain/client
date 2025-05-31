import type {Meta, StoryObj} from "@storybook/react"
import {Menu} from "./Menu"

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
}

export default meta

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    items: [
      {
        id: "gzt",
        icon: "",
        label: "工作台",
        url: "/",
      },
      {
        id: "ldgl",
        label: "劳动管理",
        url: "/",
        children: [
          {
            id: "lb",
            icon: "",
            label: "列表",
            url: "/",
            onUpdate: () => {},
          },
          {
            id: "zt",
            label: "状态",
            url: "/",
          },
          {
            id: "gtt",
            label: "甘特图",
            url: "/",
            show: false,
          },
        ],
      },
      {
        id: "bdy",
        label: "表单页",
        url: "/",
      },
    ],
  },
}
