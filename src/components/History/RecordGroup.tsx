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

import {WorkData} from "@/interfaces/records"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {colors} from "@/styles"
import {formatRelativeDate} from "@/utils"
import dayjs from "dayjs"
import {useMemo} from "react"
import styled from "styled-components"
import {RecordItemUnsigned} from "./RecordItem"

export function RecordGroupByDay({day}: {day: number}) {
  const {workRecords} = useSignedRecord()
  const group = useMemo(() => {
    return workRecords.filter((work) => {
      return dayjs(work.startTime).isSame(dayjs(day), "day")
    })
  }, [workRecords, day])
  return <RecordGroup title={formatRelativeDate(day)} group={group} />
}

interface RecordGroupProps {
  title: string
  group: WorkData[]
}

function RecordGroup({title, group}: RecordGroupProps) {
  return (
    <Container>
      <GroupTitle>{title}</GroupTitle>
      {group.map((work) => (
        <RecordItemUnsigned key={work.wid} wid={work.wid} />
      ))}
    </Container>
  )
}

const Container = styled.div``

const GroupTitle = styled.div`
  font-size: 14px;
  margin: 16px 0;
  color: ${colors.Neutral500};
  font-style: italic;
`
