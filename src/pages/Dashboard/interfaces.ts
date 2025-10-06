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

import {WorkData} from "@/interfaces"
import {t} from "i18next"

export interface WorkRecord extends Partial<WorkData> {
  wid: string
  userId: string
  createdAt?: number
  startTime?: number
  endTime?: number
  isSigned?: boolean
  data?: string
}

export interface WorkRecordFieldDefinition {
  key: keyof WorkRecord
  label: string
  type: "text" | "number" | "date" | "select" | "multi-select" | "boolean"
  options?: {value: string; label: string}[]
  placeholder?: string
  size?: number
  cellRenderer?: (value: any) => string
  hidden?: boolean
}

export const workRecordFieldDefinitions: WorkRecordFieldDefinition[] = [
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
]
