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

import {colors} from "@/styles/colors"
import styled from "styled-components"
import {Modal, ModalProps} from "./Modal"

export interface FixedModalProps extends ModalProps {
  messageType?: "info" | "warn" | "error"
  message?: string
}

export const FixedModal = ({
  messageType,
  message,
  ...props
}: FixedModalProps) => (
  <Modal
    style={{
      width: 600,
      maxWidth: "90vw",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
    bodyComponent={(children) => (
      <>
        {message && (
          <MessageContainer $type={messageType}>{message}</MessageContainer>
        )}
        <ModalBody>{children}</ModalBody>
      </>
    )}
    {...props}
  />
)

const MessageContainer = styled.div<{$type?: "info" | "warn" | "error"}>`
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;

  ${({$type}) => {
    switch ($type) {
      case "info":
        return `
          background-color: ${colors.Blue100};
          color: ${colors.Blue900};
        `
      case "warn":
        return `
          background-color: ${colors.Yellow100};
          color: ${colors.Yellow700};
        `
      case "error":
        return `
          background-color: ${colors.Red100};
          color: ${colors.Red700};
        `
      default:
        return `
          background-color: ${colors.Neutral100};
          color: ${colors.Neutral700};
        `
    }
  }}
`

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`
