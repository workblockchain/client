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

import React, {forwardRef, useState} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"
import {colors} from "../../styles/colors"
import {zIndex} from "../../styles/zIndex"
import {Button} from "../Button"
import {Input} from "../Input/Input"
import {Select} from "../Select/Select"
import {
  FilterCondition,
  FilterDefinition,
  FilterOperator,
  FilterProps,
} from "./types"

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 16px;
  background: ${colors.Neutral100};
  border-radius: 8px;
  margin-bottom: 16px;
`

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 200px;
`

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.Neutral700};
  margin-bottom: 4px;
`

const FlyoutContainer = styled.div`
  padding: 12px;
  min-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const ConditionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
`

const ConditionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: ${colors.Neutral100};
  border-radius: 4px;
  font-size: 12px;
`

const NewConditionForm = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const EmptyState = styled.div`
  text-align: center;
  color: ${colors.Neutral500};
  font-size: 14px;
  padding: 16px;
`

const ConditionCount = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: ${colors.Neutral600};
`

const FlyoutTrigger = styled.div`
  position: relative;
  display: inline-block;
`

const FlyoutContent = styled.div<{$isOpen: boolean}>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  z-index: ${zIndex.filterFlyout};
  margin-top: 8px;
`

export const Filter: React.FC<FilterProps> = ({
  filters,
  values,
  onChange,
  disabled = false,
  className,
  mode = "inline",
  onConditionsChange,
}) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
  const [conditions, setConditions] = useState<FilterCondition[]>([])
  const [newCondition, setNewCondition] = useState<Partial<FilterCondition>>({
    field: "",
    operator: "equal",
    value: "",
  })
  const handleFilterChange = (key: string, value: string | string[] | null) => {
    const newValues = {...values, [key]: value}
    onChange(newValues)
  }

  const addCondition = () => {
    if (!newCondition.field) return

    const condition: FilterCondition = {
      id: Date.now().toString(),
      field: newCondition.field!,
      operator: newCondition.operator || "equal",
      value: newCondition.value,
    }

    const updatedConditions = [...conditions, condition]
    setConditions(updatedConditions)
    onConditionsChange?.(updatedConditions)

    setNewCondition({
      field: "",
      operator: "equal",
      value: "",
    })
  }

  const removeCondition = (id: string) => {
    const updatedConditions = conditions.filter((c) => c.id !== id)
    setConditions(updatedConditions)
    onConditionsChange?.(updatedConditions)
  }

  const operatorOptions = [
    {value: "equal", label: "等于"},
    {value: "notEqual", label: "不等于"},
    {value: "contains", label: "包含"},
    {value: "notContains", label: "不包含"},
    {value: "empty", label: "为空"},
    {value: "notEmpty", label: "不为空"},
  ]

  const renderFilterInput = (filter: FilterDefinition) => {
    const value = values[filter.key] || ""
    const commonProps = {
      disabled,
      placeholder: filter.placeholder || `筛选 ${filter.label}`,
    }

    switch (filter.type) {
      case "text":
        return (
          <Input
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            {...commonProps}
          />
        )
      case "number":
        return (
          <Input
            type="number"
            value={value as string}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            {...commonProps}
          />
        )
      case "date":
        return (
          <DatePickerFilter
            filterChange={(val) => handleFilterChange(filter.key, val)}
          />
        )
      case "select":
        return (
          <Select
            options={filter.options || []}
            value={value as string}
            onChange={(val) => handleFilterChange(filter.key, val)}
            isSearchable={true}
            disabled={disabled}
          />
        )
      case "multi-select":
        // For multi-select, we need to handle array values
        // This is a placeholder - multi-select will be implemented in phase 2
        return (
          <Select
            options={filter.options || []}
            value={value as string}
            onChange={(val) => handleFilterChange(filter.key, val)}
            isSearchable={true}
            disabled={disabled}
          />
        )
      default:
        return null
    }
  }

  if (mode === "flyout") {
    return (
      <FlyoutTrigger>
        <Button
          $variant="solid"
          $size="small"
          disabled={disabled}
          onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}
        >
          筛选
        </Button>

        <FlyoutContent $isOpen={isFlyoutOpen}>
          <FlyoutContainer>
            <h4>筛选条件</h4>

            {conditions.length === 0 ? (
              <EmptyState>暂无筛选条件</EmptyState>
            ) : (
              <ConditionsRow>
                {conditions.map((condition) => (
                  <ConditionItem key={condition.id}>
                    <span>
                      {filters.find((f) => f.key === condition.field)?.label ||
                        condition.field}
                      {
                        operatorOptions.find(
                          (op) => op.value === condition.operator
                        )?.label
                      }
                      {condition.value && `: ${condition.value}`}
                    </span>
                    <Button
                      $variant="text"
                      $size="small"
                      onClick={() => removeCondition(condition.id)}
                    >
                      删除
                    </Button>
                  </ConditionItem>
                ))}
              </ConditionsRow>
            )}

            <NewConditionForm>
              <Select
                value={newCondition.field}
                onChange={(value) =>
                  setNewCondition({...newCondition, field: value as string})
                }
                options={filters.map((f) => ({value: f.key, label: f.label}))}
                isSearchable={true}
                containerStyle={{minWidth: "120px", height: "24px"}}
                size="x-small"
              />

              <Select
                value={newCondition.operator}
                onChange={(value) =>
                  setNewCondition({
                    ...newCondition,
                    operator: value as FilterOperator,
                  })
                }
                options={operatorOptions}
                isSearchable={true}
                containerStyle={{minWidth: "100px", height: "24px"}}
                size="x-small"
              />

              {newCondition.operator !== "empty" &&
                newCondition.operator !== "notEmpty" && (
                  <Input
                    type="text"
                    value={(newCondition.value as string) || ""}
                    onChange={(e) =>
                      setNewCondition({
                        ...newCondition,
                        value: e.target.value,
                      })
                    }
                    placeholder="值"
                    style={{
                      minWidth: "100px",
                      padding: "1px 4px",
                      height: "24px",
                      fontSize: "12px",
                    }}
                  />
                )}

              <Button
                onClick={addCondition}
                disabled={!newCondition.field}
                $size="small"
                $variant="solid"
                style={{height: "24px", padding: "0 8px", fontSize: "12px"}}
              >
                添加
              </Button>
            </NewConditionForm>

            <div style={{marginTop: "12px", textAlign: "right"}}>
              <Button
                onClick={() => setIsFlyoutOpen(false)}
                $size="small"
                $variant="solid"
              >
                应用
              </Button>
            </div>
          </FlyoutContainer>
        </FlyoutContent>

        {conditions.length > 0 && (
          <ConditionCount>({conditions.length}个条件)</ConditionCount>
        )}
      </FlyoutTrigger>
    )
  }

  return (
    <FilterContainer className={className}>
      {filters.map((filter) => (
        <FilterItem key={filter.key}>
          <FilterLabel>{filter.label}</FilterLabel>
          {renderFilterInput(filter)}
        </FilterItem>
      ))}
    </FilterContainer>
  )
}

const DatePickerFilter = ({
  filterChange,
}: {
  filterChange: (value: string) => void
}) => {
  const [date, setDate] = useState<Date | null>(null)
  const WrappedInput = forwardRef<
    HTMLInputElement,
    {value?: string; onClick?: () => void; className?: string}
  >(({value, onClick, className}, ref) => (
    <Input
      value={value}
      onClick={onClick}
      className={className}
      ref={ref}
      placeholder="选择日期"
    />
  ))
  return (
    <DatePicker
      isClearable
      selected={date}
      onChange={(update) => {
        setDate(update)
        filterChange(update ? update.toISOString().split("T")[0] : "")
      }}
      dateFormat="yyyy-MM-dd"
      customInput={<WrappedInput />}
    />
  )
}

export default Filter
