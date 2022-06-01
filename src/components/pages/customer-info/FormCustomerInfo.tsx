import { Field, FieldArrayRenderProps } from "formik"
import { FlightSelectedState } from "src/state/models"

export interface FormCustomerInfoComponentProps extends FieldArrayRenderProps {
  flightSelected: FlightSelectedState
  person: string
}

export default function FormCustomerInfoComponent(
  props: FormCustomerInfoComponentProps,
) {
  const { flightSelected, name, person } = props
  const total =
    person === "Adults"
      ? flightSelected.adults
      : person === "Children"
      ? flightSelected.children
      : flightSelected.baby
  const array: number[] = []
  const priceTicket =
    person === "Adults"
      ? flightSelected.ticketPrice
      : person === "Children"
      ? (flightSelected.ticketPrice * (80 / 100)).toFixed(2)
      : 15
  for (let i = 0; i < total; i++) {
    array.push(i)
  }
  return (
    <>
      {array.map(i => {
        return (
          <div className="card px-0 shadow mb-4" key={i}>
            <div className="card-header d-flex justify-content-between">
              <span>{person + " " + i + 1}</span>
              <span className="text-danger">
                Price: {parseInt(priceTicket.toString()).toFixed(0)}$
              </span>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 mb-4">
                  <label>First Name</label>
                  <Field
                    className="form-control"
                    type="text"
                    name={`${name}.${i}.firstName`}
                  />
                </div>
                <div className="col-6 mb-4">
                  <label>Last Name</label>
                  <Field
                    className="form-control"
                    type="text"
                    name={`${name}.${i}.lastName`}
                  />
                </div>
                <div className="col-6 mb-4">
                  <label>Birthday</label>
                  <Field
                    className="form-control"
                    type="date"
                    name={`${name}.${i}.birthday`}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
