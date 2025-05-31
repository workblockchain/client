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

import {useState} from "react"
import styled from "styled-components"
import {colors} from "../../styles/colors"
import {Button} from "../Button"
import {DatePicker} from "../DatePicker/DatePicker"
import {Tag} from "../Tag/Tag"

const TableContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const TableToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.Neutral100};
`

const ToolbarActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

const TableActions = styled.div`
  display: flex;
  gap: 8px;
`

const TableTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
`

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  background-color: ${colors.Neutral100};
  border-bottom: 1px solid ${colors.Neutral200};
  font-weight: 500;
`

const TableContent = styled.div`
  background-color: white;
`

const TableGroup = styled.div`
  border-bottom: 1px solid ${colors.Neutral100};
`

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${colors.Neutral100};
  cursor: pointer;
  user-select: none;
`

const GroupTitle = styled.span`
  font-weight: 500;
  margin-left: 8px;
`

const GroupContent = styled.div<{$expanded: boolean}>`
  display: ${({$expanded}) => ($expanded ? "block" : "none")};
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.Neutral100};
  align-items: center;

  &:hover {
    background-color: ${colors.Neutral100};
  }
`

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const AddRow = styled(TableRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.Neutral400};
  cursor: pointer;

  &:hover {
    background-color: ${colors.Neutral100};
    color: ${colors.Neutral600};
  }
`

interface TableProps {
  data: Array<{
    groupName: string
    items: Array<{
      description: string
      category: string
      person: string
      status: string
      date: string
      duration: string
      relatedItem: string
    }>
  }>
}

export const Table = ({data}: TableProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    data.reduce(
      (acc, group) => {
        acc[group.groupName] = true
        return acc
      },
      {} as Record<string, boolean>
    )
  )

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }))
  }

  return (
    <TableContainer>
      <TableToolbar>
        <TableTitle>劳动记录</TableTitle>
      </TableToolbar>
      <ToolbarActions>
        <Button $variant="outline" $size="small">
          <IconWrapper>
            <span>添加记录</span>
          </IconWrapper>
        </Button>
        <Button $variant="outline" $size="small">
          <IconWrapper>
            <span>字段配置</span>
          </IconWrapper>
        </Button>
        <Button $variant="outline" $size="small">
          筛选
        </Button>
        <Button $variant="outline" $size="small">
          排序
        </Button>
      </ToolbarActions>
      <TableContent>
        <TableHeaderRow>
          <span>劳动描述</span>
          <span>劳动分类</span>
          <span>人员</span>
          <span>状态</span>
          <span>提出日期</span>
          <span>持续时间</span>
          <span>关联项</span>
        </TableHeaderRow>
        {data.map((group) => (
          <TableGroup key={group.groupName}>
            <GroupHeader onClick={() => toggleGroup(group.groupName)}>
              <span>{expandedGroups[group.groupName] ? "▼" : "▶"}</span>
              <GroupTitle>{group.groupName}</GroupTitle>
            </GroupHeader>
            <GroupContent $expanded={expandedGroups[group.groupName]}>
              {group.items.map((item, index) => (
                <TableRow key={index}>
                  <span>{item.description}</span>
                  <span>{item.category}</span>
                  <span>{item.person}</span>
                  <Tag
                    variant={
                      item.status === "已完成"
                        ? "success"
                        : item.status === "进行中"
                          ? "primary"
                          : "warning"
                    }
                  >
                    {item.status}
                  </Tag>
                  <DatePicker
                    value={item.date}
                    onChange={(newDate: string) =>
                      console.log("Date changed:", newDate)
                    }
                  />
                  <span>{item.duration}</span>
                  <span>{item.relatedItem}</span>
                </TableRow>
              ))}
              <AddRow>
                <span>添加记录</span>
              </AddRow>
            </GroupContent>
          </TableGroup>
        ))}
      </TableContent>
    </TableContainer>
  )
}
