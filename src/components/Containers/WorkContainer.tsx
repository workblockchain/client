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

interface WorkRecord extends Partial<WorkData> {
  wid: string
  userId: string
  createdAt?: number
  startTime?: number
  endTime?: number
  isSigned?: boolean
  data?: string
}

export function WorkContainer() {
  const {workRecords, signedRecords} = useSignedRecord()

  const columns = [
    {
      key: "wid",
      title: t`work.id`,
    },
    {
      key: "userId",
      title: t`work.user`,
    },
    {
      key: "startTime",
      title: t`work.startTime`,
      render: (value?: number) =>
        value ? new Date(value).toLocaleString() : "-",
    },
    {
      key: "endTime",
      title: t`work.endTime`,
      render: (value?: number) =>
        value ? new Date(value).toLocaleString() : "-",
    },
    {
      key: "isSigned",
      title: t`work.status`,
      render: (value?: boolean) => (value ? t`work.signed` : t`work.unsigned`),
    },
    {
      key: "description",
      title: t`work.description`,
      render: (value?: string) => value || "-",
    },
  ]

  const combinedRecords: WorkRecord[] = [
    ...workRecords.map((w) => ({
      ...w,
      wid: w.wid,
      isSigned: w.isSigned || false,
    })),
    ...signedRecords.map((r) => {
      try {
        const data = JSON.parse(r.data) as Partial<WorkData>
        return {
          wid: r.id,
          userId: r.createdBy,
          startTime: data.startTime,
          endTime: data.endTime,
          description: data.description,
          isSigned: true,
          ...data,
        }
      } catch {
        return {
          wid: r.id,
          userId: r.createdBy,
          isSigned: true,
          description: r.data,
        }
      }
    }),
  ].filter(Boolean)

  const handleRowClick = (record: WorkRecord) => {
    console.log("Record clicked:", record)
  }

  return (
    <div>
      <Table
        data={combinedRecords}
        columns={columns}
        rowKey="wid"
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default WorkContainer
