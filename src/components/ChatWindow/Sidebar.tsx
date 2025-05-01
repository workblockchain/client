// Copyright (c) 2025-present WorkBlockChain Team.
//
// WorkBlockChain Client is licensed under Mulan PSL v2.
// You can use this software according to the terms
// and conditions of the Mulan PSL v2.
// You may obtain a copy of Mulan PSL v2 at:
//
//   http://license.coscl.org.cn/MulanPSL2
//
// THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS,
// WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
// MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
// See the Mulan PSL v2 for more details.
//
// === Auto generated, DO NOT EDIT ABOVE ===

import {full, HoverColor} from "@/styles/shared"
import * as css from "csstype"
import {MouseEvent, ReactNode, useRef, useState} from "react"

export function SidebarContainer(props: {
  left: boolean
  sidebarWidth?: number
  sidebarBackground?: string
  sidebarForeground?: string
  resizeWidth?: string
  resizeColor?: string
  sidebar: ReactNode
  child: ReactNode
}) {
  const [width, setWidth] = useState(props.sidebarWidth!)
  const hover = useRef(false)
  const delta = useRef(0)
  const dragging = useRef(false)
  const root = useRef<HTMLDivElement>(null)

  function computeSide(event: MouseEvent): number {
    const rect = root.current!.getBoundingClientRect()
    return props.left ? event.clientX - rect.left : rect.right - event.clientX
  }

  function mouseDown(event: MouseEvent) {
    if (hover.current) {
      delta.current = width - computeSide(event)
      dragging.current = true
    }
  }

  function mouseMove(event: MouseEvent) {
    if (dragging.current) {
      setWidth(computeSide(event) + delta.current)
    }
  }

  function mouseUp(event: MouseEvent) {
    if (dragging.current) {
      setWidth(computeSide(event) + delta.current)
      dragging.current = false
    }
  }

  const sidebarArea: css.Properties = {
    position: "absolute",
    top: 0,
    left: props.left ? 0 : "auto",
    right: props.left ? "auto" : 0,
    bottom: 0,
    width: `${width}px`,
    color: props.sidebarForeground ?? "black",
    backgroundColor: props.sidebarBackground ?? "#ffff",
  }

  const mainArea: css.Properties = {
    position: "absolute",
    top: 0,
    left: props.left ? `${width}px` : 0,
    right: props.left ? 0 : `${width}px`,
    bottom: 0,
  }

  const resizeBar: css.Properties = {
    position: "absolute",
    top: 0,
    left: props.left ? "auto" : 0,
    right: props.left ? 0 : "auto",
    width: props.resizeWidth ?? `${6.18}px`,
    bottom: 0,
    cursor: "col-resize",
    transitionProperty: "background-color",
    transitionDuration: `${265}ms`,
    transitionTimingFunction: "ease-in-out",
  }

  return (
    <div
      ref={root}
      style={full}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
    >
      <div style={sidebarArea}>
        <div style={full}>{props.sidebar}</div>
        <HoverColor
          color={props.resizeColor ?? "#0f9dda"}
          style={resizeBar}
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
        />
      </div>
      <div style={mainArea}>{props.child}</div>
    </div>
  )
}
