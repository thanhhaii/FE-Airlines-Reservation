import { format } from "date-fns"
import { FindFlightResponse } from "src/models/Flight"

export interface FlightDetailComponentProps {
  keyFlight: number
  flight: FindFlightResponse
  goToSelect: (value: FindFlightResponse) => void
}

export default function FlightDetailComponent(
  props: FlightDetailComponentProps,
) {
  const { keyFlight, flight, goToSelect } = props
  const caculateTime = () => {
    var date1 = new Date(flight.flightTime)
    var date2 = new Date(flight.arrivalTime)

    var diff = date2.getTime() - date1.getTime()
    var msec = diff
    var hh = Math.floor(msec / 1000 / 60 / 60)
    msec -= hh * 1000 * 60 * 60
    var mm = Math.floor(msec / 1000 / 60)
    msec -= mm * 1000 * 60
    var ss = Math.floor(msec / 1000)
    msec -= ss * 1000
    return hh + "h:" + mm
  }

  return (
    <div className="col-12 my-2">
      <div className="d-flex justify-content-between bg-white shadow p-3 rounded align-items-center border-bottom border-primary">
        <div>{flight.airlineName}</div>
        <div className="text-center">
          <p>{format(new Date(flight.flightTime), "HH:MM")}</p>
          <h5 className="mb-0">{flight.cityGo}</h5>
        </div>
        <div className="text-center">
          <p>{caculateTime()}</p>
          <h5 className="mb-0">Time Flight</h5>
        </div>
        <div className="text-center">
          <p>{format(new Date(flight.arrivalTime), "HH:MM")}</p>
          <h5 className="mb-0">{flight.destinationCity}</h5>
        </div>
        <div>
          <button
            className="btn text-primary fs-6"
            data-bs-toggle="collapse"
            data-bs-target={`#flight${keyFlight}`}>
            View Detail
          </button>
        </div>
        <div>
          <h4 className="mb-0 text-warning">{flight.priceTicket}$</h4>
        </div>
        <div>
          <h4 className="mb-0 text-warning">
            <button
              className="btn btn-warning fw-normal fs-4 text-white"
              onClick={() => goToSelect(flight)}>
              Select
            </button>
          </h4>
        </div>
      </div>
      <div className="collapse mt-2" id={`flight${keyFlight}`}>
        <div className="card card-body"></div>
      </div>
    </div>
  )
}
