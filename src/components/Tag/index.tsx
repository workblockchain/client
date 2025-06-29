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

import {HTMLAttributes} from "react"
import styled, {css} from "styled-components"
import {colors} from "../../styles/colors"

type TagVariant = "primary" | "success" | "warning" | "error" | "text"
type TagSize = "small" | "medium" | "large"
interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant
  size?: TagSize
  children: React.ReactNode
}

const Tag = ({variant = "primary", size = "medium", ...props}: TagProps) => {
  return <TagContainer {...props} $variant={variant} $size={size} />
}

export default Tag

const TagContainer = styled.span<{$variant: TagVariant; $size?: TagSize}>`
  display: inline-flex;
  align-items: center;
  border-radius: 8px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  ${({$size}) => {
    switch ($size) {
      case "small":
        return css`
          padding: 1px 6px;
          font-size: 10px;
        `
      case "large":
        return css`
          padding: 4px 12px;
          font-size: 14px;
        `
      default: // medium
        return css`
          padding: 2px 8px;
          font-size: 12px;
        `
    }
  }}

  ${({$variant}) => {
    switch ($variant) {
      case "primary":
        return css`
          background-color: ${colors.Blue100};
          color: ${colors.Blue700};
        `
      case "success":
        return css`
          background-color: ${colors.Yellow300};
          color: ${colors.Yellow800};
        `
      case "warning":
        return css`
          background-color: ${colors.Red100};
          color: ${colors.Red700};
        `
      case "error":
        return css`
          background-color: ${colors.Red200};
          color: ${colors.Red800};
        `
      case "text":
        return css`
          background-color: transparent;
          color: ${colors.Neutral500};
          font-weight: 400;
        `
    }
  }}
`
