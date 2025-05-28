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
import {useRef} from "react"
import AvatarEditor from "react-avatar-editor"
import {AvatarEditorModal} from "./AvatarEditorModal"

const meta: Meta<typeof AvatarEditorModal> = {
  title: "Components/AvatarEditorModal",
  component: AvatarEditorModal,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof AvatarEditorModal>

const DefaultRenderer = (args: any) => {
  const editorRef = useRef<AvatarEditor>(null)
  return <AvatarEditorModal {...args} editorRef={editorRef} />
}

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("closed"),
    onSave: () => console.log("saved"),
    uploadedImage: null,
  },
  render: DefaultRenderer,
}

export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: 300,
    height: 300,
    border: 30,
  },
}

export const CustomColorAndScale: Story = {
  args: {
    ...Default.args,
    color: [255, 0, 0, 0.8],
    scale: 1.5,
  },
}

export const Rotated: Story = {
  args: {
    ...Default.args,
    rotate: 45,
  },
}
