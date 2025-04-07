import {ReactNode, useEffect, useRef, useState} from "react"
import styled from "styled-components"
import {styledCommon} from "../../styles/common"
import {Portal} from "../Portal/Portal"

const DropdownWrapper = styled.div<{visible: boolean}>`
  ${styledCommon.base}
  position: fixed;
  min-width: 120px;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${({visible}) => (visible ? "block" : "none")};
  background: white;

  & > div {
    padding: 8px;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
      background: #f5f5f5;
    }
  }
`

interface DropdownProps {
  visible: boolean
  children: ReactNode
  position?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
  triggerRef?: React.RefObject<HTMLElement | null>
}

// 定位计算函数
// 添加边界检查的定位计算
const calculatePosition = (
  triggerRect: DOMRect,
  position: "top" | "bottom" | "left" | "right" = "bottom",
  align: "start" | "center" | "end" = "start"
) => {
  const offset = 8 // 间距
  const scrollY = window.scrollY || window.pageYOffset

  let top = 0
  let left = 0

  switch (position) {
    case "bottom":
      top = triggerRect.bottom + scrollY + offset
      break
    case "top":
      top = triggerRect.top + scrollY - offset
      break
    case "left":
      left = triggerRect.left - offset
      top = triggerRect.top + scrollY
      break
    case "right":
      left = triggerRect.right + offset
      top = triggerRect.top + scrollY
      break
  }

  switch (align) {
    case "start":
      left =
        position === "left" || position === "right" ? left : triggerRect.left
      break
    case "center":
      left =
        position === "left" || position === "right"
          ? left
          : triggerRect.left + triggerRect.width / 2
      break
    case "end":
      left =
        position === "left" || position === "right"
          ? left
          : triggerRect.left + triggerRect.width
      break
  }

  // 边界检查防止超出视口
  const viewportWidth = document.documentElement.clientWidth
  const viewportHeight = document.documentElement.clientHeight

  // 水平边界检查
  if (left < 0) left = 0
  else if (left > viewportWidth - 100) left = viewportWidth - 100 // 假设最小宽度100px

  // 垂直边界检查
  if (top < 0) top = 0
  else if (top > viewportHeight - 100) top = viewportHeight - 100 // 假设最小高度100px

  return {top, left}
}

export const Dropdown = ({
  visible,
  children,
  position = "bottom",
  align = "start",
  triggerRef,
}: DropdownProps) => {
  const [coords, setCoords] = useState({top: 0, left: 0})
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updatePosition = () => {
      if (visible && triggerRef?.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        const newCoords = calculatePosition(triggerRect, position, align)
        setCoords(newCoords)
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [visible, position, align, triggerRef])

  if (triggerRef?.current === null) return null

  return (
    <Portal id="dropdown-portal">
      <DropdownWrapper
        visible={visible}
        ref={dropdownRef}
        style={{
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          transform: (() => {
            if (position === "left" || position === "right") {
              return "translateY(-50%)"
            }
            switch (align) {
              case "center":
                return "translateX(-50%)"
              case "end":
                return "translateX(-100%)"
              default:
                return "none"
            }
          })(),
        }}
      >
        {children}
      </DropdownWrapper>
    </Portal>
  )
}
