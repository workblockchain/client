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
import {colors} from "../styles/colors"

const BaseDivider = styled.div<{color?: string; margin?: string}>`
  background-color: ${({color}) => color || colors.Neutral300};
`

export const DividerHorizontal = styled(BaseDivider)`
  height: 1px;
  width: 100%;
  margin: ${({margin}) => margin || "8px 0"};
`

export const DividerVertical = styled(BaseDivider)`
  width: 1px;
  height: 100%;
  margin: ${({margin}) => margin || "0 8px"};
`
