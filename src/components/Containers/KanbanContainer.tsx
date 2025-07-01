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
import {BoardProps} from "@/interfaces/kanban"
import {useReducer} from "react"
import styled from "styled-components"
import {Input} from "../Input"
import {Textarea} from "../Input/Textarea"
import {KanbanBoard} from "../Kanban/KanbanBoard"

export function KanbanContainer() {
  let initialArg: BoardProps = {
    id: "kanbanBoard",
    column: [
      {
        id: "card 1",
        columnTitle: "To do",
        cards: [
          {
            id: "eat",
            children: "1",
            subTasks: [{label: "123"}, {label: "123"}],
          },
          {
            id: "sleep 1",
            children: "2",
          },
          {id: "eat11", children: "3"},
          {id: "eat1111", children: "4"},
          {id: "eat11111", children: "5"},
        ],
      },
      {
        id: "card 2",
        columnTitle: "进行中",
        cards: [{id: "card4643"}],
      },
      {
        id: "card 3",
        columnTitle: "完成",
        cards: [{id: "car45645664d3"}],
      },
    ],
  }

  const reducer = (
    state: BoardProps,
    action: {
      type: string
      payload: {
        columnId?: string
        content?: StoryCardProps
        dragIndex?: number
        hoverIndex?: number
        targetIndex?: number
        sourceColumnId?: string
        targetColumnId?: string
      }
    }
  ) => {
    const props = action.payload
    switch (action.type) {
      case "MOVE_CARD": {
        console.log("Moving card", action.payload)
        const stateCopy = structuredClone(state)
        // 找到源列和目标列
        const fromList = stateCopy.column.find(
          (list) => list.id === props.sourceColumnId
        )
        const toList = stateCopy.column.find(
          (list) => list.id === props.targetColumnId
        )

        // 边界检查
        if (
          !fromList ||
          !toList ||
          props.dragIndex === undefined ||
          props.hoverIndex === undefined ||
          props.dragIndex < 0 ||
          props.dragIndex >= fromList.cards.length ||
          props.hoverIndex < 0
        ) {
          console.warn("Invalid move operation", action.payload)
          return stateCopy
        }

        // 从源列移除卡片
        const [movedCard] = fromList.cards.splice(props.dragIndex, 1)

        // 调整 hoverIndex（仅在同一列内移动时需要）
        let adjustedHoverIndex = props.hoverIndex
        // 是否在同一列内移动

        console.log(props.dragIndex, props.hoverIndex, adjustedHoverIndex)

        // 确保 adjustedHoverIndex 在目标列的有效范围内
        adjustedHoverIndex = Math.min(props.hoverIndex, toList.cards.length)

        // 将卡片插入目标列的 adjustedHoverIndex 位置
        toList.cards.splice(props.hoverIndex, 0, movedCard)

        return stateCopy
      }
      case "ADD_CARD": {
        console.log("Adding card", action.payload)
        const stateCopy = structuredClone(state)

        const targetList = stateCopy.column.find(
          (l) => l.id === props.targetColumnId
        )

        if (!targetList || !props.targetIndex || !props.content)
          return stateCopy

        targetList.cards.splice(props.targetIndex, 0, props.content)
        return stateCopy
      }
      case "REMOVE_CARD": {
        console.log("Removing card", action.payload)
        const stateCopy = structuredClone(state)

        const sourceList = stateCopy.column.find((l) => l.id === props.columnId)

        if (!sourceList || !props.targetIndex) return stateCopy

        sourceList.cards.splice(props.targetIndex, 1)
        return stateCopy
      }
      case "CHANGE_CARD": {
        console.log("Changing card", action.payload)
        const stateCopy = structuredClone(state)

        const sourceList = stateCopy.column.find((l) => l.id === props.columnId)

        if (!sourceList || !props.targetIndex) return stateCopy

        sourceList.cards[props.targetIndex] = {
          ...sourceList.cards[props.targetIndex],
          ...props.content,
        }
        return stateCopy
      }
      default:
        return state
    }
  }

  const [kanbanState, dispatch] = useReducer(reducer, initialArg)

  const handleAddCard = (columnId: string, content: StoryCardProps) => {
    dispatch({
      type: "ADD_CARD",
      payload: {
        columnId,
        content,
      },
    })
  }

  const handleMoveCard = (
    dragIndex: number,
    hoverIndex: number,
    sourceColumnId: string,
    targetColumnId: string
  ) => {
    dispatch({
      type: "MOVE_CARD",
      payload: {dragIndex, hoverIndex, sourceColumnId, targetColumnId},
    })
  }

  const handleRemoveCard = (columnId: string, targetIndex: number) => {
    dispatch({type: "REMOVE_CARD", payload: {columnId, targetIndex}})
  }

  const handleUpdateCard = (
    columnId: string,
    targetIndex: number,
    content: StoryCardProps
  ) => {
    dispatch({
      type: "CHANGE_CARD",
      payload: {
        columnId,
        targetIndex,
        content,
      },
    })
  }

  const renderFrom = (submit: (data: StoryCardProps) => void) => {
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

      submit(data)
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

        <FormRow>
          <FormGroup>
            <Label htmlFor="cid">卡片ID</Label>
            <Input id="cid" name="cid" placeholder="可选，留空自动生成" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="assignee">指派人</Label>
            <Input
              id="assignee"
              name="assignee"
              placeholder="请输入指派人姓名"
            />
          </FormGroup>
        </FormRow>

        <ButtonGroup>
          <SubmitButton type="submit">创建卡片</SubmitButton>
        </ButtonGroup>
      </Form>
    )
  }

  return (
    <KanbanBoard
      id={kanbanState.id}
      title={kanbanState.title}
      column={kanbanState.column}
      addCard={handleAddCard}
      moveCard={handleMoveCard}
      deleteCard={handleRemoveCard}
      upDateCard={handleUpdateCard}
      renderFrom={renderFrom}
    ></KanbanBoard>
  )
}

export default KanbanContainer

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 24px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`
