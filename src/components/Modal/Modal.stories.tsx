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
import {useState} from "react"
import {Button} from "../Button"
import {Modal} from "./Modal"

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: {control: "boolean"},
    title: {control: "text"},
    children: {control: "text"},
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

const Template: Story["render"] = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>打开模态框</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Basic = {
  render: Template,
  args: {
    children: "这是模态框内容区域",
  },
}

export const WithTitle = {
  render: Template,
  args: {
    title: "带标题的模态框",
    children: "标题下方的内容区域",
  },
}
