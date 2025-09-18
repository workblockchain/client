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

import {useEffect, useState} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Button} from "../Button"
import {svgIcons} from "../Icons"
import {Input} from "../Input/Input"
import {Select} from "../Select/Select"
import {EditableCondition} from "./Filter.styles"
import {isValidDate, shouldUseMultiSelectForCondition} from "./Filter.utils"
import {
  FilterCondition as FilterConditionType,
  FilterDefinition,
  FilterProps,
} from "./types"

interface FilterConditionProps {
  condition: FilterConditionType
  filters: FilterProps["filters"]
  onUpdate: (id: string, updates: Partial<FilterConditionType>) => void
  onRemove: (id: string) => void
  operatorOptions: Array<{value: string; label: string}>
}

export const FilterCondition = ({
  condition,
  filters,
  onUpdate,
  onRemove,
  operatorOptions,
}: FilterConditionProps) => {
  const [selectedFilter, setSelectedFilter] = useState<
    FilterDefinition | undefined
  >(filters.find((f) => f.key === condition.field))

  // Update selected filter when condition field changes
  useEffect(() => {
    const newSelectedFilter = filters.find((f) => f.key === condition.field)
    setSelectedFilter(newSelectedFilter)
  }, [condition.field, filters])

  const handleFieldChange = (value?: string | string[]) => {
    const field = Array.isArray(value) ? value[0] || "" : value || ""
    const updates: Partial<FilterConditionType> = {field}

    // Set default value based on field type
    const filter = filters.find((f) => f.key === field)
    if (filter) {
      switch (filter.type) {
        case "number":
          updates.value = "0"
          break
        case "date":
          updates.value = null
          break
        case "text":
        case "select":
        case "multi-select":
        default:
          updates.value = ""
          break
      }
    }

    onUpdate(condition.id, updates)
  }

  return (
    <EditableCondition key={condition.id}>
      <Select
        value={condition.field}
        onChange={handleFieldChange}
        options={filters.map((f) => ({
          value: f.key,
          label: f.label,
        }))}
        isSearchable={true}
        containerStyle={{minWidth: "120px", height: "24px"}}
        size="x-small"
        placeholder="选择字段"
      />
      <Select
        value={condition.operator}
        onChange={(value) =>
          onUpdate(condition.id, {
            operator: value as FilterConditionType["operator"],
          })
        }
        options={operatorOptions}
        isSearchable={true}
        containerStyle={{minWidth: "100px", height: "24px"}}
        size="x-small"
        placeholder="选择操作符"
      />
      {condition.operator !== "empty" &&
        condition.operator !== "notEmpty" &&
        selectedFilter && (
          <>
            {/* 文本输入框 */}
            {selectedFilter.type === "text" && (
              <Input
                type="text"
                value={(condition.value as string) || ""}
                onChange={(e) =>
                  onUpdate(condition.id, {
                    value: e.target.value,
                  })
                }
                placeholder={selectedFilter.placeholder || "值"}
                style={{
                  minWidth: "100px",
                  padding: "1px 4px",
                  height: "24px",
                  fontSize: "12px",
                }}
              />
            )}

            {/* 数字输入框 */}
            {selectedFilter.type === "number" && (
              <Input
                type="number"
                value={(condition.value as string) || ""}
                onChange={(e) =>
                  onUpdate(condition.id, {
                    value: e.target.value,
                  })
                }
                placeholder={selectedFilter.placeholder || "数值"}
                style={{
                  minWidth: "100px",
                  padding: "1px 4px",
                  height: "24px",
                  fontSize: "12px",
                }}
              />
            )}

            {/* 日期选择器 */}
            {selectedFilter.type === "date" && (
              <DatePicker
                selected={
                  condition.value && isValidDate(condition.value as string)
                    ? new Date(condition.value as string)
                    : null
                }
                onChange={(date: Date | null) => {
                  onUpdate(condition.id, {
                    value: date ? date.toISOString().split("T")[0] : "",
                  })
                }}
                dateFormat="yyyy-MM-dd"
                placeholderText={selectedFilter.placeholder || "选择日期"}
                customInput={
                  <Input
                    style={{
                      minWidth: "100px",
                      padding: "1px 4px",
                      height: "24px",
                      fontSize: "12px",
                    }}
                  />
                }
              />
            )}

            {/* 下拉框（根据条件决定是否多选） */}
            {(selectedFilter.type === "select" ||
              selectedFilter.type === "multi-select") &&
              selectedFilter.options && (
                <Select
                  value={condition.value === null ? undefined : condition.value}
                  onChange={(value) =>
                    onUpdate(condition.id, {
                      value,
                    })
                  }
                  options={selectedFilter.options}
                  isMulti={shouldUseMultiSelectForCondition(condition, filters)}
                  isSearchable={true}
                  containerStyle={{
                    minWidth: "120px",
                    height: "24px",
                  }}
                  size="x-small"
                  placeholder={
                    shouldUseMultiSelectForCondition(condition, filters)
                      ? selectedFilter.placeholder || "选择多个选项"
                      : selectedFilter.placeholder || "选择选项"
                  }
                />
              )}
          </>
        )}
      <Button
        $variant="text"
        $size="small"
        onClick={() => onRemove(condition.id)}
        style={{padding: "0", minWidth: "auto"}}
      >
        <svgIcons.Cross width={14} height={14} />
      </Button>
    </EditableCondition>
  )
}
