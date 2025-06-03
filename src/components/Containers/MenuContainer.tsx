import List from "@/assets/list.svg?react"
import Workbench from "@/assets/workbench.svg?react"
import Menu from "../Menu/Menu"
interface MenuContainerProps {}

const menus = [
  {
    id: "gzt",
    icon: <Workbench width={18} height={18} />,
    label: "工作台",
    url: "/dashboard",
  },
  {
    id: "work",
    icon: <List width={18} height={18} />,
    label: "劳动管理",
    children: [
      {
        id: "lb",

        label: "列表",
        url: "/dashboard/work",
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

export function MenuContainer(props: MenuContainerProps) {
  return <Menu items={menus}></Menu>
}

export default MenuContainer
