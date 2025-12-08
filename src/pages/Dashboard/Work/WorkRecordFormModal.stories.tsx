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

import DebuggingContext from "@/components/Modal/DebuggingContext"
import type {Meta, StoryObj} from "@storybook/react-vite"
import {workRecordFieldDefinitions as fields} from "../fieldDefinitions"
import {WorkRecord} from "../interfaces"
import {WorkRecordFormModal} from "./WorkRecordFormModal"

const meta: Meta<typeof WorkRecordFormModal> = {
  title: "Pages/Dashboard/Work/WorkRecordFormModal",
  component: WorkRecordFormModal,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof WorkRecordFormModal>

// 基础示例组件 - 创建模式
const WorkRecordFormModalExample = () => {
  const handleSubmit = (data: WorkRecord) => {
    console.log("表单提交:", data)
    alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <WorkRecordFormModal
          submit={handleSubmit}
          isOpen
          isEditMode={false}
          fields={fields}
          onClose={() => {}}
        />
      </div>
    </DebuggingContext>
  )
}

// 编辑模式示例组件
const WorkRecordFormModalEditExample = () => {
  const handleSubmit = (data: WorkRecord) => {
    console.log("表单提交:", data)
    alert(`更新成功: ${JSON.stringify(data, null, 2)}`)
  }

  // 模拟编辑数据
  const mockInitialData: WorkRecord = {
    id: "work-123",
    wid: "WRK-001",
    userId: "user-001",
    startTime: Date.now() - 4 * 60 * 60 * 1000, // 4小时前
    endTime: Date.now() - 2 * 60 * 60 * 1000, // 2小时前
    isSigned: false,
    description:
      "完成了用户认证模块的后端API开发，包括登录、注册和JWT token生成功能",
    duration: 120,
    outcome: "用户认证API开发完成",
    workTags: ["backend", "authentication", "api"],
    requirementIds: ["req-001"],
    projectIds: ["proj-001"],
    cover: "",
    data: "{}",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7天前
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <WorkRecordFormModal
          submit={handleSubmit}
          isOpen
          isEditMode={true}
          fields={fields}
          initialData={mockInitialData}
          onClose={() => {}}
        />
      </div>
    </DebuggingContext>
  )
}

export const Default: Story = {
  render: () => <WorkRecordFormModalExample />,
}

export const Edit: Story = {
  render: () => <WorkRecordFormModalEditExample />,
}
