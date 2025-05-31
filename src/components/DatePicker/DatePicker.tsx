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

import {useState} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"

const DatePickerContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.Neutral200};
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: ${colors.Blue500};
  }
`

interface DatePickerProps {
  value?: string
  onChange?: (date: string) => void
}

export const DatePicker = ({value, onChange}: DatePickerProps) => {
  const [date, setDate] = useState(value || "")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDate(newDate)
    onChange?.(newDate)
  }

  return (
    <DatePickerContainer>
      <DateInput type="date" value={date} onChange={handleChange} />
    </DatePickerContainer>
  )
}
