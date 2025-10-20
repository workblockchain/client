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
  WorkRecord,
  workRecordFieldDefinitions,
} from "@/pages/Dashboard/interfaces"
import {fieldDefinitionsToFormFieldDefinitions} from "@/pages/Dashboard/workRecordUtils"
import {t} from "i18next"
import {useMemo} from "react"
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
  // 使用工具函数转换字段定义
  const formFields = useMemo(() => {
    return fieldDefinitionsToFormFieldDefinitions(workRecordFieldDefinitions)
  }, [])

  const defaultValues = useMemo(() => {
    const workRecord: WorkRecord = {
      wid: "",
      outcome: "",
      duration: 0,
      ...initialData,
    }
    return workRecord
  }, [])

  // 处理表单提交
  const handleSubmit = (data: unknown) => {
    const value = data as Partial<WorkRecord>
    const workRecord: WorkRecord = {
      wid: defaultValues.wid,
      userId: defaultValues.userId,
      ...initialData,
      outcome: value.outcome,
      duration: value.duration,
    }
    submit(workRecord)
  }

  if (useDrawer) {
    return (
      <DataFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        title={t`work.create`}
        mode="create"
        fields={formFields}
        initialData={defaultValues}
        submitText={t`work.create`}
      />
    )
  }

  return (
    <WorkRecordFormModal
      submit={submit}
      isOpen={isOpen}
      initialData={initialData}
      onClose={onClose}
    />
  )
}
