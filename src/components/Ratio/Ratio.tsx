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

import {useEffect, useRef, useState} from "react"
import {
  RatioContainer,
  RatioSlider,
  RatioOption as StyledRatioOption,
} from "./Ratio.styles"
import {RatioOption, RatioProps} from "./types"

export const Ratio = ({
  options,
  value,
  onChange,
  disabled = false,
  containerStyle,
  size = "medium",
  align = "center",
}: RatioProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [sliderPosition, setSliderPosition] = useState(0)

  // 验证选项数量
  if (options.length < 2) {
    throw new Error("Ratio组件需要至少两个选项")
  }

  // 获取当前选中选项的索引
  const selectedIndex = options.findIndex((option) => option.key === value)
  const validSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0

  // 更新滑块位置和宽度
  useEffect(() => {
    if (containerRef.current && optionRefs.current[validSelectedIndex]) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const optionRect =
        optionRefs.current[validSelectedIndex]!.getBoundingClientRect()

      setSliderPosition(optionRect.left - containerRect.left)
    }
  }, [validSelectedIndex, options])

  const handleOptionClick = (option: RatioOption) => {
    if (!disabled && option.key !== value) {
      onChange?.(option.key)
    }
  }

  const getDisplayValue = (value: string | number | boolean): string => {
    if (typeof value === "boolean") {
      return value ? "是" : "否"
    }
    return String(value)
  }

  return (
    <RatioContainer
      ref={containerRef}
      $size={size}
      $disabled={disabled}
      $align={align}
      style={containerStyle}
      role="radiogroup"
      aria-label="选项组"
    >
      <RatioSlider $size={size} $position={sliderPosition} />

      {options.map((option, index) => (
        <StyledRatioOption
          key={option.key}
          ref={(el) => {
            optionRefs.current[index] = el
          }}
          $size={size}
          $selected={option.key === value}
          $disabled={disabled}
          onClick={() => handleOptionClick(option)}
          role="radio"
          aria-checked={option.key === value}
          aria-label={getDisplayValue(option.value)}
          tabIndex={disabled ? -1 : option.key === value ? 0 : -1}
          onKeyDown={(e) => {
            if (disabled) return

            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              handleOptionClick(option)
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault()
              const prevIndex = (index - 1 + options.length) % options.length
              onChange?.(options[prevIndex].key)
            } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault()
              const nextIndex = (index + 1) % options.length
              onChange?.(options[nextIndex].key)
            }
          }}
        >
          {getDisplayValue(option.value)}
        </StyledRatioOption>
      ))}
    </RatioContainer>
  )
}
