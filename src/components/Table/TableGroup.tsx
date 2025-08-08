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
import {styled} from "styled-components"
import Row from "./TableRows"
import {ColumnProps, DataRecordFromColumns} from "./interfaces"

interface TableGroupProps<TColumns extends ReadonlyArray<ColumnProps<any>>> {
  /**
   * 表格列的配置
   */
  columns: TColumns

  /**
   * 分组表格列的配置
   */
  groupKey?: string

  /**
   * 行数据
   */
  rowData: DataRecordFromColumns<TColumns>[]
  rowHeights?: Record<number, number>

  /**
   * 行点击事件处理函数
   * @param record - 点击的行数据
   */
  clickRow?: (record: DataRecordFromColumns<TColumns>) => void
}

function TableGroup<TColumns extends ReadonlyArray<ColumnProps<string, any>>>({
  columns,
  rowData,
  rowHeights,
  groupKey,
  clickRow,
}: TableGroupProps<TColumns>) {
  return (
    <TableGroupContainer>
      {!!groupKey && <TableGroupHeader>{groupKey}</TableGroupHeader>}
      {rowData.map((row, index) => {
        const cols = columns.map((column) => ({
          ...column,
          value: row[column.key as keyof typeof row],
        })) as ReadonlyArray<ColumnProps<string, any>> as TColumns
        return (
          <Row<TColumns>
            key={index}
            onClick={() => clickRow?.(row)}
            columns={cols}
            height={rowHeights?.[index]}
          />
        )
      })}
    </TableGroupContainer>
  )
}

export default TableGroup

const TableGroupContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid ${colors.Neutral200};
  border-radius: 8px;
  overflow: hidden;
  background-color: #ffffff;
  & > div:not(:last-child) {
    border-bottom: 1px solid ${colors.Neutral200};
  }
  &:last-child {
    margin-bottom: 0;
  }
`

export const TableGroupHeader = styled.div`
  padding: 6px 16px;
  height: 100%;
`
