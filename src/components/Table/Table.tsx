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

import PlusIcon from "@/assets/plus.svg?react"
import {colors} from "@/styles"
import styled from "styled-components"
import {Button} from "../Button"
import {TableGroup, TableGroupProps} from "./TableGroup"
import {Td, TypedCellProps} from "./TableRow"

export interface titlesOption {
  title: string
  filter?: (row: TypedCellProps) => boolean
  hidden?: boolean
  width?: number
}

interface TableProps {
  titles: titlesOption[]
  data?: TableGroupProps[]
  onAddClick: () => void
}

export const Table = ({data, titles = [], onAddClick}: TableProps) => {
  return (
    <TableContainer>
      <ToolbarActions>
        <Button $variant="text" $size="small" onClick={() => onAddClick()}>
          <PlusIcon />
          <span>添加记录</span>
        </Button>
        <Button $variant="text" $size="small" onClick={() => onAddClick()}>
          <span>字段配置</span>
        </Button>
        <Button $variant="text" $size="small" onClick={() => onAddClick()}>
          筛选
        </Button>
        <Button $variant="text" $size="small" onClick={() => onAddClick()}>
          排序
        </Button>
      </ToolbarActions>

      <TableTitle>
        {titles.map(
          (title, index) =>
            !title.hidden && (
              <Td key={index} width={title.width}>
                {title.title}
              </Td>
            )
        )}
      </TableTitle>

      {data!.map((group, index) => {
        return <TableGroup key={index} {...group} titles={titles}></TableGroup>
      })}
      {/* <TableGroupAdd>
        <PlusIcon width={24} height={24} />
        <span>添加劳动分组</span>
      </TableGroupAdd> */}
    </TableContainer>
  )
}

export default Table

const TableContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  padding: 5px;
  flex-direction: column;
  gap: 8px;
`

const ToolbarActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`

export const TableTitle = styled.div`
  display: flex;
  align-items: stretch;
  height: 35px;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  margin-bottom: 16px;
`
export const TableGroupAdd = styled.div`
  border-radius: 16px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 8px 8px 8px 12px;
  color: ${colors.Neutral500};
  width: 100%;
  display: flex;
  align-items: stretch;
`
