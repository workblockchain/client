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
            priority: "Medium",
            status: "Open",
            requirementType: "Feature",
            progress: 0,
          })
        }}
      >
        <div style={{padding: "20px"}}>
          <h2>Create New Requirement</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Description
              </label>
              <textarea
                name="description"
                value={editData.description || ""}
                onChange={handleInputChange}
                style={{width: "100%", height: "80px"}}
                required
              />
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Assigned To
              </label>
              <input
                type="text"
                name="assignedTo"
                value={editData.assignedTo || ""}
                onChange={handleInputChange}
                style={{width: "100%"}}
                required
              />
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Priority
              </label>
              <select
                name="priority"
                value={editData.priority || "Medium"}
                onChange={handleInputChange}
                style={{width: "100%"}}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Status
              </label>
              <select
                name="status"
                value={editData.status || "Open"}
                onChange={handleInputChange}
                style={{width: "100%"}}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Requirement Type
              </label>
              <select
                name="requirementType"
                value={editData.requirementType || "Feature"}
                onChange={handleInputChange}
                style={{width: "100%"}}
              >
                <option value="Feature">Feature</option>
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
              </select>
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={editData.tags || ""}
                onChange={handleInputChange}
                style={{width: "100%"}}
                placeholder="e.g., UI, Backend"
              />
            </div>
            <div style={{marginBottom: "15px"}}>
              <label style={{display: "block", marginBottom: "5px"}}>
                Progress
              </label>
              <input
                type="text"
                name="progress"
                value={editData.progress || "0%"}
                onChange={handleInputChange}
                style={{width: "100%"}}
                placeholder="e.g., 50%"
              />
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <Button type="submit">Create Requirement</Button>
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
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default KanListContainer
