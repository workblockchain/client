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
import {forwardRef, HTMLAttributes} from "react"
import styled, {css} from "styled-components"
import Avatar from "../Avatar/AvatarPreview"
import Tag from "../Tag"

export interface Props extends HTMLAttributes<HTMLDivElement> {
  id: string
  tags?: string[]
  subTasks?: {label: string}[]
  children?: React.ReactNode
  isDragging?: boolean
  draggable?: boolean
  size?: "full" | "small"
  cid?: string
  assignee?: string
}

const StoryCard = forwardRef<HTMLDivElement, Props>(
  (
    {
      tags,
      subTasks,
      draggable,
      isDragging,
      children,
      cid,
      assignee,
      size,
      ...props
    },
    ref
  ) => {
    return (
      <Container
        $draggable={draggable}
        $isDragging={!!isDragging}
        ref={ref}
        {...props}
      >
        <Content $size={size}>{children}</Content>
        {size !== "small" && !!subTasks?.length && (
          <SubTasks>
            <h5 style={{margin: "5px 0", color: colors.Neutral400}}>子任务</h5>
            {subTasks?.map((task, index) => (
              <div key={index}>
                <input type="checkbox" /> {task.label}
              </div>
            ))}
          </SubTasks>
        )}
        {size !== "small" && (
          <>
            {!!tags?.length && (
              <TagGroup>
                {tags?.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagGroup>
            )}
            {(!!cid || !!assignee) && (
              <InfoGroup>
                {!!cid && <Tag variant="text">{cid}</Tag>}
                {!!assignee && <Avatar avatar={assignee} isText size={24} />}
              </InfoGroup>
            )}
          </>
        )}
        {size === "small" && (
          <SmallLine>
            {!!tags?.length && (
              <TagGroup>
                {tags?.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagGroup>
            )}
            {(!!cid || !!assignee) && (
              <InfoGroup>
                {!!cid && <Tag variant="text">{cid}</Tag>}
                {!!assignee && <Avatar avatar={assignee} isText size={24} />}
              </InfoGroup>
            )}
          </SmallLine>
        )}
      </Container>
    )
  }
)

export default StoryCard

StoryCard.displayName = "StoryCard"

export const CardContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  background-color: white;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 16px;
`

const Content = styled.div<{$size?: "full" | "small"}>`
  margin-bottom: auto;
  ${({$size}) =>
    $size === "small" &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    `}
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

const SmallLine = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${TagGroup} {
    width: 100%;
    flex-shrink: 1;
    overflow: hidden;
    flex-wrap: nowrap;
  }

  ${InfoGroup} {
    flex-shrink: 0;
  }
`

const Container = styled(CardContainer)<{
  $isDragging: boolean
  $draggable?: boolean
}>`
  ${({$draggable, $isDragging}) => {
    if ($draggable) {
      return css`
        cursor: ${$isDragging ? "move" : "grab"};
        opacity: ${$isDragging ? 0.4 : 1};
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: translateY(0);
        }
      `
    }
    return css`
      cursor: pointer;
    `
  }}
  transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
  position: relative;
  color: ${colors.Neutral800};
`
