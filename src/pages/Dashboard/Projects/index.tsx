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
import {
  ProjectRecord,
  projectRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {applyConditions} from "@/pages/Dashboard/recordUtils"
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
import {ProjectForm} from "./ProjectForm"

// 使用新的字段定义系统生成 columns
const columns: ColumnDef<ProjectRecord>[] =
  fieldDefinitionsToColumnDefs<ProjectRecord>(projectRecordFieldDefinitions)

function ProjectsContainer() {
  const projectRecords = useSignedRecord((state) => state.projectRecords)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const filterConditions = useViewPreference((state) => state.filterConditions)
  const groupConditions = useViewPreference((state) => state.groupConditions)
  const sortConditions = useViewPreference((state) => state.sortConditions)

  // 应用筛选和排序条件
  const conditionedRecords = useMemo(() => {
    return applyConditions(projectRecords, filterConditions, sortConditions)
  }, [projectRecords, filterConditions, sortConditions])

  const handleRowClick = (row: any) => {
    console.log("Project clicked:", row)
  }

  const handleFormSubmit = (data: ProjectRecord) => {
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
        <DataConditionRow fieldDefinitions={projectRecordFieldDefinitions} />
        <Button $variant="text" onClick={handleOpenForm}>
          <svgIcons.Plus />
          <span>{t`project.create`}</span>
        </Button>
      </Flex>
      <Table
        columns={columns}
        data={conditionedRecords}
        clickRow={handleRowClick}
        groupBy={groupConditions.map((c) => c.field)}
        groupValueRender={(key, value) => {
          const res = projectRecordFieldDefinitions
            .find((f) => f.key === key)
            ?.cellRenderer?.(value == "true")
          return res ?? (value as string)
        }}
        groupSort={createGroupSort(
          projectRecordFieldDefinitions,
          groupConditions
        )}
      />

      <ProjectForm
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

export default ProjectsContainer
