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

import {ReactNode} from "react"

export interface ColumnProps<TKey extends string, TValue = unknown> {
  readonly key: TKey
  readonly title?: string
  readonly value?: TValue
  readonly width?: number
  readonly render?: (value?: TValue, key?: TKey, index?: number) => ReactNode
  readonly clickCell?: (value?: TValue) => void
}

export interface RowProps<
  TColumns extends ReadonlyArray<ColumnProps<string, any>>,
> {
  height?: number
  columns: TColumns
  onClick?: (record?: DataRecordFromColumns<TColumns>) => void
}

export type DataRecordFromColumns<
  TColumns extends ReadonlyArray<ColumnProps<string, any>>,
> = {
  -readonly [C in TColumns[number] as C["key"]]: C extends ColumnProps<
    string,
    infer TValue
  >
    ? TValue
    : never
}
