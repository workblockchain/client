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

import {FilterCondition, FilterOperator} from "./types"

// 验证日期字符串是否有效
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

// 判断是否应该使用多选模式（用于新条件）
export const shouldUseMultiSelect = (
  selectedFilter: any,
  operator: FilterOperator | undefined
): boolean => {
  if (!selectedFilter || !selectedFilter.options) return false
  const multiSelectOperators: FilterOperator[] = [
    "equal",
    "notEqual",
    "contains",
    "notContains",
  ]
  return (
    multiSelectOperators.includes(operator || "contains") &&
    (selectedFilter.type === "select" || selectedFilter.type === "multi-select")
  )
}

// 判断是否应该使用多选模式（用于现有条件）
export const shouldUseMultiSelectForCondition = (
  condition: FilterCondition,
  filters: any[]
): boolean => {
  const conditionFilter = filters.find((f) => f.key === condition.field)
  if (!conditionFilter || !conditionFilter.options) return false
  const multiSelectOperators: FilterOperator[] = [
    "equal",
    "notEqual",
    "contains",
    "notContains",
  ]
  return (
    multiSelectOperators.includes(condition.operator) &&
    (conditionFilter.type === "select" ||
      conditionFilter.type === "multi-select")
  )
}

export const operatorOptions = [
  {value: "equal", label: "等于"},
  {value: "notEqual", label: "不等于"},
  {value: "contains", label: "包含"},
  {value: "notContains", label: "不包含"},
  {value: "empty", label: "为空"},
  {value: "notEmpty", label: "不为空"},
]
