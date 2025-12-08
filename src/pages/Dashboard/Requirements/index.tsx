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
import {RequirementData} from "@/interfaces"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo, useState} from "react"
import styled from "styled-components"
import DataConditionRow from "../DataConditionRow"
import {requirementRecordFieldDefinitions} from "../fieldDefinitions"
import {RequirementRecord} from "../interfaces"
import {applyConditions} from "../recordUtils"
import {useViewPreference} from "../useDashboardPreference"
import {createGroupSort, fieldDefinitionsToColumnDefs} from "../workRecordUtils"
import {RequirementForm} from "./RequirementForm"

// 使用新的字段定义系统生成 columns
const columns: ColumnDef<RequirementRecord>[] =
  fieldDefinitionsToColumnDefs<RequirementRecord>(
    requirementRecordFieldDefinitions
  )

function RequirementsContainer() {
  const requirementRecords = useSignedRecord(
    (state) => state.requirementRecords
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<RequirementRecord>()
  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  const conditionedRecords = useMemo(() => {
    const records = requirementRecords.map((r) => ({
      ...r.data,
      createdAt: r.createdAt,
    })) as RequirementRecord[]
    return applyConditions(records, filterConditions, sortConditions)
  }, [requirementRecords, filterConditions, sortConditions])

  const handleRowClick = (row: RequirementRecord) => {
    console.log("Requirement clicked:", row)
    setEditingRecord(row)
    setIsFormOpen(true)
  }

  const handleFormSubmit = (data: RequirementRecord) => {
    const isEditMode = Boolean(editingRecord?.rid)

    if (isEditMode) {
      // 编辑模式：更新现有记录
      if (data.rid) {
        useSignedRecord.getState().updateRequirementRecord(data.rid, data)
      }
    } else {
      // 创建模式：添加新记录
      // 生成唯一的rid
      const rid = `requirement-${Date.now()}`
      const requirementData = {
        ...data,
        rid,
        createdAt: Date.now(),
      } as RequirementData
      useSignedRecord.getState().addRequirementRecord(requirementData)
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
        <DataConditionRow
          fieldDefinitions={requirementRecordFieldDefinitions}
        />
        <Button $variant="text" onClick={handleOpenCreateForm}>
          <svgIcons.Plus />
          <span>{t`requirement.create`}</span>
        </Button>
      </Flex>
      <Table
        columns={columns}
        data={conditionedRecords}
        clickRow={handleRowClick}
        groupBy={groupConditions.map((c) => c.field)}
        groupValueRender={(key, value) => {
          const res = requirementRecordFieldDefinitions
            .find((f) => f.key === key)
            ?.cellRenderer?.(value == "true")
          return res ?? (value as string)
        }}
        groupSort={createGroupSort(
          requirementRecordFieldDefinitions,
          groupConditions
        )}
      />

      <RequirementForm
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

export default RequirementsContainer
