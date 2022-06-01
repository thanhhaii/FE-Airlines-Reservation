import { useLocation } from "react-router-dom"
import OrderCompleteComponent from "src/components/pages/order-complete"
import queryString from "query-string"
import apiService from "src/services/api"
import { useEffect, useState } from "react"
import { OrderComplete } from "src/models/Ticket"

export default function OrderCompleteContainer() {
  const { search } = useLocation()
  const { ticketId } = queryString.parse(search)
  const [data, setData] = useState<OrderComplete>()

  useEffect(() => {
    if (ticketId === null) return
    const getTicketComplete = async () => {
      const resp = await apiService.getFlightByTicket(ticketId.toString())
      setData(resp)
    }
    getTicketComplete()
  }, [ticketId])

  if (!data) {
    return <></>
  }

  return <OrderCompleteComponent data={data} />
}
