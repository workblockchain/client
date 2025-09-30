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

import {transparentize} from "polished"
import {useMemo, type ReactNode} from "react"
import {styled} from "styled-components"
import {colors} from "../../styles/colors"
import {Button, LARGE_BUTTON_SIZE} from "../Button/Button"

export interface NavigationProps {
  onClose: () => void
  closeOnClick?: boolean
  targets: Array<{
    icon: ReactNode
    label: string
    onClick: () => void
  }>
  show?: boolean
}

export const Navigation = ({
  targets,
  onClose,
  closeOnClick = true,
  show,
}: NavigationProps) => {
  const col = useMemo(
    () => Math.ceil(targets.length / Math.ceil(targets.length / 4)),
    [targets.length]
  )
  return (
    <Overlay onClick={onClose} data-visible={show}>
      <NavigationContainer
        style={{
          width: `${col * (LARGE_BUTTON_SIZE + 8) - 8}px`,
        }}
        onClick={(e) => e.stopPropagation()}
        data-visible={show}
      >
        {targets.map((item, index) => (
          <Button
            key={item.label + index}
            $variant="largeIconWithLabel"
            $primaryColor={colors.Neutral500}
            onClick={() => {
              item.onClick()
              if (closeOnClick) onClose()
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Button>
        ))}
      </NavigationContainer>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${transparentize(0.5, colors.Neutral100)};
  backdrop-filter: blur(10px);
  z-index: 100;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  &[data-visible="true"] {
    opacity: 1;
    pointer-events: auto;
  }
`

const NavigationContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;

  &[data-visible="true"] {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: auto;
  }
`
