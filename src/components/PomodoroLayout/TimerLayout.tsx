import {useTranslation} from "react-i18next"
import styled from "styled-components"
import {Button} from ".."
import {TimeDisplay} from "../TimeDisplay/TimeDisplay"

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

export type TimerLayoutProps = {
  onCountStart: () => void
  onCountPause: () => void
  onSkip: () => void
  status: "idle" | "running" | "paused"
  remainingTime: number
}

export const TimerLayout = ({
  onCountStart,
  onCountPause,
  onSkip,
  status,
  remainingTime,
}: TimerLayoutProps) => {
  const {t} = useTranslation()

  return (
    <>
      <TimeDisplay seconds={remainingTime} />
      <ButtonGroup>
        {status === "running" ? (
          <Button size="small" onClick={onCountPause}>
            {t`timer.pause`}
          </Button>
        ) : (
          <Button size="small" onClick={onCountStart}>
            {t`timer.start`}
          </Button>
        )}
        <Button
          size="small"
          variant="text"
          onClick={onSkip}
          style={{padding: "0 20px"}}
        >
          {t`timer.skip`}
        </Button>
      </ButtonGroup>
    </>
  )
}
