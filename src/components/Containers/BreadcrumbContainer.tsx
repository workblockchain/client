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

import {useLocation} from "react-router"
import {paths} from "../../router"
import {Breadcrumb} from "../Breadcrumb/Breadcrumb"

const breadcrumbMap: Record<string, string> = {
  [paths.home]: "首页",
  [paths.config]: "设置",
  [paths.profile]: "个人资料",
  [paths.records]: "记录",
  [paths.dashboard]: "工作台",
  [`${paths.dashboard}/work`]: "劳动管理",
  [`${paths.dashboard}/form`]: "表单",
}

export function BreadcrumbContainer() {
  const location = useLocation()
  const pathSegments = location.pathname.split("/").filter(Boolean)

  // 始终包含首页
  const items = [{title: "首页", path: paths.home}]

  // 添加当前路径的面包屑项
  pathSegments.forEach((segment, index) => {
    const path = `${pathSegments.slice(0, index + 1).join("/")}`
    // 优先匹配完整路径，再匹配最后一段
    const title = breadcrumbMap[path] || breadcrumbMap[`${segment}`] || segment
    items.push({title, path})
  })

  return <Breadcrumb items={items} />
}

export default BreadcrumbContainer
