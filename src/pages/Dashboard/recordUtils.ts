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

import type {BaseCondition} from "@/components/DataConditionBuilder/types"

/**
 * 应用筛选条件到记录数组
 */
export function applyFilterConditions<T extends Record<string, any>>(
  records: T[],
  filterConditions: BaseCondition[]
): T[] {
  if (filterConditions.length === 0) {
    return records
  }

  return records.filter((record) => {
    return filterConditions.every((condition) => {
      const value = record[condition.field as keyof T]

      switch (condition.condition) {
        case "equal":
          // 当value为空字符串时，默认返回true（所有值都放行）
          return condition.value === ""
            ? true
            : String(value) === condition.value
        case "notEqual":
          // 当value为空字符串时，默认返回true（所有值都放行）
          return condition.value === ""
            ? true
            : String(value) !== condition.value
        case "contains":
          // 当value为空字符串时，默认返回true（所有值都放行）
          return condition.value === ""
            ? true
            : String(value).includes(condition.value as string)
        case "notContains":
          // 当value为空字符串时，默认返回true（所有值都放行）
          return condition.value === ""
            ? true
            : !String(value).includes(condition.value as string)
        case "empty":
          return value === "" || value === null || value === undefined
        case "notEmpty":
          return value !== "" && value !== null && value !== undefined
        case "greaterThan":
          return Number(value) > Number(condition.value)
        case "lessThan":
          return Number(value) < Number(condition.value)
        case "between":
          if (Array.isArray(condition.value) && condition.value.length === 2) {
            const [min, max] = condition.value
            return Number(value) >= Number(min) && Number(value) <= Number(max)
          }
          return true
        default:
          return true
      }
    })
  })
}

/**
 * 应用排序条件到记录数组
 */
export function applySortConditions<T extends Record<string, any>>(
  records: T[],
  sortConditions: BaseCondition[]
): T[] {
  if (sortConditions.length === 0) {
    return records
  }

  return [...records].sort((a, b) => {
    for (const condition of sortConditions) {
      const valueA = a[condition.field as keyof T]
      const valueB = b[condition.field as keyof T]

      // 处理undefined或null值
      if (valueA === undefined || valueA === null) return 1
      if (valueB === undefined || valueB === null) return -1

      let comparison = 0
      if (valueA < valueB) comparison = -1
      if (valueA > valueB) comparison = 1

      // 如果当前条件可以决定顺序，返回结果
      if (comparison !== 0) {
        return condition.value === "desc" ? -comparison : comparison
      }
    }
    return 0
  })
}

/**
 * 应用筛选和排序条件到记录数组
 */
export function applyConditions<T extends Record<string, any>>(
  records: T[],
  filterConditions: BaseCondition[],
  sortConditions: BaseCondition[]
): T[] {
  const filtered = applyFilterConditions(records, filterConditions)
  return applySortConditions(filtered, sortConditions)
}
