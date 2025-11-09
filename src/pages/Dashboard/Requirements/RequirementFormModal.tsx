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

import {InputWithUnit, Textarea, TextInput} from "@/components"
import {Button} from "@/components/Button"
import {DividerVertical} from "@/components/Divider"
import {FixedModal} from "@/components/Modal"
import {Select} from "@/components/Select"
import {colors} from "@/styles"
import {t} from "i18next"
import {useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import styled from "styled-components"
import {useDynamicFieldOptions} from "../dynamicFieldOptions"
import {FieldDefinition} from "../fieldDefinitions"
import {RequirementRecord} from "../interfaces"
import {UserInfo} from "../Team/UserInfo"

interface RequirementFormModalProps {
  submit: (data: RequirementRecord) => void
  isOpen: boolean
  isEditMode: boolean
  fields: FieldDefinition[]
  initialData?: RequirementRecord
  onClose: () => void
}

export function RequirementFormModal({
  submit,
  isOpen,
  isEditMode,
  initialData,
  fields,
  onClose,
}: RequirementFormModalProps) {
  const {control, handleSubmit, reset} = useForm()
  const dynamicFields = useDynamicFieldOptions(fields)

  // 当 initialData 变化时，重置表单值
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  function onSubmit(user: RequirementRecord) {
    submit(user)
    reset()
    onClose()
  }

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t`requirement.edit` : t`requirement.create`}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Detail>
            <Controller
              key="title"
              name="title"
              control={control}
              render={({field: {value, onChange}}) => (
                <TextInput
                  value={value}
                  onChange={onChange}
                  placeholder={fields.find((f) => f.key === "title")?.label}
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
          <DividerVertical style={{height: "auto", flexShrink: 0}} />
          <Info>
            <Controller
              key="priority"
              name="priority"
              control={control}
              render={({field: {value, onChange}}) => {
                const priorityField = dynamicFields.find(
                  (f) => f.key === "priority"
                )
                return (
                  <Select
                    placeholder={priorityField?.label}
                    value={value}
                    width={156}
                    onChange={onChange}
                    options={priorityField?.options ?? []}
                  />
                )
              }}
            />
            <Controller
              key="status"
              name="status"
              control={control}
              render={({field: {value, onChange}}) => {
                const statusField = dynamicFields.find(
                  (f) => f.key === "status"
                )
                return (
                  <Select
                    placeholder={statusField?.label}
                    value={value}
                    width={156}
                    onChange={onChange}
                    options={statusField?.options ?? []}
                  />
                )
              }}
            />
            <Controller
              key="assignedTo"
              name="assignedTo"
              control={control}
              render={({field: {value, onChange}}) => {
                const assignedToField = dynamicFields.find(
                  (f) => f.key === "assignedTo"
                )
                return (
                  <Select
                    placeholder={assignedToField?.label}
                    value={value}
                    width={156}
                    renderValue={(val) =>
                      val ? <UserInfo pubkey={val as string} /> : null
                    }
                    onChange={onChange}
                    options={assignedToField?.options ?? []}
                    renderOption={(option) =>
                      option ? <UserInfo pubkey={option} /> : null
                    }
                  />
                )
              }}
            />
            <Controller
              key="estimated"
              name="estimated"
              control={control}
              render={({field: {value, onChange}}) => (
                <InputWithUnit
                  value={value}
                  onChange={onChange}
                  placeholder={fields.find((f) => f.key === "estimated")?.label}
                  unit="小时"
                  $size="medium"
                />
              )}
            />
            <Controller
              key="progress"
              name="progress"
              control={control}
              render={({field: {value, onChange}}) => (
                <InputWithUnit
                  value={value}
                  onChange={onChange}
                  placeholder={fields.find((f) => f.key === "progress")?.label}
                  unit="%"
                  $size="medium"
                />
              )}
            />
            {initialData && (
              <>
                <DateInfo>
                  <DateLabel>{t("requirement.createdAt")}</DateLabel>
                  <DateValue>
                    {initialData.createdAt
                      ? new Date(initialData.createdAt).toLocaleString()
                      : "-"}
                  </DateValue>
                </DateInfo>
                <DateInfo>
                  <DateLabel>{t("requirement.updatedAt")}</DateLabel>
                  <DateValue>
                    {initialData.updatedAt
                      ? new Date(initialData.updatedAt).toLocaleString()
                      : "-"}
                  </DateValue>
                </DateInfo>
              </>
            )}
          </Info>
        </Form>

        <Actions>
          <Button onClick={handleSubmit(onSubmit)} type="button">
            {isEditMode ? t`requirement.update` : t`requirement.create`}
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
  padding: 4px;
`

const Info = styled.div`
  width: 160px;
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

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DateLabel = styled.span`
  font-size: 12px;
  color: ${colors.Neutral500};
`

const DateValue = styled.span`
  font-size: 12px;
  color: ${colors.Neutral500};
`
