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

import Table, {titlesOption} from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {useUserProfile} from "@/stores/useUserProfile"
import {v4} from "uuid"
import {TableGroupProps} from "../Table/TableGroup"
import {TableRowProps, TextCellProps, TimeCellProps} from "../Table/TableRow"

export function WorkContainer() {
  const {workRecords, addWorkRecord} = useSignedRecord()
  const {uid} = useUserProfile()
  // 将 workRecords 转换为 Table 组件需要的格式
  const rows: TableRowProps[] = workRecords.map((record: WorkData) => ({
    row: [
      {type: "text", data: record.wid} as TextCellProps,
      {type: "time", data: record.startTime} as TimeCellProps,
      {type: "time", data: record.endTime} as TimeCellProps,
      {type: "time", data: record.duration} as TimeCellProps,
      {type: "text", data: record.outcome} as TextCellProps,
      {type: "text", data: record.usedOutcome} as TextCellProps,
      {type: "text", data: record.userId} as TextCellProps,
      {type: "text", data: record.workTags} as TextCellProps,
      {type: "text", data: record.requirementIds} as TextCellProps,
      {type: "text", data: record.projectIds} as TextCellProps,
      {type: "text", data: record.description} as TextCellProps,
      {type: "text", data: record.cover} as TextCellProps,
      {type: "text", data: record.usedBy} as TextCellProps,
      {
        type: "text",
        data: record.isSigned,
        renderText: (text) => {
          text ? "未签名" : "已签名"
        },
      } as TextCellProps,
    ],
  }))

  const data: TableGroupProps[] = [
    {
      groupData: rows,
      onAddClick: function (): void {
        addEmptyWorkRecord()
      },
    },
  ]

  let editingWorkRecord: WorkData | null = null

  const addEmptyWorkRecord = () => {
    editingWorkRecord = {
      wid: v4(),
      startTime: Date.now(),
      endTime: 0,
      outcome: "",
      userId: uid,
      workTags: [],
      requirementIds: [],
      projectIds: [],
    }
  }

  const titles: titlesOption[] = [
    {
      title: "劳动id",
      width: 100,
    },
    {title: "开始时间"},
    {title: "结束时间"},
    {title: "持续时长"},
    {title: "劳动成果"},
    {title: "前置产出", hidden: true},
    {title: "劳动人ID"},
    {title: "劳动标签", hidden: true},
    {title: "requirement ID", hidden: true},
    {title: "projectIds", hidden: true},
    {title: "描述"},
    {title: "cover", hidden: true},
    {title: "后置产出", hidden: true},
    {title: "签名状态"},
  ]

  return (
    <Table
      titles={titles}
      data={data}
      onAddClick={() => {
        addEmptyWorkRecord()
      }}
    />
  )
}

export default WorkContainer
