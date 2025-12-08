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

import {Button} from "@/components/Button"
import {FixedModal} from "@/components/Modal"
import styled from "styled-components"
import {TeamUser} from "../useTeam"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  user?: TeamUser
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  user,
}: DeleteConfirmModalProps) {
  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title="确认删除"
      messageType="warn"
      message={`确认删除用户：${user?.info.username || ""} 吗？`}
    >
      <Container>
        <Message>此操作将永久删除用户数据，且无法恢复。</Message>
        <Actions>
          <Button onClick={onConfirm}>确认删除</Button>
          <Button $variant="text" onClick={onClose}>
            取消
          </Button>
        </Actions>
      </Container>
    </FixedModal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
`

const Message = styled.div`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
`

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`
