import { format } from "date-fns"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCallback, useMemo } from "react"
import { Airport } from "src/models/Airport"
import { FlightCreate } from "src/models/Flight"
import { PlaneSelected } from "src/models/Plane"
import * as yup from "yup"

export interface CreateFlightModalProps {
  plane: PlaneSelected[] | undefined
  airport: Airport[] | undefined
  createFlight: (value: FlightCreate) => Promise<boolean>
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    priceNet: yup.number().required(),
    flightTime: yup.date().required(),
  })

export default function CreateFlightModal(props: CreateFlightModalProps) {
  const { plane, airport, createFlight } = props
  const validationSchema = useMemo(() => {
    validation()
  }, [])
  const onSubmit = useCallback(
    (value: FlightCreate, { resetForm }) => {
      const elClose = document.querySelector(
        "#closeCreateFlight",
      ) as HTMLButtonElement
      createFlight(value).then(res => {
        if (res) {
          resetForm()
          elClose.click()
        }
      })
    },
    [createFlight],
  )

  const initialValue = {
    planeId: plane ? plane[0].planeId : 0,
    flightTime: "",
    arrivalTime: "",
    airportGo: 1,
    destinationAirport: 2,
    priceNet: 0,
  } as FlightCreate

  if (plane === undefined) {
    return <></>
  }

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {formik => {
              return (
                <Form>
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Add New Flight
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Plane</label>
                          <Field
                            type="number"
                            className="form-control"
                            component="select">
                            {plane?.map((plane, i) => (
                              <option value={plane.planeId} key={i}>
                                {plane.planeName} - {plane.airlineName}
                              </option>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Price Net</label>
                          <Field
                            type="number"
                            className="form-control"
                            name="priceNet"
                            min={0}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Flight Time</label>
                          <Field
                            type="datetime-local"
                            className="form-control"
                            name="flightTime"
                            format="yyyy-MM-ddTHH:mm"
                            min={format(new Date(), "yyyy-MM-ddTHH:mm")}
                          />
                          <small className="position-absolute text-danger">
                            <ErrorMessage name="flightTime" />
                          </small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Arrival Time</label>
                          <Field
                            type="datetime-local"
                            className="form-control"
                            name="arrivalTime"
                            format="yyyy-MM-ddTHH:mm"
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Airport Go</label>
                          <Field
                            component="select"
                            className="form-control"
                            name="airportGo">
                            {airport?.map((airport, i) => {
                              return (
                                <option key={i} value={airport.airportId}>
                                  {airport.airportName} - {airport.cityName}
                                </option>
                              )
                            })}
                          </Field>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="mb-4">
                          <label>Destination Airport</label>
                          <Field
                            component="select"
                            className="form-control"
                            name="destinationAirport">
                            {airport?.map((airport, i) => {
                              return (
                                <option key={i} value={airport.airportId}>
                                  {airport.airportName} - {airport.cityName}
                                </option>
                              )
                            })}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="closeCreateFlight"
                      data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Flight
                    </button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}
