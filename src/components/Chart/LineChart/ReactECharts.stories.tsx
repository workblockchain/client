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
import {LineChart} from "./index"

const meta: Meta<typeof LineChart> = {
  title: "Components/LineChart",
  component: LineChart,
  tags: ["autodocs"],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof LineChart>

export const Primary: Story = {
  args: {
    title: "LineChart",
    xAxis: ["10:00", "10:01", "10:02"],
    series: [
      {
        name: "星期一",
        data: [1, 2, 10],
      },
      {
        name: "星期二",
        data: [4, 5, 6],
      },
    ],
  },
}
