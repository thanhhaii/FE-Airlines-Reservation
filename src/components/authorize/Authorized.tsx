import { ReactNode, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useAppSelector, useUser } from "src/state/hooks"
import { isAdmin } from "src/state/userSlice"

export interface AuthorizedProps {
  redirect?: string
  children: ReactNode
  isAcceptAdmin?: true
}

export function Authorized(props: AuthorizedProps) {
  const { redirect, children, isAcceptAdmin } = props
  const user = useUser()
  const history = useHistory()
  const isAdminRole = useAppSelector(isAdmin)

  useEffect(() => {
    if (!user) {
      history.push({
        pathname: redirect ? redirect : "/",
      })
    }
    if (isAcceptAdmin && isAdminRole) {
      history.push({
        pathname: redirect ? redirect : "/",
      })
    }
  }, [history, isAcceptAdmin, isAdminRole, redirect, user])

  if (!user) {
    return <></>
  }

  return <>{children}</>
}
