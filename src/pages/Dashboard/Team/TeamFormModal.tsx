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

import {TextInputWithLabel} from "@/components"
import {AvatarRow} from "@/components/Avatar/AvatarRow"
import {Button} from "@/components/Button"
import {FixedModal} from "@/components/Modal"
import {useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import styled from "styled-components"
import {TeamUser, useTeam} from "../useTeam"

interface TeamFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TeamUser) => void
  initialData?: TeamUser
  isEditMode: boolean
}

export function TeamFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditMode,
}: TeamFormModalProps) {
  const users = useTeam((state) => state.users)
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<TeamUser>()

  function getErrors() {
    const messages: string[] = []

    if (errors.uid?.message) messages.push(errors.uid.message)
    if (errors.publicKey?.message) messages.push(errors.publicKey.message)
    if (errors.info?.username?.message)
      messages.push(errors.info.username.message)
    if (errors.info?.email?.message) messages.push(errors.info.email.message)

    return messages
  }
  const err = getErrors()
  const hasErrors = err.length > 0

  // 当 initialData 变化时，重置表单值
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    } else {
      reset()
    }
  }, [initialData, reset])

  function submit(user: TeamUser) {
    onSubmit(user)
    reset()
    onClose()
  }

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "编辑用户" : "添加用户"}
      messageType={hasErrors ? "error" : undefined}
      message={hasErrors ? err.join("；") : undefined}
    >
      <Container>
        <Form onSubmit={handleSubmit(submit)}>
          {!isEditMode && (
            <FormRow>
              <Controller
                name="uid"
                control={control}
                rules={{
                  required: "用户ID是必填项",
                  validate: (value) => {
                    if (users[value]) {
                      return "用户ID已存在"
                    }
                    return true
                  },
                }}
                render={({field}) => (
                  <TextInputWithLabel
                    label="*用户ID"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="请输入用户ID"
                  />
                )}
              />
            </FormRow>
          )}

          <FormRow>
            <Controller
              name="publicKey"
              control={control}
              rules={{
                required: "公钥是必填项",
                validate: (value) => {
                  const existingPublicKey = Object.values(users).find(
                    (user) => user.publicKey === value
                  )
                  if (existingPublicKey) {
                    return "公钥已存在"
                  }
                  return true
                },
              }}
              render={({field}) => (
                <TextInputWithLabel
                  label="*公钥"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="请输入用户公钥"
                />
              )}
            />
          </FormRow>

          <FormRow>
            <Controller
              name="info.username"
              control={control}
              rules={{
                required: "用户名是必填项",
                validate: (value) => {
                  const existingUsername = Object.values(users).find(
                    (user) => user.info.username === value
                  )
                  if (existingUsername) {
                    return "用户名已存在"
                  }
                  return true
                },
              }}
              render={({field}) => (
                <TextInputWithLabel
                  label="*用户名"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="请输入用户名"
                />
              )}
            />
          </FormRow>

          <FormRow>
            <Controller
              name="info.email"
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "请输入有效的邮箱地址",
                },
              }}
              render={({field}) => (
                <TextInputWithLabel
                  label="邮箱"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="请输入邮箱地址"
                />
              )}
            />
          </FormRow>

          <FormRow>
            <Controller
              name="info.avatar"
              control={control}
              render={({field}) => (
                <AvatarRow value={field.value} onChange={field.onChange} />
              )}
            />
          </FormRow>
        </Form>

        <Actions>
          <Button onClick={handleSubmit(submit)} type="button">
            {isEditMode ? "更新用户" : "添加用户"}
          </Button>
          <Button $variant="text" onClick={onClose} type="button">
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`
