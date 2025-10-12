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
import {DataFormDrawer} from "./DataFormDrawer"
import type {FormConfig} from "./types"

const meta: Meta<typeof DataFormDrawer> = {
  title: "Components/DataFormDrawer",
  component: DataFormDrawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof DataFormDrawer>

// 基础表单字段定义
const basicFormFields = [
  {
    key: "name",
    label: "姓名",
    type: "text" as const,
    required: true,
    placeholder: "请输入姓名",
  },
  {
    key: "age",
    label: "年龄",
    type: "number" as const,
    required: true,
    validation: {min: 0, max: 150},
  },
  {
    key: "email",
    label: "邮箱",
    type: "text" as const,
    placeholder: "请输入邮箱地址",
  },
  {
    key: "description",
    label: "描述",
    type: "textarea" as const,
    placeholder: "请输入描述信息",
  },
]

// 完整表单字段定义（包含所有类型）
const fullFormFields = [
  {
    key: "textField",
    label: "文本字段",
    type: "text" as const,
    required: true,
    placeholder: "请输入文本",
  },
  {
    key: "numberField",
    label: "数字字段",
    type: "number" as const,
    required: true,
    validation: {min: 0, max: 100},
  },
  {
    key: "textareaField",
    label: "文本域",
    type: "textarea" as const,
    placeholder: "请输入多行文本",
  },
  {
    key: "selectField",
    label: "选择器",
    type: "select" as const,
    options: [
      {value: "option1", label: "选项1"},
      {value: "option2", label: "选项2"},
      {value: "option3", label: "选项3"},
    ],
  },
  {
    key: "dateField",
    label: "日期",
    type: "date" as const,
  },
  {
    key: "checkboxField",
    label: "复选框",
    type: "checkbox" as const,
    defaultValue: false,
  },
]

// 创建模式表单配置
const createFormConfig: FormConfig = {
  fields: basicFormFields,
  mode: "create",
  onSubmit: (data) => {
    console.log("创建表单提交:", data)
    alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
  },
  onCancel: () => {
    console.log("创建表单取消")
  },
  title: "创建新记录",
  submitText: "创建",
  cancelText: "取消",
}

// 编辑模式表单配置
const editFormConfig: FormConfig = {
  fields: basicFormFields,
  mode: "edit",
  initialData: {
    name: "张三",
    age: 25,
    email: "zhangsan@example.com",
    description: "这是一个示例描述",
  },
  onSubmit: (data) => {
    console.log("编辑表单提交:", data)
    alert(`保存成功: ${JSON.stringify(data, null, 2)}`)
  },
  onCancel: () => {
    console.log("编辑表单取消")
  },
  title: "编辑记录",
  submitText: "保存",
  cancelText: "取消",
}

// 完整表单配置
const fullFormConfig: FormConfig = {
  fields: fullFormFields,
  mode: "create",
  onSubmit: (data) => {
    console.log("完整表单提交:", data)
    alert(`提交成功: ${JSON.stringify(data, null, 2)}`)
  },
  onCancel: () => {
    console.log("完整表单取消")
  },
  title: "完整表单示例",
  submitText: "提交",
  cancelText: "取消",
}

// 基础示例组件
const DataFormDrawerExample = ({config}: {config: FormConfig}) => {
  const [isOpen, setIsOpen] = useState(false)

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
        打开表单抽屉
      </button>

      <DataFormDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={config.title || "表单抽屉"}
        formConfig={{
          ...config,
          onCancel: () => {
            config.onCancel()
            setIsOpen(false)
          },
        }}
      />
    </div>
  )
}

export const CreateMode: Story = {
  render: () => <DataFormDrawerExample config={createFormConfig} />,
}

export const EditMode: Story = {
  render: () => <DataFormDrawerExample config={editFormConfig} />,
}

export const FullForm: Story = {
  render: () => <DataFormDrawerExample config={fullFormConfig} />,
}

