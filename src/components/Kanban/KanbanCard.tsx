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

import {BaseCard} from "@/interfaces"
import {colors} from "@/styles"
import {useRef} from "react"
import {useDrag, useDrop} from "react-dnd"
import styled from "styled-components"
import {ItemTypes} from "./types"

export interface Props extends BaseCard {
  onDrop: (dragId: string, dropId: string) => void
  children?: React.ReactNode
}

export const KanbanCard = ({
  id,
  tags,
  subTasks,
  description,
  onDrop,
  ...props
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{isDragging}, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: {id},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          onDrop(item.id, id)
        }
      },
    }),
    [id, onDrop]
  )

  const [_, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover: (item: {id: string}) => {
        if (!ref.current) return
        onDrop(item.id, id)
      },
    }),
    [onDrop, id]
  )

  drag(drop(ref))

  return (
    <Container ref={ref} $isDragging={isDragging}>
      {/* <CardTitle>{title}</CardTitle> */}
      {description || props.children}
      <SubTasks>
        <h5 style={{margin: "5px 0", color: colors.Neutral400}}>子任务</h5>
        {subTasks?.map((task, index) => (
          <div key={index}>
            <input type="checkbox" /> {task.label}
          </div>
        ))}
      </SubTasks>
      <div>{tags?.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</div>
    </Container>
  )
}

const Container = styled.div<{$isDragging: boolean}>`
  background-color: white;
  display: flex;
  gap: 12px;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: ${({$isDragging}) => ($isDragging ? "move" : "grab")};
  opacity: ${({$isDragging}) => ($isDragging ? 0.4 : 1)};
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
  color: ${colors.Neutral800};
  font-size: 13px;
  flex-direction: column;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

const SubTasks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Tag = styled.span`
  padding: 2px 6px;
  background-color: green;
  border-radius: 8px;
  margin: 0 5px;
`
