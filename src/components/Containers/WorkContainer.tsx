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
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo} from "react"
import {Drawer} from "../Drawer"
import {WorkRecord} from "./interfaces"
import {WorkRecordForm} from "./WorkRecordForm"

const getDate = (value?: number) =>
  value ? new Date(value).toLocaleString() : "-"
const isSigned = (value?: boolean) =>
  value ? t`work.signed` : t`work.unsigned`

const columns: ColumnDef<WorkRecord>[] = [
  {
    accessorKey: "wid",
    header: t`work.id`,
  },
  {
    accessorKey: "userId",
    header: t`work.user`,
    size: 120,
  },
  {
    accessorKey: "startTime",
    header: t`work.startTime`,
    cell: ({getValue}) => getDate(getValue() as number),
    size: 136,
  },
  {
    accessorKey: "endTime",
    header: t`work.endTime`,
    cell: ({getValue}) => getDate(getValue() as number),
    size: 120,
  },
  {
    accessorKey: "isSigned",
    header: t`work.status`,
    cell: ({getValue}) => isSigned(getValue() as boolean),
    size: 80,
  },
  {
    accessorKey: "description",
    header: t`work.description`,
    cell: ({getValue}) => (getValue() ? String(getValue()) : "-"),
  },
]

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

  const handleRowClick = (row: any) => {
    console.log("Record clicked:", row.original)
  }

  return (
    <>
      <Table<WorkRecord>
        columns={columns}
        data={combinedRecords}
        clickRow={handleRowClick}
      />
      <Drawer isOpen={false} onClose={() => {}} title={"Drawer 标题"}>
        <WorkRecordForm submit={() => {}} />
      </Drawer>
    </>
  )
}

export default WorkContainer
