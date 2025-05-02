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

import {useEffect} from "react"
import {createPortal} from "react-dom"
import styled from "styled-components"

type PortalProps = {
  id?: string
  children: React.ReactNode
}

export const Portal = ({id = PORTAL_CONTAINER_ID, children}: PortalProps) => {
  useEffect(() => {
    const rootContainer = document.getElementById(PORTAL_CONTAINER_ID)
    let container = document.getElementById(id)

    if (import.meta.env.DEV && !rootContainer) {
      console.error(
        `Portal根容器未找到。\n` +
          `请确保在应用根组件中包含 <PortalContainers/> 组件`
      )
      return
    }

    if (!container && rootContainer) {
      container = document.createElement("div")
      container.id = id
      rootContainer.appendChild(container)
    }

    return () => {
      if (container && rootContainer?.contains(container)) {
        rootContainer.removeChild(container)
      }
    }
  }, [id])

  const container = document.getElementById(id)
  return container ? createPortal(children, container) : null
}

const PORTAL_CONTAINER_ID = "root-portal-container"
export const PortalContainers = () => {
  return <Container id={PORTAL_CONTAINER_ID} />
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`
