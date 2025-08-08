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

import {Fragment, HTMLAttributes, ReactNode, useMemo} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"
import {ColumnProps, DataRecordFromColumns} from "./interfaces"
import Group, {TableGroupHeader} from "./TableGroup"
import {DEFAULT_WIDTH} from "./TableRows"
export interface TableProps<
  TColumns extends ReadonlyArray<ColumnProps<string, any>>,
> {
  /**
   * 表格列的配置
   */
  columns: TColumns

  /**
   * 表格的数据源
   */
  data: DataRecordFromColumns<TColumns>[]

  /**
   * 是否显示加载状态
   * @default false
   */
  loading?: boolean

  /**
   * 行点击事件处理函数
   * @param record - 点击的行数据
   */
  clickRow?: (record: DataRecordFromColumns<TColumns>) => void

  /**
   * 分组依据，column key
   */
  groupBy?: (keyof DataRecordFromColumns<TColumns>)[]
}

export function Table<TColumn extends ReadonlyArray<ColumnProps<string, any>>>({
  data,
  columns,
  clickRow,
  groupBy,
  loading = false,
}: TableProps<TColumn>) {
  const isGrouped = !groupBy || groupBy.length === 0

  return (
    <TableContainer>
      <TableHeader>
        {columns.map(({key, title, width}) => (
          <TableHeaderCell key={key} style={{width: width ?? DEFAULT_WIDTH}}>
            {title}
          </TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        {loading && <EmptyState colSpan={columns.length}>加载中...</EmptyState>}
        {data.length === 0 && (
          <EmptyState colSpan={columns.length}>暂无数据</EmptyState>
        )}
        {isGrouped ? (
          <Group rowData={data} columns={columns} clickRow={clickRow} />
        ) : (
          <NestedGroup<DataRecordFromColumns<TColumn>[]>
            groupKey={groupBy[0] as string}
            remainingGroups={groupBy.slice(1)}
            data={data}
          >
            {(data) => (
              <Group rowData={data} columns={columns} clickRow={clickRow} />
            )}
          </NestedGroup>
        )}
      </TableBody>
    </TableContainer>
  )
}

interface NestedGroupProps<TData extends Record<string, unknown>[]>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  groupKey: string
  remainingGroups: string[]
  data: TData
  showEmpty?: boolean
  children: (data: TData) => ReactNode
}
function NestedGroup<TData extends Record<string, unknown>[]>({
  groupKey,
  remainingGroups,
  data,
  children,
  showEmpty,
  ...props
}: NestedGroupProps<TData>) {
  const grouped = useMemo(
    () =>
      data.reduce<Record<string, TData>>((acc, item) => {
        const groupValue = String(item[groupKey])
        if (!acc[groupValue]) {
          acc[groupValue] = [] as unknown as TData
        }
        acc[groupValue].push(item)
        return acc
      }, {}),
    [groupKey, data]
  )
  if (!showEmpty && data.length === 0) return null
  if (remainingGroups.length === 0) return children(data)
  return (
    <NestedGroupContainer {...props}>
      {Object.entries(grouped).map(([value, groupData]) => (
        <Fragment key={value}>
          <TableGroupHeader>{value}</TableGroupHeader>
          <NestedGroup
            groupKey={remainingGroups[0]}
            remainingGroups={remainingGroups.slice(1)}
            data={groupData}
          >
            {children}
          </NestedGroup>
        </Fragment>
      ))}
    </NestedGroupContainer>
  )
}

const NestedGroupContainer = styled.div``

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
`

const EmptyState = styled.div<{colSpan: number}>`
  grid-column: 1 / span ${({colSpan}) => colSpan};
  padding: 48px 16px;
  text-align: center;
  color: ${colors.Neutral500};
`
