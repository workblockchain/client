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

import type {FormFieldDefinition} from "./types"

/**
 * 获取字段的默认值
 * @param field 字段定义
 * @returns 默认值
 */
export function getFieldDefaultValue(
  field: FormFieldDefinition
): string | number | boolean {
  if (field.defaultValue !== undefined) {
    return field.defaultValue
  }

  switch (field.type) {
    case "text":
    case "textarea":
      return ""
    case "number":
      return 0
    case "select":
      return field.options?.[0]?.value || ""
    case "date":
      return new Date().toISOString().split("T")[0]
    case "checkbox":
      return false
    default:
      return ""
  }
}

/**
 * 初始化表单数据
 * @param fields 字段定义
 * @param initialData 初始数据
 * @returns 初始化后的表单数据
 */
export function initializeFormData(
  fields: FormFieldDefinition[],
  initialData: Record<string, string | number | boolean> = {}
): Record<string, string | number | boolean> {
  const data: Record<string, string | number | boolean> = {}

  fields.forEach((field) => {
    if (field.hidden) return

    if (initialData[field.key] !== undefined) {
      data[field.key] = initialData[field.key]
    } else {
      data[field.key] = getFieldDefaultValue(field)
    }
  })

  return data
}
