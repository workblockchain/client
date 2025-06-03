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

import {Breadcrumb} from "../Breadcrumb/Breadcrumb"
interface BreadcrumbContainerProps {}

const path = [
  {title: "工作台", path: "/dashboard"},
  {title: "劳动管理", path: "/dashboard/labor"},
  {title: "表单", path: "/dashboard"},
]

export function BreadcrumbContainer(props: BreadcrumbContainerProps) {
  return <Breadcrumb items={path} />
}

export default BreadcrumbContainer
