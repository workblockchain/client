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

import Logo from "@/assets/logo.svg?react"
import BreadcrumbContainer from "@/components/Containers/BreadcrumbContainer"
import MenuContainer from "@/components/Containers/MenuContainer"
import {Outlet} from "react-router"
import styled from "styled-components"
export function DashboardLayout() {
  return (
    <Layout>
      <Top>
        <Bar>
          <LogoName>
            <Logo width={24} height={24} color="#EE7D25" />
            劳动链
          </LogoName>
          <Navbar>
            {/* <span>你的工作</span>
            <span>项目</span>
            <span>人员</span>
            <span>创建</span> */}
          </Navbar>
        </Bar>
        {/* <div>搜索</div> */}
      </Top>
      <Left>
        {/* <h2>劳动链</h2> */}
        <MenuContainer />
      </Left>
      <ConLayout>
        <BreadcrumbWrapper>
          <BreadcrumbContainer />
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
  grid-template-rows: 55px 1fr;
  gap: 0px 0px;

  background-color: #fff;
  grid-template-areas:
    "Top Top"
    "Left Con";
  height: 100vh;
`

const Top = styled.div`
  grid-area: Top;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`

const Left = styled.div`
  grid-area: Left;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 8px;
`

const ConLayout = styled.div`
  grid-area: Con;
  box-sizing: border-box;
  padding: 16px 24px;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 25px 1fr;
  gap: 0px 0px;
  background-color: #f2f4f7;
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

const LogoName = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 24px;
`

const Navbar = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 24px;
`

const Bar = styled.div`
  display: flex;
`
