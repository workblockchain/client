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

import {useSignedRecord} from "@/stores/useSignedRecord"
import {FieldDefinition} from "./fieldDefinitions"
import {useTeam} from "./useTeam"

/**
 * 动态字段选项hook
 * 为字段定义动态绑定选项数据
 */
export function useDynamicFieldOptions(fields: FieldDefinition[]) {
  const getOptions = useTeam((state) => state.getOptions)
  const requirementRecords = useSignedRecord(
    (state) => state.requirementRecords
  )
  const projectRecords = useSignedRecord((state) => state.projectRecords)

  const teamOptions = getOptions()
  const requirementOptions = requirementRecords.map((record) => ({
    value: record.id,
    label: record.data.title || record.id,
  }))
  const projectOptions = projectRecords.map((record) => ({
    value: record.id,
    label: record.data.title || record.id,
  }))

  const dynamicFields = fields.map((field) => {
    switch (field.key) {
      case "userId":
      case "assignedTo":
        return {
          ...field,
          options: teamOptions,
        }
      case "requirementIds":
        return {
          ...field,
          options: requirementOptions,
        }
      case "projectIds":
        return {
          ...field,
          options: projectOptions,
        }
      case "contributors":
        return {
          ...field,
          options: teamOptions,
        }
      case "workTags":
      case "tags":
        // 这里可以为标签提供预设选项，或者留空让用户输入
        return {
          ...field,
          options: [], // 暂时留空，后续可以根据需要添加预设标签
        }
      default:
        return field
    }
  })

  return dynamicFields
}
