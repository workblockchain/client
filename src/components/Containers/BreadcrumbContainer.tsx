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
