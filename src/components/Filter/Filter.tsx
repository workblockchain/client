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
import {Input} from "../Input/Input"
import {Select} from "../Select/Select"
import {FilterDefinition, FilterProps} from "./types"

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

export const Filter: React.FC<FilterProps> = ({
  filters,
  values,
  onChange,
  disabled = false,
  className,
}) => {
  const handleFilterChange = (key: string, value: string | string[] | null) => {
    const newValues = {...values, [key]: value}
    onChange(newValues)
  }

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
