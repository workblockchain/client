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
import {RequirementRecord} from "../interfaces"
import {fieldDefinitionToHookFormDefinition} from "../workRecordUtils"

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
  fields,
  initialData,
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

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t`requirement.edit` : t`requirement.create`}
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

/**
 * 获取字段的默认值
 */
function getDefaultValueForField(
  field: any
): string | number | boolean | string[] {
  if (field.defaultValue !== undefined) {
    return field.defaultValue
  }

  switch (field.type) {
    case "number":
      return 0
    case "checkbox":
      return false
    case "text":
    case "textarea":
    case "date":
    case "select":
    default:
      return ""
  }
}

/**
 * 将字段验证规则转换为 react-hook-form 验证规则
 */
function getValidationRules(field: any) {
  const rules: Record<string, unknown> = {}

  if (field.required) {
    rules.required = `${field.label}是必填项`
  }

  if (field.validation) {
    const {validation} = field

    if (validation.min !== undefined) {
      rules.min = {
        value: validation.min,
        message: `${field.label}不能小于${validation.min}`,
      }
    }

    if (validation.max !== undefined) {
      rules.max = {
        value: validation.max,
        message: `${field.label}不能大于${validation.max}`,
      }
    }

    if (validation.pattern) {
      rules.pattern = {
        value: validation.pattern,
        message: `${field.label}格式不正确`,
      }
    }

    if (validation.custom) {
      rules.validate = {
        custom: (value: string | number | boolean) => validation.custom!(value),
      }
    }
  }

  return rules
}
