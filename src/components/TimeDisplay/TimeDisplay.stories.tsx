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
import {TimeDisplay} from "./TimeDisplay"

const meta: Meta<typeof TimeDisplay> = {
  title: "Components/TimeDisplay",
  component: TimeDisplay,
  tags: ["autodocs"],
  argTypes: {
    seconds: {
      control: {type: "number", min: 0},
    },
  },
}

export default meta

type Story = StoryObj<typeof TimeDisplay>

export const Base: Story = {
  args: {
    seconds: 0,
  },
}

export const HalfMinute: Story = {
  args: {
    seconds: 30,
  },
}

export const FullMinute: Story = {
  args: {
    seconds: 90,
  },
}

export const LongDuration: Story = {
  args: {
    seconds: 3599,
  },
}
