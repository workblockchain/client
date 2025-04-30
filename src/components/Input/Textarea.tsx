import styled from "styled-components"
import {styledCommon} from "../../styles/common"
import {inputCommon, type InputVariantType} from "./common.styles"

export const Textarea = styled.textarea<InputVariantType>`
  ${styledCommon.base}
  ${inputCommon()}
  height: 120px;
  padding: 16px;
  border-radius: 12px;
  resize: none;
`
