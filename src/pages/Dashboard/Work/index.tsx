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

import {Button} from "@/components"
import {Flex} from "@/components/CommonLayout"
import {svgIcons} from "@/components/Icons"
import {Table} from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {
  WorkRecord,
  workRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {applyConditions} from "@/pages/Dashboard/recordUtils"
import {
  createGroupSort,
  workRecordFieldsToColumnDefs,
} from "@/pages/Dashboard/workRecordUtils"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo, useState} from "react"
import styled from "styled-components"
import DataConditionRow from "../DataConditionRow"
import {useViewPreference} from "../useDashboardPreference"
import {WorkRecordForm} from "./WorkRecordForm"

// 使用新的字段定义系统生成 columns
const columns: ColumnDef<WorkRecord>[] = workRecordFieldsToColumnDefs(
  workRecordFieldDefinitions
)

function WorkContainer() {
  const workRecords = useSignedRecord((state) => state.workRecords)
  const signedRecords = useSignedRecord((state) => state.signedRecords)
  const [isFormOpen, setIsFormOpen] = useState(false)

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

  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  const conditionedRecords = useMemo(() => {
    return applyConditions(combinedRecords, filterConditions, sortConditions)
  }, [combinedRecords, filterConditions, sortConditions])

  const handleRowClick = (row: any) => {
    console.log("Record clicked:", row)
  }

  const handleFormSubmit = (data: WorkRecord) => {
    console.log("Form submitted:", data)
    // TODO: 实现实际的提交逻辑
    setIsFormOpen(false)
  }

  const handleOpenForm = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
  }

  return (
    <Container>
      <Flex>
        <DataConditionRow fieldDefinitions={workRecordFieldDefinitions} />
        <Button $variant="text" onClick={handleOpenForm}>
          <svgIcons.Plus />
          <span>{t`work.create`}</span>
        </Button>
      </Flex>
      <Table
        columns={columns}
        data={conditionedRecords}
        clickRow={handleRowClick}
        groupBy={groupConditions.map((c) => c.field)}
        groupValueRender={(key, value) => {
          const res = workRecordFieldDefinitions
            .find((f) => f.key === key)
            ?.cellRenderer?.(value == "true")
          return res ?? (value as string)
        }}
        groupSort={createGroupSort(workRecordFieldDefinitions, groupConditions)}
      />

      <WorkRecordForm
        submit={handleFormSubmit}
        isOpen={isFormOpen}
        onClose={handleCloseForm}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export default WorkContainer
