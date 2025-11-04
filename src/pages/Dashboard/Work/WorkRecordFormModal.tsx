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

import {Input, Textarea, TextInput} from "@/components"
import {Button} from "@/components/Button"
import {DividerVertical} from "@/components/Divider"
import {FixedModal} from "@/components/Modal"
import {Select} from "@/components/Select"
import {t} from "i18next"
import {useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import styled from "styled-components"
import {useDynamicFieldOptions} from "../dynamicFieldOptions"
import {FieldDefinition} from "../fieldDefinitions"
import {WorkRecord} from "../interfaces"
import {UserInfo} from "../Team/UserInfo"

interface WorkRecordFormModalProps {
  submit: (data: WorkRecord) => void
  isOpen: boolean
  isEditMode: boolean
  fields: FieldDefinition[]
  initialData?: WorkRecord
  onClose: () => void
}

export function WorkRecordFormModal({
  submit,
  isOpen,
  isEditMode,
  initialData,
  fields,
  onClose,
}: WorkRecordFormModalProps) {
  const {control, handleSubmit, reset} = useForm()
  const dynamicFields = useDynamicFieldOptions(fields)

  // 当 initialData 变化时，重置表单值
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  function onSubmit(user: WorkRecord) {
    submit(user)
    reset()
    onClose()
  }

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t`work.edit` : t`work.create`}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Detail>
            <Controller
              key="outcome"
              name="outcome"
              control={control}
              render={({field: {value, onChange}}) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  placeholder={fields.find((f) => f.key === "outcome")?.label}
                />
              )}
            />
            <Controller
              key="description"
              name="description"
              control={control}
              render={({field: {value, onChange}}) => (
                <Textarea
                  value={value}
                  onChange={onChange}
                  $variant="borderless"
                  placeholder={
                    fields.find((f) => f.key === "description")?.label
                  }
                />
              )}
            />
          </Detail>
          <DividerVertical style={{height: "unset", flexShrink: 0}} />
          <Info>
            <Controller
              key="userId"
              name="userId"
              control={control}
              render={({field: {value, onChange}}) => {
                const users = dynamicFields.find((f) => f.key === "userId")
                return (
                  <Select
                    value={value}
                    width={156}
                    renderValue={(val) =>
                      val ? <UserInfo pubkey={val as string} /> : null
                    }
                    onChange={onChange}
                    options={users?.options ?? []}
                    renderOption={(option) =>
                      option ? <UserInfo pubkey={option} /> : null
                    }
                  />
                )
              }}
            />
            <Controller
              key="duration"
              name="duration"
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  value={value}
                  onChange={onChange}
                  placeholder={fields.find((f) => f.key === "duration")?.label}
                />
              )}
            />
          </Info>
        </Form>

        <Actions>
          <Button onClick={handleSubmit(onSubmit)} type="button">
            {isEditMode ? t`work.update` : t`work.create`}
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
  max-width: 560px;
`

const Form = styled.form`
  display: flex;
  height: 100%;
  gap: 16px;
`
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 480px;
  padding: 4px;
`
const Info = styled.div`
  width: 160px;
  height: 480px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
  padding: 4px 4px 0 0;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`
