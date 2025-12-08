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

import styled from "styled-components"

import Avatar from "@/components/Avatar/AvatarPreview"
import {useTeam} from "../useTeam"

export function UserInfo({pubkey}: {pubkey: string}) {
  const users = useTeam((state) => state.users)
  const user = users[pubkey]
  return (
    <Container>
      <Avatar size={28} avatar={user.info.avatar} isText={!user.info.avatar} />
      <UserName>{user.info.username}</UserName>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const UserName = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
