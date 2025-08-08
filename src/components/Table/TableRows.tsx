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
import type {ReactNode} from "react"
import styled, {css} from "styled-components"
import Cell from "./TableCell"
import type {ColumnProps, DataRecordFromColumns, RowProps} from "./interfaces"

export const DEFAULT_WIDTH = 100 as const

function TableRow<TColumns extends ReadonlyArray<ColumnProps<string, any>>>({
  columns,
  onClick,
  height,
}: RowProps<TColumns>) {
  return (
    <TableRowContainer
      onClick={() => {
        const data = Object.fromEntries(
          columns.map((column) => [column.key, column.value])
        ) as DataRecordFromColumns<TColumns>
        return onClick?.(data)
      }}
      $clickable={!!onClick}
      style={{height}}
    >
      {columns.map((column, index) => {
        return (
          <Cell
            key={index}
            style={{width: column.width ?? DEFAULT_WIDTH}}
            onClick={() => column.clickCell?.(column.value)}
          >
            {column.render
              ? column.render(column.value, column.key, index)
              : (column.value as ReactNode)}
          </Cell>
        )
      })}
    </TableRowContainer>
  )
}

export default TableRow

const TableRowContainer = styled.div<{$clickable?: boolean}>`
  display: flex;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  padding: 0 16px;

  ${({$clickable}) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${colors.Neutral200};
      }
    `}
`
