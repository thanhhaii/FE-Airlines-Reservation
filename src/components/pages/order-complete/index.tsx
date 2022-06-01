import { format } from "date-fns"
import Step from "src/components/common/Step"
import { OrderComplete } from "src/models/Ticket"

export interface OrderCompleteComponentProps {
  data: OrderComplete
}

export default function OrderCompleteComponent(
  props: OrderCompleteComponentProps,
) {
  const { data } = props
  const caculateTime = () => {
    var date1 = new Date(data.timeFlight)
    var date2 = new Date(data.arrivalTime)

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
    <div className="container mt-5 pt-5">
      <Step />
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center p-5 flex-column">
          <h1>ORDER DETAILS</h1>
          <p className="fs-5">Your order details</p>
        </div>
        <div className="col-12 fs-5">
          <h4 className="border-bottom border-warning pb-2 d-inline-block">
            General Information
          </h4>
          <p>Code orders: &nbsp;{(Math.random() * 100000).toFixed(0)}</p>
          <p>
            Status: <span className="text-success">Paid</span>
          </p>
          <p>Transaction time: {format(new Date(), "dd/MM/yyyy HH:mm a")}</p>
          <p>Payment method: online payment</p>
        </div>
        <div className="col-12 fs-5">
          <h4 className="border-bottom border-warning pb-2 d-inline-block">
            Flight Information
          </h4>
          <table className="table table-bordered">
            <thead className="text-center">
              <th className="p-3">Flight</th>
              <th className="p-3">Airport Go</th>
              <th className="p-3">Time Flight</th>
              <th className="p-3">Arrival Airport</th>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>
                  <p>{data.airlineName}</p>
                  <p>{data.planeName}</p>
                </td>
                <td>
                  <p>{data.airportGo}</p>
                  <p>{format(new Date(data.timeFlight), "HH:mm dd/MM/yyyy")}</p>
                </td>
                <td>
                  <p>{caculateTime()}</p>
                </td>
                <td>
                  <p>{data.arrivalAirport}</p>
                  <p>
                    {format(new Date(data.arrivalTime), "HH:mm dd/MM/yyyy")}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
