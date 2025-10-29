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
import {WorkRecord, workRecordFieldDefinitions as fields} from "../interfaces"
import {WorkRecordFormModal} from "./WorkRecordFormModal"

const meta: Meta<typeof WorkRecordFormModal> = {
  title: "Pages/Dashboard/Work/WorkRecordFormModal",
  component: WorkRecordFormModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof WorkRecordFormModal>

// 基础示例组件
const WorkRecordFormModalExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (data: WorkRecord) => {
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
        创建劳动记录
      </button>

      <WorkRecordFormModal
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
  render: () => <WorkRecordFormModalExample />,
}

export const WithInitialData: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (data: WorkRecord) => {
      console.log("表单提交:", data)
      alert(`更新成功: ${JSON.stringify(data, null, 2)}`)
      setIsOpen(false)
    }

    const initialData: WorkRecord = {
      wid: "work-123",
      outcome: "已完成项目需求分析",
      duration: 120,
      userId: "user-123",
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
          编辑劳动记录
        </button>

        <WorkRecordFormModal
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
