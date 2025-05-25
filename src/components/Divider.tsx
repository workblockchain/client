import styled from "styled-components"
import {colors} from "../styles/colors"

const BaseDivider = styled.div<{color?: string; margin?: string}>`
  background-color: ${({color}) => color || colors.Neutral300};
`

export const DividerHorizontal = styled(BaseDivider)`
  height: 1px;
  width: 100%;
  margin: ${({margin}) => margin || "8px 0"};
`

export const DividerVertical = styled(BaseDivider)`
  width: 1px;
  height: 100%;
  margin: ${({margin}) => margin || "0 8px"};
`
