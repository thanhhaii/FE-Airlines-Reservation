import { ReactNode } from "react"
import { HeaderComponent } from "./Header"

export interface MainLayoutProps {
  children?: ReactNode
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props

  return (
    <>
      <HeaderComponent />
      <div className="wrapper">{children}</div>
    </>
  )
}
