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

export interface Record {
  id: string // 默认ID
  message: string // 记录内容，JSON字符串, WorkRecord, RequirementRecord, ProjectRecord等
  signature: string // 签名
  createdBy: string // 创建人/组ID
  createdAt: number // 创建时间 timestamp in milliseconds
}

export interface WorkRecord {
  // atom work record
  startTime: number // timestamp in milliseconds
  endTime: number // timestamp in milliseconds
  duration?: number // 持续时间，单位秒, 作为手动补充填写

  outcome: string // 劳动成果，链接、文档、base64等，关联到库存。
  // 后续可能需要设计outcome的metadata结构，以应对较大的、无法解码的outcome
  previousWorkId?: string // 可选，关联到上一个工作记录ID
  nextWorkId?: string // 可选，关联到下一个工作记录ID

  userId: string // 劳动人ID
  workTags: string[] // 劳动标签，多维度定位 optional tags for categorization

  requirementIds: string[] // requirement ID if associated with a requirement
  projectIds: string[] // optional project ID if associated with a project

  description?: string // optional description in natural language of the work record
  cover?: string // optional cover image
}

const requirementStatusList = ["todo", "doing", "done"] as const
export type RequirementStatusType = (typeof requirementStatusList)[number]

export interface RequirementRecord {
  id: string // 默认ID
  priority: string // 优先级
  status: string // 状态

  assignedTo: string // 被分配人ID
  estimated: number // 预计时间，单位小时
  tags: string[] // 标签
  requirementType: string // 需求类型

  description?: string // 描述

  projectIds: string[] // 关联的项目ID
  workRecordIds: string[] // 关联的工作记录ID，由workRecord反向查询得到
  relationship: {
    [key: string]: string[] // key为关系，如parent, depends_on, blocked_by，value为关联的需求ID
  }

  progress?: number // 进度百分比，0-100, 根据workRecord计算得来
  contributors?: string[] // 贡献者, 根据workRecord计算得来
  relatedOutcomes?: string[] // 关联的成果ID，workRecord的outcome资源ID，索引
}

export interface ProjectRecord {
  id: string // 默认ID
  projectType: string // 项目类型
  status: string // 状态
  assignedTo: string // 被分配人ID

  description?: string // 描述

  progress?: number // 进度百分比，0-100, 根据workRecord计算得来
  contributors?: string[] // 贡献者, 根据workRecord计算得来
  requirementIds: string[] // 关联的需求ID, 由request反向查询得到
  relationship: {
    [key: string]: string[] // key为关系，如parent, depends_on, blocked_by，value为关联的需求ID
  }
}
