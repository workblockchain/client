import {darken, transparentize} from "polished"
import styled, {css} from "styled-components"
import {colors} from "../../styles/colors"
import {styledCommon} from "../../styles/common"

export type VariantType = "solid" | "outline" | "text"
const $variantStyles = ($variant: VariantType = "solid", color: string) => css`
  ${$variant === "solid" &&
  css`
    background-color: ${color};
    color: ${colors.Neutral100};

    &:hover:not(:disabled) {
      background-color: ${darken(0.1, color)};
    }
  `}

  ${$variant === "outline" &&
  css`
    background-color: transparent;
    color: ${color};
    box-shadow: 0 0 0 1px ${color};

    &:hover:not(:disabled) {
      background-color: ${transparentize(0.9, color)};
    }
  `}

  ${$variant === "text" &&
  css`
    background-color: transparent;
    color: ${color};
    box-shadow: none;
    padding: 0;
    height: auto;

    &:hover:not(:disabled) {
      filter: brightness(1.2);
    }
  `}
`

type ButtonStyleProps = {
  $variant?: VariantType
  $size?: "small" | "medium" | "large"
  $primaryColor?: string
}

export const Button = styled.button<ButtonStyleProps>`
  ${styledCommon.base}
  white-space: nowrap;
  ${({$size = "medium"}) => {
    switch ($size) {
      case "small":
        return css`
          height: 28px;
          font-size: 12px;
          padding: 0 16px;
        `
      case "medium":
        return css`
          height: 40px;
          font-size: 14px;
          padding: 0 20px;
        `
      case "large":
        return css`
          height: 48px;
          font-size: 16px;
          padding: 0 24px;
        `
    }
  }}
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({$primaryColor, $variant}) =>
    $variantStyles($variant, $primaryColor ?? colors.Red400)}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    ${styledCommon.disabled}
    cursor: not-allowed;
  }
`
