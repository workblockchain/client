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
import {Card, CardProps} from "../Card/Card"
import Tag from "../Tag"

export interface Props extends CardProps {
  tags?: string[]
  subTasks?: {label: string}[]
  children?: React.ReactNode
  isDragging?: boolean
  size?: "full" | "small"
  cid?: string
  assignee?: string
}

const StoryCard = forwardRef<HTMLDivElement, Props>(
  ({tags, subTasks, isDragging, children, cid, assignee, ...props}, ref) => {
    return (
      <StyledCard $isDragging={!!isDragging} ref={ref} {...props}>
        <Context>
          {children}
          {subTasks?.length ? (
            <SubTasks>
              <h5 style={{margin: "5px 0", color: colors.Neutral400}}>
                子任务
              </h5>
              {subTasks?.map((task, index) => (
                <div key={index}>
                  <input type="checkbox" /> {task.label}
                </div>
              ))}
            </SubTasks>
          ) : null}
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
        </Context>
      </StyledCard>
    )
  }
)

export default StoryCard

StoryCard.displayName = "StoryCard"

const StyledCard = styled(Card)<{$isDragging: boolean}>`
  cursor: ${({$isDragging}) => ($isDragging ? "move" : "grab")};
  opacity: ${({$isDragging}) => ($isDragging ? 0.4 : 1)};
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  color: ${colors.Neutral800};
  font-size: 13px;
  max-width: 520px;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`

const Context = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  justify-content: center;
  align-items: center;
`
