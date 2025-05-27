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
import {useUserProfile} from "@/stores/useUserProfile"
import {colors} from "@/styles"
import {ChangeEvent, useState} from "react"
import {toast} from "react-toastify"
import styled from "styled-components"
import {Button} from "../../Button"
import {DividerHorizontal} from "../../Divider"
import {TextInputWithLabel} from "../../Input"
import {Modal} from "../../Modal"
import {SubDescription} from "../../Typographies"
import {AvatarRow} from "../AvatarRow"

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
  const [draftUid, setDraftUid] = useState<string>(uid.split("#")[0])

  const validateKeys = () => {
    if (!/^[a-zA-Z0-9_.]{3,16}$/.test(draftUid)) {
      toast("UID格式错误：必须为3-16位字母、数字、下划线或点号")
      return false
    }
    if (!publicKey || !secretKey) {
      toast("请生成有效密钥对")
      return false
    }
    toast("信息已保存")
    return true
  }

  const saveDraft = () => {
    if (!validateKeys()) return
    setUserInfo(draft)
    save()
  }

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const {clear} = useUserProfile()

  const onClickGenerateKeys = () => {
    if (isGenerating) return
    if (publicKey) {
      setIsConfirmOpen(true)
    } else {
      handleGenerateKeys()
    }
  }

  const onConfirmGenerate = () => {
    setIsConfirmOpen(false)
    setDraftUid("")
    clear()
  }

  const onCancelGenerate = () => {
    setIsConfirmOpen(false)
  }

  const handleGenerateKeys = async () => {
    setIsGenerating(true)
    if (!draftUid || !/^[a-zA-Z0-9_.]{3,16}$/.test(draftUid)) {
      toast("请先输入有效的UID")
      setIsGenerating(false)
      return
    }
    const [pubKey, secKey] = await generateSignature()
    const uid = `${draftUid.slice(0, 16)}#${pubKey.slice(0, 8)}`
    setSignature(pubKey, secKey, uid)
    save()
    toast("密钥对生成成功")
    setIsGenerating(false)
  }

  return (
    <StyledUserProfile>
      <Title>账户信息</Title>
      <InputRow>
        <span>
          <TextInputWithLabel
            label="UID"
            value={draftUid}
            placeholder="唯一ID"
            disabled={!!publicKey}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value
              if (/^[a-zA-Z0-9_.]{0,16}$/.test(value)) {
                setDraftUid(value)
              }
            }}
          />
          <pre>#{uid.split("#")[1]}</pre>
        </span>
        <SubDescription
          style={{color: "red", marginLeft: "12px", opacity: 0.6}}
        >
          *唯一ID，与公私钥绑定，一经设定不可更改
        </SubDescription>
        <SubDescription
          style={{color: "red", marginLeft: "12px", opacity: 0.6}}
        >
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
          onClick={onClickGenerateKeys}
          disabled={isGenerating}
        >
          {isGenerating
            ? "生成中..."
            : publicKey
              ? "删除该账户"
              : "生成密钥对并保存"}
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
      <ActionSection>
        <Button $variant="solid" onClick={saveDraft}>
          保存个人信息
        </Button>
      </ActionSection>
      <Modal isOpen={isConfirmOpen} onClose={onCancelGenerate} title="确认操作">
        确定要删除当前账户信息吗？此操作将清除所有本地存储的身份数据。
        <ActionSection style={{marginTop: "1rem"}}>
          <Button $variant="outline" onClick={onCancelGenerate}>
            取消
          </Button>
          <Button $variant="solid" onClick={onConfirmGenerate}>
            确定
          </Button>
        </ActionSection>
      </Modal>
    </StyledUserProfile>
  )
}

export default UserProfile

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

  span {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  pre {
    font-size: 12px;
    color: ${colors.Neutral300};
  }
`

const Title = styled.h2`
  margin: 0;
`
