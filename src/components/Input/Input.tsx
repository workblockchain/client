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

import type {InputHTMLAttributes, ReactElement} from "react"
import styled, {CSSProperties} from "styled-components"
import {styledCommon} from "../../styles/common"
import type {AlignType, SizeType} from "../types"
import {inputCommon, type InputVariantType} from "./common.styles"

export const Input = styled.input<InputVariantType>`
  ${styledCommon.base}
  ${(props) => inputCommon(props)}
`

export const TextInput = styled.input<InputVariantType>`
  ${styledCommon.base}
  ${(props) => inputCommon({...props, $variant: "borderless"})}
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  height: 24px;
  background-color: transparent;
  padding: 4px 8px 3px;
  transition: all 0.2s ease-out;
  box-shadow: none;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.8);
  }
`

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: baseline;
  gap: 1rem;
  height: 42px;
  padding: 8px 12px;

  label {
    white-space: nowrap;
    width: 120px;
  }
`

const InputWithUnitContainer = styled.div<InputVariantType>`
  display: flex;
  align-items: center;
  position: relative;
  ${styledCommon.base}
  ${(props) => inputCommon(props)}
  padding: 0;
  overflow: hidden;
`

const InputWithUnitInput = styled(Input)`
  flex: 1;
  border: none;
  box-shadow: none;
  padding-right: 0;
  width: 100%;
  height: auto;
  background: transparent;

  &:focus,
  &:hover {
    box-shadow: none;
  }
`

const Unit = styled.span<InputVariantType>`
  padding: 0 8px;
  background: #f5f5f5;
  color: #666;
  font-size: small;
  display: flex;
  align-items: center;
  border-left: 1px solid #e0e0e0;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
`

const TextInputWithUnitContainer = styled.div<InputVariantType>`
  display: flex;
  align-items: center;
  position: relative;
  ${styledCommon.base}
  ${(props) => inputCommon({...props, $variant: "borderless"})}
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 2px;
  height: 24px;
  background-color: transparent;
  padding: 0;
  transition: all 0.2s ease-out;
  box-shadow: none;
  overflow: hidden;

  &:hover {
    background: rgba(255, 255, 255, 0.6);

    ${Unit} {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &:focus-within {
    background: rgba(255, 255, 255, 0.8);

    ${Unit} {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`

const TextInputWithUnitInput = styled(TextInput)`
  flex: 1;
  border: none;
  outline: none;
  border-radius: 0;
  padding-right: 0;
  background: transparent;

  &:hover,
  &:focus {
    background: transparent;
  }
`

const TextInputUnit = styled(Unit)`
  padding: 0 8px;
  background: transparent;
  font-size: 14px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  flex-shrink: 0;
  min-width: fit-content;
`

export interface InputWithUnitProps
  extends InputHTMLAttributes<HTMLInputElement> {
  unit: string
  $variant?: "primary" | "borderless"
  $size?: SizeType
  $align?: AlignType
}

export function InputWithUnit({
  unit,
  $variant = "primary",
  $size = "medium",
  $align = "start",
  ...props
}: InputWithUnitProps) {
  return (
    <InputWithUnitContainer $variant={$variant} $size={$size} $align={$align}>
      <InputWithUnitInput
        $variant={$variant}
        $size={$size}
        $align={$align}
        {...props}
      />
      <Unit $variant={$variant} $size={$size} $align={$align}>
        {unit}
      </Unit>
    </InputWithUnitContainer>
  )
}

export interface TextInputWithUnitProps
  extends InputHTMLAttributes<HTMLInputElement> {
  unit: string
  $size?: SizeType
  $align?: AlignType
}

export function TextInputWithUnit({
  unit,
  $size = "medium",
  $align = "start",
  ...props
}: TextInputWithUnitProps) {
  return (
    <TextInputWithUnitContainer $size={$size} $align={$align}>
      <TextInputWithUnitInput $size={$size} $align={$align} {...props} />
      <TextInputUnit $size={$size} $align={$align}>
        {unit}
      </TextInputUnit>
    </TextInputWithUnitContainer>
  )
}

export interface TextInputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactElement
  containerStyle?: CSSProperties
  inputSize?: SizeType
}

export function TextInputWithLabel({
  label,
  containerStyle,
  inputSize,
  ...props
}: TextInputWithLabelProps) {
  return (
    <Container style={containerStyle}>
      {typeof label === "string" && <label>{label}</label>}
      {typeof label !== "string" && label}
      <TextInput $size={inputSize} {...props} />
    </Container>
  )
}
