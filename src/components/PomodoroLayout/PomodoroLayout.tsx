// Copyright (c) 2025-present WorkBlockChain Team.
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//          http://license.coscl.org.cn/MulanPubL-2.0
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
// EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
// === Auto generated, DO NOT EDIT ABOVE ===

import GearIcon from "@/assets/gear.svg?react"
import {useState} from "react"
import styled from "styled-components"
import {Layout} from ".."
import {
  type TimerPhaseType,
  usePomodoroTimer,
} from "../../stores/usePomodoroTimer"
import {colors} from "../../styles"
import {secondToHMS} from "../../utils"
import {CommitLayout} from "./CommitLayout"
import {ConfigLayout} from "./ConfigLayout"
import {TimerLayout} from "./TimerLayout"

// const PhaseTitle = styled.h2`
//   font-size: 1.5rem;
//   color: ${colors.Neutral700};
//   margin: 0;
// `

const Container = styled(Layout)<{$phase: TimerPhaseType}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  background-color: ${({$phase}) =>
    $phase === "work" ? colors.Red100 : colors.Blue100};
  color: ${({$phase}) => ($phase === "work" ? colors.Red800 : colors.Blue900)};
  transition: background-color 0.2s ease;
  width: auto;
  height: unset;
  min-height: unset;
  padding: 2rem;
`

export const PomodoroLayout = () => {
  const [currentLayout, setCurrentLayout] = useState<
    "timer" | "commit" | "config"
  >("timer")
  const [description, setDescription] = useState("")

  const {status, remainingTime, timePassed, timerPhase} = usePomodoroTimer()
  const {startTimer, pauseTimer, togglePhase} = usePomodoroTimer()
  const {workDuration, setWorkDuration, breakDuration, setBreakDuration} =
    usePomodoroTimer()
  const configProps = {
    workDuration,
    breakDuration,
    setWorkDuration,
    setBreakDuration,
  }

  // TODO: record to store and read to sign
  const handleRecord = () => {
    console.log({
      timestamp: new Date().toISOString(),
      description,
      phase: timerPhase,
    })
  }

  // Timer buttons
  const handleSkip = () => {
    setDescription("")
    pauseTimer()

    if (timerPhase === "break") {
      handleRecord()
      goNextPhase()
    } else {
      setCurrentLayout("commit")
    }
  }

  // Commit buttons
  function goNextPhase() {
    setDescription("")
    togglePhase()
    setCurrentLayout("timer")
  }
  const handleCommitConfirm = () => {
    handleRecord()
    goNextPhase()
  }

  const handleAbort = () => {
    goNextPhase()
  }

  // 配置按钮点击处理
  const handleConfigClick = () => {
    setCurrentLayout("config")
  }

  return (
    <Container $phase={timerPhase}>
      {currentLayout === "timer" && (
        <GearIcon
          onClick={handleConfigClick}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            opacity: 0.6,
          }}
        />
      )}
      {currentLayout === "timer" && (
        <TimerLayout
          onCountStart={startTimer}
          onCountPause={pauseTimer}
          onSkip={handleSkip}
          status={status}
          phase={timerPhase}
          remainingTime={remainingTime}
        />
      )}
      {currentLayout === "commit" && (
        <CommitLayout
          description={description}
          onDescriptionChange={setDescription}
          onCommitConfirm={handleCommitConfirm}
          onAbort={handleAbort}
          timePassed={secondToHMS(timePassed())}
          remainingTime={remainingTime}
          onBack={() => {
            setCurrentLayout("timer")
          }}
        />
      )}
      {currentLayout === "config" && (
        <ConfigLayout
          {...configProps}
          onClose={() => setCurrentLayout("timer")}
        />
      )}
    </Container>
  )
}
