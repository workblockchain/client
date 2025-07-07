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

import {StoryCard2} from "@/interfaces"
import React from "react"
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form"
import styled from "styled-components"
import {Button} from "../Button"
import {Textarea} from "../Input/Textarea"
import Tag from "../Tag"
export interface KanbanFormProps {
  callback: (type: "create" | "edit", data: StoryCard2) => void
  initData?: StoryCard2
  onCancel: () => void
  mode?: "create" | "edit"
  deleteCard?: () => void
}

export const KanbanForm = React.memo(
  ({
    onCancel,
    mode = "create",
    initData,
    callback,
    deleteCard,
  }: KanbanFormProps) => {
    const {register, control, handleSubmit, reset} = useForm<StoryCard2>({
      defaultValues: mode === "create" ? {} : initData,
    })
    const {fields, append} = useFieldArray({
      control,
      name: "tags",
    })

    const onSubmit: SubmitHandler<StoryCard2> = (data) => {
      callback(mode, data)
      reset()
    }
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="content">卡片内容 *</Label>
          <Textarea
            style={{width: "100%"}}
            required
            {...register("children", {required: true})}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="tags">标签</Label>
          <TagGroup>
            {fields.map((item, index) => {
              return (
                <div key={item.id}>
                  <Controller
                    render={({field}) => <Tag {...field}>{field.value}</Tag>}
                    name={`tags.${index}`}
                    control={control}
                  />
                </div>
              )
            })}
            <EditableTag
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => {
                const value = e.currentTarget.textContent?.trim()
                if (value) {
                  append(value)
                }
                e.currentTarget.textContent = "+"
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  e.currentTarget.blur()
                }
              }}
              onFocus={(e) => {
                if (e.currentTarget.textContent === "+") {
                  e.currentTarget.textContent = ""
                }
              }}
            >
              +
            </EditableTag>
          </TagGroup>
        </FormGroup>

        <ButtonGroup>
          <Button
            type="button"
            onClick={() => {
              onCancel()
              deleteCard ? deleteCard() : null
            }}
          >
            删除
          </Button>
          {mode === "create" ? (
            <Button type="submit" color="primary">
              创建卡片
            </Button>
          ) : (
            <Button type="submit" color="primary">
              保存卡片
            </Button>
          )}
        </ButtonGroup>
      </Form>
    )
  }
)

KanbanForm.displayName = "KanbanForm"

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-sizing: border-box;
  background-color: #fff;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`
const EditableTag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  padding: 4px 8px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  color: #666;

  &:hover {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    background-color: #fff;
    cursor: text;
  }

  /* 只有在非聚焦状态且为空时才显示+ */
  &:empty:not(:focus):before {
    content: "+";
    color: #999;
  }
`
