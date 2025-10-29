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

import {Drawer} from "@/components/Drawer"
import {Controller, useForm} from "react-hook-form"
import {Button} from "../Button"
import * as S from "./DataFormDrawer.styles"
import {FormField} from "./FormField"
import type {DataFormDrawerProps, HookFormFieldDefinition} from "./types"

/**
 * 数据表单抽屉组件 - 使用 react-hook-form 重构
 * 负责数据处理、状态管理、业务逻辑
 */
export function DataFormDrawer({
  isOpen,
  mode,
  fields,
  initialData,
  onSubmit,
  onClose,
  title,
  loading = false,
  width = "400px",
  submitText,
}: DataFormDrawerProps) {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: initialData as Record<string, unknown>,
  })

  function submit(data: unknown) {
    reset()
    onSubmit(data)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title} width={width}>
      <S.Container>
        <S.Form onSubmit={handleSubmit(submit)}>
          {fields.map((field) => (
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
                  loading={loading}
                />
              )}
            />
          ))}
        </S.Form>

        <S.Actions>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            type="button"
          >
            {loading
              ? "提交中..."
              : submitText || (mode === "create" ? "创建" : "保存")}
          </Button>
        </S.Actions>
      </S.Container>
    </Drawer>
  )
}

/**
 * 获取字段的默认值
 */
function getDefaultValueForField(
  field: HookFormFieldDefinition
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
function getValidationRules(field: HookFormFieldDefinition) {
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
