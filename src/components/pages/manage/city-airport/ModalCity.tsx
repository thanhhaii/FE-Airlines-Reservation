import classnames from "classnames"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCallback, useMemo } from "react"
import * as yup from "yup"
import { City } from "src/models"

export interface ModalCityProps {
  currentCity: City | null
  createCity: (value: City) => Promise<boolean>
  updateCity: (value: City) => Promise<boolean>
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    cityName: yup.string().required("City name cannot be empty"),
    countryName: yup.string().required("Country name cannot be empty"),
  })

export default function ModalCity(props: ModalCityProps) {
  const { currentCity, createCity, updateCity } = props
  const validationSchema = useMemo(() => validation, [])
  const initialValue = {
    id: currentCity ? currentCity.id : 0,
    cityName: currentCity ? currentCity.cityName : "",
    countryName: currentCity ? currentCity.countryName : "",
  } as City

  const onSubmit = useCallback(
    (value: City, { resetForm }) => {
      const elClose = document.querySelector(
        "#closeModalCity",
      ) as HTMLInputElement
      if (currentCity) {
        updateCity(value).then(res => {
          if (res) {
            elClose.click()
            resetForm()
          }
        })
      } else {
        createCity(value).then(res => {
          if (res) {
            elClose.click()
            resetForm()
          }
        })
      }
    },
    [createCity, currentCity, updateCity],
  )

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {currentCity ? "Edit city" : "Add City"}
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
                        <label>City Name</label>
                        <Field
                          name="cityName"
                          type="text"
                          className={classnames("form-control", {
                            "is-valid":
                              formik.touched.cityName &&
                              !formik.errors.cityName,
                            "is-invalid":
                              formik.touched.cityName &&
                              !!formik.errors.cityName,
                          })}
                        />
                        <small className="text-danger position-absolute mt-1">
                          <ErrorMessage name="cityName" />
                        </small>
                      </div>
                      <div className="mb-4">
                        <label>Country Name</label>
                        <Field
                          name="countryName"
                          type="text"
                          className={classnames("form-control", {
                            "is-valid":
                              formik.touched.countryName &&
                              !formik.errors.countryName,
                            "is-invalid":
                              formik.touched.countryName &&
                              !!formik.errors.countryName,
                          })}
                        />
                        <small className="text-danger position-absolute mt-1">
                          <ErrorMessage name="countryName" />
                        </small>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        id="closeModalCity">
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
