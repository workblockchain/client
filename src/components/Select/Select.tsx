import {useEffect, useRef, useState} from "react"
import styled from "styled-components"
import {styledCommon} from "../../styles/common"
import {Dropdown} from "./Dropdown"

const SelectWrapper = styled.div`
  position: relative;
`

const SelectButton = styled.div<{disabled?: boolean}>`
  ${styledCommon.base}
  height: 48px;
  padding: 0 16px;
  border-radius: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({disabled}) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;

  &:focus {
    ${styledCommon.focus}
  }

  &:disabled {
    ${styledCommon.disabled}
  }
`

const ValueText = styled.span`
  flex: 1;
  text-align: center;
`

interface SelectProps {
  options: Array<{value: string; label: string}>
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const Select = ({options, value, onChange, disabled}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select..."

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    onChange?.(value)
    setIsOpen(false)
  }

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectButton
        role="button"
        aria-haspopup="listbox"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => !disabled && e.key === "Enter" && setIsOpen(!isOpen)}
        tabIndex={0}
        disabled={disabled}
      >
        <ValueText>{selectedLabel}</ValueText>
        <span>{isOpen ? "▲" : "▼"}</span>
      </SelectButton>

      <Dropdown visible={isOpen && !disabled}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelect(option.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSelect(option.value)}
            role="option"
            aria-selected={value === option.value}
            tabIndex={0}
            style={{
              backgroundColor:
                value === option.value ? "#f0f0f0" : "transparent",
              cursor: "pointer",
              padding: "8px 16px",
            }}
          >
            {option.label}
          </div>
        ))}
      </Dropdown>
    </SelectWrapper>
  )
}

export default Select
