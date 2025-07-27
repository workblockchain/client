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

import {colors} from "@/styles/colors"
import {memo} from "react"
import styled from "styled-components"

interface TableCellProps {
  children: string
}

export const TableCell = memo(({children}: TableCellProps) => {
  return <TableCellContainer>{children ?? "空"}</TableCellContainer>
})

const TableCellContainer = styled.div`
  font-size: 14px;
  overflow: hidden;
  padding: 6px 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.Neutral800};
  /* border-bottom: 1px solid ${colors.Neutral100}; */
  border-right: 1px solid ${colors.Neutral200};
  box-sizing: border-box;
  height: 100%;

  &:last-child {
    border-right: none;
  }
`
