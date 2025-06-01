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

import {useState} from "react"
import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button, Textarea} from ".."
import {colors} from "../../styles"
import {svgIcons} from "../Icons"
import {HintText, Row} from "../Layout"

export type CommitLayoutProps = {
  description: string
  onDescriptionChange: (value: string) => void
  onCommitConfirm: () => void
  onAbort: () => void
  timePassed: string
  onBack: () => void
  remainingTime: number
}

export const CommitLayout = ({
  description,
  onDescriptionChange,
  onCommitConfirm,
  onAbort,
  timePassed,
  remainingTime,
  onBack,
}: CommitLayoutProps) => {
  const {t} = useTranslation()
  const [abortConfirm, setAbortConfirm] = useState(false)
  const hintText = t("commit.hintText", {timePassed})

  const handleClickAbort = () => {
    setAbortConfirm(true)
  }

  return (
    <DescriptionBox>
      {remainingTime > 0 && (
        <Row>
          <Button $variant="icon" onClick={onBack}>
            <svgIcons.Arrow style={{rotate: "90deg"}} />
          </Button>
          <HintText>{hintText}</HintText>
        </Row>
      )}
      <Textarea
        value={description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onDescriptionChange(e.target.value)
        } // 添加类型注解
        placeholder={t`description.placeholder`}
      />
      <ButtonRow>
        <ButtonGroup>
          <Button $size="small" onClick={onCommitConfirm}>
            {t`commit.confirm`}
          </Button>
          <Button
            $size="small"
            style={{color: colors.Neutral400}}
            $variant="text"
            onClick={handleClickAbort}
          >
            {t`commit.abort`}
          </Button>
          <Button
            $size="small"
            $variant="text"
            style={{
              opacity: abortConfirm ? 1 : 0,
              pointerEvents: abortConfirm ? "auto" : "none",
              color: colors.Red600,
              textDecoration: "underline",
              marginLeft: "auto",
            }}
            onClick={onAbort}
          >
            {t`commit.confirm-abort`}
          </Button>
        </ButtonGroup>
        <HintText
          style={{opacity: abortConfirm ? 1 : 0}}
        >{t`commit.abort-hint`}</HintText>
      </ButtonRow>
    </DescriptionBox>
  )
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 8px;
`

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`
