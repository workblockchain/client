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

import {useState} from "react"
import styled from "styled-components"
import {TeamUser, useTeam} from "../useTeam"
import {DeleteConfirmModal} from "./DeleteConfirmModal"
import {TeamFormModal} from "./TeamFormModal"
import {UserCard} from "./UserCard"

function TeamContainer() {
  const users = useTeam((state) => state.users)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<TeamUser>()
  const [deletingUser, setDeletingUser] = useState<TeamUser>()

  const handleOpenCreateForm = () => {
    setEditingUser(undefined)
    setIsFormOpen(true)
  }

  const handleEditUser = (user: TeamUser) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingUser(undefined)
  }

  const handleFormSubmit = (data: TeamUser) => {
    const isEditMode = Boolean(editingUser?.uid)

    if (isEditMode) {
      // 编辑模式：更新现有用户
      if (data.uid) {
        useTeam.getState().updateUser(data.uid, data)
      }
    } else {
      // 创建模式：添加新用户
      useTeam.getState().addUser(data)
    }

    setIsFormOpen(false)
  }

  const handleDeleteClick = (user: TeamUser) => {
    setDeletingUser(user)
    setIsDeleteConfirmOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingUser?.uid) {
      useTeam.getState().removeUser(deletingUser.publicKey)
    }
    setIsDeleteConfirmOpen(false)
    setDeletingUser(undefined)
  }

  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false)
    setDeletingUser(undefined)
  }

  return (
    <Container>
      <CardsGrid>
        {/* 空卡片用于添加新用户 */}
        <UserCard isAddCard onClick={handleOpenCreateForm} />

        {/* 用户卡片列表 */}
        {Object.values(users).map((user) => (
          <UserCard
            key={user.uid}
            user={user}
            onEdit={() => handleEditUser(user)}
            onDelete={() => handleDeleteClick(user)}
          />
        ))}
      </CardsGrid>

      <TeamFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        isEditMode={Boolean(editingUser)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        user={deletingUser}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
`

const CardsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
`

export default TeamContainer
