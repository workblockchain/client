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
import {FormField} from "@/components/DataFormDrawer/FormField"
import {FixedModal} from "@/components/Modal"
import {t} from "i18next"
import {useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import styled from "styled-components"
import {useDynamicFieldOptions} from "../dynamicFieldOptions"
import {FieldDefinition} from "../fieldDefinitions"
import {ProjectRecord} from "../interfaces"
import {
  fieldDefinitionToHookFormDefinition,
  getDefaultValueForField,
  getValidationRules,
} from "../workRecordUtils"

interface ProjectFormModalProps {
  submit: (data: ProjectRecord) => void
  isOpen: boolean
  isEditMode: boolean
  fields: FieldDefinition[]
  initialData?: ProjectRecord
  onClose: () => void
}

export function ProjectFormModal({
  submit,
  isOpen,
  isEditMode,
  fields,
  initialData,
  onClose,
}: ProjectFormModalProps) {
  const {control, handleSubmit, reset} = useForm()
  const dynamicFields = useDynamicFieldOptions(fields)

  // 当 initialData 变化时，重置表单值
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t`project.edit` : t`project.create`}
    >
      <Container>
        <Form onSubmit={handleSubmit(submit)}>
          {dynamicFields.map((field) => (
            <Controller
              key={field.key}
              name={field.key}
              control={control}
              rules={getValidationRules(field)}
              render={({
                field: {value, onChange, onBlur},
                fieldState: {error},
              }) => (
                <FormField
                  field={fieldDefinitionToHookFormDefinition(field)}
                  value={value ?? getDefaultValueForField(field)}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={error?.message}
                  loading={false}
                />
              )}
            />
          ))}
        </Form>

        <Actions>
          <Button onClick={handleSubmit(submit)} type="button">
            {isEditMode ? t`project.update` : t`project.create`}
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

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`
