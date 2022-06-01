import { useCallback, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import CustomerInformationComponent from "src/components/pages/customer-info/index"
import { FindFlightResponse } from "src/models/Flight"
import { Tickets } from "src/models/Ticket"
import apiService from "src/services/api"
import { getFlightSelected } from "src/state/flightSelected"
import { useAppSelector, useUser } from "src/state/hooks"

export default function CustomerInformationContainer() {
  const flightSelected = useAppSelector(getFlightSelected)
  const user = useUser()
  const history = useHistory()
  const [flightDetail, setFligtDetail] = useState<FindFlightResponse>()
  useEffect(() => {
    if (flightSelected === null) return
    const getFligt = async () => {
      const resp = await apiService.getFlightDetailAll(flightSelected.flightId)
      setFligtDetail(resp)
    }
    getFligt()
  }, [flightSelected])

  const createTicket = useCallback(
    async (value: Tickets): Promise<void> => {
      const resp = await apiService.createTicket(value)
      if (resp.status === 201) {
        history.push({
          pathname: "/order-complete",
          search: `?ticketId=${resp.data}`
        })
      }
    },
    [history],
  )
  if (flightSelected === null || user === null || flightDetail == null) {
    return <></>
  }

  return (
    <CustomerInformationComponent
      flightSelected={flightSelected}
      user={user}
      createTicket={createTicket}
      flightDetail={flightDetail}
    />
  )
}
