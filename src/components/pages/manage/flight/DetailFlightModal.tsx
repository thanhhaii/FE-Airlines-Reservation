import { format } from "date-fns/esm"
import { useEffect, useState } from "react"
import { FindFlightResponse, FlightDetailAll } from "src/models/Flight"
import apiService from "src/services/api"

export interface DetailFlightModalProps {
  flightDetail: FindFlightResponse | undefined
}

export default function DetailFlightModal(props: DetailFlightModalProps) {
  const { flightDetail } = props
  const [data, setData] = useState<FlightDetailAll>()

  useEffect(() => {
    if (flightDetail === undefined) return
    const getFlight = async () => {
      const resp = await apiService.getFlightDetailAll(flightDetail.flightId)
      setData(resp)
    }
    getFlight()
  }, [flightDetail])

  return (
    <>
      <div
        className="modal fade"
        id="detailFligh"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Flight Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row fs-5">
                <div className="d-flex">
                  <div className="col-6">
                    <p>
                      Airline:{" "}
                      <span className="fw-bold">{data?.airlineName}</span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      Plane Name:{" "}
                      <span className="fw-bold">{data?.planeName}</span>
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-6">
                    <p>
                      City Go: <span className="fw-bold">{data?.cityGo}</span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      Destination:{" "}
                      <span className="fw-bold">{data?.destinationCity}</span>
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-6">
                    <p>
                      Flight Time:{" "}
                      <span className="fw-bold">
                        {data !== undefined &&
                          format(
                            new Date(data.flightTime),
                            "HH:mm a - dd/MM/yyyy",
                          )}
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      Airport Go:{" "}
                      <span className="fw-bold">{data?.airportGo}</span>
                    </p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-6">
                    <p>
                      Arrival Time:{" "}
                      <span className="fw-bold">
                        {data !== undefined &&
                          format(
                            new Date(data.arrivalTime),
                            "HH:mm a - dd/MM/yyyy",
                          )}
                      </span>
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      Arrival Airport:{" "}
                      <span className="fw-bold">
                        {data?.destinationAirport}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="col-12">
                  <p>
                    Price Net:
                    <span className="fw-bold">{data?.priceNet}</span>
                  </p>
                </div>
                <div className="div">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Ticket Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remaining tickets</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Ticket First Class</td>
                        <td>{data?.priceTicketFirstClass}</td>
                        <td className="text-center">
                          {data?.restTicketFirstClass}
                        </td>
                      </tr>
                      <tr>
                        <td>Ticket Business Class</td>
                        <td>{data?.priceTicketBusinessClass}</td>
                        <td className="text-center">
                          {data?.restTicketBusinessClass}
                        </td>
                      </tr>
                      <tr>
                        <td>Ticket Premium Economy Class</td>
                        <td>{data?.pricePremiumEconomyClass}</td>
                        <td className="text-center">
                          {data?.restTicketPremiumEconomyClass}
                        </td>
                      </tr>
                      <tr>
                        <td>Ticket Economy Class</td>
                        <td>{data?.priceEconomyClass}</td>
                        <td className="text-center">
                          {data?.restTicketEconomyClass}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
