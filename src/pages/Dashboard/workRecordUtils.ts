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

import {ConditionDefinition} from "@/components/DataConditionBuilder/types"
import type {HookFormFieldDefinition} from "@/components/DataFormDrawer/types"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {FieldDefinition} from "./fieldDefinitions"
import {WorkRecord} from "./interfaces"

/**
 * 将 WorkRecordFieldDefinition 转换为 ColumnDef
 */
export function workRecordFieldToColumnDef(
  fieldDef: FieldDefinition
): ColumnDef<WorkRecord> {
  const columnDef: ColumnDef<WorkRecord> = {
    accessorKey: fieldDef.key,
    header: t(fieldDef.label),
    size: fieldDef.size,
  }

  // 如果有自定义单元格渲染器，添加 cell 属性
  if (fieldDef.cellRenderer) {
    columnDef.cell = ({getValue}) => fieldDef.cellRenderer!(getValue())
  }

  return columnDef
}

/**
 * 将 WorkRecordFieldDefinition 数组转换为 ColumnDef 数组
 */
export function workRecordFieldsToColumnDefs(
  fieldDefs: FieldDefinition[]
): ColumnDef<WorkRecord>[] {
  return fieldDefs
    .filter((fieldDef) => !fieldDef.hidden)
    .map(workRecordFieldToColumnDef)
}

/**
 * 将 WorkRecordFieldDefinition 转换为 ConditionDefinition
 */
export function workRecordFieldToConditionDefinition(
  fieldDef: FieldDefinition
): ConditionDefinition {
  // 将 boolean 类型映射为 select 类型并提供选项
  let mappedType: ConditionDefinition["type"]
  let options = fieldDef.options

  if (fieldDef.type === "boolean") {
    mappedType = "select"
    options = [
      {value: "true", label: t`work.signed`},
      {value: "false", label: t`work.unsigned`},
    ]
  } else {
    // 其他类型直接映射
    mappedType = fieldDef.type
  }

  const conditionDef: ConditionDefinition = {
    key: fieldDef.key,
    label: t(fieldDef.label),
    type: mappedType,
  }

  // 添加可选属性
  if (options) {
    conditionDef.options = options
  }

  if (fieldDef.placeholder) {
    conditionDef.placeholder = fieldDef.placeholder
  }

  return conditionDef
}

/**
 * 将 WorkRecordFieldDefinition 数组转换为 ConditionDefinition 数组
 */
export function fieldsToConditionDefinitions(
  fieldDefs: FieldDefinition[]
): ConditionDefinition[] {
  return fieldDefs.map(workRecordFieldToConditionDefinition)
}

/**
 * 将任意 FieldDefinition 转换为 ColumnDef
 */
function fieldDefinitionToColumnDef<T>(
  fieldDef: FieldDefinition
): ColumnDef<T> {
  const columnDef: ColumnDef<T> = {
    accessorKey: fieldDef.key,
    header: t(fieldDef.label),
    size: fieldDef.size,
  }

  // 如果有自定义单元格渲染器，添加 cell 属性
  if (fieldDef.cellRenderer) {
    columnDef.cell = ({getValue}) => fieldDef.cellRenderer!(getValue())
  }

  return columnDef
}

/**
 * 将任意 FieldDefinition 数组转换为 ColumnDef 数组
 */
export function fieldDefinitionsToColumnDefs<T>(
  fieldDefs: FieldDefinition[]
): ColumnDef<T>[] {
  return fieldDefs
    .filter((fieldDef) => !fieldDef.hidden)
    .map(fieldDefinitionToColumnDef<T>)
}

/**
 * 将任意 FieldDefinition 转换为 ConditionDefinition
 */
function fieldDefinitionToConditionDefinition(
  fieldDef: FieldDefinition
): ConditionDefinition {
  // 将 boolean 类型映射为 select 类型并提供选项
  let mappedType: ConditionDefinition["type"]
  let options = fieldDef.options

  if (fieldDef.type === "boolean") {
    mappedType = "select"
    options = [
      {value: "true", label: t`work.signed`},
      {value: "false", label: t`work.unsigned`},
    ]
  } else {
    // 其他类型直接映射
    mappedType = fieldDef.type
  }

  const conditionDef: ConditionDefinition = {
    key: fieldDef.key,
    label: t(fieldDef.label),
    type: mappedType,
  }

  // 添加可选属性
  if (options) {
    conditionDef.options = options
  }

  if (fieldDef.placeholder) {
    conditionDef.placeholder = fieldDef.placeholder
  }

  return conditionDef
}

/**
 * 将任意 FieldDefinition 数组转换为 ConditionDefinition 数组
 */
export function fieldDefinitionsToConditionDefinitions(
  fieldDefs: FieldDefinition[]
): ConditionDefinition[] {
  return fieldDefs.map(fieldDefinitionToConditionDefinition)
}

/**
 * 将 FieldDefinition 转换为 FormFieldDefinition
 */
export function fieldDefinitionToHookFormDefinition(
  fieldDef: FieldDefinition
): HookFormFieldDefinition {
  // 处理类型映射
  let mappedType: HookFormFieldDefinition["type"]
  switch (fieldDef.type) {
    case "boolean":
      mappedType = "checkbox"
      break
    default:
      mappedType = fieldDef.type
  }

  const baseField: HookFormFieldDefinition = {
    key: fieldDef.key,
    label: fieldDef.label,
    type: mappedType,
    placeholder: fieldDef.placeholder,
  }

  // 添加选项（对于 select 和 multi-select 类型很重要）
  if (fieldDef.options) {
    baseField.options = fieldDef.options
  }

  // 添加隐藏状态
  if (fieldDef.hidden) {
    baseField.hidden = fieldDef.hidden
  }

  // 添加验证规则
  if (fieldDef.key === "duration") {
    baseField.validation = {
      min: 0,
    }
  }

  // 对于 boolean 类型，设置默认值
  if (fieldDef.type === "boolean") {
    baseField.defaultValue = false
  }

  return baseField
}

/**
 * 通用的分组排序函数
 */
export function createGroupSort<T>(
  fieldDefs: FieldDefinition[],
  groupConditions: {field: string; condition: string}[]
) {
  return (key: string, a: T, b: T) => {
    const def = fieldDefs.find((f) => f.key === key)
    if (!def) return 0
    // TODO: handle any
    const valueA = (a as any)[def.key]
    const valueB = (b as any)[def.key]
    let res = 0
    switch (def.type) {
      case "text":
        res = String(valueA).localeCompare(String(valueB))
        break
      case "number":
        res = Number(valueA) - Number(valueB)
        break
      case "date":
        res = new Date(valueA).getTime() - new Date(valueB).getTime()
        break
      case "select":
        res = String(valueA).localeCompare(String(valueB))
        break
      case "multi-select":
        res = String(valueA).localeCompare(String(valueB))
        break
      case "boolean":
        const boolA = valueA ? 1 : 0
        const boolB = valueB ? 1 : 0
        res = boolA - boolB
        break
    }
    const sort = groupConditions.find((c) => c.field === key)
    return sort?.condition === "desc" ? -res : res
  }
}
