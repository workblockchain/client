import {useState} from "react"
import styled from "styled-components"
import {Layout} from ".."
import {usePomodoroTimer} from "../../stores/usePomodoroTimer"
import {colors} from "../../styles"
import {CommitLayout} from "./CommitLayout"
import {TimerLayout} from "./TimerLayout"

// const PhaseTitle = styled.h2`
//   font-size: 1.5rem;
//   color: ${colors.Neutral700};
//   margin: 0;
// `

const Container = styled(Layout)<{$phase: "work" | "break"}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: ${({$phase}) =>
    $phase === "work" ? colors.Neutral200 : colors.Neutral100};
  transition: background-color 0.3s ease;
  width: auto;
  height: unset;
  min-height: unset;
  padding: 2rem;
`

export const PomodoroLayout = () => {
  const [currentLayout, setCurrentLayout] = useState<"timer" | "commit">(
    "timer"
  )
  const [description, setDescription] = useState("")

  const handleCommitConfirm = () => {
    // 提交逻辑保持不变
    const timestamp = new Date().toISOString()
    console.log({
      timestamp,
      description,
    })
    setDescription("")
    setCurrentLayout("timer")
  }

  const handleAbort = () => {
    setDescription("")
    setCurrentLayout("timer")
  }

  const {startTimer, pauseTimer} = usePomodoroTimer()

  return (
    <Container $phase={currentLayout === "timer" ? "work" : "break"}>
      {currentLayout === "timer" ? (
        <TimerLayout
          onCountStart={startTimer}
          onCountPause={pauseTimer}
          onSkip={handleAbort}
        />
      ) : (
        <CommitLayout
          description={description}
          onDescriptionChange={setDescription}
          onCommitConfirm={handleCommitConfirm}
          onAbort={handleAbort}
        />
      )}
    </Container>
  )
}
