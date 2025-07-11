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
import {ArrowVariant} from "../Icons"
export interface BreadcrumbProps {
  title: string
  path?: string
}

interface props {
  items: BreadcrumbProps[]
}

export function Breadcrumb({items}: props) {
  return (
    <BreadcrumbContainer>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1
        return (
          <BreadcrumbItem key={index}>
            {<a href={item.path}>{item.title}</a>}
            {!isLastItem && <ArrowVariant.Right width={14} height={14} />}
          </BreadcrumbItem>
        )
      })}
    </BreadcrumbContainer>
  )
}

const BreadcrumbContainer = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  gap: 4px;

  span a {
    color: currentColor;
    text-decoration: none;
    line-height: 1;
  }
`

const BreadcrumbItem = styled.span`
  display: contents;
  align-items: center;
`
