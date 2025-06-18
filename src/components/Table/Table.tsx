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

import {Fragment} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"

export interface TableColumn<T> {
  key: string
  title: string
  width?: number
  render?: (value: any, record: T) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  rowKey: string | ((record: T) => string)
  loading?: boolean
  onRowClick?: (record: T) => void
  groupBy?: string | ((record: T) => string)
  renderGroupHeader?: (groupKey: string) => React.ReactNode
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  groupBy,
  renderGroupHeader,
}: TableProps<T>) => {
  const renderUngroupedData = () => {
    return data.map((record) => (
      <TableRow key={getRowKey(record)} onClick={() => onRowClick?.(record)}>
        {columns.map((column) => (
          <TableCell key={column.key} width={column.width}>
            {column.render
              ? column.render(record[column.key], record)
              : record[column.key]}
          </TableCell>
        ))}
      </TableRow>
    ))
  }

  const renderGroupedData = () => {
    const groups: Record<string, T[]> = {}
    const getGroupKey =
      typeof groupBy === "function"
        ? groupBy
        : (record: T) => record[groupBy as string]

    data.forEach((record) => {
      const key = getGroupKey(record)
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(record)
    })

    return Object.entries(groups).map(([groupKey, groupData]) => (
      <Fragment key={groupKey}>
        <TableGroupHeader>
          <td colSpan={columns.length}>
            {renderGroupHeader ? renderGroupHeader(groupKey) : groupKey}
          </td>
        </TableGroupHeader>
        {groupData.map((record) => (
          <TableRow
            key={getRowKey(record)}
            onClick={() => onRowClick?.(record)}
          >
            {columns.map((column) => (
              <TableCell key={column.key} width={column.width}>
                {column.render
                  ? column.render(record[column.key], record)
                  : record[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </Fragment>
    ))
  }
  const getRowKey = (record: T) => {
    return typeof rowKey === "function" ? rowKey(record) : record[rowKey]
  }

  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell key={column.key} width={column.width}>
              {column.title}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {groupBy ? renderGroupedData() : renderUngroupedData()}
      </TableBody>
    </TableContainer>
  )
}

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`

const TableHeader = styled.thead`
  font-weight: 500;
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.Neutral100};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.Neutral100};
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`

const TableHeaderCell = styled.th<{width?: number}>`
  padding: 12px 16px;
  width: ${({width}) => (width ? `${width}px` : "auto")};
  font-size: 14px;
  color: ${colors.Neutral500};
  text-align: left;
`

const TableGroupHeader = styled.tr`
  & > td {
    padding: 12px 16px;
    font-weight: 500;
    border: 1px solid #00000020;
  }
`

const TableCell = styled.td<{width?: number}>`
  padding: 12px 16px;
  width: ${({width}) => (width ? `${width}px` : "auto")};
  font-size: 14px;
  color: ${colors.Neutral800};
  border: 1px solid #00000020;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
