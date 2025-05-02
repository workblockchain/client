// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {darken, transparentize} from "polished"
import styled, {css} from "styled-components"
import {colors} from "../../styles/colors"
import {styledCommon} from "../../styles/common"

export type VariantType = "solid" | "outline" | "text" | "icon"
const $variantStyles = ($variant: VariantType = "solid", color: string) => css`
  ${$variant === "solid" &&
  css`
    background-color: ${color};
    color: ${colors.Neutral100};

    &:hover:not(:disabled) {
      background-color: ${darken(0.1, color)};
    }
  `}

  ${$variant === "outline" &&
  css`
    background-color: transparent;
    color: ${color};
    box-shadow: 0 0 0 1px ${color};

    &:hover:not(:disabled) {
      background-color: ${transparentize(0.9, color)};
    }
  `}

  ${$variant === "text" &&
  css`
    background-color: transparent;
    color: ${color};
    box-shadow: none;
    padding: 0;
    height: auto;

    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }
  `}

  ${$variant === "icon" &&
  css`
    padding: 8px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    display: inline-flex;
    box-shadow: none;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    &:hover:not(:disabled) {
      background-color: ${transparentize(0.9, color)};
    }
  `}
`

type ButtonStyleProps = {
  $variant?: VariantType
  $size?: "small" | "medium" | "large"
  $primaryColor?: string
}

export const Button = styled.button<ButtonStyleProps>`
  ${styledCommon.base}
  white-space: nowrap;
  ${({$size = "medium"}) => {
    switch ($size) {
      case "small":
        return css`
          height: 28px;
          font-size: 12px;
          padding: 0 16px;
        `
      case "medium":
        return css`
          height: 40px;
          font-size: 14px;
          padding: 0 20px;
        `
      case "large":
        return css`
          height: 48px;
          font-size: 16px;
          padding: 0 24px;
        `
    }
  }}
  border-radius: ${({$variant}) => ($variant === "icon" ? "50%" : "24px")};
  cursor: pointer;
  transition: all 0.2s ease;

  ${({$primaryColor, $variant}) =>
    $variantStyles($variant, $primaryColor ?? colors.Red400)}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    ${styledCommon.disabled}
    cursor: not-allowed;
  }
`
