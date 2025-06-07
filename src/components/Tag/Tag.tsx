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

import styled from "styled-components"
import {colors} from "../../styles/colors"

const TagContainer = styled.span<{
  $variant: "primary" | "success" | "warning" | "error"
  $size?: "small" | "medium" | "large"
}>`
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  font-weight: 500;
  line-height: 1.5;

  ${({$size}) => {
    switch ($size) {
      case "small":
        return `padding: 1px 6px; font-size: 10px;`
      case "large":
        return `padding: 4px 12px; font-size: 14px;`
      default: // medium
        return `padding: 2px 8px; font-size: 12px;`
    }
  }}

  ${({$variant}) => {
    switch ($variant) {
      case "primary":
        return `background-color: ${colors.Blue100}; color: ${colors.Blue700};`
      case "success":
        return `background-color: ${colors.Yellow300}; color: ${colors.Yellow800};`
      case "warning":
        return `background-color: ${colors.Red100}; color: ${colors.Red700};`
      case "error":
        return `background-color: ${colors.Red200}; color: ${colors.Red800};`
    }
  }}
`

interface TagProps {
  variant?: "primary" | "success" | "warning" | "error"
  size?: "small" | "medium" | "large"
  children: React.ReactNode
}

export const Tag = ({
  variant = "primary",
  size = "medium",
  children,
}: TagProps) => {
  return (
    <TagContainer $variant={variant} $size={size}>
      {children}
    </TagContainer>
  )
}
