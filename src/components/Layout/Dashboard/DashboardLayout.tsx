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
        <Menu></Menu>
      </Left>
      <Con>con </Con>
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

const Con = styled.div`
  grid-area: Con;
  border: 1px solid;
  box-sizing: border-box;
`
