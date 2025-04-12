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
  focus: css`
    box-shadow: 0 0 0 1px ${colors.Red300};
    background-color: #fff;
  `,
  placeholder: css`
    color: #999;
  `,
  disabled: css`
    opacity: 0.8;
    box-shadow: none;
  `,
}
