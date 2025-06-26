import {colors} from "@/styles/colors"
import {styled} from "styled-components"
import {TableColumn, TableRow} from "./TableRows"

interface TableGroupProps<T> {
  key: string

  /**
   * 表格列的配置
   */
  columns: TableColumn<T>[]

  /**
   * 自定义分组头部渲染函数
   * @param groupKey - 分组的键值
   * @param groupData - 分组的数据
   * @returns 自定义的分组头部节点
   */
  groupHeader?: React.ReactNode

  /**
   * 分组数据
   */
  groupData: T[]

  /**
   * 行点击事件处理函数
   * @param record - 点击的行数据
   */
  onRowClick?: (record: T) => void

  /**
   * 布局配置
   */
  gridTemplateColumns: string

  getRowKey: (rowData: T) => string
}

export const TableGroup = <T extends Record<string, any>>({
  key,
  columns,
  groupData,
  groupHeader,
  getRowKey,
  gridTemplateColumns,
  onRowClick,
}: TableGroupProps<T>) => {
  return (
    <TableGroupContainer key={key}>
      {groupHeader == "" ? null : (
        <TableGroupHeader colSpan={columns.length}>
          {groupHeader ?? "没有分组"}
        </TableGroupHeader>
      )}

      {groupData.map((rowData, index) => (
        <TableRow
          key={getRowKey(rowData)}
          onRowClick={() => onRowClick?.(rowData)}
          gridTemplateColumns={gridTemplateColumns}
          columns={columns}
          rowData={rowData}
          rowIndex={index}
        ></TableRow>
      ))}
    </TableGroupContainer>
  )
}

const TableGroupContainer = styled.div`
  margin-bottom: 8px;
  border: 1px solid ${colors.Table.Border};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${colors.Table.TitleBackground};
  &:last-child {
    margin-bottom: 0;
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
