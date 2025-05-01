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
import {ReactNode} from "react"

export function SidebarContainer(props: {
  left: boolean
  sidebarWidth?: string
  sidebarBackground?: string
  sidebarForeground?: string
  resizeWidth?: string
  resizeColor?: string
  sidebar: ReactNode
  child: ReactNode
}) {
  const sidebarArea: css.Properties = {
    position: "absolute",
    top: 0,
    left: props.left ? 0 : "auto",
    right: props.left ? "auto" : 0,
    bottom: 0,
    width: props.sidebarWidth,
    color: props.sidebarForeground ?? "black",
    backgroundColor: props.sidebarBackground ?? "#ffff",
  }

  const mainArea: css.Properties = {
    position: "absolute",
    top: 0,
    left: props.left ? props.sidebarWidth : 0,
    right: props.left ? 0 : props.sidebarWidth,
    bottom: 0,
  }

  const resizeHoverColor = props.resizeColor ?? "#0f9dda"
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
    <div style={full}>
      <div style={sidebarArea}>
        <div style={full}>{props.sidebar}</div>
        <HoverColor color={resizeHoverColor} style={resizeBar}></HoverColor>
      </div>
      <div style={mainArea}>{props.child}</div>
    </div>
  )
}
