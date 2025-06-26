import {colors} from "@/styles/colors"
import styled from "styled-components"

interface TableCellProps {
  key: string
  children: string
}

export const TableCell = ({key, children}: TableCellProps) => {
  return <TableCellContainer key={key}>{children ?? "空"}</TableCellContainer>
}

const TableCellContainer = styled.div`
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
`
