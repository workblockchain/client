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
import {ReactNode} from "react"
import styled from "styled-components"
import {DatePicker} from "../DatePicker/DatePicker"
import {Tag} from "../Tag/Tag"

export interface CellProps {
  type: "text" | "time" | "tag"
  children?: ReactNode
  width?: number
  id?: string
}

export interface TextCellProps extends CellProps {
  type: "text"
  data?: string | boolean | string[] | undefined
}

export interface TimeCellProps extends CellProps {
  type: "time"
  data?: number
  format?: "YMD" | "MD" | "HM" | "M" | "S" | "HMS"
}

export interface TagCellProps extends CellProps {
  type: "tag"
  data?: string
}
export interface TableRowProps {
  row: TypedCellProps[]
}

export type TypedCellProps = TextCellProps | TimeCellProps | TagCellProps

function renderCellContent({type = "text", ...item}: TypedCellProps) {
  if (item.children) return item.children

  try {
    switch (type) {
      case "text":
        return <span>{item.data}</span>
      case "time":
        const timeProps = item as TimeCellProps
        return timeProps.data ? (
          <DatePicker value={timeProps.data} format={"HMS"} />
        ) : (
          timeProps.data
        )
      case "tag":
        return <Tag size="large">{item.data}</Tag>
      default:
        return null
    }
  } catch (error) {
    console.error("Error rendering table cell:", error)
    return null
  }
}

export function TableRow({row}: TableRowProps) {
  return (
    <Tr>
      {row.map((item, index) => (
        <Td key={item.id || index}>{renderCellContent(item)}</Td>
      ))}
    </Tr>
  )
}

export default TableRow

export const Td = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 8px;
  color: ${colors.Neutral500};
  overflow: hidden; /* Hides overflow content */
  white-space: nowrap; /* Prevents text from wrapping */
  text-overflow: ellipsis; /* Displays ellipsis (...) for overflow text */
`

export const Tr = styled.tr`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-height: 70px;
`
