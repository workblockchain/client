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

interface Options {
  autoSign: boolean // 是否自动签名
}

interface ConfigStore extends Options {
  setAutoSign: (autoSign: boolean) => void
  exportConfig: () => Options
  save: () => void
  load: () => void
  clear: () => void
}

const CONFIG_KEY = "USER_CONFIG" as const

export const useConfig = create<ConfigStore>((set, get) => ({
  autoSign: false,

  setAutoSign: (autoSign) => {
    set({autoSign})
    get().save()
  },

  exportConfig: () => ({
    autoSign: get().autoSign,
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
  },

  clear: () => {
    localStorage.removeItem(CONFIG_KEY)
    set({
      autoSign: false,
    })
  },
}))
