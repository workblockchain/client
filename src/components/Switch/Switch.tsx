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

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  size?: "small" | "medium"
  disabled?: boolean
}

export const Switch = ({
  checked,
  onChange,
  size = "medium",
  disabled = false,
}: SwitchProps) => {
  return (
    <SwitchContainer size={size}>
      <SwitchInput
        type="checkbox"
        checked={checked}
        readOnly
        disabled={disabled}
      />
      <Slider
        checked={checked}
        size={size}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      />
    </SwitchContainer>
  )
}

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

const SwitchContainer = styled.div<{size: "small" | "medium"}>`
  position: relative;
  display: inline-block;
  width: ${({size}) => (size === "small" ? "36px" : "44px")};
  height: ${({size}) => (size === "small" ? "20px" : "24px")};
`

const Slider = styled.span<{
  checked: boolean
  size: "small" | "medium"
  disabled?: boolean
}>`
  position: absolute;
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({checked, disabled}) =>
    disabled ? colors.Neutral200 : checked ? colors.Red300 : colors.Neutral300};
  transition: 0.4s;
  border-radius: 34px;

  &::before {
    position: absolute;
    content: "";
    height: ${({size}) => (size === "small" ? "16px" : "20px")};
    width: ${({size}) => (size === "small" ? "16px" : "20px")};
    left: ${({size, checked}) =>
      checked ? `calc(100% - ${size === "small" ? "18px" : "22px"})` : "2px"};
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`
