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
import {
  WorkRecord,
  workRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {fieldDefinitionsToFormFieldDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {t} from "i18next"
import {useMemo} from "react"
import {Controller, useForm} from "react-hook-form"
import styled from "styled-components"

interface WorkRecordFormModalProps {
  submit: (data: WorkRecord) => void
  isOpen: boolean
  initialData?: WorkRecord
  onClose: () => void
}

export function WorkRecordFormModal({
  submit,
  isOpen,
  initialData,
  onClose,
}: WorkRecordFormModalProps) {
  // 判断是创建还是编辑模式
  const isEditMode = Boolean(initialData?.wid)

  // 使用工具函数转换字段定义
  const formFields = useMemo(() => {
    return fieldDefinitionsToFormFieldDefinitions(workRecordFieldDefinitions)
  }, [])

  const defaultValues = useMemo(() => {
    const workRecord: WorkRecord = {
      wid: "",
      outcome: "",
      duration: 0,
      ...initialData,
    }
    return workRecord
  }, [initialData])

  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValues as unknown as Record<string, unknown>,
  })

  // 处理表单提交
  const handleFormSubmit = (data: unknown) => {
    const value = data as Partial<WorkRecord>
    const workRecord: WorkRecord = {
      ...defaultValues,
      ...value,
      // 确保在编辑模式下保留原始ID
      wid: isEditMode ? defaultValues.wid : value.wid || defaultValues.wid,
    }
    submit(workRecord)
    reset()
  }

  return (
    <FixedModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? t`work.edit` : t`work.create`}
    >
      <Container>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          {formFields.map((field) => (
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
                  field={field}
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
          <Button onClick={handleSubmit(handleFormSubmit)} type="button">
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
