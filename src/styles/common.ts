import {css} from "styled-components"
import {colors} from "./colors"

export const styledCommon = {
  base: css`
    background-color: #f5f5f5;
    border: none;
    outline: none;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease;
  `,
  disabled: css`
    opacity: 0.8;
    box-shadow: none;
  `,
  timerText: css`
    font-size: 4rem;
    font-weight: 700;
    color: ${colors.Red400};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `,
}
