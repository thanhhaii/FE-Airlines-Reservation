import { useCallback, useState } from "react"
import { RegisterComponent } from "src/components/pages/register"
import { UserRegister } from "src/models"
import apiService from "src/services/api"
import { BaseResult } from "src/services/api/models"

export default function RegisterPageContainer() {
  const [isLoading, setLoading] = useState<boolean>(false)
  const onHandleRegister = useCallback(
    async (value: UserRegister): Promise<BaseResult> => {
      setLoading(true)
      const resp = await apiService.register(value)
      setLoading(false)
      if (resp.status === true) {
        return resp
      } else {
        return resp
      }
    },
    [],
  )

  return (
    <RegisterComponent
      onHandleRegister={onHandleRegister}
      isLoading={isLoading}
    />
  )
}
