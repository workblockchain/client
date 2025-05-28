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
import {inputCommon, type InputVariantType} from "./common.styles"

export const Input = styled.input<InputVariantType>`
  ${styledCommon.base}
  ${inputCommon()}
  height: 48px;
  padding: 0 16px;
  border-radius: 24px;
  text-align: center;
`

export const TextInput = styled.input`
  ${styledCommon.base}
  ${inputCommon({$variant: "borderless"})}
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

export interface TextInputWithLabelProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string | ReactElement
  containerStyle?: CSSProperties
}

export function TextInputWithLabel({
  label,
  containerStyle,
  ...props
}: TextInputWithLabelProps) {
  return (
    <Container style={containerStyle}>
      {typeof label === "string" && <label>{label}</label>}
      {typeof label !== "string" && label}
      <TextInput {...props} />
    </Container>
  )
}
