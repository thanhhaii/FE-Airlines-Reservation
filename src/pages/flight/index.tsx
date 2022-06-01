import { useHistory, useLocation } from "react-router-dom"
import FlightComponent from "src/components/pages/flight"
import queryString from "query-string"
import useSWR from "swr"
import apiService from "src/services/api"
import { FindFlightRequest, FindFlightResponse } from "src/models/Flight"
import { useAppDispatch, useUser } from "src/state/hooks"
import { setFlightSelected } from "src/state/flightSelected"

export default function FlightContainer() {
  const { search } = useLocation()
  const history = useHistory()
  const user = useUser()
  const dispatch = useAppDispatch()
  const {
    flyingFrom,
    flyingTo,
    departing,
    returning,
    adults,
    children,
    baby,
    ticketType,
  } = queryString.parse(search)
  const { data } = useSWR(
    `/Flight?FlyingFrom=${flyingFrom}&FlyingTo=${flyingTo}&Departing=${departing}&Returning=${returning}&Adults=${adults}&Children=${children}&Baby=${baby}&TicketType=${ticketType}`,
    () =>
      apiService.findFligt({
        flyingFrom: flyingFrom ? parseInt(flyingFrom.toString()) : 0,
        flyingTo: flyingTo ? parseInt(flyingTo.toString()) : 0,
        adults: adults ? parseInt(adults.toString()) : 0,
        baby: baby ? parseInt(baby.toString()) : 0,
        children: children ? parseInt(children.toString()) : 0,
        ticketType: ticketType ? parseInt(ticketType.toString()) : 0,
        departing: departing ? departing.toString() : new Date(),
        returning: returning ? returning.toString() : "",
      } as FindFlightRequest),
  )

  const goToSelect = (value: FindFlightResponse) => {
    dispatch(
      setFlightSelected({
        flightId: value.flightId,
        adults: adults ? parseInt(adults.toString()) : 0,
        baby: baby ? parseInt(baby.toString()) : 0,
        children: children ? parseInt(children.toString()) : 0,
        ticketType: ticketType ? parseInt(ticketType.toString()) : 0,
        ticketPrice: value.priceTicket ? value.priceTicket : 0,
      }),
    )
    if (!user) {
      history.push({
        pathname: "/login",
      })
    } else {
      history.push({
        pathname: "/customer-information",
        search: `?flight-id=${value.flightId}&adults=${adults}&children=${children}&children=${baby}&ticketType=${ticketType}`,
      })
    }
  }

  return <FlightComponent flights={data?.items} goToSelect={goToSelect} />
}
