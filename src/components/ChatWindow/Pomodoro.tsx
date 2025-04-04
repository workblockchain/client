import styled from "styled-components"

export function Pomodoro() {
  return <Image src="@/assets/pomodoro.svg" alt="pomodoro" />
}

const Image = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
`
