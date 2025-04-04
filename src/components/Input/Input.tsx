import {InputHTMLAttributes} from "react"
import styled from "styled-components"

const StyledInput = styled.input`
  height: 48px;
  padding: 0 16px;
  border-radius: 24px;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  text-align: center;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }

  &::placeholder {
    color: #999;
  }
`

type InputProps = InputHTMLAttributes<HTMLInputElement>

const Input = ({...rest}: InputProps) => {
  return <StyledInput {...rest} />
}

export default Input
