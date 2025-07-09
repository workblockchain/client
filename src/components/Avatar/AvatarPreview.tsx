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

import styled from "styled-components"

/**
 * @prop {string} avatar - 头像的 URL 或文本
 * @prop {boolean} isText - 决定显示方式，true 为文本，false 为图片
 * @prop {number} size - 图片的尺寸
 */
interface AvatarPreviewProps {
  avatar?: string
  isText?: boolean
  size?: number
}

const PreviewContainer = styled.div`
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
`

function AvatarPreview({avatar, size = 40, isText}: AvatarPreviewProps) {
  return (
    <PreviewContainer style={{width: size, height: size}}>
      {!isText &&
        (avatar ? (
          <img
            loading="lazy"
            src={avatar}
            alt="头像预览"
            style={{width: size, height: size, borderRadius: "50%"}}
          />
        ) : (
          <span style={{color: "#666"}}>暂无预览</span>
        ))}
      {isText && avatar?.slice(0, 1).toUpperCase()}
    </PreviewContainer>
  )
}

export default AvatarPreview
