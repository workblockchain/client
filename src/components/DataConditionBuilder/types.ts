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

export type ConditionType = "filter" | "group" | "sort"

export interface BaseCondition {
  id: string
  field: string
  condition: string
  value?: string | string[] | null
}

export interface ConditionDefinition {
  key: string
  label: string
  type: "text" | "number" | "date" | "select" | "multi-select"
  options?: {value: string; label: string}[]
  placeholder?: string
}

export interface DataConditionBuilderProps {
  conditions: BaseCondition[]
  availableFields: ConditionDefinition[]
  onConditionsChange: (conditions: BaseCondition[]) => void
  mode: ConditionType
  disabled?: boolean
  buttonLabel?: string
  flyoutTitle?: string
}

export interface ConditionRowProps {
  condition: BaseCondition
  availableFields: ConditionDefinition[]
  onUpdate: (id: string, updates: Partial<BaseCondition>) => void
  onRemove: (id: string) => void
  mode: string
  disabled?: boolean
}

export interface ModeConfig {
  defaultCondition: string
  allowMultiple: boolean
  valueRequired: boolean
}
