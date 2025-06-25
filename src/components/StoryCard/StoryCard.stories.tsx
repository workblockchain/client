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
import StoryCard from "."

const meta: Meta<typeof StoryCard> = {
  title: "Components/StoryElements/StoryCard",
  component: StoryCard,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof StoryCard>

export const Default: Story = {
  args: {
    children:
      "有个嘲笑心理学的老笑话，也可以套用在精神分析或哲学上面：​“所谓心理学，就是用艰深晦涩的说法，来解释生活中简单的道理",
    tags: ["重要", "紧急", "前端"],
    subTasks: [{label: "设计评审"}, {label: "开发实现"}, {label: "测试验证"}],
    size: "small",
    cid: "QmXyz123",
    assignee: "user1",
  },
}
