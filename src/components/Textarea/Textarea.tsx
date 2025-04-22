import {TextareaHTMLAttributes} from "react"
import styled from "styled-components"

import {styledCommon} from "../../styles/common"

const StyledTextarea = styled.textarea`
  ${styledCommon.base}
  height: 120px;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  resize: none;

  &:focus {
    ${styledCommon.focus}
  }

  &::placeholder {
    ${styledCommon.placeholder}
  }

  &:disabled {
    ${styledCommon.disabled}
  }
`

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = ({...rest}: TextareaProps) => {
  return <StyledTextarea {...rest} />
}