export const WithValidation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    const validationFormConfig: FormConfig = {
      fields: [
        {
          key: "requiredField",
          label: "必填字段",
          type: "text" as const,
          required: true,
          placeholder: "这个字段是必填的",
        },
        {
          key: "numberField",
          label: "数字验证",
          type: "number" as const,
          required: true,
          validation: {min: 1, max: 100},
          placeholder: "请输入1-100之间的数字",
        },
        {
          key: "emailField",
          label: "邮箱验证",
          type: "text" as const,
          required: true,
          validation: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
          placeholder: "请输入有效的邮箱地址",
        },
      ],
      mode: "create",
      onSubmit: (data) => {
        console.log("验证表单提交:", data)
        alert(`验证通过: ${JSON.stringify(data, null, 2)}`)
        setIsOpen(false)
      },
      onCancel: () => {
        console.log("验证表单取消")
        setIsOpen(false)
      },
      title: "表单验证示例",
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
          打开验证表单
        </button>

        <DataFormDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={validationFormConfig.title || "表单验证示例"}
          formConfig={validationFormConfig}
        />
      </div>
    )
  },
}

export const LoadingState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const loadingFormConfig: FormConfig = {
      fields: basicFormFields,
      mode: "create",
      onSubmit: async (data) => {
        setLoading(true)
        console.log("加载中表单提交:", data)

        // 模拟异步操作
        await new Promise((resolve) => setTimeout(resolve, 2000))

        alert(`提交成功: ${JSON.stringify(data, null, 2)}`)
        setLoading(false)
        setIsOpen(false)
      },
      onCancel: () => {
        console.log("加载中表单取消")
        setIsOpen(false)
      },
      title: "加载状态示例",
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
          打开加载表单
        </button>

        <DataFormDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={loadingFormConfig.title || "加载状态示例"}
          formConfig={loadingFormConfig}
          loading={loading}
        />
      </div>
    )
  },
}

export const TableColumnsIntegration: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    // 模拟基于表格列生成的表单字段
    const tableBasedFormFields = [
      {
        key: "name",
        label: "姓名",
        type: "text" as const,
        required: true,
        placeholder: "请输入姓名",
        description: "基于表格列 'name' 字段自动生成的文本输入框",
      },
      {
        key: "age",
        label: "年龄",
        type: "number" as const,
        required: true,
        validation: {min: 0, max: 150},
        description: "基于表格列 'age' 字段自动生成的数字输入框",
      },
      {
        key: "email",
        label: "邮箱",
        type: "text" as const,
        placeholder: "请输入邮箱地址",
        description: "基于表格列 'email' 字段自动生成的邮箱输入框",
      },
      {
        key: "description",
        label: "描述",
        type: "textarea" as const,
        placeholder: "请输入描述信息",
        description: "基于表格列 'description' 字段自动生成的文本域",
      },
      {
        key: "status",
        label: "状态",
        type: "select" as const,
        options: [
          {value: "active", label: "活跃"},
          {value: "inactive", label: "非活跃"},
          {value: "pending", label: "待处理"},
        ],
        description: "基于表格列 'status' 字段自动生成的选择器",
      },
      {
        key: "birthDate",
        label: "出生日期",
        type: "date" as const,
        description: "基于表格列 'birthDate' 字段自动生成的日期选择器",
      },
      {
        key: "isActive",
        label: "是否激活",
        type: "checkbox" as const,
        defaultValue: false,
        description: "基于表格列 'isActive' 字段自动生成的复选框",
      },
    ]

    const tableColumnsFormConfig: FormConfig = {
      fields: tableBasedFormFields,
      mode: "create",
      onSubmit: (data) => {
        console.log("基于表格列的表单提交:", data)
        alert(`创建成功: ${JSON.stringify(data, null, 2)}`)
        setIsOpen(false)
      },
      onCancel: () => {
        console.log("基于表格列的表单取消")
        setIsOpen(false)
      },
      title: "基于表格列的表单示例",
      submitText: "创建",
    }

    return (
      <div style={{padding: "20px"}}>
        <div style={{marginBottom: "20px"}}>
          <h3>基于表格列自动生成表单字段的示例</h3>
          <p>
            此示例展示了如何基于表格列定义自动生成表单字段。在实际应用中，可以通过分析表格列的元数据（如字段名、类型、验证规则等）来自动创建相应的表单字段。
          </p>
        </div>

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
          打开基于表格列的表单
        </button>

        <DataFormDrawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={tableColumnsFormConfig.title || "基于表格列的表单"}
          formConfig={tableColumnsFormConfig}
        />
      </div>
    )
  },
}
