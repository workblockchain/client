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
import {ProjectData, RequirementData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {ColumnDef} from "@tanstack/react-table"
import {useCallback, useMemo, useState} from "react"
import {FilterBar, FilterConfig} from "../Filter"
import {svgIcons} from "../Icons"
import {
  AddButton,
  ButtonGroup,
  CancelButton,
  CloseButton,
  Container,
  DetailContent,
  DetailHeader,
  DetailItem,
  DetailSection,
  EditButton,
  EditForm,
  FilterSelect,
  FormGroup,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
  RequirementsSection,
  SaveButton,
  StatItem,
  StatLabel,
  StatsGrid,
  StatsSection,
  StatValue,
  TableSection,
} from "./common/styles"

const projectColumns: ColumnDef<ProjectData>[] = [
  {
    accessorKey: "pid",
    header: "项目ID",
  },
  {
    accessorKey: "projectType",
    header: "项目类型",
  },
  {
    accessorKey: "status",
    header: "状态",
  },
  {
    accessorKey: "assignedTo",
    header: "负责人",
  },
  {
    accessorKey: "progress",
    header: "进度",
    cell: ({getValue}) => `${getValue() || 0}%`,
  },
]

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
]

export function ProjectContainer() {
  const projectRecords = useSignedRecord((state) => state.projectRecords)
  const requirementRecords = useSignedRecord(
    (state) => state.requirementRecords
  )
  const addProjectRecord = useSignedRecord((state) => state.addProjectRecord)
  const updateProjectRecord = useSignedRecord(
    (state) => state.updateProjectRecord
  )

  // 筛选状态
  const [filters, setFilters] = useState({
    status: "",
    projectType: "",
    assignedTo: "",
  })

  // 分组状态
  const [groupBy, setGroupBy] = useState<string[]>([])

  // 选中的项目
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null
  )

  // 编辑模式
  const [isEditMode, setIsEditMode] = useState(false)
  const [editData, setEditData] = useState<Partial<ProjectData>>({})

  // 应用筛选
  const filteredProjects = useMemo(() => {
    return projectRecords.filter((proj) => {
      if (filters.status && proj.status !== filters.status) return false
      if (filters.projectType && proj.projectType !== filters.projectType)
        return false
      if (filters.assignedTo && proj.assignedTo !== filters.assignedTo)
        return false
      return true
    })
  }, [projectRecords, filters])

  // 获取关联的需求记录
  const getRelatedRequirements = useCallback(
    (projectId: string) => {
      const project = projectRecords.find((p) => p.pid === projectId)
      if (!project) return []

      return requirementRecords.filter((req) =>
        req.projectIds.includes(projectId)
      )
    },
    [projectRecords, requirementRecords]
  )

  // 计算项目统计信息
  const getProjectStats = useCallback(
    (projectId: string) => {
      const relatedRequirements = getRelatedRequirements(projectId)
      const totalRequirements = relatedRequirements.length
      const completedRequirements = relatedRequirements.filter(
        (req) => req.status === "done"
      ).length
      const progress =
        totalRequirements > 0
          ? Math.floor((completedRequirements / totalRequirements) * 100)
          : 0

      return {
        totalRequirements,
        completedRequirements,
        progress,
      }
    },
    [getRelatedRequirements]
  )

  const handleProjectClick = (project: ProjectData) => {
    setSelectedProject(project)
    setIsEditMode(false)
    setEditData({})
  }

  const handleSaveProject = () => {
    if (selectedProject) {
      const exists = projectRecords.some((p) => p.pid === selectedProject.pid)
      if (exists) {
        updateProjectRecord(selectedProject.pid, editData)
      } else {
        addProjectRecord({...selectedProject, ...editData})
      }
      setSelectedProject(null)
      setIsEditMode(false)
      setEditData({})
    }
  }

  const handleCreateNew = () => {
    setSelectedProject({
      pid: `Proj-${Date.now()}`,
      projectType: "",
      status: "",
      assignedTo: "",
      description: "",
      progress: 0,
      requirementIds: [],
      relationship: {},
    } as ProjectData)
    setIsEditMode(true)
    setEditData({})
  }

  // 筛选器配置
  const filterConfig: FilterConfig[] = [
    {
      type: "select",
      key: "status",
      label: "状态",
      options: [
        {value: "", label: "全部"},
        {value: "active", label: "活跃"},
        {value: "completed", label: "已完成"},
        {value: "archived", label: "已归档"},
      ],
    },
    {
      type: "select",
      key: "projectType",
      label: "项目类型",
      options: [
        {value: "", label: "全部"},
        {value: "development", label: "开发"},
        {value: "design", label: "设计"},
        {value: "research", label: "研究"},
      ],
    },
    {
      type: "text",
      key: "assignedTo",
      label: "负责人",
      placeholder: "负责人ID",
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

      {/* 分组选择器和新建按钮 */}
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
          <option value="projectType">按项目类型</option>
          <option value="assignedTo">按负责人</option>
        </FilterSelect>

        <AddButton onClick={handleCreateNew}>
          <svgIcons.Plus />
          新建项目
        </AddButton>
      </div>

      {/* 项目表格 */}
      <TableSection>
        <Table<ProjectData>
          columns={projectColumns}
          data={filteredProjects}
          clickRow={handleProjectClick}
          groupBy={groupBy}
        />
      </TableSection>

      {/* 选中的项目详情 */}
      {selectedProject && (
        <DetailSection>
          <DetailHeader>
            <h3>项目详情: {selectedProject.pid}</h3>
            <ButtonGroup>
              {!isEditMode && (
                <EditButton onClick={() => setIsEditMode(true)}>
                  编辑
                </EditButton>
              )}
              <CloseButton onClick={() => setSelectedProject(null)}>
                ✕
              </CloseButton>
            </ButtonGroup>
          </DetailHeader>

          <DetailContent>
            {isEditMode ? (
              <EditForm>
                <FormGroup>
                  <FormLabel>项目类型:</FormLabel>
                  <FormInput
                    value={editData.projectType || selectedProject.projectType}
                    onChange={(e) =>
                      setEditData({...editData, projectType: e.target.value})
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>状态:</FormLabel>
                  <FormSelect
                    value={editData.status || selectedProject.status}
                    onChange={(e) =>
                      setEditData({...editData, status: e.target.value})
                    }
                  >
                    <option value="active">活跃</option>
                    <option value="completed">已完成</option>
                    <option value="archived">已归档</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>负责人:</FormLabel>
                  <FormInput
                    value={editData.assignedTo || selectedProject.assignedTo}
                    onChange={(e) =>
                      setEditData({...editData, assignedTo: e.target.value})
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>描述:</FormLabel>
                  <FormTextarea
                    value={editData.description || selectedProject.description}
                    onChange={(e) =>
                      setEditData({...editData, description: e.target.value})
                    }
                  />
                </FormGroup>
                <SaveButton onClick={handleSaveProject}>保存</SaveButton>
                <CancelButton onClick={() => setIsEditMode(false)}>
                  取消
                </CancelButton>
              </EditForm>
            ) : (
              <>
                <DetailItem>
                  <strong>项目类型:</strong> {selectedProject.projectType}
                </DetailItem>
                <DetailItem>
                  <strong>状态:</strong> {selectedProject.status}
                </DetailItem>
                <DetailItem>
                  <strong>负责人:</strong> {selectedProject.assignedTo}
                </DetailItem>
                <DetailItem>
                  <strong>描述:</strong> {selectedProject.description || "无"}
                </DetailItem>

                {/* 统计信息 */}
                <StatsSection>
                  <h4>统计信息</h4>
                  {(() => {
                    const stats = getProjectStats(selectedProject.pid)
                    return (
                      <StatsGrid>
                        <StatItem>
                          <StatLabel>总需求数:</StatLabel>
                          <StatValue>{stats.totalRequirements}</StatValue>
                        </StatItem>
                        <StatItem>
                          <StatLabel>已完成需求:</StatLabel>
                          <StatValue>{stats.completedRequirements}</StatValue>
                        </StatItem>
                        <StatItem>
                          <StatLabel>进度:</StatLabel>
                          <StatValue>{stats.progress}%</StatValue>
                        </StatItem>
                      </StatsGrid>
                    )
                  })()}
                </StatsSection>

                {/* 关联的需求记录 */}
                <RequirementsSection>
                  <h4>关联的需求</h4>
                  <Table<RequirementData>
                    columns={requirementColumns}
                    data={getRelatedRequirements(selectedProject.pid)}
                    groupBy={[]}
                  />
                </RequirementsSection>
              </>
            )}
          </DetailContent>
        </DetailSection>
      )}
    </Container>
  )
}

export default ProjectContainer
