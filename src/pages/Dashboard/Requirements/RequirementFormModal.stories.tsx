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
import {requirementRecordFieldDefinitions as fields} from "../fieldDefinitions"
import {RequirementRecord} from "../interfaces"
import {RequirementFormModal} from "./RequirementFormModal"

const meta: Meta<typeof RequirementFormModal> = {
  title: "Pages/Dashboard/Requirements/RequirementFormModal",
  component: RequirementFormModal,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RequirementFormModal>

// 基础示例组件 - 创建模式
const RequirementFormModalExample = () => {
  const handleSubmit = (data: RequirementRecord) => {
    console.log("表单提交:", data)
    alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <RequirementFormModal
          submit={handleSubmit}
          isOpen
          isEditMode={false}
          fields={fields}
          onClose={function () {}}
        />
      </div>
    </DebuggingContext>
  )
}

// 编辑模式示例组件
const RequirementFormModalEditExample = () => {
  const handleSubmit = (data: RequirementRecord) => {
    console.log("表单提交:", data)
    alert(`更新成功: ${JSON.stringify(data, null, 2)}`)
  }

  // 模拟编辑数据
  const mockInitialData: RequirementRecord = {
    id: "req-123",
    rid: "REQ-001",
    title: "用户认证功能需求",
    description: "实现用户登录、注册和密码重置功能，支持OAuth2.0和本地认证",
    priority: "high",
    status: "doing",
    assignedTo: "user-001",
    estimated: 40,
    tags: ["authentication", "security", "backend"],
    projectIds: ["proj-001"],
    progress: 60,
    requirementType: "feature",
    workRecordIds: [],
    contributors: ["user-001", "user-002"],
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7天前
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2天前
    data: {},
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <RequirementFormModal
          submit={handleSubmit}
          isOpen
          isEditMode={true}
          fields={fields}
          initialData={mockInitialData}
          onClose={function () {}}
        />
      </div>
    </DebuggingContext>
  )
}

export const Default: Story = {
  render: () => <RequirementFormModalExample />,
}

export const Edit: Story = {
  render: () => <RequirementFormModalEditExample />,
}
