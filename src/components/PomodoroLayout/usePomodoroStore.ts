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

import {create} from "zustand"

interface PomodoroStore {
  currentRequirementId: string // 当前选中的需求ID
  setCurrentRequirementId: (id: string) => void // 设置当前选中的需求ID
  isReqCardOpen: boolean // 是否打开需求卡片
  setIsReqCardOpen: (open: boolean) => void
  isReqListOpen: boolean // 是否打开需求列表
  setIsReqListOpen: (open: boolean) => void
}
const usePomodoroStore = create<PomodoroStore>((set) => ({
  currentRequirementId: "",
  setCurrentRequirementId: (id) => set({currentRequirementId: id}),
  isReqCardOpen: false,
  setIsReqCardOpen: (open) => set({isReqCardOpen: open}),
  isReqListOpen: false,
  setIsReqListOpen: (open) => set({isReqListOpen: open}),
}))

export default usePomodoroStore
