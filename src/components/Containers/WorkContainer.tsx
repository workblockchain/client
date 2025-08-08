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

import {Table} from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {t} from "i18next"
import {useMemo} from "react"
import {ColumnProps} from "../Table/interfaces"

interface WorkRecord extends Partial<WorkData> {
  wid: string
  userId: string
  createdAt?: number
  startTime?: number
  endTime?: number
  isSigned?: boolean
  data?: string
  [key: string]: any
}

const getDate = (value?: number) =>
  value ? new Date(value).toLocaleString() : "-"
const isSigned = (value?: boolean) =>
  value ? t`work.signed` : t`work.unsigned`

const columns = [
  {
    key: "wid",
    title: t`work.id`,
  } as ColumnProps<string, string>,
  {key: "userId", title: t`work.user`, width: 120} as ColumnProps<
    string,
    string
  >,
  {
    key: "startTime",
    title: t`work.startTime`,
    render: getDate,
    width: 136,
  } as ColumnProps<string, number>,
  {
    key: "endTime",
    title: t`work.endTime`,
    render: getDate,
    width: 120,
  } as ColumnProps<string, number>,
  {
    key: "isSigned",
    title: t`work.status`,
    render: isSigned,
    width: 80,
  } as ColumnProps<string, boolean>,
  {
    key: "description",
    title: t`work.description`,
    render: (value?: string) => value || "-",
  } as ColumnProps<string, string>,
] as const

export function WorkContainer() {
  const workRecords = useSignedRecord((state) => state.workRecords)
  const signedRecords = useSignedRecord((state) => state.signedRecords)

  const combinedRecords = useMemo(() => {
    const ids = new Set<string>()
    const uniqueRecords: WorkRecord[] = []
    workRecords.forEach((r) => {
      if (!ids.has(r.wid)) {
        uniqueRecords.push({...r})
        ids.add(r.wid)
      }
    })
    signedRecords.forEach((r) => {
      const data = JSON.parse(r.data) as Partial<WorkData>
      if (data.wid && !ids.has(data.wid)) {
        uniqueRecords.push({
          wid: data.wid,
          userId: data.userId ?? r.createdBy,
          startTime: data.startTime,
          endTime: data.endTime,
          description: data.description,
          isSigned: true,
          ...data,
        })
        ids.add(data.wid)
      }
    })
    return uniqueRecords
  }, [workRecords, signedRecords])

  const handleRowClick = (record: Record<string, unknown>) => {
    console.log("Record clicked:", record)
  }

  return (
    <Table<typeof columns>
      columns={columns}
      data={combinedRecords}
      clickRow={handleRowClick}
    />
  )
}

export default WorkContainer
