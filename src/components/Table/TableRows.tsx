import {colors} from "@/styles/colors"
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
   * 行的Key
   */
  key: string

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
  gridTemplateColumns: string

  /**
   * 行下标
   */
  rowIndex: number
}

export const TableRow = <T extends Record<string, any>>({
  columns,
  key,
  onRowClick,
  gridTemplateColumns,
  rowData,
  rowIndex,
}: TableRowProps<T>) => {
  return (
    <TableRowContainer
      key={key}
      onClick={() => onRowClick?.(rowData)}
      hasClickHandler={!!onRowClick}
      gridTemplateColumns={gridTemplateColumns}
    >
      {columns.map((column) => (
        <TableCell key={column.key}>
          {column.render
            ? column.render(rowData[column.key], rowData, rowIndex)
            : rowData[column.key]}
        </TableCell>
      ))}
    </TableRowContainer>
  )
}

const BaseGrid = styled.div<{gridTemplateColumns: string}>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({gridTemplateColumns}) => gridTemplateColumns};
`

const TableRowContainer = styled(BaseGrid)<{hasClickHandler?: boolean}>`
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
