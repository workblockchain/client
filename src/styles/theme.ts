import {DefaultTheme} from "styled-components"

export const theme: DefaultTheme = {
  fontFamily: "Alibaba PuHuiTi 3.0",
}

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string
  }
}
