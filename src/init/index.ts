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

import {useConfig} from "@/stores/useConfig"
import {useSignedRecord} from "@/stores/useSignedRecord"
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

export async function init() {
  await Promise.all([initUserProfile(), initRecords(), loadConfig()])
}
