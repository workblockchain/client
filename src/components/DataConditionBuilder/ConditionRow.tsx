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

import {Input} from "../Input"
import {Ratio} from "../Ratio"
import {Select} from "../Select"
import {ConditionContainer, RemoveButton} from "./ConditionRow.styles"
import {ConditionRowProps} from "./types"

const getConditionOptions = (mode: string) => {
  switch (mode) {
    case "filter":
      return [
        {value: "equal", label: "等于"},
        {value: "notEqual", label: "不等于"},
        {value: "contains", label: "包含"},
        {value: "notContains", label: "不包含"},
        {value: "empty", label: "为空"},
        {value: "notEmpty", label: "不为空"},
      ]
    case "sort":
      return [
        {value: "asc", label: "升序"},
        {value: "desc", label: "降序"},
      ]
    case "group":
      return [
        {value: "asc", label: "A-Z"},
        {value: "desc", label: "Z-A"},
      ]
    default:
      return []
  }
}

export const ConditionRow = ({
  condition,
  availableFields,
  onUpdate,
  onRemove,
  mode,
}: ConditionRowProps) => {
  const fieldOptions = [
    {value: "", label: "选择字段"},
    ...availableFields.map((field) => ({
      value: field.key,
      label: field.label,
    })),
  ]

  const conditionOptions = getConditionOptions(mode)

  return (
    <ConditionContainer>
      <Select
        options={fieldOptions}
        value={condition.field}
        onChange={(value: string | string[] | undefined) =>
          onUpdate(condition.id, {
            field: Array.isArray(value) ? value[0] || "" : value || "",
          })
        }
        size="small"
        placeholder="选择字段"
      />

      {mode === "group" || mode === "sort" ? (
        <Ratio
          options={[
            {key: "asc", value: "A-Z"},
            {key: "desc", value: "Z-A"},
          ]}
          value={condition.condition}
          onChange={(key) => onUpdate(condition.id, {condition: key})}
          disabled={!condition.field}
          size="small"
        />
      ) : (
        <Select
          options={conditionOptions}
          value={condition.condition}
          onChange={(value: string | string[] | undefined) =>
            onUpdate(condition.id, {
              condition: Array.isArray(value) ? value[0] || "" : value || "",
            })
          }
          size="small"
          placeholder="选择条件"
        />
      )}

      {mode === "filter" && (
        <Input
          value={condition.value || ""}
          onChange={(e) => onUpdate(condition.id, {value: e.target.value})}
          placeholder="值"
          style={{width: "100px"}}
          $size="small"
          $align="start"
        />
      )}

      <RemoveButton onClick={() => onRemove(condition.id)}>×</RemoveButton>
    </ConditionContainer>
  )
}
