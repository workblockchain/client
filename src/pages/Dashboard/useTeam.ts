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

import {UserInfoProps} from "@/interfaces"
import {PERSIST_KEYS} from "@/stores/persistKeys"
import {create} from "zustand"
import {persist} from "zustand/middleware"

export interface TeamUser {
  uid: string
  publicKey: string
  info: UserInfoProps
}

interface TeamProps {
  publicKeys: string[]
  // <pubkey, user>
  users: Record<string, TeamUser>
}

interface TeamStore extends TeamProps {
  setPublicKeys: (publicKeys: string[]) => void
  setUsers: (users: Record<string, TeamUser>) => void
  addUser: (user: TeamUser) => void
  removeUser: (uid: string) => void
  updateUser: (uid: string, updates: Partial<TeamUser>) => void
  clearTeam: () => void
  getOptions: () => {value: string; label: string}[]
}

export const useTeam = create<TeamStore>()(
  persist(
    (set, get) => ({
      publicKeys: [],
      users: {},
      setPublicKeys: (publicKeys) => set({publicKeys}),
      setUsers: (users) => set({users}),
      addUser: (user) =>
        set((state) => ({
          users: {...state.users, [user.publicKey]: user},
          publicKeys: [...new Set([...state.publicKeys, user.publicKey])],
        })),
      removeUser: (pubkey) =>
        set((state) => {
          const {[pubkey]: removed, ...remainingUsers} = state.users
          return {
            users: remainingUsers,
            publicKeys: state.publicKeys.filter(
              (key) => key !== removed?.publicKey
            ),
          }
        }),
      updateUser: (uid, updates) =>
        set((state) => ({
          users: {
            ...state.users,
            [uid]: {...state.users[uid], ...updates},
          },
        })),
      clearTeam: () => set({publicKeys: [], users: {}}),
      getOptions: () => {
        const {users} = get()
        return Object.values(users).map((user) => ({
          value: user.uid,
          label: user.info.username || user.uid,
        }))
      },
    }),
    {
      name: PERSIST_KEYS.TEAM_PROFILE,
    }
  )
)
