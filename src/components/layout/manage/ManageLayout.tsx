import { ReactNode } from "react"
import HeaderManage from "./ManageHeader"
import SideBarManage from "./ManageSidebar"

export interface ManageLayoutProps {
  children?: ReactNode
}

export function ManageLayout(props: ManageLayoutProps) {
  const { children } = props

  return (
    <div className="wrapper-manage">
      <SideBarManage />
      <div className="container-fluid">
        <HeaderManage />
        <div>{children}</div>
      </div>
    </div>
  )
}
