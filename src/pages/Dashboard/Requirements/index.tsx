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
import type {RequirementData} from "@/interfaces/records"
import {
  RequirementRecord,
  requirementRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {
  createGroupSort,
  fieldDefinitionsToColumnDefs,
} from "@/pages/Dashboard/workRecordUtils"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo, useState} from "react"
import styled from "styled-components"
import DataConditionRow from "../DataConditionRow"
import {useViewPreference} from "../useDashboardPreference"
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

  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  // 应用筛选条件
  const conditionedRecords = useMemo(() => {
    const filtered =
      filterConditions.length === 0
        ? requirementRecords
        : requirementRecords.filter((record) => {
            return filterConditions.every((condition) => {
              const value = record[condition.field as keyof RequirementData]

              switch (condition.condition) {
                case "equal":
                  // 当value为空字符串时，默认返回true（所有值都放行）
                  return condition.value === ""
                    ? true
                    : String(value) === condition.value
                case "notEqual":
                  // 当value为空字符串时，默认返回true（所有值都放行）
                  return condition.value === ""
                    ? true
                    : String(value) !== condition.value
                case "contains":
                  // 当value为空字符串时，默认返回true（所有值都放行）
                  return condition.value === ""
                    ? true
                    : String(value).includes(condition.value as string)
                case "notContains":
                  // 当value为空字符串时，默认返回true（所有值都放行）
                  return condition.value === ""
                    ? true
                    : !String(value).includes(condition.value as string)
                case "empty":
                  return value === "" || value === null || value === undefined
                case "notEmpty":
                  return value !== "" && value !== null && value !== undefined
                case "greaterThan":
                  return Number(value) > Number(condition.value)
                case "lessThan":
                  return Number(value) < Number(condition.value)
                case "between":
                  if (
                    Array.isArray(condition.value) &&
                    condition.value.length === 2
                  ) {
                    const [min, max] = condition.value
                    return (
                      Number(value) >= Number(min) &&
                      Number(value) <= Number(max)
                    )
                  }
                  return true
                default:
                  return true
              }
            })
          })

    const sortedRecords =
      sortConditions.length === 0
        ? filtered
        : filtered.sort((a, b) => {
            for (const condition of sortConditions) {
              const valueA = a[condition.field as keyof RequirementData]
              const valueB = b[condition.field as keyof RequirementData]

              // 处理undefined或null值
              if (valueA === undefined || valueA === null) return 1
              if (valueB === undefined || valueB === null) return -1

              let comparison = 0
              if (valueA < valueB) comparison = -1
              if (valueA > valueB) comparison = 1

              // 如果当前条件可以决定顺序，返回结果
              if (comparison !== 0) {
                return condition.value === "desc" ? -comparison : comparison
              }
            }
            return 0
          })
    return sortedRecords
  }, [requirementRecords, filterConditions, sortConditions])

  const handleRowClick = (row: any) => {
    console.log("Requirement clicked:", row)
  }

  const handleFormSubmit = (data: RequirementRecord) => {
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
        <DataConditionRow
          fieldDefinitions={requirementRecordFieldDefinitions}
        />
        <Button $variant="text" onClick={handleOpenForm}>
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
