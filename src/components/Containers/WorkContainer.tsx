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

import {Table, type TableColumn} from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {t} from "i18next"
import {useMemo} from "react"

interface WorkRecord extends Partial<WorkData> {
  wid: string
  userId: string
  createdAt?: number
  startTime?: number
  endTime?: number
  isSigned?: boolean
  data?: string
}

const getDate = (value?: number) =>
  value ? new Date(value).toLocaleString() : "-"
const isSigned = (value?: boolean) =>
  value ? t`work.signed` : t`work.unsigned`

const columns: TableColumn<WorkRecord>[] = [
  {key: "wid", title: t`work.id`},
  {key: "userId", title: t`work.user`},
  {key: "startTime", title: t`work.startTime`, render: getDate},
  {key: "endTime", title: t`work.endTime`, render: getDate},
  {key: "isSigned", title: t`work.status`, render: isSigned},
  {
    key: "description",
    title: t`work.description`,
    render: (value?: string) => value || "-",
  },
] as const

export function WorkContainer() {
  const workRecords = useSignedRecord((state) => state.workRecords)
  const signedRecords = useSignedRecord((state) => state.signedRecords)

  const combinedRecords = useMemo(() => {
    const ids = new Set<string>()
    const uniqueRecords: WorkRecord[] = []
    workRecords.forEach((r) => {
      if (!ids.has(r.wid)) {
        uniqueRecords.push(r)
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

  const handleRowClick = (record: WorkRecord) => {
    console.log("Record clicked:", record)
  }

  return (
    <Table
      data={combinedRecords}
      columns={columns}
      rowKey="wid"
      onRowClick={handleRowClick}
    />
  )
}

export default WorkContainer
