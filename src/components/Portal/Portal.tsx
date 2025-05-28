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

import {useEffect, useState} from "react"
import {createPortal} from "react-dom"

type PortalProps = {
  id?: string
  children: React.ReactNode
}

function getRootContainer() {
  const root = document.getElementById(PORTAL_CONTAINER_ID)
  if (!root) {
    const newRoot = document.createElement("div")
    newRoot.id = PORTAL_CONTAINER_ID
    const root =
      document.getElementById("root") ??
      document.getElementById("storybook-root")
    root?.appendChild(newRoot)
    return newRoot
  }
  return root
}

export const Portal = ({id = PORTAL_CONTAINER_ID, children}: PortalProps) => {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const rootContainer = getRootContainer()
    let container = document.getElementById(id)

    if (!container && rootContainer) {
      container = document.createElement("div")
      container.id = id
      rootContainer.appendChild(container)
    }

    setContainer(container)

    return () => {
      if (
        id !== PORTAL_CONTAINER_ID &&
        container &&
        rootContainer?.contains(container)
      ) {
        rootContainer.removeChild(container)
      }
    }
  }, [id])

  return container ? createPortal(children, container) : null
}

const PORTAL_CONTAINER_ID = "root-portal-container"
