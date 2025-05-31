import {Breadcrumb} from "@/components/Breadcrumb/Breadcrumb"
import Menu from "@/components/Menu/Menu"
import styled from "styled-components"

export function DashboardLayout() {
  return (
    <Layout>
      <Top>
        <div>left</div>
        <div>right</div>
      </Top>
      <Left>
        <h2>menu title</h2>
        <Menu
          items={[
            {
              id: "gzt",
              icon: "",
              label: "工作台",
              url: "/",
            },
            {
              id: "ldgl",
              label: "劳动管理",
              url: "/",
              children: [
                {
                  id: "lb",
                  icon: "",
                  label: "列表",
                  url: "/",
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
          ]}
        ></Menu>
      </Left>
      <ConLayout>
        <BreadcrumbWrapper>
          <Breadcrumb
            items={[
              {title: "首页", path: "/"},
              {title: "产品", path: "/products"},
              {title: "详情", path: "/products/123"},
            ]}
          />
        </BreadcrumbWrapper>
        <Con>con</Con>
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
