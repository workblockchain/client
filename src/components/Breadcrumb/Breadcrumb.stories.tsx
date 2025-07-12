// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import type {Meta, StoryObj} from "@storybook/react"
import {expect, within} from "@storybook/test"
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
  play: async ({canvasElement}) => {
    // 检查面包屑是否渲染了三个元素
    const canvas = within(canvasElement)
    const items = canvas.getAllByText(/首页|用户中心|个人资料/)
    expect(items).toHaveLength(3)

    // 还应该检查是不是有2个svg间隔符，但是除了设置role =  img 以外，没有别的可以拿来查询
  },
}

const items = [
  {title: "首页", path: "/"},
  {title: "产品", path: "/products"},
  {title: "详情", path: "/products/123"},
]

export const WithLinks: Story = {
  args: {items},

  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)
    const links = canvas.getAllByRole("link")

    expect(links).toHaveLength(3)
    for (let i = 0; i < links.length; i++) {
      expect(links[i]).toHaveTextContent(items[i].title) // rendered text
      expect(links[i]).toHaveAttribute("href", items[i].path) // rendered href
    }
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
