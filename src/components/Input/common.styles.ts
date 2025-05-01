// Copyright (c) 2025-present WorkBlockChain Team.
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//          http://license.coscl.org.cn/MulanPubL-2.0
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
// EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
// === Auto generated, DO NOT EDIT ABOVE ===

import {css} from "styled-components"
import {colors} from "../../styles"
import {styledCommon} from "../../styles/common"

export type InputVariantType = {$variant?: "primary" | "borderless"}
export const inputCommon = (props?: InputVariantType) => css`
  font-size: 16px;
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
