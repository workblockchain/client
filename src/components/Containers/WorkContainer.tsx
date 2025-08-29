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

import {Table} from "@/components/Table"
import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {t} from "i18next"
import {useMemo, useState} from "react"
import {Drawer} from "../Drawer"
import {FilterBar, FilterConfig} from "../Filter"
import {svgIcons} from "../Icons"
import {WorkRecordForm} from "./WorkRecordForm"
import {
  AddonRow,
  Container,
  FilterSelect,
  StatItem,
  StatLabel,
  StatsGrid,
  StatsSection,
  StatValue,
} from "./common/styles"

const getDate = (value?: number) =>
  value ? new Date(value).toLocaleString() : "-"
const isSigned = (value?: boolean) =>
  value ? t`work.signed` : t`work.unsigned`

const columns: ColumnDef<WorkData>[] = [
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

  // 筛选状态
  const [filters, setFilters] = useState({
    workTags: [] as string[],
    userId: "",
    isSigned: null as boolean | null,
  })

  // 分组状态
  const [groupBy, setGroupBy] = useState<string[]>([])

  const combinedRecords = useMemo(() => {
    const ids = new Set<string>()
    const uniqueRecords: WorkData[] = []
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
          outcome: data.outcome || "",
          userId: data.userId ?? r.createdBy,
          startTime: data.startTime || 0,
          endTime: data.endTime || 0,
          description: data.description,
          isSigned: true,
          workTags: data.workTags || [],
          requirementIds: data.requirementIds || [],
          projectIds: data.projectIds || [],
          ...data,
        })
        ids.add(data.wid)
      }
    })
    return uniqueRecords
  }, [workRecords, signedRecords])

  // 应用筛选
  const filteredRecords = useMemo(() => {
    return combinedRecords.filter((record) => {
      // 标签筛选
      if (filters.workTags.length > 0 && record.workTags) {
        const hasMatchingTag = filters.workTags.some((tag) =>
          record.workTags?.includes(tag)
        )
        if (!hasMatchingTag) return false
      }

      // 用户筛选
      if (filters.userId && record.userId !== filters.userId) {
        return false
      }

      // 签名状态筛选
      if (filters.isSigned !== null && record.isSigned !== filters.isSigned) {
        return false
      }

      return true
    })
  }, [combinedRecords, filters])

  // 计算统计信息
  const statistics = useMemo(() => {
    const totalRecords = filteredRecords.length
    const totalDuration = filteredRecords.reduce((sum, record) => {
      if (record.duration) return sum + record.duration
      if (record.startTime && record.endTime) {
        return sum + Math.floor((record.endTime - record.startTime) / 1000)
      }
      return sum
    }, 0)

    const averageDuration = totalRecords > 0 ? totalDuration / totalRecords : 0
    const signedCount = filteredRecords.filter((r) => r.isSigned).length
    const unsignedCount = totalRecords - signedCount

    return {
      totalRecords,
      totalDuration,
      averageDuration,
      signedCount,
      unsignedCount,
    }
  }, [filteredRecords])

  const [isOpen, setIsOpen] = useState(false)

  const handleRowClick = (row: WorkData) => {
    console.log("Record clicked:", row)
  }

  // 筛选器配置
  const filterConfig: FilterConfig[] = [
    {
      type: "tags",
      key: "workTags",
      label: "标签",
      placeholder: "输入标签，用逗号分隔",
    },
    {
      type: "text",
      key: "userId",
      label: "用户",
      placeholder: "用户ID",
    },
    {
      type: "select",
      key: "isSigned",
      label: "签名状态",
      options: [
        {value: "all", label: "全部"},
        {value: "signed", label: "已签名"},
        {value: "unsigned", label: "未签名"},
      ],
    },
  ]

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => {
      // 特殊处理签名状态筛选
      if (key === "isSigned") {
        return {
          ...prev,
          [key]: value === "all" ? null : value === "signed",
        }
      }
      return {...prev, [key]: value}
    })
  }

  return (
    <Container>
      {/* 筛选器组件 */}
      <FilterBar
        filters={filterConfig}
        values={{
          workTags: filters.workTags,
          userId: filters.userId,
          isSigned:
            filters.isSigned === null
              ? "all"
              : filters.isSigned
                ? "signed"
                : "unsigned",
        }}
        onChange={handleFilterChange}
      />

      {/* 分组选择器 */}
      <div
        style={{
          marginTop: "16px",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <label style={{fontSize: "12px", fontWeight: "600", color: "#666"}}>
          分组:
        </label>
        <FilterSelect
          onChange={(e) => setGroupBy(e.target.value ? [e.target.value] : [])}
        >
          <option value="">无分组</option>
          <option value="userId">按用户</option>
          <option value="isSigned">按签名状态</option>
        </FilterSelect>
      </div>

      {/* 统计信息面板 */}
      <StatsSection>
        <StatsGrid>
          <StatItem>
            <StatLabel>总记录数:</StatLabel>
            <StatValue>{statistics.totalRecords}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>总时长:</StatLabel>
            <StatValue>
              {Math.floor(statistics.totalDuration / 3600)}小时
            </StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>平均时长:</StatLabel>
            <StatValue>
              {Math.floor(statistics.averageDuration / 60)}分钟
            </StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>已签名:</StatLabel>
            <StatValue>{statistics.signedCount}</StatValue>
          </StatItem>
          <StatItem>
            <StatLabel>未签名:</StatLabel>
            <StatValue>{statistics.unsignedCount}</StatValue>
          </StatItem>
        </StatsGrid>
      </StatsSection>

      <Table<WorkData>
        columns={columns}
        data={filteredRecords}
        clickRow={handleRowClick}
        groupBy={groupBy}
        extra={
          <AddonRow
            onClick={() => {
              setIsOpen(true)
            }}
          >
            <svgIcons.Plus />
            <span>{t`dashboard.work-container.add`}</span>
          </AddonRow>
        }
      />
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        title={t`dashboard.work-container.add`}
      >
        <WorkRecordForm
          submit={(e) => {
            console.log(e)
            setIsOpen(false)
          }}
        />
      </Drawer>
    </Container>
  )
}

export default WorkContainer
