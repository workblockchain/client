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

import {t} from "i18next"

export type DateFormat = "YMD" | "MD" | "HM" | "M" | "S" | "HMS" | "time"

export function formatTimestamp(
  timestamp: number | string,
  format: DateFormat
): string {
  const ts = typeof timestamp === "string" ? parseInt(timestamp, 10) : timestamp

  // 验证时间戳是否有效
  if (isNaN(ts)) {
    throw new Error("Invalid timestamp")
  }

  const date = new Date(timestamp)
  const now = new Date()

  const pad = (num: number): string => num.toString().padStart(2, "0")

  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  if (format === "time") {
    // 判断是否是当天
    const isSameDay =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()

    // 判断是否是同一年
    const isSameYear = date.getFullYear() === now.getFullYear()

    // 判断秒是否为 0（决定是否需要显示秒）
    const hasSignificantSeconds = seconds !== "00"

    if (isSameDay) {
      // 当天：优先显示时间，秒非 0 则用 HMS，否则 HM
      return hasSignificantSeconds
        ? `${hours}:${minutes}:${seconds}`
        : `${hours}:${minutes}`
    } else if (isSameYear) {
      // 同年：显示月日
      return `${month}-${day}`
    } else {
      // 不同年：显示完整日期
      return `${year}-${month}-${day}`
    }
  }

  switch (format) {
    case "YMD":
      return `${year}-${month}-${day}`
    case "MD":
      return `${month}-${day}`
    case "HM":
      return `${hours}:${minutes}`
    case "M":
      return `${minutes}`
    case "S":
      return `${seconds}`
    case "HMS":
      return `${hours}:${minutes}:${seconds}`
    default:
      throw new Error("Invalid format")
  }
}

export function secondToHMS(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${String(h)}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function secondToTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${h}${t`time.hour`}${m}${t`time.minute`}${s}${t`time.second`}`
  }
  if (m > 0) {
    return `${m}${t`time.minute`}${s}${t`time.second`}`
  }
  if (m === 0 && s === 0) {
    return t`time.justNow`
  }
  return `${s}${t`time.second`}`
}
