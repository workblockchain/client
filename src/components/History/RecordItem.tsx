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

import {WorkData} from "@/interfaces"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {colors} from "@/styles"
import {secondToTime} from "@/utils"
import {POMODORO_BREAK} from "@/utils/supportTags"
import dayjs from "dayjs"
import {toast} from "react-toastify"
import styled, {css} from "styled-components"
import {Button} from "../Button"
import {svgIcons} from "../Icons"

interface RecordItemProps {
  wid: string
}

export const RecordItemUnsigned = ({wid}: RecordItemProps) => {
  const {getWorkRecord} = useSignedRecord()
  const work = getWorkRecord(wid)
  if (!work) return null
  return <RecordItem wid={wid} work={work} />
}

export const RecordItem = ({work}: RecordItemProps & {work: WorkData}) => {
  const datetime = dayjs(work.startTime)
  const isBreak = work.workTags.includes(POMODORO_BREAK)
  const isSigned = !!work.isSigned
  return (
    <StyledRecordItem $isSigned={isSigned} $isNarrow={isBreak}>
      <DateTime>
        {!isBreak && <span>{datetime.format("HH:mm:ss")}</span>}
        <span>{secondToTime(work.duration ?? 0)}</span>
      </DateTime>
      <RecordContent>
        <Tags>{work.requirementIds.map((rid) => `#${rid}`)}</Tags>
        <span>{work.description || "工作"}</span>
        <Tags>{work.outcome}</Tags>
      </RecordContent>
      {!isSigned ? (
        <Button $size="small" onClick={() => handleSign(work.wid)}>
          签名
        </Button>
      ) : (
        <svgIcons.Check
          style={{color: colors.Blue700, width: 28, height: 28}}
        />
      )}
    </StyledRecordItem>
  )
}

async function handleSign(workId: string) {
  const {workRecords, createRecord, setWorkSigned} = useSignedRecord.getState()
  const work = workRecords.find((w) => w.wid === workId)

  if (!work) {
    toast.error("签名失败, 未找到对应的记录")
    return
  }

  try {
    await createRecord(workId, JSON.stringify(work))
    setWorkSigned(workId, true)
    toast.success("签名成功")
  } catch (error) {
    toast.error("签名失败")
    console.error("签名失败:", error)
  }
}

const StyledRecordItem = styled.div<{$isSigned: boolean; $isNarrow?: boolean}>`
  padding: 8px 16px;
  background-color: #f5f5f526;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  border-left: 4px solid
    ${(props) => (props.$isSigned ? colors.Blue700 : colors.Yellow700)};
  box-shadow: 0 0 0 1px ${colors.Neutral200};
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #f5f5f57f;
  }

  ${(props) =>
    props.$isNarrow &&
    css`
      box-shadow: none;
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
      p {
        font-style: italic;
        color: ${colors.Neutral500};
        margin: 0;
      }
    `}
`

const DateTime = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.Neutral500};
  width: 48px;

  &:first-child {
    font-size: 12px;
  }
`

const RecordContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Tags = styled.div`
  display: flex;
  gap: 4px;
  color: ${colors.Neutral500};
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
`
