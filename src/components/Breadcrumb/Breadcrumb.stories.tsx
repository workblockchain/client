import type {Meta, StoryObj} from "@storybook/react"
import {Breadcrumb} from "./Breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Basic: Story = {
  args: {
    items: [{title: "首页"}, {title: "用户中心"}, {title: "个人资料"}],
  },
}

export const WithLinks: Story = {
  args: {
    items: [
      {title: "首页", path: "/"},
      {title: "产品", path: "/products"},
      {title: "详情", path: "/products/123"},
    ],
  },
}

export const LongBreadcrumb: Story = {
  args: {
    items: [
      {title: "首页"},
      {title: "文档"},
      {title: "API参考"},
      {title: "用户管理"},
      {title: "权限设置"},
    ],
  },
}
