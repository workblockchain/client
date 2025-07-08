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

import {RequirementData} from "@/interfaces"
import {useSignedRecord} from "@/stores/useSignedRecord"
import {colors} from "@/styles"
import {useMemo, type ComponentPropsWithoutRef} from "react"
import styled from "styled-components"
import {svgIcons} from "../Icons"
import StoryCard from "../StoryCard"
import usePomodoroStore from "./usePomodoroStore"

function WipBar() {
  const rid = usePomodoroStore((state) => state.currentRequirementId)
  const setCardOpen = usePomodoroStore((state) => state.setIsReqCardOpen)
  const setListOpen = usePomodoroStore((state) => state.setIsReqListOpen)

  const requirement = useMemo(
    () => useSignedRecord.getState().getRequirementRecord(rid),
    [rid]
  )

  return (
    <>
      <Container>
        {requirement && (
          <Title onClick={() => setCardOpen(true)}>
            {requirement?.description}
          </Title>
        )}
        <Action onClick={() => setListOpen(true)} />
      </Container>
      {requirement && <ReqCard req={requirement} />}
      <ReqList />
    </>
  )
}

export default WipBar

const ReqCard = ({req}: {req: RequirementData}) => {
  const isOpen = usePomodoroStore((state) => state.isReqCardOpen)
  const setIsOpen = usePomodoroStore((state) => state.setIsReqCardOpen)
  const props: ComponentPropsWithoutRef<typeof StoryCard> = {
    id: req.rid,
    tags: req.tags,
    cid: req.rid,
    assignee: req.assignedTo,
  }
  return (
    <StyledReqCard
      $open={isOpen}
      onClick={() => setIsOpen(false)}
      {...props}
      size="full"
    >
      {req.description}
    </StyledReqCard>
  )
}

const ReqList = () => {
  const isOpen = usePomodoroStore((state) => state.isReqListOpen)
  const setIsOpen = usePomodoroStore((state) => state.setIsReqListOpen)
  const setCurrentRequirementId = usePomodoroStore(
    (state) => state.setCurrentRequirementId
  )
  const reqs = useSignedRecord((state) => state.requirementRecords)
  const wip = useMemo(() => reqs.filter((r) => r.status === "doing"), [reqs])

  // const wip = [] as RequirementData[]

  return (
    <ReqListContainer $open={isOpen} onClick={() => setIsOpen(false)}>
      {wip.map((r) => (
        <StoryCard
          id={r.rid}
          key={r.rid}
          tags={r.tags}
          cid={r.rid}
          assignee={r.assignedTo}
          size="small"
          onClick={() => {
            setCurrentRequirementId(r.rid)
            setIsOpen(false)
          }}
        >
          {r.description}
        </StoryCard>
      ))}
    </ReqListContainer>
  )
}

const Container = styled.div`
  width: 180px;
  height: 32px;
  background-color: #00000010;
  border-radius: 16px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Title = styled.span`
  width: 136px;
  font-size: 12px;
  color: ${colors.Neutral500};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.Neutral700};
  }
`

const Action = styled(svgIcons.List)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: ${colors.Neutral500};
  transition: fill 0.2s ease;

  &:hover {
    color: ${colors.Neutral700};
  }
`

const StyledReqCard = styled(StoryCard)<{$open: boolean}>`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({$open}) => ($open ? 1 : 0)};
  pointer-events: ${({$open}) => ($open ? "auto" : "none")};
  transition: opacity 0.3s ease;
`

const ReqListContainer = styled.div<{$open: boolean}>`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  opacity: ${({$open}) => ($open ? 1 : 0)};
  pointer-events: ${({$open}) => ($open ? "auto" : "none")};
  background-color: ${colors.Neutral100};

  &::-webkit-scrollbar {
    display: none;
  }
`
