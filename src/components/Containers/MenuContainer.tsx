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

import {RouteMeta, routers} from "@/router"
import {createElement} from "react"
import {RouteObject, useMatches} from "react-router"
import Menu, {MenuItem} from "../Menu/Menu"

function getMenuFromRouter(routers: RouteObject[], basePath = ""): MenuItem[] {
  const menuItems: MenuItem[] = []

  const normalizePath = (base: string, path: string): string => {
    if (!path) return base || "/"
    const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base
    const normalizedPath = path.startsWith("/") ? path : `/${path}`
    return normalizedBase + normalizedPath
  }

  const hasValidChildren = (children?: RouteObject[]): boolean => {
    return Array.isArray(children) && children.length > 0
  }

  const processChildren = (
    children: RouteObject[],
    currentPath: string
  ): MenuItem[] => {
    return hasValidChildren(children)
      ? getMenuFromRouter(children, currentPath)
      : []
  }

  routers.forEach((router) => {
    if (!router.path) return

    const currentPath = normalizePath(basePath, router.path)
    const handle = router.handle as RouteMeta | undefined

    if (handle?.showInMenu) {
      const menuItem: MenuItem = {
        id: currentPath,
        url: currentPath,
        label: handle.label || currentPath,
        icon: handle.icon
          ? createElement(handle.icon, {width: 24, height: 24})
          : undefined,
        children: processChildren(router.children || [], currentPath),
      }
      menuItems.push(menuItem)
    } else {
      const childItems = processChildren(router.children || [], basePath)
      menuItems.push(...childItems)
    }
  })

  return menuItems
}

export function MenuContainer() {
  const menuData: MenuItem[] = getMenuFromRouter(routers)
  const matches = useMatches()

  return (
    <Menu
      items={menuData}
      initialSelectedId={matches[matches.length - 1].pathname}
    ></Menu>
  )
}

export default MenuContainer
