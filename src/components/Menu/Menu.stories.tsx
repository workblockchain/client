import type {Meta, StoryObj} from "@storybook/react"
import {BrowserRouter} from "react-router"
import {Menu} from "./Menu"

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
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
        url: "/dashboard",
      },
      {
        id: "labor",
        label: "劳动管理",
        children: [
          {
            id: "lb",
            icon: "",
            label: "列表",
            url: "/dashboard/labor",
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

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: "dashboard",
        label: "仪表盘",
        url: "/dashboard",
      },
      {
        id: "settings",
        label: "设置",
        url: "/settings",
        disabled: true,
      },
      {
        id: "profile",
        label: "个人资料",
        url: "/profile",
      },
    ],
  },
}
