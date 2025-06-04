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
