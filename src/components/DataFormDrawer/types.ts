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

/**
 * 表单字段验证规则
 */
export interface FieldValidation {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  custom?: (value: string | number | boolean) => string | null
}

/**
 * 表单字段定义
 */
export interface HookFormFieldDefinition {
  /** 字段键名 */
  key: string
  /** 字段标签 */
  label: string
  /** 字段类型 */
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "multi-select"
    | "date"
    | "checkbox"
  /** 是否必填 */
  required?: boolean
  /** 选择器选项（仅select类型需要） */
  options?: {value: string; label: string}[]
  /** 占位符文本 */
  placeholder?: string
  /** 默认值 */
  defaultValue?: string | number | boolean
  /** 验证规则 */
  validation?: FieldValidation
  /** 是否隐藏字段 */
  hidden?: boolean
  /** 字段描述 */
  description?: string
}

/**
 * 数据表单抽屉组件属性
 */
export interface DataFormDrawerProps {
  /** 是否打开抽屉 */
  isOpen: boolean
  /** 表单模式：创建或编辑 */
  mode: "create" | "edit"
  /** 表单字段定义 */
  fields: HookFormFieldDefinition[]
  /** 表单初始数据 */
  initialData?: unknown
  /** 提交回调函数 */
  onSubmit: (data: unknown) => void
  /** 关闭抽屉回调 */
  onClose: () => void
  /** 抽屉标题 */
  title: string
  /** 加载状态 */
  loading?: boolean
  /** 抽屉宽度 */
  width?: string
  /** 提交按钮文本 */
  submitText?: string
}
