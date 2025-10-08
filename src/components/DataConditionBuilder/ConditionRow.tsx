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

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Input} from "../Input"
import {Ratio} from "../Ratio"
import {Select} from "../Select"
import {ConditionContainer, RemoveButton} from "./ConditionRow.styles"
import {BaseCondition, ConditionRowProps} from "./types"

const getConditionOptions = (mode: string, fieldType?: string) => {
  if (mode === "sort" || mode === "group") {
    return [
      {value: "asc", label: "A-Z"},
      {value: "desc", label: "Z-A"},
    ]
  }

  if (mode === "filter") {
    let mid = []
    switch (fieldType) {
      case "number":
        mid = [
          {value: "greaterThan", label: "大于"},
          {value: "lessThan", label: "小于"},
        ]
        break
      case "date":
        mid = [
          {value: "greaterThan", label: "晚于"},
          {value: "lessThan", label: "早于"},
        ]
        break
      default: // text select multi-select boolean
        mid = [
          {value: "contains", label: "包含"},
          {value: "notContains", label: "不包含"},
        ]
    }
    return [
      {value: "equal", label: "等于"},
      {value: "notEqual", label: "不等于"},
      ...mid,
      {value: "empty", label: "为空"},
      {value: "notEmpty", label: "不为空"},
    ]
  }

  return []
}

export const ConditionRow = ({
  condition,
  availableFields,
  onUpdate,
  onRemove,
  mode,
}: ConditionRowProps) => {
  const fieldOptions = availableFields.map((field) => ({
    value: field.key,
    label: field.label,
  }))

  // 获取当前选中字段的类型
  const selectedField = availableFields.find(
    (field) => field.key === condition.field
  )
  const fieldType = selectedField?.type

  const conditionOptions = getConditionOptions(mode, fieldType)

  return (
    <ConditionContainer>
      <Select
        options={fieldOptions}
        value={condition.field}
        onChange={(value: string | string[] | undefined) => {
          const newField = Array.isArray(value) ? value[0] || "" : value || ""
          // 获取新字段的类型
          const newSelectedField = availableFields.find(
            (field) => field.key === newField
          )
          const newFieldType = newSelectedField?.type

          // 如果字段类型发生变化，清空value值
          const updates: Partial<BaseCondition> = {field: newField}
          if (fieldType !== newFieldType) {
            updates.value = ""
          }
          onUpdate(condition.id, updates)
        }}
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
          onChange={(value: string | string[] | undefined) => {
            const newCondition = Array.isArray(value)
              ? value[0] || ""
              : value || ""
            // 当选择为空或不为空条件时，自动清空value值
            const updates: Partial<BaseCondition> = {condition: newCondition}
            if (newCondition === "empty" || newCondition === "notEmpty") {
              updates.value = ""
            }
            onUpdate(condition.id, updates)
          }}
          size="small"
          placeholder="选择条件"
        />
      )}

      {mode === "filter" &&
        condition.condition !== "empty" &&
        condition.condition !== "notEmpty" && (
          <>
            {fieldType === "date" ? (
              <DatePicker
                selected={
                  condition.value ? new Date(Number(condition.value)) : null
                }
                onChange={(date: Date | null) => {
                  onUpdate(condition.id, {
                    value: date ? date.getTime().toString() : "",
                  })
                }}
                placeholderText="选择日期"
                dateFormat="yyyy-MM-dd"
                customInput={
                  <Input
                    style={{width: "100px"}}
                    $size="small"
                    $align="start"
                  />
                }
              />
            ) : (
              <Input
                value={condition.value || ""}
                onChange={(e) =>
                  onUpdate(condition.id, {value: e.target.value})
                }
                placeholder="值"
                style={{width: "100px"}}
                $size="small"
                $align="start"
              />
            )}
          </>
        )}

      <RemoveButton onClick={() => onRemove(condition.id)}>×</RemoveButton>
    </ConditionContainer>
  )
}
