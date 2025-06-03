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

import PlusIcon from "@/assets/plus.svg?react"
import VectorIcon from "@/assets/vector.svg?react"
import {colors} from "@/styles/colors"
import React from "react"
import styled from "styled-components"
import {Tag} from "../Tag/Tag"
import {TableRow, TableRowProps} from "./TableRow"

export interface TableGroupProps {
  groupName?: string
  groupData: TableRowProps[]
  expanded?: boolean
  onClick?: () => void
  showAddRow?: boolean
}

export function TableGroup({
  groupName,
  groupData,
  expanded: initialExpanded = true,
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
      {groupName === undefined ? (
        <></>
      ) : (
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
          <span>{groupData.length} 条记录</span>
        </GroupHeader>
      )}
      <GroupContent $expanded={expanded}>
        {groupData.map(({row}, index) => (
          <TableRow key={index} row={row} />
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
