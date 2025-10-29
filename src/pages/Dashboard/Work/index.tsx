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
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo, useState} from "react"
import styled from "styled-components"
import DataConditionRow from "../DataConditionRow"
import {WorkRecord, workRecordFieldDefinitions} from "../interfaces"
import {applyConditions} from "../recordUtils"
import {useViewPreference} from "../useDashboardPreference"
import {createGroupSort, workRecordFieldsToColumnDefs} from "../workRecordUtils"
import {WorkRecordForm} from "./WorkRecordForm"

// 使用新的字段定义系统生成 columns
const columns: ColumnDef<WorkRecord>[] = workRecordFieldsToColumnDefs(
  workRecordFieldDefinitions
)

function WorkContainer() {
  const workRecords = useSignedRecord((state) => state.workRecords)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<WorkRecord>()

  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  const conditionedRecords = useMemo(() => {
    const records = workRecords.map((r) => ({
      ...r.data,
      createdAt: r.createdAt,
    })) as WorkRecord[]
    return applyConditions(records, filterConditions, sortConditions)
  }, [workRecords, filterConditions, sortConditions])

  const handleRowClick = (row: WorkRecord) => {
    console.log("Record clicked:", row)
    setEditingRecord(row)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (data: WorkRecord) => {
    const isEditMode = Boolean(editingRecord?.wid)

    if (isEditMode) {
      // 编辑模式：更新现有记录
      if (data.wid) {
        useSignedRecord.getState().updateWorkRecord(data.wid, data)
      }
    } else {
      // 创建模式：添加新记录
      useSignedRecord.getState().addWorkRecord(data as WorkData)
    }

    setIsFormOpen(false)
  }

  const handleOpenCreateForm = () => {
    setEditingRecord(undefined)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingRecord(undefined)
  }

  return (
    <Container>
      <Flex>
        <DataConditionRow fieldDefinitions={workRecordFieldDefinitions} />
        <Button $variant="text" onClick={handleOpenCreateForm}>
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
        initialData={editingRecord}
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
