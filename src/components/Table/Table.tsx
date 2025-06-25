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

import React from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"

export interface TableColumn<T> {
  key: string
  title: string
  width?: number | string
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  rowKey: string | ((record: T) => string)
  loading?: boolean
  onRowClick?: (record: T) => void
  groupBy?: string | ((record: T) => string)
  renderGroupHeader?: (groupKey: string, groupData: T[]) => React.ReactNode
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  groupBy,
  renderGroupHeader,
}: TableProps<T>) => {
  const gridTemplateColumns = columns
    .map((c) => {
      if (typeof c.width === "number") return `${c.width}px`
      if (typeof c.width === "string") return c.width
      return "1fr"
    })
    .join(" ")

  const getRowKey = (record: T) => {
    return typeof rowKey === "function" ? rowKey(record) : record[rowKey]
  }

  const renderTableRows = (records: T[]) => {
    return records.map((record, index) => (
      <TableRow
        key={getRowKey(record)}
        onClick={() => onRowClick?.(record)}
        hasClickHandler={!!onRowClick}
        gridTemplateColumns={gridTemplateColumns}
      >
        {columns.map((column) => (
          <TableCell key={column.key}>
            {column.render
              ? column.render(record[column.key], record, index)
              : record[column.key]}
          </TableCell>
        ))}
      </TableRow>
    ))
  }

  const renderBody = () => {
    if (!groupBy) {
      return (
        <TableBodyContentWrapper>
          {renderTableRows(data)}
        </TableBodyContentWrapper>
      )
    }

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
      <TableGroup key={groupKey}>
        <TableGroupHeader colSpan={columns.length}>
          {renderGroupHeader
            ? renderGroupHeader(groupKey, groupData)
            : groupKey}
        </TableGroupHeader>
        {renderTableRows(groupData)}
      </TableGroup>
    ))
  }

  return (
    <TableContainer>
      <TableHeader gridTemplateColumns={gridTemplateColumns}>
        {columns.map((column) => (
          <TableHeaderCell key={column.key}>{column.title}</TableHeaderCell>
        ))}
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (
          renderBody()
        ) : (
          <EmptyState colSpan={columns.length}>No Data</EmptyState>
        )}
      </TableBody>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  padding: 8px;
  border-radius: 8px;
  flex-direction: column;
  background-color: ${colors.Table.Background};
`

const BaseGrid = styled.div<{gridTemplateColumns: string}>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({gridTemplateColumns}) => gridTemplateColumns};
`

const TableHeader = styled(BaseGrid)`
  top: 0;
  z-index: 10;
  position: sticky;
  border-radius: 8px;
  border: 1px solid ${colors.Table.Border};
  background-color: ${colors.Table.TitleBackground};
`

const TableHeaderCell = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  padding: 12px 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-right: 1px solid ${colors.Table.Border};

  &:last-child {
    border-right: none;
  }
`
const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`

const TableRow = styled(BaseGrid)<{hasClickHandler?: boolean}>`
  transition: background-color 0.1s ease-in-out;

  ${({hasClickHandler}) =>
    hasClickHandler &&
    `
    cursor: pointer;
  `}

  &:hover {
    background-color: ${colors.Neutral200};
  }
`

const TableCell = styled.div`
  font-size: 14px;
  overflow: hidden;
  padding: 8px 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${colors.Neutral800};
  border-bottom: 1px solid ${colors.Neutral100};
  border-right: 1px solid ${colors.Neutral100};

  &:last-child {
    border-right: none;
  }

  ${TableRow}:last-child > & {
    border-bottom: none;
  }
`

const TableGroupHeader = styled.div<{colSpan: number}>`
  grid-column: 1 / span ${({colSpan}) => colSpan};
  padding: 10px 16px;
  font-weight: 600;
  font-size: 15px;
  color: ${colors.Neutral800};
  border-bottom: 1px solid ${colors.Neutral100};
  border-top: 1px solid ${colors.Neutral100};
  margin-top: -1px;
`

const TableBodyContentWrapper = styled.div`
  border: 1px solid ${colors.Table.Border};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${colors.Table.TitleBackground};
`

const TableGroup = styled(TableBodyContentWrapper)`
  /* 
   * grid-column is not necessary here because its parent (TableBody) is a flex container.
   * We only need to keep the margin that separates the groups.
   */
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`
const EmptyState = styled.div<{colSpan: number}>`
  grid-column: 1 / span ${({colSpan}) => colSpan};
  padding: 48px 16px;
  text-align: center;
  color: ${colors.Neutral500};
`
