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

import {Props as StoryCardProps} from "@/components/StoryCard"
import React from "react"
import styled from "styled-components"
import {Input} from "../Input"
import {Textarea} from "../Input/Textarea"
import {AvatarRow} from "../Layout/AvatarRow"

interface KanbanFormProps {
  onSubmit: (data: StoryCardProps) => void
}

export const KanbanForm = React.memo(({onSubmit}: KanbanFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const tagsInput = formData.get("tags") as string
    const subTasksInput = formData.get("subTasks") as string

    const data: StoryCardProps = {
      id: `card_${Date.now()}`,
      children: formData.get("children") as string,
      tags: tagsInput
        ? tagsInput
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      subTasks: subTasksInput
        ? subTasksInput
            .split(",")
            .map((task) => ({label: task.trim()}))
            .filter((task) => task.label)
        : [],
      cid: (formData.get("cid") as string) || undefined,
      assignee: (formData.get("assignee") as string) || undefined,
    }

    onSubmit(data)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="content">内容 *</Label>
        <Textarea id="content" name="children" rows={3} required />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="tags">标签</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="请用逗号分隔多个标签，如：紧急,重要,前端"
        />
        <HelperText>多个标签请用英文逗号分隔</HelperText>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="subTasks">子任务</Label>
        <Textarea
          id="subTasks"
          name="subTasks"
          rows={2}
          placeholder="请用逗号分隔多个子任务"
        />
        <HelperText>多个子任务请用英文逗号分隔</HelperText>
      </FormGroup>
      <FormGroup>
        <AvatarRow
          value={""}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        />
      </FormGroup>

      <ButtonGroup>
        <SubmitButton type="submit">创建卡片</SubmitButton>
      </ButtonGroup>
    </Form>
  )
})

KanbanForm.displayName = "KanbanForm"

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 24px;
  box-sizing: border-box;
  background-color: #fff;
`

const FormGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SubmitButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`
const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`

const HelperText = styled.span`
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
  line-height: 1.4;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`
