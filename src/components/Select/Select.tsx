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

import ReactSelect, {StylesConfig} from "react-select"
import makeAnimated from "react-select/animated"
import styled, {CSSProperties} from "styled-components"
import {colors} from "../../styles"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string | null) => void
  disabled?: boolean
  containerStyle?: CSSProperties
  isSearchable?: boolean
  size?: "small" | "medium" | "large"
}

const animatedComponents = makeAnimated()

const Select = ({
  options,
  value,
  onChange,
  disabled,
  containerStyle,
  isSearchable = false,
  size = "medium",
}: SelectProps) => {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <SelectWrapper style={containerStyle}>
      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange?.(selected?.value ?? null)}
        isDisabled={disabled}
        isSearchable={isSearchable}
        styles={customStyles({
          height: {small: 32, medium: 48, large: 64}[size],
        })}
        components={{
          IndicatorSeparator: () => null,
          ...animatedComponents,
        }}
        aria-label="选择框"
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </SelectWrapper>
  )
}

const SelectWrapper = styled.div`
  position: relative;
  font-size: 16px;
`

const customStyles: (custom: {
  height: number
}) => StylesConfig<SelectOption, false> = ({height}) => ({
  control: (base, {isDisabled}) => ({
    ...base,
    backgroundColor: "#f5f5f5",
    padding: `0 ${height / 4}px`, // 保持原逻辑但使用更清晰的表达式
    border: "none",
    outline: "none",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    height: `${height}px`,
    minHeight: `${height}px`,
    borderRadius: `${height / 2}px`, // 使用除法替代乘法
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
    alignItems: "center",
  }),
  singleValue: (base) => ({
    ...base,
    textAlign: "center",
    width: "100%",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: `${height / 4}px`,
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: `4px`,
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
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
})

export default Select
