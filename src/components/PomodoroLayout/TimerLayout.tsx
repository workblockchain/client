import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button} from ".."
import {usePomodoroTimer} from "../../stores/usePomodoroTimer"
import {TimeDisplay} from "../TimeDisplay/TimeDisplay"

const SmallButton = styled(Button)`
  padding: 0 1rem;
  font-size: 0.8rem;
  height: 28px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

export type TimerLayoutProps = {
  onCountStart: () => void
  onCountPause: () => void
  onSkip: () => void
}

export const TimerLayout = ({
  onCountStart,
  onCountPause,
  onSkip,
}: TimerLayoutProps) => {
  const {t} = useTranslation()
  const {status, remainingTime} = usePomodoroTimer()

  return (
    <>
      <TimeDisplay seconds={remainingTime} />
      <ButtonGroup>
        {status === "running" ? (
          <SmallButton onClick={onCountPause}>{t("timer.pause")}</SmallButton>
        ) : (
          <SmallButton onClick={onCountStart}>{t("timer.start")}</SmallButton>
        )}
        <SmallButton $variant="text" onClick={onSkip}>
          {t("timer.skip")}
        </SmallButton>
      </ButtonGroup>
    </>
  )
}
