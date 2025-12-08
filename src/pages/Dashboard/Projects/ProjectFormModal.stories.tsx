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
import {projectRecordFieldDefinitions as fields} from "../fieldDefinitions"
import {ProjectRecord} from "../interfaces"
import {ProjectFormModal} from "./ProjectFormModal"

const meta: Meta<typeof ProjectFormModal> = {
  title: "Pages/Dashboard/Projects/ProjectFormModal",
  component: ProjectFormModal,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof ProjectFormModal>

// 基础示例组件 - 创建模式
const ProjectFormModalExample = () => {
  const handleSubmit = (data: ProjectRecord) => {
    console.log("表单提交:", data)
    alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <ProjectFormModal
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
const ProjectFormModalEditExample = () => {
  const handleSubmit = (data: ProjectRecord) => {
    console.log("表单提交:", data)
    alert(`更新成功: ${JSON.stringify(data, null, 2)}`)
  }

  // 模拟编辑数据
  const mockInitialData: ProjectRecord = {
    id: "proj-123",
    pid: "PROJ-001",
    name: "用户认证系统",
    description:
      "开发完整的用户认证系统，包括登录、注册、密码重置和OAuth2.0集成",
    projectType: "software",
    status: "active",
    assignedTo: "user-001",
    progress: 75,
    contributors: ["user-001", "user-002", "user-003"],
    requirementIds: ["req-001", "req-002", "req-003"],
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30天前
    updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5天前
  }

  return (
    <DebuggingContext value={true}>
      <div style={{padding: "20px"}}>
        <ProjectFormModal
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
  render: () => <ProjectFormModalExample />,
}

export const Edit: Story = {
  render: () => <ProjectFormModalEditExample />,
}
