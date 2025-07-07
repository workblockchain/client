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

import CrossIcon from "@/assets/cross.svg?react"
import {ReactNode, useCallback} from "react"
import styled, {keyframes} from "styled-components"
import {Portal} from "../Portal"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  width?: string
  direction?: "left" | "right" | "top" | "bottom"
}

const slideInRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`

const slideOutRight = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`

const slideInLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`

const slideOutLeft = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
`

const slideInTop = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`

const slideOutTop = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`

const slideInBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`

const slideOutBottom = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  width = "400px",
  direction = "right",
}: DrawerProps) => {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  if (!isOpen) return null

  return (
    <Portal>
      <DrawerOverlay
        className={isOpen ? "open" : ""}
        onClick={handleOverlayClick}
      >
        <DrawerContent
          $width={width}
          $direction={direction}
          className={isOpen ? "open" : ""}
        >
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            <CloseButton onClick={onClose}>
              <CrossIcon />
            </CloseButton>
          </DrawerHeader>
          <div>{children}</div>
        </DrawerContent>
      </DrawerOverlay>
    </Portal>
  )
}

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  z-index: 1000;
  transition:
    opacity 0.3s ease-in-out,
    background-color 0.3s ease-in-out;

  &.open {
    background-color: rgba(0, 0, 0, 0.25);
    opacity: 1;
  }
`

const getAnimationKeyframes = (direction: string, isOpen: boolean) => {
  if (direction === "right") return isOpen ? slideInRight : slideOutRight
  if (direction === "left") return isOpen ? slideInLeft : slideOutLeft
  if (direction === "top") return isOpen ? slideInTop : slideOutTop
  if (direction === "bottom") return isOpen ? slideInBottom : slideOutBottom
  return isOpen ? slideInRight : slideOutRight
}

const getPositionStyles = (direction: string, width: string) => {
  switch (direction) {
    case "left":
      return `
        top: 0;
        left: 0;
        width: ${width};
        height: 100vh;
      `
    case "right":
      return `
        top: 0;
        right: 0;
        width: ${width};
        height: 100vh;
      `
    case "top":
      return `
        top: 0;
        left: 0;
        right: 0;
        height: ${width};
      `
    case "bottom":
      return `
        bottom: 0;
        left: 0;
        right: 0;
        height: ${width};
      `
    default:
      return `
        top: 0;
        right: 0;
        width: ${width};
        height: 100vh;
      `
  }
}

const DrawerContent = styled.div<{
  $width: string
  $direction: string
}>`
  position: fixed;
  ${({$direction, $width}) => getPositionStyles($direction, $width)}
  background-color: white;
  box-shadow: ${({$direction}) => {
    switch ($direction) {
      case "left":
        return "2px 0 8px rgba(0, 0, 0, 0.15)"
      case "right":
        return "-2px 0 8px rgba(0, 0, 0, 0.15)"
      case "top":
        return "0 2px 8px rgba(0, 0, 0, 0.15)"
      case "bottom":
        return "0 -2px 8px rgba(0, 0, 0, 0.15)"
      default:
        return "-2px 0 8px rgba(0, 0, 0, 0.15)"
    }
  }};
  animation: ${({$direction}) => getAnimationKeyframes($direction, true)} 0.3s
    ease-out forwards;

  &.open {
    animation: ${({$direction}) => getAnimationKeyframes($direction, true)} 0.3s
      ease-out forwards;
  }

  &:not(.open) {
    animation: ${({$direction}) => getAnimationKeyframes($direction, false)}
      0.3s ease-out forwards;
  }

  padding: 20px;
  display: flex;
  flex-direction: column;
`

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const DrawerTitle = styled.div`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`
