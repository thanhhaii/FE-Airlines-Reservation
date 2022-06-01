import { ReactNode, useEffect, useState } from "react"
import apiService from "src/services/api"
import { useAppDispatch } from "src/state/hooks"
import { userIdentify } from "src/state/userSlice"

export interface AppInitProps {
  children: ReactNode
}

export default function Bootstrap(props: AppInitProps) {
  const { children } = props
  const dispatch = useAppDispatch()
  const [appInitialized, setAppInitialized] = useState(false)

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      const token = sessionStorage.getItem("token")
      if (token) {
        const user = await apiService.currentUser()
        dispatch(userIdentify(user))
      }
    }

    const init = async () => {
      await Promise.all([getUser()])
      if (mounted) {
        setAppInitialized(true)
      }
    }

    if (!appInitialized) {
      init()
    }

    return () => {
      mounted = false
    }
  })

  if (!appInitialized) {
    return <></>
  }

  return <>{children}</>
}
