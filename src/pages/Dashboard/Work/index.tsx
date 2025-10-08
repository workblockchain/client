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

import {Drawer} from "@/components/Drawer"
import {Table} from "@/components/Table/Table"
import {WorkData} from "@/interfaces/records"
import {
  WorkRecord,
  workRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {workRecordFieldsToColumnDefs} from "@/pages/Dashboard/workRecordUtils"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {useMemo} from "react"
import DataConditionRow from "../DataConditionRow"
import {WorkRecordForm} from "../Kanban/WorkRecordForm"
import {useViewPreference} from "../useDashboardPreference"

// 使用新的字段定义系统生成 columns
const columns: ColumnDef<WorkRecord>[] = workRecordFieldsToColumnDefs(
  workRecordFieldDefinitions
)

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

  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  // 应用筛选条件
  const conditionedRecords = useMemo(() => {
    const filtered =
      filterConditions.length === 0
        ? combinedRecords
        : combinedRecords.filter((record) => {
            return filterConditions.every((condition) => {
              const value = record[condition.field as keyof WorkRecord]

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
              const valueA = a[condition.field as keyof WorkRecord]
              const valueB = b[condition.field as keyof WorkRecord]

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
  }, [combinedRecords, filterConditions, sortConditions])

  const handleRowClick = (row: any) => {
    console.log("Record clicked:", row)
  }

  return (
    <>
      <DataConditionRow fieldDefinitions={workRecordFieldDefinitions} />
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
        groupSort={(key, a, b) => {
          const def = workRecordFieldDefinitions.find((f) => f.key === key)
          if (!def) return 0
          const valueA = a[def.key as keyof WorkRecord]
          const valueB = b[def.key as keyof WorkRecord]
          console.log(key, def.type, valueA, valueB)
          let res = 0
          switch (def.type) {
            case "text":
              res = String(valueA).localeCompare(String(valueB))
              break
            case "number":
              res = Number(valueA) - Number(valueB)
              break
            case "date":
              res = new Date(valueA).getTime() - new Date(valueB).getTime()
              break
            case "select":
              res = String(valueA).localeCompare(String(valueB))
              break
            case "multi-select":
              res = String(valueA).localeCompare(String(valueB))
              break
            case "boolean":
              const a = valueA ? 1 : 0
              const b = valueB ? 1 : 0
              res = a - b
          }
          const sort = groupConditions.find((c) => c.field === key)
          return sort?.condition === "desc" ? -res : res
        }}
      />

      <Drawer isOpen={false} onClose={() => {}} title={"Drawer 标题"}>
        <WorkRecordForm submit={() => {}} />
      </Drawer>
    </>
  )
}

export default WorkContainer
