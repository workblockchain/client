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

import type {AlignType, SizeType} from "../types"

export interface RatioOption {
  key: string
  value: string | number | boolean
}

export interface RatioProps {
  /** 选项列表，最少需要两个选项 */
  options: RatioOption[]
  /** 当前选中的选项key */
  value?: string
  /** 选项改变时的回调函数 */
  onChange?: (key: string) => void
  /** 是否禁用 */
  disabled?: boolean
  /** 容器样式 */
  containerStyle?: React.CSSProperties
  /** 尺寸大小 */
  size?: SizeType
  /** 对齐方式 */
  align?: AlignType
}
