// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import { CSSProperties, styled } from "styled-components"
import { styledCommon } from "../../styles/common"
import { secondToHMS } from "../../utils/secondToHMS"

interface TimeDisplayProps {
  seconds: number
  style?: CSSProperties
}

const TimeDisplayContainer = styled.div`
  ${styledCommon.timerText}
  text-align: center;
  line-height: 1;
`

export const TimeDisplay = ({seconds, style}: TimeDisplayProps) => {
  const formattedTime = secondToHMS(seconds)

  return (
    <TimeDisplayContainer style={style}>{formattedTime}</TimeDisplayContainer>
  )
}
