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
import {
  getDefaultValueForField,
  getValidationRules,
} from "@/pages/Dashboard/workRecordUtils"
import {Controller, useForm} from "react-hook-form"
import {Button} from "../Button"
import * as S from "./DataFormDrawer.styles"
import {FormField} from "./FormField"
import type {DataFormDrawerProps} from "./types"

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
