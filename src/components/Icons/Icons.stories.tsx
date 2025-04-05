import type {Meta} from "@storybook/react"
import styled from "styled-components"
import * as icons from "."

const meta: Meta = {
  title: "assets/Icons",
}

export default meta

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
`

export const Pomodoro = () => (
  <IconWrapper>
    <icons.Pomodoro />
  </IconWrapper>
)
