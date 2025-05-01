// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button} from ".."
import type {TimerPhaseType} from "../../stores/usePomodoroTimer"
import {colors} from "../../styles"
import {TimeDisplay} from "../TimeDisplay/TimeDisplay"

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`

export type TimerLayoutProps = {
  onCountStart: () => void
  onCountPause: () => void
  onSkip: () => void
  status: "idle" | "running" | "paused"
  phase: TimerPhaseType
  remainingTime: number
}

export const TimerLayout = ({
  onCountStart,
  onCountPause,
  onSkip,
  status,
  phase,
  remainingTime,
}: TimerLayoutProps) => {
  const {t} = useTranslation()
  const primaryColor = phase === "work" ? colors.Red500 : colors.Blue700

  return (
    <Container>
      <TimeDisplay style={{color: primaryColor}} seconds={remainingTime} />
      <ButtonGroup>
        {status === "running" ? (
          <Button
            $primaryColor={primaryColor}
            $size="small"
            onClick={onCountPause}
          >
            {t`timer.pause`}
          </Button>
        ) : (
          <Button
            $primaryColor={primaryColor}
            $size="small"
            onClick={onCountStart}
          >
            {t`timer.start`}
          </Button>
        )}
        <Button
          $size="small"
          $variant="text"
          onClick={onSkip}
          style={{padding: "0 20px"}}
        >
          {t`timer.skip`}
        </Button>
      </ButtonGroup>
    </Container>
  )
}
