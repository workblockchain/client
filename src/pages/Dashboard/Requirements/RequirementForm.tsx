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
  RequirementRecord,
  requirementRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {fieldDefinitionsToFormFieldDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {t} from "i18next"
import {useMemo} from "react"
import {RequirementFormModal} from "./RequirementFormModal"

export function RequirementForm({
  submit,
  isOpen,
  onClose,
  useDrawer,
}: {
  submit: (data: RequirementRecord) => void
  isOpen: boolean
  onClose: () => void
  useDrawer?: boolean
}) {
  // 使用工具函数转换字段定义
  const formFields = useMemo(() => {
    return fieldDefinitionsToFormFieldDefinitions(
      requirementRecordFieldDefinitions
    )
  }, [])

  const defaultValues: RequirementRecord = {
    rid: "",
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    assignedTo: "",
    estimated: 0,
    tags: [],
    requirementType: "",
    projectIds: [],
    workRecordIds: [],
    progress: 0,
    contributors: [],
    relatedOutcomes: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  // 处理表单提交
  const handleSubmit = (value: unknown) => {
    const data = value as Partial<RequirementRecord>
    const requirementRecord: RequirementRecord = {
      rid: defaultValues.rid as string,
      title: data.title as string,
      description: data.description as string,
      priority: data.priority as string,
      status: data.status as string,
      assignedTo: data.assignedTo as string,
      estimated: data.estimated as number,
      tags: data.tags as string[],
      requirementType: data.requirementType as string,
      projectIds: data.projectIds as string[],
      workRecordIds: data.workRecordIds as string[],
      progress: data.progress as number,
      contributors: data.contributors as string[],
      relatedOutcomes: data.relatedOutcomes as string[],
      createdAt: defaultValues.createdAt as number,
      updatedAt: Date.now(),
    }
    submit(requirementRecord)
  }

  if (useDrawer) {
    return (
      <DataFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={t`requirement.create`}
        mode="create"
        fields={formFields}
        initialData={defaultValues}
        submitText={t`requirement.create`}
      />
    )
  }

  return (
    <RequirementFormModal submit={submit} isOpen={isOpen} onClose={onClose} />
  )
}
