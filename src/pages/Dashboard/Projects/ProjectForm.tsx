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
import {ProjectFormModal} from "./ProjectFormModal"

export function ProjectForm({
  submit,
  isOpen,
  initialData,
  onClose,
  useDrawer,
}: {
  submit: (data: ProjectRecord) => void
  isOpen: boolean
  initialData?: ProjectRecord
  onClose: () => void
  useDrawer?: boolean
}) {
  // 使用工具函数转换字段定义
  const formFields = useMemo(() => {
    return fieldDefinitionsToFormFieldDefinitions(projectRecordFieldDefinitions)
  }, [])

  const defaultValues = useMemo(() => {
    const projectRecord: ProjectRecord = {
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
      ...initialData,
    }
    return projectRecord
  }, [initialData])

  // 判断是创建还是编辑模式
  const isEditMode = Boolean(initialData?.pid)

  // 处理表单提交
  const handleSubmit = (value: unknown) => {
    const data = value as Partial<ProjectRecord>
    const projectRecord: ProjectRecord = {
      ...defaultValues,
      ...data,
      // 确保在编辑模式下保留原始ID
      pid: isEditMode ? defaultValues.pid : data.pid || defaultValues.pid,
      // 更新时间戳
      updatedAt: Date.now(),
    }
    submit(projectRecord)
  }

  if (useDrawer) {
    return (
      <DataFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={isEditMode ? t`project.edit` : t`project.create`}
        mode={isEditMode ? "edit" : "create"}
        fields={formFields}
        initialData={defaultValues}
        submitText={isEditMode ? t`project.update` : t`project.create`}
      />
    )
  }

  return (
    <ProjectFormModal
      submit={submit}
      isOpen={isOpen}
      onClose={onClose}
      initialData={initialData}
    />
  )
}
