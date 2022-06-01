import { Field, Form, Formik } from "formik"
import { useCallback, useMemo } from "react"
import { Airport } from "src/models/Airport"
import { FindFlight } from "src/models/Flight"
import { format } from "date-fns"
import { useHistory } from "react-router-dom"
import { validation } from "./validation"

export interface HomeComponentProps {
  airports: Airport[] | undefined
}

const initialValues = {
  typeFlight: "oneWay",
  flyingForm: 1,
  flyingTo: 2,
  departing: format(new Date(), "yyyy-MM-dd"),
  returning: "",
  adults: 1,
  children: 0,
  baby: 0,
  ticketClass: 1,
} as FindFlight

export function HomeComponent(props: HomeComponentProps) {
  const { airports } = props
  const history = useHistory()
  const validationSchema = useMemo(() => validation, [])
  const onSubmit = useCallback(
    (value: FindFlight) => {
      history.push({
        pathname: "/flight",
        search: `?flyingFrom=${value.flyingForm}&flyingTo=${value.flyingTo}&departing=${value.departing}&returning=${value.returning}&adults=${value.adults}&children=${value.children}&baby=${value.baby}&ticketType=${value.ticketClass}`,
      })
    },
    [history],
  )

  return (
    <section className="homePage h-100">
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-between">
          <div className="col-xxl-4">
            <div className="row text-white">
              <h2 className="text-uppercase title">book your flight today</h2>
              <p className="fs-5">
                Find and book promotional flight tickets & cheap tickets in 3
                easy steps!
              </p>
              <p className="fs-5">
                Discover now the best deals for you at{" "}
                <span className="fw-bold">Tr.vl+!</span>
              </p>
            </div>
          </div>
          <div className="col-xxl-7">
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}>
              {formik => {
                return (
                  <Form className="shadow p-3 mb-5 bg-body rounded">
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            component="select"
                            className="form-control"
                            id="floatingInput"
                            name="flyingForm">
                            {airports?.map((airport, i) => {
                              return (
                                <option key={i} value={airport.airportId}>
                                  {airport.airportName} - {airport.cityName}
                                </option>
                              )
                            })}
                          </Field>
                          <label htmlFor="floatingInput text-uppercase">
                            FLYING FROM
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            component="select"
                            className="form-control"
                            id="floatingInput"
                            name="flyingTo">
                            {airports
                              ?.filter(
                                a => a.airportId !== formik.values.flyingForm,
                              )
                              .map((airport, i) => {
                                return (
                                  <option key={i} value={airport.airportId}>
                                    {airport.airportName} - {airport.cityName}
                                  </option>
                                )
                              })}
                          </Field>
                          <label htmlFor="floatingInput text-uppercase">
                            FLYING TO
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="date"
                            className="form-control"
                            id="floatingInput"
                            name="departing"
                            format="yyyy-MM-dd"
                          />
                          <label htmlFor="floatingInput text-uppercase">
                            DEPARTING
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            name="returning"
                            type="date"
                            className="form-control"
                            id="floatingInput"
                          />
                          <label htmlFor="floatingInput text-uppercase">
                            RETURNING
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            className="form-control"
                            name="adults"
                            min="0"
                          />
                          <label htmlFor="floatingInput text-uppercase">
                            ADULTS(18+)
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            name="children"
                            type="number"
                            className="form-control"
                            min="0"
                          />
                          <label htmlFor="floatingInput text-uppercase">
                            CHILDREN(2-11)
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-floating mb-3">
                          <Field
                            type="number"
                            name="baby"
                            className="form-control"
                            min="0"
                          />
                          <label htmlFor="floatingInput text-uppercase">
                            BABY(0-2)
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-floating">
                          <Field
                            component="select"
                            className="form-control"
                            name="ticketClass">
                            <option value={1}>First Class</option>
                            <option value={2}>Business Class</option>
                            <option value={3}>Premium Economy Class</option>
                            <option value={4}>Economy Class</option>
                          </Field>
                          <label>TICKET CLASS</label>
                        </div>
                      </div>
                      <div className="col">
                        <button
                          className="btn w-100 h-100 fs-5 text-white fw-normal"
                          type="submit">
                          SHOW FLIGHTS
                        </button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}
