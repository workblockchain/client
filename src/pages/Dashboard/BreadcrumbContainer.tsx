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

import {t} from "i18next"
import {useLocation} from "react-router"
import {
  Breadcrumb,
  BreadcrumbProps,
} from "../../components/Breadcrumb/Breadcrumb"
import {paths} from "../../router"

const routeTitles: Record<string, string> = {
  [paths.home]: t`breadcrumb.home`,
  [paths.config]: t`breadcrumb.config`,
  [paths.profile]: t`breadcrumb.profile`,
  [paths.records]: t`breadcrumb.records`,
  [paths.dashboard]: t`breadcrumb.dashboard`,
  work: t`breadcrumb.work`,
  kanban: t`breadcrumb.kanban`,
  requirements: t`breadcrumb.requirements`,
  projects: t`breadcrumb.projects`,
}

export function BreadcrumbContainer() {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(Boolean)

  const path: BreadcrumbProps[] = pathSegments.reduce((acc, segment, index) => {
    const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`
    const title = routeTitles[segment] || segment

    return [
      ...acc,
      {
        title,
        path: fullPath,
      },
    ]
  }, [] as BreadcrumbProps[])

  // 添加首页
  if (path.length === 0 || path[0].path !== "/") {
    path.unshift({
      title: routeTitles[paths.home],
      path: "/",
    })
  }

  return <Breadcrumb items={path} />
}

export default BreadcrumbContainer
