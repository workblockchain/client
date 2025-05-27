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
import styled from "styled-components"
import {Button} from "../Button"
import {Portal} from "../Portal"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export const Modal = ({isOpen, onClose, children, title}: ModalProps) => {
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose]
  )

  if (!isOpen) return null

  return (
    <Portal>
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent>
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            <CloseButton onClick={onClose}>
              <CrossIcon />
            </CloseButton>
          </ModalHeader>
          <div>{children}</div>
        </ModalContent>
      </ModalOverlay>
    </Portal>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const ModalTitle = styled.div`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`

const CloseButton = styled(Button).attrs({$variant: "text"})`
  font-size: 1.5rem;
  line-height: 1;
  padding: 4px;
  min-width: auto;
  margin-left: auto;
`
