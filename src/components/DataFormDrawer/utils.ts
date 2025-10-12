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

import type {ColumnDef} from "@tanstack/react-table"
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

/**
 * 基于Table Columns自动生成表单字段定义
 * @param columns 表格列定义
 * @param excludedKeys 需要排除的字段键名
 * @returns 表单字段定义数组
 */
export function generateFormFieldsFromColumns<TData>(
  columns: ColumnDef<TData>[],
  excludedKeys: string[] = []
): FormFieldDefinition[] {
  const formFields: FormFieldDefinition[] = []

  columns.forEach((column) => {
    const accessorKey = (column as any).accessorKey as string
    const id = (column as any).id as string
    const key = accessorKey || id

    // 跳过没有有效键的列和排除的键
    if (!key || excludedKeys.includes(key)) {
      return
    }

    // 获取列标题
    const header = column.header
    const label = typeof header === "string" ? header : "字段"

    // 根据列类型推断表单字段类型
    const fieldType = inferFieldTypeFromColumn(column)

    const formField: FormFieldDefinition = {
      key,
      label,
      type: fieldType,
      required: false, // 默认非必填，可根据需要调整
    }

    // 为选择器类型添加选项（如果有的话）
    if (fieldType === "select" && (column as any).meta?.options) {
      formField.options = (column as any).meta.options
    }

    formFields.push(formField)
  })

  return formFields
}

/**
 * 根据表格列推断表单字段类型
 * @param column 表格列定义
 * @returns 表单字段类型
 */
function inferFieldTypeFromColumn<TData>(
  column: ColumnDef<TData>
): FormFieldDefinition["type"] {
  // 检查列元数据中是否有明确的表单类型
  if ((column as any).meta?.formType) {
    return (column as any).meta.formType
  }

  // 根据列ID或访问器键名推断类型
  const accessorKey = (column as any).accessorKey as string
  const id = (column as any).id as string
  const key = accessorKey || id

  if (!key) {
    return "text"
  }

  // 根据常见字段名推断类型
  const keyLower = key.toLowerCase()

  if (keyLower.includes("date") || keyLower.includes("time")) {
    return "date"
  }

  if (
    keyLower.includes("amount") ||
    keyLower.includes("price") ||
    keyLower.includes("quantity") ||
    keyLower.includes("count")
  ) {
    return "number"
  }

  if (keyLower.includes("description") || keyLower.includes("content")) {
    return "textarea"
  }

  if (keyLower.includes("status") || keyLower.includes("type")) {
    return "select"
  }

  if (keyLower.includes("active") || keyLower.includes("enabled")) {
    return "checkbox"
  }

  // 默认返回文本类型
  return "text"
}
