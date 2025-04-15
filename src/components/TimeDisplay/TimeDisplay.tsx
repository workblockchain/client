import {styled} from "styled-components"
import {styledCommon} from "../../styles/common"
import {secondToHMS} from "../../utils/secondToHMS"

interface TimeDisplayProps {
  seconds: number
}

const TimeDisplayContainer = styled.div`
  ${styledCommon.timerText}
  text-align: center;
  line-height: 1;
`

export const TimeDisplay = ({seconds}: TimeDisplayProps) => {
  const formattedTime = secondToHMS(seconds)

  return <TimeDisplayContainer>{formattedTime}</TimeDisplayContainer>
}
