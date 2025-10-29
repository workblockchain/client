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

import type {Meta, StoryObj} from "@storybook/react-vite"
import {useState} from "react"
import {
  RequirementRecord,
  requirementRecordFormFields as fields,
} from "../interfaces"
import {RequirementFormModal} from "./RequirementFormModal"

const meta: Meta<typeof RequirementFormModal> = {
  title: "Pages/Dashboard/Requirements/RequirementFormModal",
  component: RequirementFormModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof RequirementFormModal>

// 基础示例组件
const RequirementFormModalExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: RequirementRecord) => {
    console.log("表单提交:", data)
    alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
    setIsOpen(false)
  }

  return (
    <div style={{padding: "20px"}}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        创建需求记录
      </button>

      <RequirementFormModal
        submit={handleSubmit}
        isOpen={isOpen}
        isEditMode={false}
        fields={fields}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <RequirementFormModalExample />,
}

export const WithInitialData: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (data: RequirementRecord) => {
      console.log("表单提交:", data)
      alert(`更新成功: ${JSON.stringify(data, null, 2)}`)
      setIsOpen(false)
    }

    const initialData: RequirementRecord = {
      rid: "req-123",
      title: "用户认证功能",
      description: "实现用户登录、注册、密码重置等功能",
      priority: "high",
      status: "in-progress",
      assignedTo: "user-123",
      estimated: 40,
      tags: ["authentication", "security"],
      requirementType: "feature",
      projectIds: ["project-123"],
      workRecordIds: ["work-123", "work-456"],
      progress: 60,
      contributors: ["user-123", "user-456"],
      relatedOutcomes: ["完成用户登录界面", "实现JWT认证"],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    return (
      <div style={{padding: "20px"}}>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          编辑需求记录
        </button>

        <RequirementFormModal
          submit={handleSubmit}
          isOpen={isOpen}
          isEditMode
          fields={fields}
          initialData={initialData}
          onClose={() => setIsOpen(false)}
        />
      </div>
    )
  },
}
