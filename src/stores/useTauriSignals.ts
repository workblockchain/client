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

import {invoke} from "@tauri-apps/api/core"
import {listen} from "@tauri-apps/api/event"
import {create} from "zustand"
import {useUserProfile} from "./useUserProfile"

enum TauriSignals {
  AccountUpdatedSync = "account_updated_sync",
}

interface TauriMessage {
  time_send: number // timestamp when the signal was sent
  time_publish: number // timestamp when the signal was published
  message: string
}

const MaxHistoryMessages = 100 as const

export const handleTauriSignals = create(() => ({
  messages: [] as TauriMessage[],
  lastMessage: null as TauriMessage | null,
  initListener: () => {
    listen(TauriSignals.AccountUpdatedSync, (event) => {
      const message = event.payload as TauriMessage
      console.log("Received Tauri signal:", event.event, message)
      handleTauriSignals.setState((state) => {
        // calling events
        switch (event.event) {
          case TauriSignals.AccountUpdatedSync:
            console.log("Account updated sync event received")
            handleAccountUpdatedSync.updateAccount()
            break
          default:
            console.warn("Unknown event received:", event.event)
        }
        // update message history
        const newMessages = [
          ...state.messages.slice(0, MaxHistoryMessages),
          message,
        ]
        return {
          messages: newMessages,
          lastMessage: message,
        }
      })
    })
  },
}))

export const handleAccountUpdatedSync = {
  updateAccount: () => {
    // FIXME: circular dependency issue
    // This is a workaround to avoid circular dependency issues
    useUserProfile.getState().load()
  },
  accountUpdatedSync: async (storeUpdated?: string) => {
    await invoke(TauriSignals.AccountUpdatedSync, {
      message: storeUpdated ?? "",
      timeSend: Date.now(),
    })
  },
}
