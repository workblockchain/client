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

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import styled, {css, type CSSProperties} from "styled-components"
import {colors} from "../../styles/colors"
import TableCell from "./TableCell"

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    cellStyle?: CSSProperties
    headerStyle?: CSSProperties
  }
}

export interface TableProps<TData extends Record<string, unknown>> {
  /**
   * 表格列的配置
   */
  columns: ColumnDef<TData>[]

  /**
   * 表格的数据源
   */
  data: TData[]

  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean

  /**
   * 行点击事件处理函数
   * @param record - 点击的行数据
   */
  clickRow?: (record: TData) => void
}

export function Table<TData extends Record<string, unknown>>({
  data,
  columns,
  clickRow,
  loading = false,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <TableContainer>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeaderRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeaderCell
                key={header.id}
                style={{
                  ...header.column.columnDef.meta?.headerStyle,
                  width: header.column.getSize(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHeaderCell>
            ))}
          </TableHeaderRow>
        ))}
      </TableHeader>
      <TableBody>
        {loading && <EmptyState colSpan={columns.length}>加载中...</EmptyState>}
        {!loading && data.length === 0 && (
          <EmptyState colSpan={columns.length}>暂无数据</EmptyState>
        )}
        {!loading &&
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              onClick={() => clickRow?.(row.original)}
              $clickable={!!clickRow}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{
                    ...cell.column.columnDef.meta?.cellStyle,
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  gap: 12px;
  width: 100%;
  display: flex;
  padding: 8px;
  border-radius: 8px;
  flex-direction: column;
  background-color: #f6f8f9;
`

const TableHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${colors.Neutral200};
  background-color: #ffffff;
  padding: 0 16px;
  font-size: 16px;
`

const TableHeaderRow = styled.div`
  display: flex;
  width: 100%;
`

const TableHeaderCell = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  padding: 10px 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-right: none;
  }
`

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  &:last-child {
    border-radius: 0 0 8px 8px;
    border-bottom: 1px solid ${colors.Neutral200};
  }
`

const TableRow = styled.div<{$clickable?: boolean}>`
  display: flex;
  align-items: center;
  transition: background-color 0.1s ease-in-out;
  padding: 0 16px;
  background-color: #ffffff;
  border: 1px solid ${colors.Neutral200};
  border-bottom: none;

  ${({$clickable}) =>
    $clickable &&
    css`
      cursor: pointer;
      &:hover {
        background-color: ${colors.Neutral200};
      }
    `}
`

const EmptyState = styled.div<{colSpan: number}>`
  grid-column: 1 / span ${({colSpan}) => colSpan};
  padding: 48px 16px;
  text-align: center;
  color: ${colors.Neutral500};
`
