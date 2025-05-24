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

import * as ed from "@noble/ed25519"
import {create} from "zustand"
import {UserInfoProps} from "../interfaces/userInfo"
import {fromBase64, toBase64} from "../utils"

interface UserProfile {
  userInfo: UserInfoProps
  publicKey: string
  secretKey: string
}

interface UserProfileStore extends UserProfile {
  setUserInfo: (userInfo: Partial<UserInfoProps>) => void
  generateSignature: () => Promise<[string, string]> // [public key, secret key]
  setSignature: (publicKey: string, secretKey: string) => void
  exportUserProfile: () => UserProfile
  sign: (message: string) => Promise<string>
  verify: (message: string, signature: string) => Promise<boolean>
  save: () => void
  load: () => void
}
const USER_PROFILE_KEY = "USER_PROFILE" as const

export const useUserProfile = create<UserProfileStore>((set, get) => ({
  userInfo: {
    username: "",
    email: "",
    avatar: "",
  },
  publicKey: "",
  secretKey: "",

  setUserInfo: (partialInfo) =>
    set((state) => ({
      userInfo: {...state.userInfo, ...partialInfo},
    })),

  generateSignature: async () => {
    const privateKey = ed.utils.randomPrivateKey()
    const publicKey = await ed.getPublicKeyAsync(privateKey)
    return [toBase64(publicKey), toBase64(privateKey)]
  },

  setSignature: (publicKey, secretKey) => set({publicKey, secretKey}),

  exportUserProfile: () => ({
    userInfo: get().userInfo,
    publicKey: get().publicKey,
    secretKey: get().secretKey,
  }),

  sign: async (message: string) => {
    const secretKey = fromBase64(get().secretKey)
    const msgBytes = new TextEncoder().encode(message)
    const signature = await ed.signAsync(msgBytes, secretKey)
    return toBase64(signature)
  },

  verify: async (message: string, signature: string) => {
    const publicKey = fromBase64(get().publicKey)
    const msgBytes = new TextEncoder().encode(message)
    const signatureBytes = fromBase64(signature)
    const res = await ed.verifyAsync(signatureBytes, msgBytes, publicKey)
    return res
  },

  save: () => {
    const userProfile = get().exportUserProfile()
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile))
  },

  load: () => {
    const userProfileStr = localStorage.getItem(USER_PROFILE_KEY)
    if (userProfileStr) {
      const userProfile = JSON.parse(userProfileStr)
      set(userProfile)
    }
  },
}))
