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

import styled, {css} from "styled-components"
import {colors} from "../../styles"

export type RatioSizeType = "x-small" | "small" | "medium" | "large"

const sizeConfig = {
  "x-small": {
    bar: 60,
    height: 24,
    fontSize: 12,
    padding: 6,
    borderRadius: 12,
    gap: 2,
  },
  small: {
    bar: 100,
    height: 32,
    fontSize: 14,
    padding: 8,
    borderRadius: 16,
    gap: 3,
  },
  medium: {
    bar: 120,
    height: 48,
    fontSize: 16,
    padding: 16,
    borderRadius: 24,
    gap: 4,
  },
  large: {
    bar: 160,
    height: 64,
    fontSize: 18,
    padding: 20,
    borderRadius: 32,
    gap: 5,
  },
} as const

export const RatioContainer = styled.div<{
  $size: RatioSizeType
  $disabled?: boolean
  $align?: "start" | "center" | "end"
}>`
  position: relative;
  display: inline-flex;
  background-color: ${colors.Neutral100};
  border-radius: ${(props) => sizeConfig[props.$size].borderRadius}px;
  padding: 4px;
  gap: ${(props) => sizeConfig[props.$size].gap}px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
  transition: all 0.2s ease-out;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);

  ${(props) => {
    switch (props.$align) {
      case "start":
        return css`
          justify-content: flex-start;
        `
      case "end":
        return css`
          justify-content: flex-end;
        `
      case "center":
      default:
        return css`
          justify-content: center;
        `
    }
  }}

  &:hover {
    ${(props) =>
      !props.$disabled &&
      css`
        background-color: ${colors.Neutral200};
        box-shadow: 0 0 0 1px ${colors.Red300};
      `}
  }
`

export const RatioOption = styled.button<{
  $size: RatioSizeType
  $selected: boolean
  $disabled?: boolean
}>`
  position: relative;
  width: ${(props) => sizeConfig[props.$size].bar}px;
  border: none;
  background: transparent;
  color: ${(props) =>
    props.$selected ? colors.Neutral900 : colors.Neutral600};
  font-size: ${(props) => sizeConfig[props.$size].fontSize}px;
  height: ${(props) => sizeConfig[props.$size].height}px;
  padding: 0 ${(props) => sizeConfig[props.$size].padding}px;
  border-radius: ${(props) => sizeConfig[props.$size].borderRadius - 4}px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease-out;
  z-index: 1;
  font-weight: ${(props) => (props.$selected ? 600 : 400)};

  &:hover {
    ${(props) =>
      !props.$disabled &&
      !props.$selected &&
      css`
        color: ${colors.Neutral700};
        background-color: rgba(255, 255, 255, 0.5);
      `}
  }
`

export const RatioSlider = styled.div<{
  $size: RatioSizeType
  $position: number
}>`
  position: absolute;
  top: 4px;
  left: ${(props) => props.$position}px;
  width: ${(props) => sizeConfig[props.$size].bar}px;
  height: ${(props) => sizeConfig[props.$size].height}px;
  background-color: white;
  border-radius: ${(props) => sizeConfig[props.$size].borderRadius - 4}px;
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
`
