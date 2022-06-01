import { format } from "date-fns"
import { Field, Form, Formik, FieldArray } from "formik"
import { useCallback } from "react"
import Step from "src/components/common/Step"
import { User } from "src/models"
import { FindFlightResponse } from "src/models/Flight"
import { TicketCreate, Tickets } from "src/models/Ticket"
import { FlightSelectedState } from "src/state/models"
import FormCustomerInfoComponent from "./FormCustomerInfo"

export interface CustomerInformationProsp {
  flightSelected: FlightSelectedState
  flightDetail: FindFlightResponse
  user: User
  createTicket: (value: Tickets) => Promise<void>
}

const initialValue = (flightSelected: FlightSelectedState, user: User) => {
  let totalPrice =
    flightSelected.adults * flightSelected.ticketPrice +
    flightSelected.children * 0.8 * flightSelected.ticketPrice +
    flightSelected.baby * 15
  return {
    flightId: flightSelected.flightId,
    userId: user.id,
    ticketType: flightSelected.ticketType,
    note: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    totalTicket:
      flightSelected.children + flightSelected.adults + flightSelected.baby,
    totalPrice: parseInt(totalPrice.toFixed(2)),
    email: "",
    paymentMethod: "",
    adults: [],
    children: [],
    baby: [],
  } as TicketCreate
}

export default function CustomerInformationComponent(
  props: CustomerInformationProsp,
) {
  const { flightSelected, user, createTicket, flightDetail } = props
  const ticketType = () => {
    switch (flightSelected.ticketType) {
      case 1:
        return "First Class"
      case 2:
        return "Business Class"
      case 3:
        return "Premium Economy Class"
      case 4:
        return "Economy Class"
    }
  }
  const onSubmit = useCallback(
    (value: TicketCreate) => {
      value.adults?.map(
        (child, i) => (child.ticketPrice = flightSelected.ticketPrice),
      )
      value.baby?.map((child, i) => (child.ticketPrice = 15))
      value.children?.map(
        (child, i) =>
          (child.ticketPrice = parseInt(
            (flightSelected.ticketPrice * (80 / 100)).toFixed(2),
          )),
      )
      const ticket: Tickets = {
        customerInfos: value.adults.concat(value.children, value.baby),
        flightId: value.flightId,
        userId: value.userId,
        ticketType: value.ticketType,
        note: value.note,
        firstName: value.firstName,
        lastName: value.lastName,
        phoneNumber: value.phoneNumber.toString(),
        totalTicket: value.totalTicket,
        totalPrice: value.totalPrice,
        email: value.email,
        paymentMethod: value.paymentMethod,
      }
      console.log(ticket)
      createTicket(ticket)
    },
    [createTicket, flightSelected.ticketPrice],
  )

  return (
    <div className="container mt-5 pt-5">
      <Step />
      <hr />
      <Formik
        initialValues={initialValue(flightSelected, user)}
        onSubmit={onSubmit}>
        {formik => {
          return (
            <Form>
              <div className="row">
                <h4>Contact Info</h4>
                <div className="col-8">
                  <div className="row">
                    <div className="bg-white card shadow p-0">
                      <div className="card-header fs-5 d-flex justify-content-between">
                        <span>Contact Info</span>
                        <span className="text-danger">
                          Total price: {formik.values.totalPrice}$
                        </span>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6 mb-4">
                            <label>First Name</label>
                            <Field
                              name="firstName"
                              className="form-control"
                              type="text"
                            />
                          </div>
                          <div className="col-6 mb-4">
                            <label>Last Name</label>
                            <Field
                              name="lastName"
                              className="form-control"
                              type="text"
                            />
                          </div>
                          <div className="col-6 mb-4">
                            <label>Email</label>
                            <Field
                              name="email"
                              className="form-control"
                              type="email"
                            />
                          </div>
                          <div className="col-6 mb-4">
                            <label>Phone Number</label>
                            <Field
                              name="phoneNumber"
                              className="form-control"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="my-3">Passenger information</h4>
                    <FieldArray
                      name="adults"
                      render={props => (
                        <FormCustomerInfoComponent
                          flightSelected={flightSelected}
                          person="Adults"
                          {...props}
                        />
                      )}
                    />
                    <FieldArray
                      name="children"
                      render={props => (
                        <FormCustomerInfoComponent
                          flightSelected={flightSelected}
                          person="Children"
                          {...props}
                        />
                      )}
                    />
                    <FieldArray
                      name="baby"
                      render={props => (
                        <FormCustomerInfoComponent
                          flightSelected={flightSelected}
                          person="Baby"
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className="col mb-4 text-end">
                    <button
                      className="btn btn-primary shadow text-white w-25"
                      type="submit">
                      Submit
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className="bg-white rounded shadow p-3 fs-6">
                    <p className="text-center">Flight Detail</p>
                    <hr />
                    <p>
                      Start: {flightDetail.airportGo} - {flightDetail.cityGo}
                    </p>
                    <p>
                      End: {flightDetail.destinationAirport} -{" "}
                      {flightDetail.destinationCity}
                    </p>
                    <p>
                      Time:&nbsp;
                      {format(
                        new Date(flightDetail.flightTime),
                        "HH:MM a - dd/MM/yyyy",
                      )}
                    </p>
                    <p>
                      Arrival Time:{" "}
                      {format(
                        new Date(flightDetail.arrivalTime),
                        "HH:MM a - dd/MM/yyyy",
                      )}
                    </p>
                    <p>Airline: {flightDetail.airlineName}</p>
                    <p>Ticket Class: {ticketType()}</p>
                  </div>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
