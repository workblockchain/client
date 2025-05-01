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

import * as css from "csstype"
import styled from "styled-components"

export const full: css.Properties = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
}

export const center: css.Properties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const HoverColor = styled.div<{color: string}>`
  background-color: #0000;
  &:hover {
    background-color: ${(props) => props.color};
  }
`
