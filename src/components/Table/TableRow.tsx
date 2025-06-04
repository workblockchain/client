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
import {titlesOption} from "./Table"

export interface CellProps {
  type: "text" | "time" | "tag"
  children?: ReactNode
  width?: number
  id?: string
  renderText?: (value: boolean) => string
}

export interface TextCellProps extends CellProps {
  type: "text"
  data?: string | boolean | string[] | undefined | number
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
  titles?: titlesOption[]
}

export type TypedCellProps = TextCellProps | TimeCellProps | TagCellProps

function renderCellContent({
  type = "text",
  renderText,
  ...item
}: TypedCellProps) {
  if (item.children) return item.children
  try {
    switch (type) {
      case "text":
        return (
          <Text>
            {renderText ? renderText(item.data as boolean) : item.data}
          </Text>
        )
      case "time":
        const timeProps = item as TimeCellProps
        return timeProps.data ? (
          <DatePicker value={timeProps.data} format={"HMS"} />
        ) : (
          timeProps.data
        )
      case "tag":
        return (
          <Tag size="large">
            {renderText ? renderText(item.data as boolean) : item.data}
          </Tag>
        )
      default:
        return null
    }
  } catch (error) {
    console.error("Error rendering table cell:", error)
    return null
  }
}

export function TableRow({row, titles}: TableRowProps) {
  return (
    <Tr>
      {row.map(
        (item, index) =>
          !titles?.[index]?.hidden && (
            <Td key={index} width={titles?.[index]?.width}>
              {renderCellContent(item)}
            </Td>
          )
      )}
    </Tr>
  )
}

export default TableRow

export const Td = styled.div<{width?: number}>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({width}) =>
    width
      ? `
    width: ${width}px;
    flex: 0 0 ${width}px;
  `
      : `
    flex: 1;
  `}
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  padding: 8px;
  color: ${colors.Neutral500};
  overflow: hidden; /* Hides overflow content */
`

export const Tr = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  max-height: 70px;
`

const Text = styled.div`
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏超出内容 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
`
