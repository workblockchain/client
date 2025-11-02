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

import {Meta, StoryObj} from "@storybook/react-vite"
import {Card} from "./index"

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof Card>

// 1. Primary：基础样式检查（有标题、内容、宽度）
export const Primary: Story = {
  args: {
    title: "卡片标题",
    children: (
      <>
        这里是卡片内容区域。
        <br />
        支持多行文本和组件。
      </>
    ),
    width: "600px",
  },
}

// 2. NoTitle：无标题，检查是否隐藏标题区
export const NoTitle: Story = {
  args: {
    children: <>无标题卡片内容</>,
    width: "80%",
  },
}

// 3. WithFooter：有底部活动区域，检查 footer 样式
export const WithFooter: Story = {
  args: {
    title: "带操作按钮",
    children: <>内容区</>,
    footer: (
      <>
        <button style={{marginRight: 8}}>取消</button>
        <button>确认</button>
      </>
    ),
    width: "500px",
  },
}

// 4. FullFeatured：完整卡片
export const FullFeatured: Story = {
  args: {
    title: "完整卡片",
    children: (
      <div style={{flex: 1}}>
        <p>长内容测试：假设内容很长，会自动撑开卡片。</p>
        <ul>
          <li>项目1</li>
          <li>项目2</li>
          <li>项目3</li>
        </ul>
      </div>
    ),
    footer: <>底部链接或按钮</>,
    width: "100%",
  },
}

// 5. EmptyCard：空卡片
export const EmptyCard: Story = {
  args: {
    width: "300px",
  },
}

// 6. ResponsiveWidth：响应式宽度
export const ResponsiveWidth: Story = {
  args: {
    title: "响应式宽度",
    children: <>宽度为 50% </>,
    width: "50%",
  },
}
