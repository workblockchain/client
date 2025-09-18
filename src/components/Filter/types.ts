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

export type FilterType = "text" | "number" | "date" | "select" | "multi-select"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterDefinition {
  key: string
  label: string
  type: FilterType
  options?: FilterOption[]
  placeholder?: string
  size?: "small" | "medium" | "large"
}

export interface FilterState {
  [key: string]: string | string[] | null
}

export type FilterOperator =
  | "equal"
  | "notEqual"
  | "contains"
  | "notContains"
  | "empty"
  | "notEmpty"

export interface FilterCondition {
  id: string
  field: string
  operator: FilterOperator
  value: string | string[] | null
}

export interface FilterProps {
  filters: FilterDefinition[]
  values: FilterState
  onChange: (values: FilterState) => void
  disabled?: boolean
  className?: string
  onConditionsChange?: (conditions: FilterCondition[]) => void
}
