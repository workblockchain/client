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
import {t} from "i18next"
import {projectRecordFieldDefinitions as fields} from "../fieldDefinitions"
import {ProjectRecord} from "../interfaces"
import {fieldDefinitionToHookFormDefinition} from "../workRecordUtils"
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
  const isEditMode = Boolean(initialData?.pid)

  // 处理表单提交
  const handleSubmit = (data: unknown) => {
    const value = data as Partial<ProjectRecord>
    const projectRecord: ProjectRecord = {
      ...initialData,
      ...value,
      createdAt: isEditMode ? initialData?.createdAt : Date.now(),
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
        fields={fields.map(fieldDefinitionToHookFormDefinition)}
        initialData={initialData}
        submitText={isEditMode ? t`project.update` : t`project.create`}
      />
    )
  }

  return (
    <ProjectFormModal
      submit={submit}
      isOpen={isOpen}
      fields={fields}
      isEditMode={isEditMode}
      initialData={initialData}
      onClose={onClose}
    />
  )
}
