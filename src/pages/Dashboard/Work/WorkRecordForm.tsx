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
import {useUserProfile} from "@/stores/useUserProfile"
import {t} from "i18next"
import {WorkRecord, workRecordFieldDefinitions as fields} from "../interfaces"
import {fieldDefinitionToHookFormDefinition} from "../workRecordUtils"
import {WorkRecordFormModal} from "./WorkRecordFormModal"

export function WorkRecordForm({
  submit,
  isOpen,
  initialData,
  onClose,
  useDrawer,
}: {
  submit: (data: WorkRecord) => void
  isOpen: boolean
  initialData?: WorkRecord
  onClose: () => void
  useDrawer?: boolean
}) {
  const uid = useUserProfile((state) => state.uid)

  const isEditMode = Boolean(initialData?.wid)

  // 处理表单提交
  const handleSubmit = (data: unknown) => {
    const value = data as Partial<WorkRecord>
    const workRecord: WorkRecord = {
      ...initialData,
      ...value,
      createdAt: isEditMode ? initialData?.createdAt : Date.now(),
    }
    submit(workRecord)
  }

  if (useDrawer) {
    return (
      <DataFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={isEditMode ? t`work.edit` : t`work.create`}
        mode={isEditMode ? "edit" : "create"}
        fields={fields.map(fieldDefinitionToHookFormDefinition)}
        initialData={{...initialData, userId: uid}}
        submitText={isEditMode ? t`work.edit` : t`work.create`}
      />
    )
  }

  return (
    <WorkRecordFormModal
      submit={submit}
      isOpen={isOpen}
      fields={fields}
      isEditMode={isEditMode}
      initialData={initialData}
      onClose={onClose}
    />
  )
}
