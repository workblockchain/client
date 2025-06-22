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

import {darken, transparentize} from "polished"
import styled, {css} from "styled-components"
import {colors} from "../../styles/colors"
import {styledCommon} from "../../styles/common"

export const LARGE_BUTTON_SIZE = 72 as const

export type VariantType =
  | "solid"
  | "outline"
  | "text"
  | "icon"
  | "iconWithLabel"
  | "largeIconWithLabel"
const $variantStyles = (
  $variant: VariantType = "solid",
  color: string,
  $animated?: boolean
) => css`
  position: relative;
  border-radius: 24px;
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
    display: inline-flex;
    gap: 12px;
    align-items: center;

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

  ${$variant === "iconWithLabel" &&
  css`
    height: 40px;
    padding: 8px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: transparent;
    transition: ${$animated ? "all 0.2s ease, border-radius 0s" : "none"};
    overflow: hidden;
    max-width: 40px;
    border-radius: 20px;

    &:hover:not(:disabled) {
      background-color: ${transparentize(0.9, color)};
      ${$animated &&
      css`
        padding-right: 12px;
        max-width: 200px;
      `}
    }

    span {
      font-size: 12px;
      line-height: 12px;
      color: ${colors.Neutral500};
      opacity: ${$animated ? 0 : 1};
      transition: opacity 0.2s ease;
      white-space: nowrap;
    }

    &:hover:not(:disabled) span {
      opacity: 1;
    }

    &:first-child svg {
      flex-shrink: 0;
    }

    ${!$animated &&
    css`
      border-radius: 20px;
      max-width: unset;
      padding: 8px;
      padding-right: 12px;
      aspect-ratio: unset;

      span {
        opacity: 1;
      }
    `}
  `}

  ${$variant === "largeIconWithLabel" &&
  css`
    width: ${LARGE_BUTTON_SIZE}px;
    height: ${LARGE_BUTTON_SIZE}px;
    padding: 12px;
    border-radius: 24px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background-color: transparent;
    transition: background-color 0.2s ease;
    box-shadow: none;
    flex-shrink: 0;

    &:hover:not(:disabled) {
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    }

    span {
      font-size: 12px;
      line-height: 12px;
      color: ${colors.Neutral500};
      white-space: nowrap;
      display: block;
      margin-top: 4px;
      opacity: 0;
      transition: opacity 0.2s ease-out;
    }

    &:hover:not(:disabled) span {
      opacity: 1;
    }

    & > svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  `}
`

type ButtonStyleProps = {
  $variant?: VariantType
  $size?: "small" | "medium" | "large"
  $primaryColor?: string
  $animated?: boolean
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
  cursor: pointer;
  transition: all 0.2s ease;

  ${({$primaryColor, $variant, $animated}) =>
    $variantStyles($variant, $primaryColor ?? colors.Red400, $animated)}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    ${styledCommon.disabled}
    cursor: not-allowed;
  }
`
