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

import {colors} from "@/styles"
import styled from "styled-components"
import {svgIcons} from "../Icons/svgIcons"

/**
 * Checkbox component props
 * @prop {boolean} checked - 是否选中
 * @prop {function} onChange - 选中状态改变时的回调函数
 * @prop {string} label - 复选框的标签
 * @prop {"small" | "medium"} size - 复选框大小
 * @prop {boolean} disabled - 是否禁用
 */
export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  size?: "small" | "medium"
  disabled?: boolean
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  size = "medium",
  disabled = false,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <input
        type="checkbox"
        checked={checked}
        readOnly
        disabled={disabled}
        hidden
      />
      <CheckboxVisual
        size={size}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        {checked ? <svgIcons.Right /> : <svgIcons.Unchecked />}
        <Label size={size}>{label}</Label>
      </CheckboxVisual>
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.div``

const CheckboxVisual = styled.span<{
  disabled?: boolean
  size?: "small" | "medium"
}>`
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  filter: ${({disabled}) => (disabled ? "grayscale(100%)" : "none")};
  color: ${({disabled}) => (disabled ? colors.Neutral500 : colors.Neutral900)};
  display: flex;
  align-items: center;
  gap: 6px;

  & > svg {
    width: ${({size}) => (size === "small" ? "12px" : "16px")};
    height: ${({size}) => (size === "small" ? "12px" : "16px")};
    transition: transform 0.2s ease;
  }

  & > svg:hover {
    transform: scale(1.05);
  }
`

const Label = styled.span<{
  size: "small" | "medium"
}>`
  font-size: ${({size}) => (size === "small" ? "12px" : "16px")};
  line-height: 1;
`
