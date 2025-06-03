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

import Table from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {TableGroupProps} from "../Table/TableGroup"
import {TableRowProps, TextCellProps, TimeCellProps} from "../Table/TableRow"

interface WorkContainerProps {}

export function WorkContainer(props: WorkContainerProps) {
  const {workRecords} = useSignedRecord()

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
      {type: "text", data: record.isSigned} as TextCellProps,
    ],
  }))

  const data: TableGroupProps[] = [
    {
      groupData: rows,
    },
  ]

  const titles = [
    "劳动id",
    "开始时间",
    "结束时间",
    "持续时长",
    "劳动成果",
    "前置产出",
    "劳动人ID",
    "劳动标签",
    "requirement ID",
    "projectIds",
    "描述",
    "cover",
    "后置产出",
    "签名状态",
  ]

  return <Table titles={titles} data={data} />
}

export default WorkContainer
