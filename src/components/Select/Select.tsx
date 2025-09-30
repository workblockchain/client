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

import ReactSelect, {
  components,
  OptionProps,
  SingleValue,
  StylesConfig,
} from "react-select"
import styled, {CSSProperties} from "styled-components"
import {colors} from "../../styles"
import {zIndex} from "../../styles/zIndex"
import {svgIcons} from "../Icons"

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
  align?: "start" | "center" | "end"
}

// 自定义Option组件，在多选模式下显示对勾图标
const CustomOption = (props: OptionProps<SelectOption>) => {
  const {children, isSelected, selectProps} = props
  const size = (selectProps as any).size || "medium"
  const {height, fontSize} = sizeConfig[size as keyof typeof sizeConfig]
  const padding = height / 6

  return (
    <components.Option {...props}>
      <OptionContainer
        $isSelected={isSelected}
        $padding={padding}
        $fontSize={fontSize}
      >
        <span>{children}</span>
        {isSelected && <CheckIcon />}
      </OptionContainer>
    </components.Option>
  )
}

const sizeConfig = {
  "x-small": {width: 120, height: 24, fontSize: 12, padding: 6, arrowSize: 12},
  small: {width: 160, height: 32, fontSize: 14, padding: 8, arrowSize: 16},
  medium: {width: 200, height: 48, fontSize: 16, padding: 16, arrowSize: 24},
  large: {width: 320, height: 64, fontSize: 18, padding: 20, arrowSize: 28},
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
  align = "start",
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
        hideSelectedOptions={false}
        styles={customStyles({
          ...sizeConfig[size],
          align,
        })}
        components={{Option: CustomOption}}
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
  width: number
  height: number
  fontSize: number
  padding: number
  arrowSize: number
  align: "start" | "center" | "end"
}) => StylesConfig<SelectOption, false> = ({
  width,
  height,
  fontSize,
  padding,
  arrowSize,
  align,
}) => ({
  control: (base, {isDisabled}) => {
    return {
      ...base,
      backgroundColor: "#f5f5f5",
      padding: `0 ${padding * 4}px 0 ${padding}px`,
      border: "none",
      outline: "none",
      boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
      width: `${width}px`,
      minWidth: `${width}px`,
      height: `${height}px`,
      minHeight: `${height}px`,
      borderRadius: `${height / 2}px`,
      cursor: isDisabled ? "not-allowed" : "pointer",
      opacity: isDisabled ? 0.6 : 1,
      alignItems: "center",
      fontSize: `${fontSize}px`,
      position: "relative",
      overflow: "hidden",
    }
  },
  singleValue: (base) => ({
    ...base,
    textAlign: align,
    width: "100%",
    fontSize: `${fontSize}px`,
    lineHeight: `${height}px`,
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
    flexWrap: "nowrap",
    flex: `0 0 auto`,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: `${height}px`,
    padding: `0 ${padding / 2}px`,
    borderRadius: `0px ${height / 2}px  ${height / 2}px 0px `,
    backgroundColor: "#f5f5f5",
    position: "absolute",
    right: 0,
    top: 0,
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
  option: (base) => ({
    ...base,
    padding: 0,
  }),
})

const CheckIcon = styled(svgIcons.Check)`
  width: 16px;
  height: 16px;
  color: ${colors.Red700};
  flex-shrink: 0;
`

const OptionContainer = styled.div<{
  $isSelected: boolean
  $padding: number
  $fontSize: number
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({$padding}) => $padding}px 16px;
  font-size: ${({$fontSize}) => $fontSize}px;
  cursor: pointer;
  color: ${({$isSelected}) =>
    $isSelected ? colors.Neutral500 : colors.Neutral700};
  background-color: ${({$isSelected}) =>
    $isSelected ? colors.Neutral100 : "transparent"};

  &:hover {
    background-color: ${({$isSelected}) =>
      $isSelected ? colors.Neutral200 : colors.Blue100};
  }
`
