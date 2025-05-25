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

import ClockIcon from "@/assets/clock.svg?react"
import GearIcon from "@/assets/gear.svg?react"
import PomodoroIcon from "@/assets/pomodoro.svg?react"
import type {Meta, StoryObj} from "@storybook/react"
import {useState} from "react"
import {Navigation, type NavigationProps} from "./Navigation"

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs"],
  argTypes: {
    targets: {
      control: {type: "object"},
    },
    closeOnClick: {
      control: "boolean",
    },
    show: {
      control: "boolean",
    },
    onClose: {
      action: "onClose",
    },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

const demoItems = [
  {
    icon: <GearIcon />,
    label: "设置",
    onClick: () => console.log("设置点击"),
  },
  {
    icon: <ClockIcon />,
    label: "计时器",
    onClick: () => console.log("计时器点击"),
  },
  {
    icon: <PomodoroIcon />,
    label: "番茄钟",
    onClick: () => console.log("番茄钟点击"),
  },
]

export const Default: Story = {
  args: {
    targets: demoItems,
    onClose: () => console.log("导航关闭"),
    show: true,
  },
}

export const WithCloseOnClickFalse: Story = {
  args: {
    ...Default.args,
    closeOnClick: false,
  },
}

const InteractiveExample = (args: NavigationProps) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)}>打开导航</button>
      <Navigation
        {...args}
        show={show}
        onClose={() => setShow(false)}
        targets={args.targets || demoItems}
        closeOnClick={args.closeOnClick ?? true}
      />
    </>
  )
}

export const Interactive: Story = {
  render: (args) => <InteractiveExample {...args} />,
  args: {
    targets: demoItems,
    onClose: () => console.log("导航关闭"),
    closeOnClick: true,
    show: true,
  },
}
