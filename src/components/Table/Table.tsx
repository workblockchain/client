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

import React, {useCallback, useMemo} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"
import {TableGroup} from "./TableGroup"

/**
 * 表格组件的属性接口
 * @template T - 表格数据的类型
 */
export interface TableProps<T> {
  /**
   * 表格的数据源
   */
  data: T[]

  /**
   * 表格列的配置
   */
  columns: TableColumn<T>[]

  /**
   * 每行数据的唯一标识，可以是字段名或生成唯一键的函数
   */
  rowKey: string | ((record: T) => string)

  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean

  /**
   * 行点击事件处理函数
   * @param record - 点击的行数据
   */
  onRowClick?: (record: T) => void

  /**
   * 分组依据，可以是字段名或生成分组键的函数
   */
  groupBy?: string | ((record: T) => string)

  /**
   * 自定义分组头部渲染函数
   * @param groupKey - 分组的键值
   * @param groupData - 分组的数据
   * @returns 自定义的分组头部节点
   */
  renderGroupHeader?: (groupKey: string, groupData: T[]) => React.ReactNode
}

export interface TableColumn<T> {
  key: string
  title: string
  width?: number | string
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export const Table = <T extends Record<string, any>>({
  data,
  columns,
  rowKey,
  onRowClick,
  groupBy,
  loading = false,
  renderGroupHeader,
}: TableProps<T>) => {
  const gridTemplateColumns = useMemo(
    () =>
      columns
        .map((c) => {
          if (typeof c.width === "number") return `${c.width}px`
          if (typeof c.width === "string") return c.width
          return "1fr"
        })
        .join(" "),
    [columns]
  )

  const getRowKey = useCallback(
    (record: T) => {
      return typeof rowKey === "function" ? rowKey(record) : record[rowKey]
    },
    [rowKey]
  )

  const groups = useMemo(() => {
    const result: Record<string, T[]> = {}
    if (groupBy) {
      const getGroupKey =
        typeof groupBy === "function"
          ? groupBy
          : (record: T) => record[groupBy as string]

      data.forEach((record) => {
        const key = getGroupKey(record)
        if (!result[key]) {
          result[key] = []
        }
        result[key].push(record)
      })
    } else {
      result[""] = [...data]
    }
    return result
  }, [data, groupBy])

  return (
    <TableContainer>
      <TableHeader gridTemplateColumns={gridTemplateColumns}>
        {columns.map((column) => (
          <TableHeaderCell key={column.key}>{column.title}</TableHeaderCell>
        ))}
      </TableHeader>

      <TableBody>
        {loading ? (
          <EmptyState colSpan={columns.length}>加载中...</EmptyState>
        ) : data.length === 0 ? (
          <EmptyState colSpan={columns.length}>暂无数据</EmptyState>
        ) : (
          Object.entries(groups).map(([groupKey, groupData]) => (
            <TableGroup
              key={groupKey}
              groupHeader={
                renderGroupHeader
                  ? renderGroupHeader(groupKey, groupData)
                  : groupKey
              }
              groupData={groupData}
              columns={columns as TableColumn<Record<string, any>>[]}
              gridTemplateColumns={gridTemplateColumns}
              onRowClick={
                onRowClick as
                  | ((record: Record<string, any>) => void)
                  | undefined
              }
              getRowKey={getRowKey as (rowData: Record<string, any>) => string}
            />
          ))
        )}
      </TableBody>
    </TableContainer>
  )
}

Table.getRowKey = <T extends Record<string, any>>(
  rowKey: string | ((record: T) => string),
  record: T
): string => {
  return typeof rowKey === "function" ? rowKey(record) : record[rowKey]
}

const TableContainer = styled.div`
  gap: 20px;
  width: 100%;
  display: flex;
  padding: 8px;
  border-radius: 8px;
  flex-direction: column;
  background-color: #f6f8f9;
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
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
`

const TableHeaderCell = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  padding: 12px 16px;
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
`

const EmptyState = styled.div<{colSpan: number}>`
  grid-column: 1 / span ${({colSpan}) => colSpan};
  padding: 48px 16px;
  text-align: center;
  color: ${colors.Neutral500};
`
