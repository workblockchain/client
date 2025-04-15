import {darken, transparentize} from "polished"
import {ButtonHTMLAttributes} from "react"
import styled, {css} from "styled-components"
import {colors} from "../../styles/colors"
import {styledCommon} from "../../styles/common"

type Variant = "solid" | "outline" | "text"
const $variantStyles = (color: string) => css<{$variant?: Variant}>`
  ${({$variant}) =>
    $variant === "solid" &&
    css`
      background-color: ${color};
      color: ${colors.Neutral100};

      &:hover:not(:disabled) {
        background-color: ${darken(0.1, color)};
      }
    `}

  ${({$variant}) =>
    $variant === "outline" &&
    css`
      background-color: transparent;
      color: ${color};
      box-shadow: 0 0 0 1px ${color};

      &:hover:not(:disabled) {
        background-color: ${transparentize(0.9, color)};
      }
    `}

  ${({$variant}) =>
    $variant === "text" &&
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
  $variant?: Variant
  $size?: "small" | "medium" | "large"
  colorScheme?: "primary"
}

const StyledButton = styled.button<ButtonStyleProps>`
  ${styledCommon.base}
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
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({colorScheme = "primary"}) =>
    colorScheme === "primary"
      ? $variantStyles(colors.Red400)
      : $variantStyles(colors.Yellow500)}

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    ${styledCommon.disabled}
    cursor: not-allowed;
  }
`

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps

export const Button = ({$variant = "solid", ...rest}: ButtonProps) => {
  return <StyledButton $variant={$variant} {...rest} />
}
