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

import Table from "@/components/Table/Table"
import {RequirementData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {useState} from "react"
import styled from "styled-components"
import {Button} from "../Button"
import {Input, Textarea} from "../Input"
import {Modal} from "../Modal/Modal"
import {Select} from "../Select/Select"
import {TableGroupProps} from "../Table/TableGroup"
import {TableRowProps, TitlesOption} from "../Table/interface"

export function KanListContainer() {
  const {requirementRecords, addRequirementRecord} = useSignedRecord()
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState<Partial<RequirementData>>({
    priority: "Medium",
    status: "Open",
    requirementType: "Feature",
    progress: 0,
  })

  const handleInputChange = (label: string, value: string) => {
    setEditData((prev) => ({...prev, [label]: value}))
  }

  const generateId = () =>
    `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  const handleSubmit = () => {
    if (!editData.description || !editData.assignedTo) {
      alert("Description and Assigned To are required fields.")
      return
    }

    const newRequirement: RequirementData = {
      rid: generateId(),
      priority: editData.priority || "Medium",
      status: editData.status || "Open",
      assignedTo: editData.assignedTo || "",
      tags: editData.tags || [],
      description: editData.description || "",
      requirementType: editData.requirementType || "Feature",
      progress: editData.progress || 0,
      estimated: 0,
      projectIds: [],
      workRecordIds: [],
      relationship: {},
    }

    addRequirementRecord(newRequirement)
    setEditData({
      priority: "Medium",
      status: "Open",
      requirementType: "Feature",
      progress: 0,
    })
    setIsOpen(false)
  }

  const rows: TableRowProps[] = requirementRecords.map(
    (record: RequirementData) => ({
      row: [
        {type: "text", data: record.rid},
        {type: "text", data: record.priority},
        {type: "text", data: record.status},
        {type: "text", data: record.assignedTo},
        {type: "text", data: record.tags},
        {type: "text", data: record.description},
        {type: "text", data: record.requirementType},
        {type: "text", data: record.progress},
      ],
    })
  )

  const data: TableGroupProps[] = [
    {
      groupData: rows,
      onAddClick: function (): void {
        setIsOpen(!isOpen)
      },
    },
  ]

  const titles: TitlesOption[] = [
    {
      title: "需求id",
      width: 90,
    },
    {title: "优先级", hidden: true},
    {title: "状态", width: 70},
    {title: "被分配人ID"},
    {title: "标签", width: 60},
    {title: "描述", width: 120},
    {title: "劳动标签"},
    {title: "进度"},
  ]

  return (
    <>
      <Table
        titles={titles}
        data={data}
        onAddClick={() => {
          setIsOpen(!isOpen)
        }}
      />
      <Modal
        isOpen={isOpen}
        title="创建需求"
        onClose={() => {
          setIsOpen(false)
          setEditData({
            priority: "",
            status: "",
            requirementType: "",
            progress: 0,
          })
        }}
      >
        <FormContainer
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <InputField>
            <Label>描述</Label>
            <Textarea
              name="description"
              value={editData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="请输入需求描述"
              required
            />
          </InputField>
          <InputField>
            <Label>分配至</Label>
            <Input
              type="text"
              name="assignedTo"
              value={editData.assignedTo || ""}
              onChange={(e) => handleInputChange("assignedTo", e.target.value)}
              required
            />
          </InputField>
          <InputField>
            <Label>优先级</Label>
            <Select
              value={editData.priority || "Medium"}
              onChange={(val) => handleInputChange("priority", val || "")}
              options={[
                {value: "High", label: "高"},
                {value: "Medium", label: "中"},
                {value: "Low", label: "低"},
              ]}
            />
          </InputField>
          <InputField>
            <Label>状态</Label>
            <Input
              name="status"
              value={editData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
            />
          </InputField>
          <InputField>
            <Label>需求类型</Label>
            <Select
              // name="requirementType"
              value={editData.requirementType || "Feature"}
              onChange={(val) =>
                handleInputChange("requirementType", val || "")
              }
              options={[
                {value: "Feature", label: "功能"},
                {value: "Bug", label: "缺陷"},
                {value: "Task", label: "任务"},
              ]}
            />
          </InputField>
          <InputField>
            <Label>标签</Label>
            <Input
              type="text"
              name="tags"
              value={editData.tags || ""}
              onChange={(e) => handleInputChange("tags", e.target.value)}
            />
          </InputField>
          <InputField>
            <Label>进度</Label>
            <Input
              type="text"
              name="progress"
              value={editData.progress || 0}
              onChange={(e) => handleInputChange("progress", e.target.value)}
              placeholder="例如: 50%"
            />
          </InputField>
          <ButtonContainer>
            <Button type="submit">创建</Button>
            <Button
              onClick={() => {
                setIsOpen(false)
                setEditData({
                  priority: "Medium",
                  status: "Open",
                  requirementType: "Feature",
                  progress: 0,
                })
              }}
            >
              取消
            </Button>
          </ButtonContainer>
        </FormContainer>
      </Modal>
    </>
  )
}

export default KanListContainer
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
`

const InputField = styled.div`
  margin-bottom: 8px;
  display: flex;
  gap: 24px;
  align-items: center;
`

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`
