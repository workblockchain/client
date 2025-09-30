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

import {css} from "styled-components"
import {colors} from "../../styles"
import {styledCommon} from "../../styles/common"
import {AlignType, SizeType} from "../types"

export type InputVariantType = {
  $variant?: "primary" | "borderless"
  $size?: SizeType
  $align?: AlignType
}

const sizeConfig = {
  "x-small": {height: 24, fontSize: 12, padding: 6, borderRadius: 12},
  small: {height: 32, fontSize: 14, padding: 8, borderRadius: 16},
  medium: {height: 48, fontSize: 16, padding: 16, borderRadius: 24},
  large: {height: 64, fontSize: 18, padding: 20, borderRadius: 32},
} as const

export const inputCommon = (props?: InputVariantType) => css`
  font-size: ${sizeConfig[props?.$size || "medium"].fontSize}px;
  height: ${sizeConfig[props?.$size || "medium"].height}px;
  padding: 0 ${sizeConfig[props?.$size || "medium"].padding}px;
  border-radius: ${sizeConfig[props?.$size || "medium"].borderRadius}px;
  text-align: ${props?.$align || "left"};
  ${props?.$variant === "borderless" &&
  css`
    box-shadow: none;
    border: none;
    background-color: transparent;
  `}

  &:hover,&:focus {
    box-shadow: 0 0 0 1px ${colors.Red300};
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    ${styledCommon.disabled}
  }
`
