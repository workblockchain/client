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
import {TimerLayout} from "./TimerLayout"

// const PhaseTitle = styled.h2`
//   font-size: 1.5rem;
//   color: ${colors.Neutral700};
//   margin: 0;
// `

const Container = styled(Layout)<{$phase: TimerPhaseType}>`
  display: flex;
  flex-direction: column;
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
  const [currentLayout, setCurrentLayout] = useState<"timer" | "commit">(
    "timer"
  )
  const [description, setDescription] = useState("")

  const {status, remainingTime, timePassed, timerPhase} = usePomodoroTimer()
  const {startTimer, pauseTimer, togglePhase} = usePomodoroTimer()

  // Timer buttons
  const handleSkip = () => {
    setDescription("")
    pauseTimer()
    setCurrentLayout("commit")
  }

  // Commit buttons
  function goNextPhase() {
    setDescription("")
    togglePhase()
    setCurrentLayout("timer")
  }
  const handleCommitConfirm = () => {
    const timestamp = new Date().toISOString()
    console.log({
      timestamp,
      description,
    })
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
        />
      )}
    </Container>
  )
}
