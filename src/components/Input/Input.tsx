import {InputHTMLAttributes} from "react"
import styled from "styled-components"
import {styledCommon} from "../../styles/common"

const StyledInput = styled.input`
  ${styledCommon.base}
  height: 48px;
  padding: 0 16px;
  border-radius: 24px;
  font-size: 16px;
  text-align: center;

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

type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = ({...rest}: InputProps) => {
  return <StyledInput {...rest} />
}
