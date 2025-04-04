import {TextareaHTMLAttributes} from "react"
import styled from "styled-components"

const StyledTextarea = styled.textarea`
  height: 120px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  resize: none;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }

  &::placeholder {
    color: #999;
  }
`

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({...rest}: TextareaProps) => {
  return <StyledTextarea {...rest} />
}

export default Textarea
