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

import type {ReactNode} from "react"
import {useEffect, useRef, useState} from "react"
import {Portal} from "../Portal"

export interface DropdownProps {
  children: (
    setOpen: (b: boolean) => void,
    setTriggerRectGetter: (getter: () => DOMRect) => void
  ) => ReactNode
  isOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  dropdownElement?: ReactNode
}

export const Dropdown = ({
  children,
  isOpen: controlledIsOpen,
  onOpenChange,
  dropdownElement,
}: DropdownProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number
    left: number
  } | null>(null)
  const trigger = useRef<() => DOMRect>(null)
  const setTriggerRectGetter = (getter: () => DOMRect) => {
    trigger.current = getter
  }

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen

  const handleOverlayClick = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      const rect = trigger.current?.()
      if (rect) {
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        })
      }
    } else {
      setDropdownPosition(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleResize = () => {
      const rect = trigger.current?.()
      if (rect) {
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        })
      }
    }
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleResize)
    }
  }, [isOpen])

  return (
    <>
      {children(setIsOpen, setTriggerRectGetter)}
      {isOpen && (
        <Portal>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 1000,
              backgroundColor: "transparent",
            }}
            onClick={handleOverlayClick}
          />
          <div
            style={{
              position: "fixed",
              top: dropdownPosition?.top,
              left: dropdownPosition?.left,
              zIndex: 1001,
            }}
          >
            {dropdownElement}
          </div>
        </Portal>
      )}
    </>
  )
}
