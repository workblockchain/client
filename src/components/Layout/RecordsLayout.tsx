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

import dayjs from "dayjs"
import {useMemo} from "react"
import styled from "styled-components"
import {Title} from "."
import {useSignedRecord} from "../../stores/useSignedRecord"
import {RecordGroupByDay} from "../History/RecordGroup"

export const RecordsLayout = () => {
  const {workRecords} = useSignedRecord()
  const allWorkDays = useMemo(() => {
    const days = new Set<number>()
    workRecords.forEach((record) => {
      const day = dayjs(record.startTime).startOf("day")
      days.add(day.valueOf())
    })
    const res = Array.from(days).sort((a, b) => b.valueOf() - a.valueOf())
    return res
  }, [workRecords])
  return (
    <RecordsContainer>
      <Title>工作记录历史</Title>
      <RecordsList>
        {workRecords.length === 0 ? (
          <EmptyState>
            <p>暂无工作记录</p>
            <span>您还没有任何工作记录</span>
          </EmptyState>
        ) : (
          allWorkDays.map((day) => <RecordGroupByDay key={day} day={day} />)
        )}
      </RecordsList>
    </RecordsContainer>
  )
}

export default RecordsLayout

const RecordsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const RecordsList = styled.div`
  display: flex;
  flex-direction: column;
`

const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #666;

  p {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }

  span {
    font-size: 0.9rem;
  }
`
