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

import {Meta, StoryObj} from "@storybook/react"
import {KanbanBoard} from "./KanbanBoard"
const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof KanbanBoard>

export const Primary: Story = {
  args: {
    id: "board1",
    list: [
      {
        id: "card 1",
        title: "To do",
        cards: [
          {
            id: "eat",
            title: "吃",
            description:
              "有个嘲笑心理学的老笑话，也可以套用在精神分析或哲学上面：​“所谓心理学，就是用艰深晦涩的说法，来解释生活中简单的道理",
            subTasks: [
              {label: "任务1", state: "finished"},
              {label: "任务2", state: "unfinished"},
            ],
            tags: ["this is tag1", "this is tag2"],
          },
          {id: "sleep 1", title: "睡"},
          {id: "eat11", title: "吃", description: "222"},
          {id: "sleep111", title: "睡"},
          {id: "eat1111", title: "吃", description: "222"},
          {id: "sleep111111", title: "睡"},
          {id: "eat11111", title: "吃", description: "222"},
          {id: "sleep11111", title: "睡"},
        ],
      },
      {
        id: "card 2",
        title: "进行中",
        cards: [{id: "card4643", title: "Task 3"}],
      },
      {
        id: "card 3",
        title: "完成",
        cards: [{id: "car45645664d3", title: "Task 3"}],
      },
    ],
  },
}

export const EmptyList: Story = {
  args: {
    list: [{id: "empty", title: "空列表", cards: []}],
  },
}
