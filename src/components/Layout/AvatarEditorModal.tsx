// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PubL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PubL v2.
// You can use this software according to
// the terms and conditions of the Mulan PubL v2.
// You may obtain a copy of Mulan PubL v2 at:
//
//   http://license.coscl.org.cn/MulanPubL-2.0
//

import {RefObject} from "react"
import AvatarEditor from "react-avatar-editor"
import styled from "styled-components"

const EditorModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const EditorContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:last-child {
      background: #007bff;
      color: white;
    }
  }
`

interface AvatarEditorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  editorRef: RefObject<AvatarEditor | null>
  uploadedImage: File | null
  width?: number
  height?: number
  border?: number
  color?: number[]
  scale?: number
  rotate?: number
}

export const AvatarEditorModal = ({
  isOpen,
  onClose,
  onSave,
  editorRef,
  uploadedImage,
  width = 256,
  height = 256,
  border = 50,
  color = [0, 0, 0, 0.2],
  scale = 1,
  rotate = 0,
}: AvatarEditorModalProps) => {
  if (!isOpen) return null

  return (
    <EditorModal>
      <EditorContainer>
        <AvatarEditor
          ref={editorRef}
          image={uploadedImage || ""}
          width={width}
          height={height}
          border={border}
          color={color}
          scale={scale}
          rotate={rotate}
        />
        <ButtonGroup>
          <button onClick={onClose}>取消</button>
          <button onClick={onSave}>确认</button>
        </ButtonGroup>
      </EditorContainer>
    </EditorModal>
  )
}
