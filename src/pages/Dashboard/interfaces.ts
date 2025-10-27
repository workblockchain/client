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

import type {ProjectData, RequirementData, WorkData} from "@/interfaces"
import {t} from "i18next"

export interface FieldDefinition {
  key: string
  label: string
  type: "text" | "number" | "date" | "select" | "multi-select" | "boolean"
  options?: {value: string; label: string}[]
  placeholder?: string
  size?: number
  cellRenderer?: (value: any) => string
  hidden?: boolean
}

export interface WorkRecord extends Partial<WorkData> {
  data?: string
  createdAt?: number
  [key: string]: unknown
}

export const workRecordFieldDefinitions: FieldDefinition[] = [
  {
    key: "wid",
    label: t("work.id"),
    type: "text",
    size: 120,
    hidden: true,
  },
  {
    key: "userId",
    label: t("work.user"),
    type: "text",
    size: 120,
  },
  {
    key: "startTime",
    label: t("work.startTime"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
  {
    key: "endTime",
    label: t("work.endTime"),
    type: "date",
    size: 120,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
  {
    key: "isSigned",
    label: t("work.status"),
    type: "boolean",
    size: 80,
    cellRenderer: (value?: boolean) =>
      value ? t`work.signed` : t`work.unsigned`,
  },
  {
    key: "description",
    label: t("work.description"),
    type: "text",
    cellRenderer: (value?: string) => (value ? String(value) : "-"),
  },
  {
    key: "duration",
    label: t("work.duration"),
    type: "number",
  },
  {
    key: "outcome",
    label: t("work.outcome"),
    type: "text",
    hidden: true,
  },
  {
    key: "workTags",
    label: t("work.tags"),
    type: "multi-select",
  },
  {
    key: "requirementIds",
    label: t("work.requirements"),
    type: "multi-select",
    hidden: true,
  },
  {
    key: "projectIds",
    label: t("work.projects"),
    type: "multi-select",
    hidden: true,
  },
  {
    key: "cover",
    label: t("work.cover"),
    type: "text",
    hidden: true,
  },
  {
    key: "data",
    label: t("work.data"),
    type: "text",
    hidden: true,
  },
  {
    key: "createdAt",
    label: t("work.createdAt"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
]

export interface RequirementRecord extends Partial<RequirementData> {
  createdAt?: number
  updatedAt?: number
  [key: string]: unknown
}

export const requirementRecordFieldDefinitions: FieldDefinition[] = [
  {
    key: "rid",
    label: t("requirement.id"),
    type: "text",
    size: 120,
    hidden: true,
  },
  {
    key: "title",
    label: t("requirement.title"),
    type: "text",
    size: 200,
  },
  {
    key: "description",
    label: t("requirement.description"),
    type: "text",
    size: 300,
  },
  {
    key: "priority",
    label: t("requirement.priority"),
    type: "select",
    size: 100,
    options: [
      {value: "low", label: t("requirement.priorityLow")},
      {value: "medium", label: t("requirement.priorityMedium")},
      {value: "high", label: t("requirement.priorityHigh")},
    ],
  },
  {
    key: "status",
    label: t("requirement.status"),
    type: "select",
    size: 120,
    options: [
      {value: "todo", label: t("requirement.statusTodo")},
      {value: "doing", label: t("requirement.statusInProgress")},
      {value: "done", label: t("requirement.statusDone")},
      {value: "cancelled", label: t("requirement.statusCancelled")},
    ],
  },
  {
    key: "assignedTo",
    label: t("requirement.assignee"),
    type: "text",
    size: 120,
  },
  {
    key: "estimated",
    label: t("requirement.estimatedHours"),
    type: "number",
    size: 100,
  },
  {
    key: "tags",
    label: t("requirement.tags"),
    type: "multi-select",
    size: 150,
  },
  {
    key: "requirementType",
    label: t("requirement.type"),
    type: "text",
    size: 120,
    hidden: true,
  },
  {
    key: "projectIds",
    label: t("requirement.project"),
    type: "multi-select",
    size: 150,
  },
  {
    key: "workRecordIds",
    label: t("work.records"),
    type: "multi-select",
    size: 150,
    hidden: true,
  },
  {
    key: "progress",
    label: t("project.progress"),
    type: "number",
    size: 80,
    cellRenderer: (value?: number) => (value ? `${value}%` : "0%"),
  },
  {
    key: "contributors",
    label: t("project.teamMembers"),
    type: "multi-select",
    size: 150,
    hidden: true,
  },
  {
    key: "createdAt",
    label: t("requirement.createdAt"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
  {
    key: "updatedAt",
    label: t("requirement.updatedAt"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
]

export interface ProjectRecord extends Partial<ProjectData> {
  name: string
  createdAt?: number
  updatedAt?: number
  [key: string]: unknown
}

export const projectRecordFieldDefinitions: FieldDefinition[] = [
  {
    key: "pid",
    label: t("project.id"),
    type: "text",
    size: 120,
    hidden: true,
  },
  {
    key: "name",
    label: t("project.name"),
    type: "text",
    size: 200,
  },
  {
    key: "description",
    label: t("project.description"),
    type: "text",
    size: 300,
  },
  {
    key: "projectType",
    label: t("project.type"),
    type: "text",
    size: 120,
    hidden: true,
  },
  {
    key: "status",
    label: t("project.status"),
    type: "select",
    size: 100,
    options: [
      {value: "active", label: t("project.statusActive")},
      {value: "completed", label: t("project.statusCompleted")},
      {value: "paused", label: t("project.statusPaused")},
      {value: "cancelled", label: t("project.statusCancelled")},
    ],
  },
  {
    key: "assignedTo",
    label: t("project.owner"),
    type: "text",
    size: 120,
  },
  {
    key: "progress",
    label: t("project.progress"),
    type: "number",
    size: 80,
    cellRenderer: (value?: number) => (value ? `${value}%` : "0%"),
  },
  {
    key: "contributors",
    label: t("project.teamMembers"),
    type: "multi-select",
    size: 150,
  },
  {
    key: "requirementIds",
    label: t("work.requirements"),
    type: "multi-select",
    size: 150,
    hidden: true,
  },
  {
    key: "createdAt",
    label: t("project.createdAt"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
  {
    key: "updatedAt",
    label: t("project.updatedAt"),
    type: "date",
    size: 136,
    cellRenderer: (value?: number) =>
      value ? new Date(value).toLocaleString() : "-",
  },
]
