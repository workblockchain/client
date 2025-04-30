import {css} from "styled-components"
import {colors} from "../../styles"
import {styledCommon} from "../../styles/common"

export type InputVariantType = {$variant?: "primary" | "borderless"}
export const inputCommon = (props?: InputVariantType) => css`
  font-size: 16px;
  ${props?.$variant === "borderless" &&
  css`
    box-shadow: none;
    border: none;
    background-color: transparent;
  `}

  &:hover,&:focus {
    box-shadow: 0 0 0 1px ${colors.Red300};
    background-color: #fff;
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    ${styledCommon.disabled}
  }
`
