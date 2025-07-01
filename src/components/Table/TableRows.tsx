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
import {TableCell} from "./TableCell"

export interface TableColumn<T> {
  key: string
  title: string
  width?: number | string
  render?: (value: any, record: T, index: number) => React.ReactNode
}

interface TableRowProps<T> {
  /**
   * 表格列的配置
   */
  columns: TableColumn<T>[]

  /**
   * 行数据
   */
  rowData: T

  /**
   * 行点击回调
   */
  onRowClick?: (record: T) => void

  /**
   * 布局配置
   */
  $gridTemplateColumns: string

  /**
   * 行下标
   */
  rowIndex: number
}

export const TableRow = memo(
  <T extends Record<string, any>>({
    columns,
    onRowClick,
    $gridTemplateColumns,
    rowData,
    rowIndex,
  }: TableRowProps<T>) => {
    return (
      <TableRowContainer
        onClick={() => onRowClick?.(rowData)}
        $hasClickHandler={onRowClick ? true : false}
        $gridTemplateColumns={$gridTemplateColumns}
      >
        {columns.map((column, index) => (
          <TableCell key={index}>
            {column.render
              ? column.render(rowData[column.key], rowData, rowIndex)
              : rowData[column.key]}
          </TableCell>
        ))}
      </TableRowContainer>
    )
  }
)

const BaseGrid = styled.div<{$gridTemplateColumns: string}>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({$gridTemplateColumns}) => $gridTemplateColumns};
`

const TableRowContainer = styled(BaseGrid)<{$hasClickHandler?: boolean}>`
  transition: background-color 0.1s ease-in-out;

  ${({$hasClickHandler}) =>
    $hasClickHandler &&
    `
    cursor: pointer;
  `}

  &:hover {
    background-color: ${colors.Neutral200};
  }
`
