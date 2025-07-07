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

import type {Meta} from "@storybook/react"
import Tag from "."

const meta = {
  title: "Components/StoryElements/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "radio"},
      options: ["primary", "success", "warning", "error", "text"],
    },
    size: {
      control: {type: "radio"},
      options: ["small", "medium", "large"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Tag>

export default meta

export const AllVariants = () => (
  <div style={{display: "flex", gap: "8px"}}>
    <Tag variant="primary">Primary</Tag>
    <Tag variant="success">Success</Tag>
    <Tag variant="warning">Warning</Tag>
    <Tag variant="error">Error</Tag>
    <Tag variant="text">Text</Tag>
  </div>
)

export const AllSizes = () => (
  <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
    <Tag size="small">Small</Tag>
    <Tag size="medium">Medium</Tag>
    <Tag size="large">Large</Tag>
  </div>
)

export const canClose = () => (
  <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
    <Tag size="small" canClose onClose={() => console.log("onClose")}>
      Small
    </Tag>
    <Tag size="medium" canClose onClose={() => console.log("onClose")}>
      Medium
    </Tag>
    <Tag size="large" canClose onClose={() => console.log("onClose")}>
      Large
    </Tag>
  </div>
)
