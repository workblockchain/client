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

import {ChangeEvent, useRef, useState} from "react"
import AvatarEditor from "react-avatar-editor"
import styled from "styled-components"
import {Input} from "../Input/Input"
import {AvatarEditorModal} from "./AvatarEditorModal"

export function AvatarRow({value, onChange}: AvatarRowProps) {
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const editorRef = useRef<AvatarEditor>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedImage(e.target.files[0])
      setIsEditorOpen(true)
    }
  }

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()
      onChange(canvas.toDataURL())
      setIsEditorOpen(false)
    }
  }

  return (
    <>
      <AvatarRowContainer>
        <AvatarPreview
          onClick={() => document.getElementById("avatar-upload")?.click()}
        >
          <input
            type="file"
            id="avatar-upload"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
          {value ? (
            <>
              <img src={value} alt="头像预览" />
            </>
          ) : (
            <span style={{color: "#666"}}>无图像</span>
          )}
          <div className="overlay">上传头像</div>
        </AvatarPreview>
        <Input
          placeholder="头像"
          value={value}
          disabled
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      </AvatarRowContainer>

      <AvatarEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        editorRef={editorRef}
        uploadedImage={uploadedImage}
      />
    </>
  )
}

interface AvatarRowProps {
  value: string
  onChange: (value: string) => void
}

const AvatarPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: #d4d4d4;
  border-radius: 50%;
  overflow: hidden;
  font-size: 12px;
  white-space: nowrap;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`

const AvatarRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`
