import * as ed from "@noble/ed25519"
import {create} from "zustand"
import {fromBase64, toBase64} from "../utils"

interface UserInfoProps {
  username: string
  email: string
  avatar: string // base64
  contact: string // 可以是千奇百怪
  contactTag: string // mobile | wechat | etc.
}

interface UserProfile {
  userInfo: UserInfoProps
  publicKey: string
  secretKey: string
}

interface UserProfileStore extends UserProfile {
  setUserInfo: (userInfo: Partial<UserInfoProps>) => void
  generateSignature: () => Promise<[string, string]> // [public key, secret key]
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
    contact: "",
    contactTag: "",
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
