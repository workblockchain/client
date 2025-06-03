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
import {CSSProperties, styled} from "styled-components"
import {styledCommon} from "../../styles/common"
import {secondToHMS} from "../../utils/secondToHMS"

interface TimeDisplayProps {
  seconds: number
  style?: CSSProperties
  editable?: boolean
}

const TimeDisplayContainer = styled.div`
  ${styledCommon.timerText}
  text-align: center;
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 6rem;
  }
`

export const TimeDisplay = ({
  seconds,
  style,
  editable = false,
}: TimeDisplayProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(seconds)
  const formattedTime = secondToHMS(value)

  const handleClick = () => {
    if (editable) {
      setIsEditing(true)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value))
  }

  return (
    <TimeDisplayContainer style={style} onClick={handleClick}>
      {isEditing ? (
        <input
          type="number"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          style={{
            width: "100%",
            textAlign: "center",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "inherit",
            fontFamily: "inherit",
          }}
        />
      ) : (
        formattedTime
      )}
    </TimeDisplayContainer>
  )
}
