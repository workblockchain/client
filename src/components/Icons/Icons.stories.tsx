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

import type {Meta} from "@storybook/react"
import styled from "styled-components"
import {colors} from "../../styles"
import {svgIcons} from "./svgIcons"

const meta: Meta = {
  title: "assets/Icons",
}

export default meta

const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;
  color: ${colors.Red300};
`

export const Pomodoro = () => (
  <IconWrapper>
    {Object.values(svgIcons).map((Component, i) => (
      <Component key={i} width={24} height={24} />
    ))}
  </IconWrapper>
)
