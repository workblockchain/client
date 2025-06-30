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

import {DragItem, ListProps} from "@/interfaces"
import {useRef, useState} from "react"
import {useDrop} from "react-dnd"
import styled from "styled-components"
import {Drawer} from "../Drawer/Drawer"
import {svgIcons} from "../Icons/svgIcons"
import {CardContainer} from "../StoryCard"
import {KanbanCard} from "./KanbanCard"
import {ItemTypes} from "./types"

// 主组件
export const KanbanList = <T extends {id: string}>({
  id,
  cards,
  title,
  onAdd,
  onMove,
}: ListProps<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleAddCard = (data: Omit<T, "id">) => {
    if (!onAdd) {
      console.warn("onAdd prop is required to add cards")
      return
    }
    onAdd(id, {
      ...data,
      id: Date.now().toString(), // 生成唯一ID
      listId: id,
    } as unknown as T)
    setIsDrawerOpen(false)
  }
  // 拖放逻辑：列表作为卡片的放置目标
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: (item: DragItem<T>, monitor) => {
      if (item.listId === id) return
      if (!monitor.isOver({shallow: true})) return

      onMove
        ? onMove({
            item: item,
            toListId: id,
            toIndex: cards.length,
          })
        : null
    },
  })

  drop(ref)

  return (
    <Container ref={ref} role="region" aria-label={`${title} 列表`}>
      <Nav>
        <Title>{title}</Title>
        <CardCount aria-live="polite">{cards.length} 张卡片</CardCount>
      </Nav>
      <CardList>
        {cards.map((card, index) => (
          <KanbanCard<T>
            id={card.id}
            key={card.id}
            index={index}
            data={card}
            listId={id}
            onMove={onMove}
          />
        ))}
      </CardList>
      <AddCardButton
        id={"add-card-button"}
        onClick={() => onAdd && setIsDrawerOpen(true)}
        className={!onAdd ? "disabled" : ""}
      >
        <AddCard>
          <svgIcons.Plus width={24} height={24} />
          添加卡片
        </AddCard>
      </AddCardButton>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="right"
        title="添加新卡片"
      >
        <AddCardForm<T> onSubmit={handleAddCard} />
      </Drawer>
    </Container>
  )
}

KanbanList.displayName = "KanbanList"

// 样式组件（保持不变）
const Container = styled.div`
  background-color: #f6f8f9;
  border-radius: 8px;
  width: 356px;
  padding: 8px;
  transition: all 0.2s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
`

const Title = styled.h3`
  font-size: 18px;
  color: #2c3e50;
  margin: 0 0 4px 0;
  padding: 8px;
  font-weight: 600;
`

const CardCount = styled.div`
  font-size: 12px;
  color: #6c757d;
  padding: 0 8px 8px;
  margin-bottom: 8px;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  flex: 1;
  min-height: 0;
`

interface AddCardFormProps<T> {
  onSubmit: (data: Omit<T, "id">) => void
}

const AddCardForm = <T extends {id: string}>({
  onSubmit,
}: AddCardFormProps<T>) => {
  const [formData, setFormData] = useState<Omit<T, "id">>({} as Omit<T, "id">)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <label>标题</label>
        <Input
          type="text"
          name="title"
          value={(formData as any).title || ""}
          onChange={handleChange}
        />
      </FormField>
      <FormField>
        <label>描述</label>
        <Textarea
          name="children"
          value={(formData as any).children || ""}
          onChange={handleChange}
        />
      </FormField>
      <SubmitButton type="submit">确认添加</SubmitButton>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    color: #2c3e50;
  }
`

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`

const Textarea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
`

const SubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;

  &:hover {
    background-color: #0069d9;
  }
`

const AddCardButton = styled(CardContainer)`
  transition: all 0.2s ease;
  border: 2px dashed transparent;

  &:hover:not(:disabled) {
    border-color: #007bff;
    background-color: #f8f9fa;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  &:disabled {
    opacity: 0.6;
  }
`

const AddCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #6b778c;
  font-size: 14px;
  font-weight: 500;
`
