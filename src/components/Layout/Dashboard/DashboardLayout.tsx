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

import Workbench from "@/assets/workbench.svg?react"
import {Breadcrumb} from "@/components/Breadcrumb/Breadcrumb"
import Menu from "@/components/Menu/Menu"
import {CellProps} from "@/components/Table/TableRow"
import {Outlet} from "react-router"
import styled from "styled-components"

const sampleCells: CellProps[][] = [
  [
    {type: "text", data: "修复首页样式问题"},
    {type: "text", data: "前端开发"},
    {type: "text", data: "张三"},
    {type: "tag", data: "已完成"},
    {type: "time", data: "2023-05-01"},
    {type: "text", data: "2小时"},
    {type: "text", data: "BUG-123"},
  ],
  [
    {type: "text", data: "优化API响应时间"},
    {type: "text", data: "后端开发"},
    {type: "text", data: "李四"},
    {type: "tag", data: "进行中"},
    {type: "time", data: "2023-05-02"},
    {type: "text", data: "4小时"},
    {type: "text", data: "TASK-456"},
  ],
]

const sampleData = [
  {
    groupName: "劳动记录组1",
    expanded: true,
    onClick: () => console.log("Group clicked"),
    cells: sampleCells,
  },
  {
    groupName: "劳动记录组1",
    expanded: true,
    onClick: () => console.log("Group clicked"),
    cells: sampleCells,
  },
]

const menus = [
  {
    id: "gzt",
    icon: <Workbench />,
    label: "工作台",
    url: "/dashboard",
  },
  {
    id: "labor",
    label: "劳动管理",
    children: [
      {
        id: "lb",
        icon: <Workbench />,
        label: "列表",
        url: "/dashboard/labor",
        onUpdate: () => {},
      },
      {
        id: "zt",
        label: "状态",
        url: "/",
      },
      {
        id: "gtt",
        label: "甘特图",
        url: "/",
        show: false,
      },
    ],
  },
  {
    id: "bdy",
    label: "表单页",
    url: "/",
  },
]

const path = [
  {title: "工作台", path: "/dashboard"},
  {title: "劳动管理", path: "/dashboard/labor"},
  {title: "表单", path: "/dashboard"},
]

export function DashboardLayout() {
  return (
    <Layout>
      <Top>
        <div>left</div>
        <div>right</div>
      </Top>
      <Left>
        <h2>menu title</h2>
        <Menu items={menus}></Menu>
      </Left>
      <ConLayout>
        <BreadcrumbWrapper>
          <Breadcrumb items={path} />
        </BreadcrumbWrapper>
        <Con>
          <Outlet />
        </Con>
      </ConLayout>
    </Layout>
  )
}

export default DashboardLayout

const Layout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 70px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Top Top"
    "Left Con";
  height: 100vh;
`

const Top = styled.div`
  grid-area: Top;
  background-color: #FFF
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center
`

const Left = styled.div`
  grid-area: Left;
  border: 1px solid;
  box-sizing: border-box;
`

const ConLayout = styled.div`
  grid-area: Con;
  border: 1px solid;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 70px 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Breadcrumb Breadcrumb"
    "Con Con";
`

const BreadcrumbWrapper = styled.div`
  grid-area: Breadcrumb;
`

const Con = styled.div`
  grid-area: Con;
`
