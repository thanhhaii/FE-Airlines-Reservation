import { useCallback } from "react"
import { LoginComponent } from "src/components/pages/login"
import { LoginRequest } from "src/services/api/models"
import apiService from "src/services/api"
import { useHistory } from "react-router"
import { useAppDispatch, useAppSelector } from "src/state/hooks"
import { userIdentify } from "src/state/userSlice"
import { getFlightSelected } from "src/state/flightSelected"

export default function LoginPageContainer() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const flightSelected = useAppSelector(getFlightSelected)
  const onHandleLogin = useCallback(
    async (value: LoginRequest): Promise<void> => {
      const resp = await apiService.login(value)
      if (resp) {
        const currentUser = await apiService.currentUser()
        dispatch(userIdentify(currentUser))
        if (flightSelected !== null) {
          history.push({
            pathname: "/customer-information",
            search: `?flight-id=${flightSelected.flightId}&adults=${flightSelected.adults}&children=${flightSelected.children}&children=${flightSelected.baby}&ticketType=${flightSelected.ticketType}`,
          })
        } else {
          history.push({ pathname: "/" })
        }
      }
    },
    [dispatch, flightSelected, history],
  )

  return <LoginComponent onSubmitLogin={onHandleLogin} />
}
