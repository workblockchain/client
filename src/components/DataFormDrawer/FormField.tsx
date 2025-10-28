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

import {Checkbox} from "@/components/Checkbox"
import {Input, Textarea} from "@/components/Input"
import {Select} from "@/components/Select"
import * as S from "./DataFormDrawer.styles"
import type {HookFormFieldDefinition} from "./types"

interface FormFieldProps {
  /** 字段定义 */
  field: HookFormFieldDefinition
  /** 字段值 */
  value: unknown
  /** 字段变更回调 */
  onChange: (value: string | string[] | number | boolean) => void
  /** 字段错误信息 */
  error?: string
  /** 加载状态 */
  loading?: boolean
  /** 字段失去焦点回调 */
  onBlur?: () => void
}
/**
 * 表单字段组件 - 样式组件
 * 专注于UI渲染和样式表现，接收处理好的数据
 */
export const FormField = ({
  field,
  value,
  error,
  loading = false,
  onChange,
  onBlur,
}: FormFieldProps) => {
  if (field.hidden) return null

  const commonProps = {
    value: typeof value === "boolean" ? "" : (value ?? ""),
    placeholder: field.placeholder,
    disabled: loading,
    onBlur,
  }

  switch (field.type) {
    case "text":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          <Input
            {...commonProps}
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    case "number":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          <Input
            {...commonProps}
            type="number"
            value={typeof value === "number" ? value : ""}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    case "textarea":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          <Textarea
            {...commonProps}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    case "select":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          <Select
            {...commonProps}
            options={field.options || []}
            value={typeof value === "string" ? value : ""}
            onChange={(v) => onChange(v || "")}
          />
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    case "date":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          <Input
            {...commonProps}
            type="date"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    case "checkbox":
      return (
        <S.FieldGroup key={field.key}>
          <S.FieldLabel>
            <Checkbox
              checked={!!value}
              onChange={onChange}
              disabled={loading}
            />
            {field.label}
            {field.required && <span style={{color: "red"}}>*</span>}
          </S.FieldLabel>
          {error && <S.FieldError>{error}</S.FieldError>}
        </S.FieldGroup>
      )

    default:
      return null
  }
}

FormField.displayName = "FormField"
