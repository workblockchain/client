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

import {DateFormat} from "@/utils"
import {ReactNode} from "react"

export interface TitlesOption extends TdOptions {
  title: string
  filter?: (row: TypedCellProps) => boolean
  hidden?: boolean
}

type AlignType = "left" | "center" | "right"
export interface TdOptions {
  width?: number
  align?: AlignType
}

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
  format?: DateFormat
}

export interface TagCellProps extends CellProps {
  type: "tag"
  data?: string
}
export interface TableRowProps {
  row: TypedCellProps[]
  titles?: TitlesOption[]
}

export type TypedCellProps = TextCellProps | TimeCellProps | TagCellProps
