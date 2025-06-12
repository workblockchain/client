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

import Vector from "@/assets/vector.svg?react"
import styled from "styled-components"

export interface BreadcrumbProps {
  title: string
  path?: string
}

export function Breadcrumb(items: BreadcrumbProps[]) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1
        return (
          <span key={index}>
            {<a href={item.path}>{item.title}</a>}
            {!isLastItem && (
              <Separator>
                <Vector />
              </Separator>
            )}
          </span>
        )
      })}
    </BreadcrumbContainer>
  )
}

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 8px;

  span a {
    color: currentColor;
    text-decoration: none;
  }
`

const Separator = styled.div`
  color: #999;
  margin: 0px 8px;
  display: inline-block;
  transform: rotate(-90deg);
`
