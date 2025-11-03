import styled from "styled-components"

import Avatar from "@/components/Avatar/AvatarPreview"
import {useTeam} from "../useTeam"

export function UserInfo({pubkey}: {pubkey: string}) {
  const users = useTeam((state) => state.users)
  const user = users[pubkey]
  return (
    <Container>
      <Avatar avatar={user.info.avatar} isText={!user.info.avatar} />
      <UserName>{user.info.username}</UserName>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
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
