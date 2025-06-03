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

import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"
import isYesterday from "dayjs/plugin/isYesterday"
import weekOfYear from "dayjs/plugin/weekOfYear"
import {t} from "i18next"

dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.extend(weekOfYear)

/**
 * 格式化日期显示
 * @param timestamp 时间戳(毫秒)
 * @returns 格式化后的日期字符串
 */
export function formatRelativeDate(timestamp: number): string {
  const date = dayjs(timestamp)

  if (date.isToday()) {
    return t`date.today`
  }
  if (date.isYesterday()) {
    return t`date.yesterday`
  }

  // 检查是否在同一周
  if (date.week() === dayjs().week() && date.year() === dayjs().year()) {
    const weekdays = [
      t`date.monday`,
      t`date.tuesday`,
      t`date.wednesday`,
      t`date.thursday`,
      t`date.friday`,
      t`date.saturday`,
      t`date.sunday`,
    ]
    return weekdays[date.day() - 1]
  }

  // 更早的日期显示完整日期
  return date.format(`YYYY${t`date.year`}MM${t`date.month`}DD${t`date.day`}`)
}
