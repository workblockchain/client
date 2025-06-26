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

import {colors} from "@/styles"
import {forwardRef} from "react"
import styled from "styled-components"
import Avatar from "../Avatar/AvatarPreview"
import Tag from "../Tag"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tags?: string[]
  subTasks?: {label: string}[]
  children?: React.ReactNode
  isDragging?: boolean
  size?: "full" | "small"
  cid?: string
  assignee?: string // refactor to a user icon
}
const StoryCard = forwardRef<HTMLDivElement, Props>(
  ({tags, subTasks, isDragging, children, cid, assignee, ...props}, ref) => {
    return (
      <Container $isDragging={!!isDragging} ref={ref} {...props}>
        {/* <CardTitle>{title}</CardTitle> */}
        {children}
        <SubTasks>
          <h5 style={{margin: "5px 0", color: colors.Neutral400}}>子任务</h5>
          {subTasks?.map((task, index) => (
            <div key={index}>
              <input type="checkbox" /> {task.label}
            </div>
          ))}
        </SubTasks>
        <TagGroup>
          {tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagGroup>
        {(!!cid || !!assignee) && (
          <InfoGroup>
            {!!cid && <Tag variant="text">{cid}</Tag>}
            {!!assignee && <Avatar avatar={assignee} isText size={24} />}
          </InfoGroup>
        )}
      </Container>
    )
  }
)

export default StoryCard

StoryCard.displayName = "StoryCard"

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

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: ${colors.Neutral600};
  }

  input[type="checkbox" i] {
    margin: 0;
  }
`

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const InfoGroup = styled.div`
  display: flex;
  gap: 8px;
  width: fit-content;
`
