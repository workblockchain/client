import styled from "styled-components"
import {Modal, ModalProps} from "./Modal"

export const FixedModal = (props: ModalProps) => (
  <Modal
    style={{
      width: 600,
      maxWidth: "90vw",
      maxHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
    bodyComponent={(children) => <ModalBody>{children}</ModalBody>}
    {...props}
  />
)

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`
