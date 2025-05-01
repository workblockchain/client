import * as css from "csstype"
import styled from "styled-components"

export const full: css.Properties = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
}

export const center: css.Properties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const HoverColor = styled.div<{color: string}>`
  background-color: #0000;
  &:hover {
    background-color: ${(props) => props.color};
  }
`
