import classnames from "classnames"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCallback, useMemo } from "react"
import * as yup from "yup"
import { City } from "src/models"
import { Airport, AirportRequest } from "src/models/Airport"

export interface ModalAirportProps {
  currentAirport: Airport | null
  createAirport: (value: AirportRequest) => Promise<boolean>
  updateAirport: (id: number, value: AirportRequest) => Promise<boolean>
  listCity: City[] | undefined
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    airportName: yup.string().required("Airport name cannot be empty"),
    cityId: yup.number().required("Country name cannot be empty"),
  })

export default function ModalCity(props: ModalAirportProps) {
  const { currentAirport, createAirport, updateAirport, listCity } = props
  const validationSchema = useMemo(() => validation, [])
  const initialValue = {
    airportName: currentAirport ? currentAirport.airportName : "",
    cityId: currentAirport ? currentAirport.cityId : 1,
  } as AirportRequest

  const onSubmit = useCallback(
    (value: AirportRequest, { resetForm }) => {
      const el = document.getElementById(
        "closeModalAirport",
      ) as HTMLButtonElement
      if (currentAirport) {
        updateAirport(currentAirport.airportId, value).then(res => {
          if (res) {
            resetForm()
            el.click()
          }
        })
      } else {
        createAirport(value).then(res => {
          if (res) {
            resetForm()
            el.click()
          }
        })
      }
    },
    [createAirport, currentAirport, updateAirport],
  )

  return (
    <>
      <div
        className="modal fade"
        id="airportModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {currentAirport ? "Edit Airport" : "Add Airport"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <Formik
              initialValues={initialValue}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              enableReinitialize>
              {formik => {
                return (
                  <Form>
                    <div className="modal-body">
                      <div className="mb-4">
                        <label>Airport Name</label>
                        <Field
                          name="airportName"
                          type="text"
                          className={classnames("form-control", {
                            "is-valid":
                              formik.touched.airportName &&
                              !formik.errors.airportName,
                            "is-invalid":
                              formik.touched.airportName &&
                              !!formik.errors.airportName,
                          })}
                        />
                        <small className="text-danger position-absolute mt-1">
                          <ErrorMessage name="cityName" />
                        </small>
                      </div>
                      <div className="mb-4">
                        <label>City</label>
                        <Field
                          name="cityId"
                          component="select"
                          className={classnames("form-control", {
                            "is-valid":
                              formik.touched.cityId && !formik.errors.cityId,
                            "is-invalid":
                              formik.touched.cityId && !!formik.errors.cityId,
                          })}
                          default={formik.values.cityId}>
                          {listCity?.map((city, i) => (
                            <option value={city.id} key={i}>
                              {city.cityName}
                            </option>
                          ))}
                        </Field>
                        <small className="text-danger position-absolute mt-1">
                          <ErrorMessage name="cityId" />
                        </small>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        id="closeModalAirport">
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary text-white">
                        Save changes
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}
