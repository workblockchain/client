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
import {paths} from "@/router"
import {useConditionalNavigation} from "@/router/useConditionalNavigation"
import {useConfig} from "@/stores/useConfig"
import {useUserProfile} from "@/stores/useUserProfile"
import {POMODORO_BREAK, POMODORO_WORK} from "@/utils/supportTags"
import {useState} from "react"
import {toast} from "react-toastify"
import styled from "styled-components"
import {v4} from "uuid"
import {
  type TimerPhaseType,
  usePomodoroTimer,
} from "../../stores/usePomodoroTimer"
import {useSignedRecord} from "../../stores/useSignedRecord"
import {colors} from "../../styles"
import {secondToHMS} from "../../utils"
import {svgIcons} from "../Icons"
import {Navigation} from "../Layout/Navigation"
import {Portal} from "../Portal"
import {CommitLayout} from "./CommitLayout"
import {TimerLayout} from "./TimerLayout"
import usePomodoroStore from "./usePomodoroStore"

// const PhaseTitle = styled.h2`
//   font-size: 1.5rem;
//   color: ${colors.Neutral700};
//   margin: 0;
// `

function NavigationButton() {
  // 配置按钮点击处理
  const handleConfigClick = () => {
    setShowNavigation(true)
  }
  const navigation = useConditionalNavigation()
  const demoTargets = [
    {
      icon: <svgIcons.Gear width={24} height={24} />,
      label: "设置",
      onClick: () =>
        navigation({
          path: paths.config,
          tauriWindowOptions: {label: "config", title: "Workchain - 设置"},
        }),
    },
    {
      icon: <svgIcons.People width={24} height={24} />,
      label: "个人信息",
      onClick: () =>
        navigation({
          path: paths.profile,
          tauriWindowOptions: {label: "profile", title: "Workchain - 个人信息"},
        }),
    },
    {
      icon: <svgIcons.List width={24} height={24} />,
      label: "劳动记录",
      onClick: () =>
        navigation({
          path: paths.records,
          tauriWindowOptions: {label: "record", title: "Workchain - 历史记录"},
        }),
    },
    {
      icon: <svgIcons.Kanban width={24} height={24} />,
      label: "后台面板",
      onClick: () =>
        navigation({
          path: paths.dashboard,
          tauriWindowOptions: {
            label: "dashboard",
            title: "Workchain - 后台面板",
            dragDropEnabled: false,
          },
        }),
    },
  ]
  const [showNavigation, setShowNavigation] = useState(false)
  return (
    <>
      <Portal>
        <Navigation
          targets={demoTargets}
          onClose={() => setShowNavigation(false)}
          show={showNavigation}
        />
      </Portal>
      <svgIcons.Navigation
        onClick={handleConfigClick}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          cursor: "pointer",
          opacity: 0.6,
        }}
      />
    </>
  )
}

const PomodoroLayout = () => {
  const [currentLayout, setCurrentLayout] = useState<"timer" | "commit">(
    "timer"
  )
  const [description, setDescription] = useState("")

  const {status, remainingTime, timePassed, timerPhase} = usePomodoroTimer()
  const {startTimer, pauseTimer, togglePhase} = usePomodoroTimer()
  const {uid} = useUserProfile()
  const curRid = usePomodoroStore((state) => state.currentRequirementId)

  const {addWorkRecord, createRecord, setWorkSigned} = useSignedRecord()
  const {autoSign: autoSignConfig} = useConfig()
  const [autoSign, setAutoSign] = useState(autoSignConfig)
  const handleRecord = async (isWork: boolean) => {
    try {
      const message = `${
        isWork ? "工作" : "休息"
      }${description ? `: ${description}` : ""}`
      const now = Date.now()
      const work: WorkData = {
        wid: v4(),
        startTime: now - timePassed() * 1000, // timestamp in milliseconds
        endTime: now,
        duration: timePassed(), // duration in seconds
        outcome: "",
        userId: uid,
        workTags: isWork ? [POMODORO_WORK] : [POMODORO_BREAK],
        requirementIds: [curRid],
        projectIds: [],
        description: message,
      }
      addWorkRecord(work)
      if (autoSign) {
        const record = await createRecord(work.wid, JSON.stringify(work))
        setWorkSigned(work.wid, true)
        toast.success(`记录已保存: #${record.id.slice(0, 8)}`)
        setDescription("")
        return
      }
      toast.success(`记录暂存`)
      setDescription("")
    } catch (error) {
      toast.error("记录保存失败")
      console.error("记录保存失败:", error)
    }
  }

  // Timer buttons
  const handleSkip = () => {
    pauseTimer()
    if (timePassed() > 0) {
      if (timerPhase === "break") {
        handleRecord(false)
        goNextPhase()
      } else {
        setCurrentLayout("commit")
      }
    } else {
      goNextPhase()
    }
  }

  // Commit buttons
  function goNextPhase() {
    setDescription("")
    togglePhase()
    setCurrentLayout("timer")
  }
  const handleCommitConfirm = () => {
    handleRecord(timerPhase === "work")
    goNextPhase()
  }

  const handleAbort = () => {
    goNextPhase()
  }

  return (
    <Container $phase={timerPhase}>
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
          autoSign={autoSign}
          setAutoSign={setAutoSign}
        />
      )}
      <NavigationButton />
    </Container>
  )
}

export default PomodoroLayout

const Container = styled.div<{$phase: TimerPhaseType}>`
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #f0f8ff;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: ${({$phase}) =>
    $phase === "work" ? colors.Red100 : colors.Blue100};
  color: ${({$phase}) => ($phase === "work" ? colors.Red800 : colors.Blue900)};
  transition: background-color 0.2s ease;
  width: auto;
  height: 100vh;
`
