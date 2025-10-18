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

import {DataFormDrawer} from "@/components/DataFormDrawer"
import {
  ProjectRecord,
  projectRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {fieldDefinitionsToFormFieldDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {t} from "i18next"
import {useMemo} from "react"

export function ProjectForm({
  submit,
  isOpen,
  onClose,
}: {
  submit: (data: ProjectRecord) => void
  isOpen: boolean
  onClose: () => void
}) {
  // 使用工具函数转换字段定义
  const formFields = useMemo(() => {
    return fieldDefinitionsToFormFieldDefinitions(projectRecordFieldDefinitions)
  }, [])

  const defaultValues: ProjectRecord = {
    pid: "",
    name: "",
    description: "",
    projectType: "",
    status: "active",
    assignedTo: "",
    progress: 0,
    contributors: [],
    requirementIds: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  // 处理表单提交
  const handleSubmit = (value: unknown) => {
    const data = value as Partial<ProjectRecord>
    const projectRecord: ProjectRecord = {
      pid: defaultValues.pid as string,
      name: data.name as string,
      description: data.description as string,
      projectType: data.projectType as string,
      status: data.status as string,
      assignedTo: data.assignedTo as string,
      progress: data.progress as number,
      contributors: data.contributors as string[],
      requirementIds: data.requirementIds as string[],
      createdAt: defaultValues.createdAt as number,
      updatedAt: Date.now(),
    }
    submit(projectRecord)
  }

  return (
    <DataFormDrawer
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title={t`project.create`}
      mode="create"
      fields={formFields}
      initialData={defaultValues}
      submitText={t`project.create`}
    />
  )
}
