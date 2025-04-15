import ReactSelect, {StylesConfig} from "react-select"
import styled from "styled-components"
import {colors} from "../../styles"

const SelectWrapper = styled.div`
  position: relative;
  font-size: 16px;
`

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string | null) => void
  disabled?: boolean
}

const customStyles: StylesConfig<SelectOption, false> = {
  control: (base, {isDisabled}) => ({
    ...base,
    backgroundColor: "#f5f5f5",
    padding: "0 16px",
    border: "none",
    outline: "none",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
    height: "48px",
    borderRadius: "24px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
  }),
  singleValue: (base) => ({
    ...base,
    textAlign: "center",
    width: "100%",
  }),
  indicatorsContainer: (base) => ({
    ...base,
    paddingRight: "8px",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "4px",
  }),
  option: (base, {isSelected}) => ({
    ...base,
    cursor: "pointer",
    color: isSelected ? colors.Red700 : colors.Neutral700,
    backgroundColor: isSelected ? colors.Yellow100 : "transparent",
    padding: "8px 16px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  }),
}

const Select = ({options, value, onChange, disabled}: SelectProps) => {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <SelectWrapper>
      <ReactSelect
        options={options}
        value={selectedOption}
        onChange={(selected) => onChange?.(selected?.value ?? null)}
        isDisabled={disabled}
        styles={customStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
        aria-label="选择框"
        menuPortalTarget={document.body}
        menuPosition="fixed"
      />
    </SelectWrapper>
  )
}

export default Select
