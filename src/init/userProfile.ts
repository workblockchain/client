// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//

/**
 * 用户配置初始化模块
 * 在应用启动时自动加载本地存储的用户配置
 */

import {useUserProfile} from "../stores/useUserProfile"

export function initUserProfile() {
  // 非响应式直接访问store实例
  useUserProfile.getState().load()
}
