import { format } from "date-fns"
import { useEffect, useState } from "react"
import { TicketDetailAll } from "src/models/Ticket"
import apiService from "src/services/api"

export interface ModalViewDetailProps {
  ticketId: string
}

export default function ModalViewDetail(props: ModalViewDetailProps) {
  const { ticketId } = props
  const [data, setData] = useState<TicketDetailAll>()

  useEffect(() => {
    if (ticketId === "") return
    const getData = () => {
      apiService.getTicketDetailAll(ticketId).then(res => {
        setData(res)
      })
    }
    getData()
  }, [ticketId])


  return (
    <div>
      <div
        className="modal fade"
        id="modalProfile"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <h4>Contact Infomation</h4>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>First Name: {data?.firstName}</span>
                      </div>
                      <div className="col-6">
                        <span>Last Name: {data?.lastName}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>Airport Go: {data?.airportGo}</span>
                      </div>
                      <div className="col-6">
                        <span>City Go: {data?.cityGo}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>Arrival Airport: {data?.arrivalAirport}</span>
                      </div>
                      <div className="col-6">
                        <span>Arrival City: {data?.arrivalCity}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>
                          Time Flight:{" "}
                          {data?.timeFlight &&
                            format(
                              new Date(data?.timeFlight),
                              "HH:mm dd/MM/yyyy",
                            )}
                        </span>
                      </div>
                      <div className="col-6">
                        <span>
                          Arrival Time:{" "}
                          {data?.arrivalTime &&
                            format(
                              new Date(data?.arrivalTime),
                              "HH:mm dd/MM/yyyy",
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>Email: {data?.email}</span>
                      </div>
                      <div className="col-6">
                        <span>Phone: {data?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-6">
                        <span>Total Price: {data?.totalPrice}</span>
                      </div>
                      <div className="col-6">
                        <span>
                          Booking Date:{" "}
                          {data?.bookingDate &&
                            format(
                              new Date(data?.bookingDate),
                              "HH:mm dd/MM/yyyy",
                            )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4>Customer</h4>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.people.map((p, i) => (
                        <tr key={i}>
                          <td>{p.firstName}</td>
                          <td>{p.lastName}</td>
                          <td>{format(new Date(p.birthday), "dd/MM/yyyy")}</td>
                        </tr>
                      ))}
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
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
