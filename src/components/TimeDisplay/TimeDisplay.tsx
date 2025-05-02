import {CSSProperties, styled} from "styled-components"
import {styledCommon} from "../../styles/common"
import {secondToHMS} from "../../utils/secondToHMS"

interface TimeDisplayProps {
  seconds: number
  style?: CSSProperties
}

const TimeDisplayContainer = styled.div`
  ${styledCommon.timerText}
  text-align: center;
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 6rem;
  }
`

export const TimeDisplay = ({seconds, style}: TimeDisplayProps) => {
  const formattedTime = secondToHMS(seconds)

  return (
    <TimeDisplayContainer style={style}>{formattedTime}</TimeDisplayContainer>
  )
}
