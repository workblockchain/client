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
import {RequirementData, WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {useUserProfile} from "@/stores/useUserProfile"
import {ColumnDef} from "@tanstack/react-table"
import {useCallback, useEffect, useMemo, useState} from "react"
import {v4} from "uuid"
import {Drawer} from "../Drawer"
import {FilterBar, FilterConfig} from "../Filter"
import {svgIcons} from "../Icons"
import {WorkRecordForm} from "./WorkRecordForm"
import {
  AddButton,
  CloseButton,
  Container,
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
  FilterSelect,
  StatItem,
  StatLabel,
  StatsGrid,
  StatsSection,
  StatValue,
  TableSection,
  WorkRecordsHeader,
  WorkRecordsSection,
} from "./common/styles"

const getDate = (value?: number) =>
  value ? new Date(value).toLocaleString() : "-"

const requirementColumns: ColumnDef<RequirementData>[] = [
  {
    accessorKey: "rid",
    header: "需求ID",
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({getValue}) => (getValue() ? String(getValue()) : "-"),
  },
  {
    accessorKey: "status",
    header: "状态",
  },
  {
    accessorKey: "priority",
    header: "优先级",
  },
  {
    accessorKey: "assignedTo",
    header: "负责人",
  },
  {
    accessorKey: "estimated",
    header: "预计时间(小时)",
    cell: ({getValue}) => `${getValue()}h`,
  },
  {
    accessorKey: "progress",
    header: "进度",
    cell: ({getValue}) => `${getValue() || 0}%`,
  },
]

const workColumns: ColumnDef<WorkData>[] = [
  {
    accessorKey: "wid",
    header: "劳动ID",
  },
  {
    accessorKey: "userId",
    header: "执行人",
  },
  {
    accessorKey: "startTime",
    header: "开始时间",
    cell: ({getValue}) => getDate(getValue() as number),
  },
  {
    accessorKey: "endTime",
    header: "结束时间",
    cell: ({getValue}) => getDate(getValue() as number),
  },
  {
    accessorKey: "duration",
    header: "时长(秒)",
  },
  {
    accessorKey: "description",
    header: "描述",
    cell: ({getValue}) => (getValue() ? String(getValue()) : "-"),
  },
]

export function RequirementContainer() {
  const requirementRecords = useSignedRecord(
    (state) => state.requirementRecords
  )
  const workRecords = useSignedRecord((state) => state.workRecords)
  const signedRecords = useSignedRecord((state) => state.signedRecords)
  const addWorkRecord = useSignedRecord((state) => state.addWorkRecord)
  const userId = useUserProfile((state) => state.uid)

  // 筛选状态
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    tags: [] as string[],
  })

  // 分组状态
  const [groupBy, setGroupBy] = useState<string[]>([])

  // 分页状态
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 20

  // 选中的需求
  const [selectedRequirement, setSelectedRequirement] =
    useState<RequirementData | null>(null)

  // 无限滚动相关
  const [visibleRecords, setVisibleRecords] = useState<RequirementData[]>([])
  const observer = useMemo(() => {
    return new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMore()
        }
      },
      {threshold: 1.0}
    )
  }, [loading])

  // 合并工作记录
  const combinedWorkRecords = useMemo(() => {
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
  const filteredRequirements = useMemo(() => {
    return requirementRecords.filter((req) => {
      if (filters.status && req.status !== filters.status) return false
      if (filters.priority && req.priority !== filters.priority) return false
      if (filters.assignedTo && req.assignedTo !== filters.assignedTo)
        return false
      if (filters.tags.length > 0 && req.tags) {
        const hasMatchingTag = filters.tags.some((tag) =>
          req.tags.includes(tag)
        )
        if (!hasMatchingTag) return false
      }
      return true
    })
  }, [requirementRecords, filters])

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setLoading(true)
    setTimeout(() => {
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize
      const newRecords = filteredRequirements.slice(0, endIndex)
      setVisibleRecords(newRecords)

      // 检查是否还有更多数据
      if (endIndex >= filteredRequirements.length) {
        setHasMore(false)
      } else {
        setPage((prev) => prev + 1)
      }
      setLoading(false)
    }, 300)
  }, [page, filteredRequirements, loading, hasMore])

  // 初始化加载
  useEffect(() => {
    setVisibleRecords(filteredRequirements.slice(0, pageSize))
    setPage(2)
    setHasMore(filteredRequirements.length > pageSize)
  }, [filteredRequirements])

  // 设置无限滚动观察器
  useEffect(() => {
    const sentinel = document.getElementById("load-more-sentinel")
    if (sentinel && hasMore) {
      observer.observe(sentinel)
    }
    return () => {
      if (sentinel) {
        observer.unobserve(sentinel)
      }
    }
  }, [observer, hasMore])

  // 获取关联的工作记录
  const getRelatedWorkRecords = useCallback(
    (requirementId: string) => {
      const requirement = requirementRecords.find(
        (r) => r.rid === requirementId
      )
      if (!requirement) return []

      return combinedWorkRecords.filter(
        (work) =>
          work.requirementIds?.includes(requirementId) ||
          requirement.workRecordIds?.includes(work.wid)
      )
    },
    [requirementRecords, combinedWorkRecords]
  )

  // 计算需求统计信息
  const getRequirementStats = useCallback(
    (requirementId: string) => {
      const relatedWork = getRelatedWorkRecords(requirementId)
      const totalDuration = relatedWork.reduce((sum, work) => {
        if (work.duration) return sum + work.duration
        if (work.startTime && work.endTime) {
          return sum + Math.floor((work.endTime - work.startTime) / 1000)
        }
        return sum
      }, 0)

      const progress =
        relatedWork.length > 0
          ? Math.min(100, Math.floor(totalDuration / 3600 / 10) * 10)
          : 0

      return {
        totalWorkRecords: relatedWork.length,
        totalDuration,
        progress,
      }
    },
    [getRelatedWorkRecords]
  )

  const handleRequirementClick = (requirement: RequirementData) => {
    setSelectedRequirement(requirement)
  }

  const [isWorkFormOpen, setIsWorkFormOpen] = useState(false)

  // 筛选器配置
  const filterConfig: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      label: "状态",
      options: [
        {value: "", label: "全部"},
        {value: "todo", label: "待办"},
        {value: "doing", label: "进行中"},
        {value: "done", label: "已完成"},
      ],
    },
    {
      type: "select",
      key: "priority",
      label: "优先级",
      options: [
        {value: "", label: "全部"},
        {value: "high", label: "高"},
        {value: "medium", label: "中"},
        {value: "low", label: "低"},
      ],
    },
    {
      type: "text",
      key: "assignedTo",
      label: "负责人",
      placeholder: "负责人ID",
    },
    {
      type: "tags",
      key: "tags",
      label: "标签",
      placeholder: "输入标签，用逗号分隔",
    },
  ]

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({...prev, [key]: value}))
  }

  return (
    <Container>
      {/* 筛选器组件 */}
      <FilterBar
        filters={filterConfig}
        values={filters}
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
          <option value="status">按状态</option>
          <option value="priority">按优先级</option>
          <option value="assignedTo">按负责人</option>
        </FilterSelect>
      </div>

      {/* 需求表格 */}
      <TableSection>
        <Table<RequirementData>
          columns={requirementColumns}
          data={visibleRecords}
          clickRow={handleRequirementClick}
          groupBy={groupBy}
        />

        {/* 无限滚动标记 */}
        <div
          id="load-more-sentinel"
          style={{height: "20px", marginTop: "10px"}}
        >
          {loading && hasMore && <div>加载中...</div>}
        </div>
      </TableSection>

      {/* 选中的需求详情 */}
      {selectedRequirement && (
        <DetailSection>
          <DetailHeader>
            <h3>需求详情: {selectedRequirement.rid}</h3>
            <CloseButton onClick={() => setSelectedRequirement(null)}>
              ✕
            </CloseButton>
          </DetailHeader>

          <DetailContent>
            <DetailItem>
              <strong>描述:</strong> {selectedRequirement.description || "无"}
            </DetailItem>
            <DetailItem>
              <strong>状态:</strong> {selectedRequirement.status}
            </DetailItem>
            <DetailItem>
              <strong>优先级:</strong> {selectedRequirement.priority}
            </DetailItem>
            <DetailItem>
              <strong>负责人:</strong> {selectedRequirement.assignedTo}
            </DetailItem>

            {/* 统计信息 */}
            <StatsSection>
              <h4>统计信息</h4>
              {(() => {
                const stats = getRequirementStats(selectedRequirement.rid)
                return (
                  <StatsGrid>
                    <StatItem>
                      <StatLabel>关联劳动记录数:</StatLabel>
                      <StatValue>{stats.totalWorkRecords}</StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>总工作时长:</StatLabel>
                      <StatValue>
                        {Math.floor(stats.totalDuration / 3600)}小时
                      </StatValue>
                    </StatItem>
                    <StatItem>
                      <StatLabel>进度:</StatLabel>
                      <StatValue>{stats.progress}%</StatValue>
                    </StatItem>
                  </StatsGrid>
                )
              })()}
            </StatsSection>

            {/* 关联的劳动记录 */}
            <WorkRecordsSection>
              <WorkRecordsHeader>
                <h4>关联的劳动记录</h4>
                <AddButton onClick={() => setIsWorkFormOpen(true)}>
                  <svgIcons.Plus />
                  添加劳动记录
                </AddButton>
              </WorkRecordsHeader>

              <Table<WorkData>
                columns={workColumns}
                data={getRelatedWorkRecords(selectedRequirement.rid)}
                groupBy={[]}
              />
            </WorkRecordsSection>
          </DetailContent>
        </DetailSection>
      )}

      {/* 添加劳动记录的抽屉 */}
      <Drawer
        isOpen={isWorkFormOpen}
        onClose={() => setIsWorkFormOpen(false)}
        title="添加劳动记录"
      >
        <WorkRecordForm
          submit={(data) => {
            const now = Date.now()
            const duration = data.duration || 0
            const work: WorkData = {
              wid: v4(),
              startTime: now - duration * 1000, // assuming duration is in seconds, convert to ms
              endTime: now,
              duration: duration,
              outcome: data.outcome || "",
              userId: userId,
              workTags: ["manual"],
              requirementIds: selectedRequirement
                ? [selectedRequirement.rid]
                : [],
              projectIds: [],
              description: data.description,
            }
            addWorkRecord(work)
            setIsWorkFormOpen(false)
          }}
        />
      </Drawer>
    </Container>
  )
}

export default RequirementContainer
