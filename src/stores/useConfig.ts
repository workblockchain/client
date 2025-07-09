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
import {usePomodoroTimer} from "./usePomodoroTimer"

interface Options {
  autoSign: boolean // 是否自动签名
  workDuration: number
  breakDuration: number
}

interface ConfigStore extends Options {
  setAutoSign: (autoSign: boolean) => void
  setWorkDuration: (minutes: number) => void
  setBreakDuration: (minutes: number) => void
  exportConfig: () => Options
  save: () => void
  load: () => void
  clear: () => void
}

const CONFIG_KEY = "USER_CONFIG" as const

export const useConfig = create<ConfigStore>((set, get) => ({
  autoSign: true, // 默认自动签名
  setAutoSign: (autoSign) => {
    set({autoSign})
    get().save()
  },

  // 设置工作时长(分钟)
  workDuration: 25, // 默认工作时长 25 分钟
  setWorkDuration: (minutes) => {
    set({workDuration: minutes})
    usePomodoroTimer.getState().onConfigChange()
    get().save()
  },

  // 设置休息时长(分钟)
  breakDuration: 5, // 默认休息时长 5 分钟
  setBreakDuration: (minutes) => {
    set({breakDuration: minutes})
    usePomodoroTimer.getState().onConfigChange()
    get().save()
  },

  exportConfig: () => ({
    autoSign: get().autoSign,
    workDuration: get().workDuration,
    breakDuration: get().breakDuration,
  }),

  save: () => {
    const config = get().exportConfig()
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config))
  },

  load: () => {
    const configStr = localStorage.getItem(CONFIG_KEY)
    if (configStr) {
      const config = JSON.parse(configStr)
      set(config)
    }

    // refresh pomodoro timer state
    usePomodoroTimer.getState().onConfigChange()
  },

  clear: () => {
    localStorage.removeItem(CONFIG_KEY)
    set({
      autoSign: false,
    })
  },
}))
