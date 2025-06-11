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

import {DateFormat, formatTimestamp} from "@/utils/secondToHMS"
import styled from "styled-components"
import {colors} from "../../styles/colors"

const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
`

interface DatePickerProps {
  value?: string | number
  format?: DateFormat
}

export const DatePicker = ({value = 0, format = "YMD"}: DatePickerProps) => {
  return (
    <DatePickerContainer>
      <Date>{formatTimestamp(value, format).replace(" ", "\n")}</Date>
    </DatePickerContainer>
  )
}

const Date = styled.pre`
  font-family: inherit;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${colors.Blue500};
  }
`
