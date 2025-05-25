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

import {ChangeEvent, useState} from "react"
import styled from "styled-components"
import {UserInfoProps} from "../../interfaces"
import {useUserProfile} from "../../stores/useUserProfile"
import {Button} from "../Button/Button"
import {DividerHorizontal} from "../Divider"
import {TextInputWithLabel} from "../Input/Input"
import {SubDescription} from "../Typographies"
import {AvatarRow} from "./AvatarRow"

export function UserProfile() {
  const [showSecretKey, setShowSecretKey] = useState(false)
  const {
    userInfo,
    setUserInfo,
    publicKey,
    secretKey,
    generateSignature,
    setSignature,
    save,
    uid,
  } = useUserProfile()
  const [isGenerating, setIsGenerating] = useState(false)
  const [draft, setDraft] = useState<Partial<UserInfoProps>>(userInfo)
  const [draftUid, setDraftUid] = useState<string>(uid)

  const saveDraft = () => {
    setUserInfo(draft)
    save()
  }

  const handleGenerateKeys = async () => {
    setIsGenerating(true)
    const [pubKey, secKey] = await generateSignature()
    setSignature(pubKey, secKey, uid)
    setIsGenerating(false)
  }

  return (
    <StyledUserProfile>
      <Title>账户信息</Title>
      <InputRow>
        <TextInputWithLabel
          label="UID"
          value={draftUid}
          placeholder="唯一ID"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            if (/^[a-zA-Z0-9_.]{3,16}$/.test(value)) {
              setDraftUid(value)
            }
          }}
        />
        <SubDescription style={{color: "red", marginLeft: "12px"}}>
          *唯一ID，与公私钥绑定，一经设定不可更改
        </SubDescription>
        <SubDescription style={{color: "red", marginLeft: "12px"}}>
          *必须为16位以内，仅允许字母、数字、下划线和点号
        </SubDescription>
      </InputRow>
      {publicKey && (
        <KeySection>
          <h3>公钥</h3>
          <KeyValue>{publicKey}</KeyValue>
          <h3>私钥(请妥善保管)</h3>
          <KeyValue>{showSecretKey ? secretKey : "*".repeat(64)}</KeyValue>
          <Button
            $variant="text"
            onClick={() => setShowSecretKey(!showSecretKey)}
            style={{fontSize: "0.8em", padding: "4px 8px", marginTop: "8px"}}
          >
            {showSecretKey ? "隐藏私钥" : "显示私钥"}
          </Button>
        </KeySection>
      )}
      <ActionSection>
        <Button
          $variant="solid"
          onClick={handleGenerateKeys}
          disabled={isGenerating}
        >
          {isGenerating ? "生成中..." : "生成密钥对"}
        </Button>
        <Button $variant="outline" onClick={saveDraft}>
          保存信息
        </Button>
      </ActionSection>
      <DividerHorizontal />
      <Title>个人信息</Title>
      <FormSection>
        <TextInputWithLabel
          label="用户名"
          value={draft.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft((draft) => ({...draft, username: e.target.value}))
          }
        />
        <TextInputWithLabel
          label="邮箱"
          value={draft.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDraft((draft) => ({...draft, email: e.target.value}))
          }
        />
        <AvatarRow
          value={draft.avatar || ""}
          onChange={(value) => setDraft((draft) => ({...draft, avatar: value}))}
        />
      </FormSection>
    </StyledUserProfile>
  )
}

const StyledUserProfile = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    color: #333;
  }
`

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
`

const KeySection = styled.div`
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;

  h3 {
    margin: 0.5rem 0;
    color: #666;
    font-size: 0.9em;
  }
`

const KeyValue = styled.p`
  color: #333;
  word-break: break-all;
  font-family: monospace;
`

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const Title = styled.h2`
  margin: 0;
`
