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

import Avatar from "@/components/Avatar/AvatarPreview"
import {Button} from "@/components/Button"
import {svgIcons} from "@/components/Icons"
import styled from "styled-components"
import {TeamUser} from "../useTeam"

interface UserCardProps {
  user?: TeamUser
  isAddCard?: boolean
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function UserCard({
  user,
  isAddCard,
  onClick,
  onEdit,
  onDelete,
}: UserCardProps) {
  if (isAddCard) {
    return (
      <AddCard onClick={onClick}>
        <svgIcons.Plus width={32} height={32} />
        <AddText>添加用户</AddText>
      </AddCard>
    )
  }

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <Avatar avatar={user.info.avatar} isText={!user.info.avatar} />
        <UserInfo>
          <UserName>{user.info.username}</UserName>
          <UserEmail>{user.info.email}</UserEmail>
        </UserInfo>
        <Actions>
          <Button $variant="text" $size="small" onClick={onEdit}>
            <svgIcons.Gear width={16} height={16} />
          </Button>
          <Button $variant="text" $size="small" onClick={onDelete}>
            <svgIcons.Cross width={16} height={16} />
          </Button>
        </Actions>
      </CardHeader>
      <CardBody>
        <InfoRow>
          <InfoLabel>用户ID:</InfoLabel>
          <InfoValue>{user.uid}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>公钥:</InfoLabel>
          <PublicKeyValue>{user.publicKey}</PublicKeyValue>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

const Card = styled.div`
  width: 280px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`

const AddCard = styled(Card)`
  align-items: center;
  justify-content: center;
  border: 2px dashed #e0e0e0;
  background: #fafafa;
  min-height: 160px;

  &:hover {
    border-color: #007bff;
    background: #f0f8ff;
  }
`

const AddText = styled.span`
  margin-top: 8px;
  color: #666;
  font-size: 14px;
`

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
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

const UserEmail = styled.div`
  font-size: 14px;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Actions = styled.div`
  display: flex;
  gap: 4px;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const InfoLabel = styled.span`
  font-size: 12px;
  color: #999;
  min-width: 50px;
  flex-shrink: 0;
`

const InfoValue = styled.span`
  font-size: 12px;
  color: #333;
  word-break: break-all;
`

const PublicKeyValue = styled(InfoValue)`
  font-family: monospace;
  font-size: 11px;
  line-height: 1.3;
`
