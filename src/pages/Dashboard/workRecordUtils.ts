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
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {WorkRecord, WorkRecordFieldDefinition} from "./interfaces"

/**
 * 将 WorkRecordFieldDefinition 转换为 ColumnDef
 */
export function workRecordFieldToColumnDef(
  fieldDef: WorkRecordFieldDefinition
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
  fieldDefs: WorkRecordFieldDefinition[]
): ColumnDef<WorkRecord>[] {
  return fieldDefs
    .filter((fieldDef) => !fieldDef.hidden)
    .map(workRecordFieldToColumnDef)
}

/**
 * 将 WorkRecordFieldDefinition 转换为 ConditionDefinition
 */
export function workRecordFieldToConditionDefinition(
  fieldDef: WorkRecordFieldDefinition
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
export function workRecordFieldsToConditionDefinitions(
  fieldDefs: WorkRecordFieldDefinition[]
): ConditionDefinition[] {
  return fieldDefs.map(workRecordFieldToConditionDefinition)
}

/**
 * 获取可见的字段定义（非隐藏字段）
 */
export function getVisibleWorkRecordFieldDefinitions(
  fieldDefs: WorkRecordFieldDefinition[]
): WorkRecordFieldDefinition[] {
  return fieldDefs.filter((fieldDef) => !fieldDef.hidden)
}

/**
 * 获取所有字段定义（包括隐藏字段）
 */
export function getAllWorkRecordFieldDefinitions(
  fieldDefs: WorkRecordFieldDefinition[]
): WorkRecordFieldDefinition[] {
  return fieldDefs
}
