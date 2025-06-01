import PlusIcon from "@/assets/plus.svg?react"
import VectorIcon from "@/assets/vector.svg?react"
import {colors} from "@/styles/colors"
import React from "react"
import styled from "styled-components"
import {Tag} from "../Tag/Tag"
import {CellProps, TableRow} from "./TableRow"

export interface TableGroupProps {
  groupName: string
  cells: CellProps[][]
  expanded: boolean
  onClick: () => void
  showAddRow?: boolean
}

export function TableGroup({
  groupName,
  cells,
  expanded: initialExpanded,
  onClick,
  showAddRow = true,
}: TableGroupProps) {
  const [expanded, setExpanded] = React.useState(initialExpanded)

  const handleClick = () => {
    setExpanded(!expanded)
    onClick?.()
  }
  return (
    <TableGroupContainer>
      <GroupHeader onClick={handleClick}>
        <VectorIcon
          width={14}
          height={14}
          style={{
            transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.2s ease",
          }}
        />
        <Tag size="large">{groupName}</Tag>
        <span>3 条记录</span>
      </GroupHeader>
      <GroupContent $expanded={expanded}>
        {cells.map((rowCells, index) => (
          <TableRow key={index} cells={rowCells} />
        ))}
        {showAddRow && (
          <AddRowTR>
            <PlusIcon width={24} height={24} />
          </AddRowTR>
        )}
      </GroupContent>
    </TableGroupContainer>
  )
}

const TableGroupContainer = styled.table`
  border-radius: 16px;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  border-collapse: collapse;
  border: solid rgba(0, 0, 0, 0.05) 1px;
  display: block;
`

const GroupHeader = styled.thead`
  display: flex;
  align-items: center;
  height: 54px;
  user-select: none;
  padding-left: 12px;
`

const GroupContent = styled.tbody<{$expanded: boolean}>`
  display: ${({$expanded}) => ($expanded ? "block" : "none")};
  width: 100%;
`

const AddRowTR = styled.tr`
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 8px 8px 12px;
  color: ${colors.Neutral500};
  width: 100%;
  display: flex;
  align-items: stretch;
`
