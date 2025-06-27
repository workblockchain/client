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
import {colors} from "../../styles"
import {svgIcons} from "../Icons/svgIcons"

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  labelPosition?: "left" | "right"
  size?: "small" | "medium"
  disabled?: boolean
}

export const Checkbox = ({
  checked,
  onChange,
  label,
  labelPosition = "right",
  size = "medium",
  disabled = false,
}: CheckboxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        readOnly
        disabled={disabled}
        hidden
      />
      <CheckboxVisual
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
      >
        {checked ? (
          <svgIcons.Unchecked
            width={size === "small" ? 16 : 20}
            height={size === "small" ? 16 : 20}
          />
        ) : (
          <svgIcons.Right
            width={size === "small" ? 16 : 20}
            height={size === "small" ? 16 : 20}
          />
        )}
      </CheckboxVisual>
      {label && (
        <Label size={size} $position={labelPosition}>
          {label}
        </Label>
      )}
    </CheckboxContainer>
  )
}

const CheckboxContainer = styled.div<{}>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`

const CheckboxInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const CheckboxVisual = styled.span<{
  disabled?: boolean
}>`
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  filter: ${({disabled}) => (disabled ? "grayscale(100%)" : "none")};
  display: inline-flex;
  align-items: center;
  user-select: none;
`

const Label = styled.span<{
  size: "small" | "medium"
  $position: "left" | "right"
}>`
  font-size: ${({size}) => (size === "small" ? "12px" : "16px")};
  color: ${colors.Neutral800};
  user-select: none;
  order: ${({$position}) => ($position === "left" ? "-1" : "1")};
`
