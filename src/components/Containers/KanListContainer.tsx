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

import Table, {titlesOption} from "@/components/Table/Table"
import {RequirementData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {useUserProfile} from "@/stores/useUserProfile"
import {useState} from "react"
import {Button} from "../Button"
import {Modal} from "../Modal/Modal"
import {TableGroupProps} from "../Table/TableGroup"
import {TableRowProps} from "../Table/TableRow"

export function KanListContainer() {
  const {requirementRecords, addRequirementRecord} = useSignedRecord()
  const [isOpen, setIsOpen] = useState(false)
  const [editData, setEditData] = useState<Partial<RequirementData>>({
    priority: "Medium",
    status: "Open",
    requirementType: "Feature",
    progress: 0,
  })
  const {uid} = useUserProfile()

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {name, value} = e.target
    setEditData((prev) => ({...prev, [name]: value}))
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
  // 将 workRecords 转换为 Table 组件需要的格式
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

  const titles: titlesOption[] = [
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
        <div>
          <h3 style={{marginBottom: "16px"}}>创建需求</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            style={{display: "grid", gap: "8px"}}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                描述
              </label>
              <textarea
                name="description"
                value={editData.description || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  height: "50px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                分配至
              </label>
              <input
                type="text"
                name="assignedTo"
                value={editData.assignedTo || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                优先级
              </label>
              <select
                name="priority"
                value={editData.priority || "Medium"}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="High">高</option>
                <option value="Medium">中</option>
                <option value="Low">低</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                状态
              </label>
              <input
                name="status"
                value={editData.status}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                需求类型
              </label>
              <select
                name="requirementType"
                value={editData.requirementType || "Feature"}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              >
                <option value="Feature">功能</option>
                <option value="Bug">缺陷</option>
                <option value="Task">任务</option>
              </select>
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                标签
              </label>
              <input
                type="text"
                name="tags"
                value={editData.tags || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontSize: "14px",
                }}
              >
                进度
              </label>
              <input
                type="text"
                name="progress"
                value={editData.progress || 0}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
                placeholder="例如: 50%"
              />
            </div>
            <div style={{display: "flex", gap: "8px", marginTop: "12px"}}>
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
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default KanListContainer
