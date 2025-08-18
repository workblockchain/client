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

import usePomodoroStore from "@/components/PomodoroLayout/usePomodoroStore"
import {useConfig} from "@/stores/useConfig"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {handleTauriSignals} from "@/stores/useTauriSignals"
import {isTauri} from "@tauri-apps/api/core"
import {useEffect, useState} from "react"
import {useUserProfile} from "../stores/useUserProfile"

// TODO: refactor to async progress
async function initUserProfile() {
  // 非响应式直接访问store实例
  return new Promise<void>((resolve) => {
    useUserProfile.getState().load()
    resolve()
  })
}

async function initRecords() {
  // 初始化工作记录
  return new Promise<void>((resolve) => {
    useSignedRecord.getState().load()
    resolve()
  })
}

async function loadConfig() {
  return new Promise<void>((resolve) => {
    useConfig.getState().load()
    resolve()
  })
}

async function initPomodoroStore() {
  // 初始化番茄钟状态
  return new Promise<void>((resolve) => {
    usePomodoroStore.getState().load()
    resolve()
  })
}

async function initTauri() {
  if (!isTauri()) {
    return
  }
  return new Promise<void>((resolve) => {
    handleTauriSignals.getState().initListener()
    resolve()
  })
}

async function init() {
  await Promise.all([
    initUserProfile(),
    initRecords(),
    loadConfig(),
    initPomodoroStore(),
    initTauri(),
  ])
}

function clear() {
  useSignedRecord.getState().clear()
}

function Initializer({children}: {children: React.ReactNode}) {
  const [isInit, setIsInit] = useState(false)
  useEffect(() => {
    init()
      .then(() => {
        console.log("Initialization complete")
        setIsInit(true)
      })
      .catch((error) => {
        console.error("Initialization failed:", error)
      })
    return clear
  }, [])
  if (!isInit) {
    return null
  }
  return <>{children}</>
}

export default Initializer
