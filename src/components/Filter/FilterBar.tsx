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

import {
  FilterGroup,
  FilterInput,
  FilterLabel,
  FilterSection as FilterSectionStyled,
  FilterSelect,
} from "../Containers/common/styles"

export interface FilterConfig {
  type: "text" | "select" | "tags"
  key: string
  label: string
  placeholder?: string
  options?: Array<{value: string; label: string}>
}

export interface FilterBarProps {
  filters: FilterConfig[]
  values: Record<string, any>
  onChange: (key: string, value: any) => void
  className?: string
}

export function FilterBar({
  filters,
  values,
  onChange,
  className,
}: FilterBarProps) {
  const handleInputChange =
    (key: string, type: FilterConfig["type"]) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let value: any = e.target.value

      if (type === "tags") {
        // For tags, split comma-separated string into array
        value = value
          .split(",")
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      }

      onChange(key, value)
    }

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case "text":
        return (
          <FilterInput
            placeholder={filter.placeholder}
            value={values[filter.key] || ""}
            onChange={handleInputChange(filter.key, "text")}
          />
        )
      case "tags":
        return (
          <FilterInput
            placeholder={filter.placeholder}
            value={
              Array.isArray(values[filter.key])
                ? values[filter.key].join(", ")
                : ""
            }
            onChange={handleInputChange(filter.key, "tags")}
          />
        )
      case "select":
        return (
          <FilterSelect
            value={values[filter.key] || ""}
            onChange={handleInputChange(filter.key, "select")}
          >
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        )
      default:
        return null
    }
  }

  return (
    <FilterSectionStyled className={className}>
      {filters.map((filter) => (
        <FilterGroup key={filter.key}>
          <FilterLabel>{filter.label}</FilterLabel>
          {renderFilter(filter)}
        </FilterGroup>
      ))}
    </FilterSectionStyled>
  )
}

export default FilterBar
