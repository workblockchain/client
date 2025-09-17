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

import ReactSelect, {SingleValue, StylesConfig} from "react-select"
import makeAnimated from "react-select/animated"
import styled, {CSSProperties} from "styled-components"
import {colors} from "../../styles"
import {zIndex} from "../../styles/zIndex"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string | string[]
  onChange?: (value?: string | string[]) => void
  disabled?: boolean
  containerStyle?: CSSProperties
  isSearchable?: boolean
  isMulti?: boolean
  size?: "x-small" | "small" | "medium" | "large"
  placeholder?: string
}

const animatedComponents = makeAnimated()

const sizeConfig = {
  "x-small": {height: 24, fontSize: 12, padding: 6, arrowSize: 12},
  small: {height: 32, fontSize: 14, padding: 8, arrowSize: 16},
  medium: {height: 48, fontSize: 16, padding: 16, arrowSize: 24},
  large: {height: 64, fontSize: 18, padding: 20, arrowSize: 28},
} as const

export const Select = ({
  options,
  value,
  onChange,
  disabled,
  containerStyle,
  isSearchable = false,
  isMulti = false,
  size = "medium",
  placeholder,
}: SelectProps) => {
  const getSelectedOptions = () => {
    if (isMulti && Array.isArray(value)) {
      return options.filter((opt) => value.includes(opt.value))
    } else if (!isMulti && typeof value === "string") {
      return options.find((opt) => opt.value === value) || null
    }
    return null
  }

  const selectedOptions = getSelectedOptions()

  return (
    <SelectWrapper style={containerStyle}>
      <ReactSelect
        options={options}
        value={selectedOptions}
        onChange={(selected) => {
          if (isMulti) {
            const selectedValues = Array.isArray(selected)
              ? selected.map((opt) => opt.value)
              : []
            onChange?.(selectedValues)
          } else {
            const selectedValue = selected as SingleValue<SelectOption>
            onChange?.(selectedValue?.value)
          }
        }}
        isDisabled={disabled}
        isSearchable={isSearchable}
        isMulti={isMulti}
        styles={customStyles(sizeConfig[size])}
        components={{
          IndicatorSeparator: () => null,
          ...animatedComponents,
        }}
        placeholder={placeholder}
        aria-label="选择框"
      />
    </SelectWrapper>
  )
}

const SelectWrapper = styled.div`
  position: relative;
`

const customStyles: (config: {
  height: number
  fontSize: number
  padding: number
  arrowSize: number
}) => StylesConfig<SelectOption, false> = ({
  height,
  fontSize,
  padding,
  arrowSize,
}) => ({
  control: (base, {isDisabled}) => ({
    ...base,
    backgroundColor: "#f5f5f5",
    padding: `0 ${padding}px`,
    border: "none",
    outline: "none",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    height: `${height}px`,
    minHeight: `${height}px`,
    borderRadius: `${height / 2}px`,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
    alignItems: "center",
    fontSize: `${fontSize}px`,
  }),
  singleValue: (base) => ({
    ...base,
    textAlign: "center",
    width: "100%",
    fontSize: `${fontSize}px`,
    lineHeight: `${height}px`,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: `${height}px`,
    padding: `0 ${padding / 2}px`,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
    svg: {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 0,
    svg: {
      width: `${arrowSize}px`,
      height: `${arrowSize}px`,
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: `${height / 4}px`,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: `4px`,
    zIndex: zIndex.selectDropdown,
  }),
  menuList: (base) => ({
    ...base,
  }),
  option: (base, {isSelected}) => ({
    ...base,
    cursor: "pointer",
    color: isSelected ? colors.Red700 : colors.Neutral700,
    backgroundColor: isSelected ? colors.Yellow100 : "transparent",
    padding: `${height / 6}px 16px`,
    fontSize: `${fontSize}px`,
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
})
