import { format } from "date-fns"
import { useState } from "react"
import { Airport } from "src/models/Airport"
import { FindFlightResponse, FlightCreate } from "src/models/Flight"
import { PlaneSelected } from "src/models/Plane"
import CreateFlightModal from "./CreateFlightModal"
import DetailFlightModal from "./DetailFlightModal"

export interface ManageFlightComponentProps {
  plane: PlaneSelected[] | undefined
  airport: Airport[] | undefined
  flights: FindFlightResponse[] | undefined
  totalPages: number[]
  createFlight: (value: FlightCreate) => Promise<boolean>
  changePage: (value: number) => void
}

export default function ManageFlightComponent(
  props: ManageFlightComponentProps,
) {
  const { plane, airport, flights, createFlight } = props
  const [flightDetail, setFlightDetail] = useState<FindFlightResponse>()
  return (
    <>
      <DetailFlightModal flightDetail={flightDetail} />
      <CreateFlightModal
        plane={plane}
        airport={airport}
        createFlight={createFlight}
      />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12">
            <div className="bg-white shadow p-3 rounded">
              <button
                className="btn btn-primary text-white fw-normal"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                Create New Flight
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="bg-white shadow p-3 rounded">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Airline</th>
                    <th scope="col">Plane Name</th>
                    <th scope="col">Infomation Go</th>
                    <th scope="col">Infomation To</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {flights?.map((flight, i) => {
                    return (
                      <tr key={i}>
                        <td>{flight.airlineName}</td>
                        <td>{flight.planeName}</td>
                        <td>
                          <p className="mb-0">
                            {flight.airportGo} - {flight.cityGo}
                          </p>
                          <p className="mb-0">
                            {format(new Date(flight.flightTime), "HH:mm a")} -
                            {format(new Date(flight.flightTime), "dd/MM/yyyy")}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0">
                            {flight.destinationAirport} -{" "}
                            {flight.destinationCity}
                          </p>
                          <p className="mb-0">
                            {format(new Date(flight.arrivalTime), "HH:mm a")} -
                            {format(new Date(flight.arrivalTime), "dd/MM/yyyy")}
                          </p>
                        </td>
                        <td>
                          <button
                            className="p-0 btn btn-transparent shadow-none"
                            title="View detail"
                            data-bs-toggle="modal"
                            data-bs-target="#detailFligh"
                            onClick={() => setFlightDetail(flight)}>
                            <i
                              className="fa fa-info-circle"
                              aria-hidden="true"
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
