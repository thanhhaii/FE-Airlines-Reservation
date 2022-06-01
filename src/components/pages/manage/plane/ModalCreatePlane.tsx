import { Field, Form, Formik } from "formik"
import { useCallback } from "react"
import { Airline } from "src/models"
import { PlaneCreate } from "src/models/Plane"

export interface ModalCreatePlaneProps {
  airline: Airline[]
  createPlane: (value: PlaneCreate) => Promise<boolean>
}

const initialValue = {
  airlineId: 1,
  planeName: "",
  totalFirstClassChair: 0,
  totalBusinessChair: 0,
  totalPremiumEconomyChair: 0,
  totalEconomyChair: 0,
} as PlaneCreate

export default function ModalCreatePlane(props: ModalCreatePlaneProps) {
  const { airline, createPlane } = props
  const onSubmit = useCallback(
    (value: PlaneCreate, { resetForm }) => {
      const closeModalPlane = document.querySelector(
        "#closeModalPlane",
      ) as HTMLInputElement
      createPlane(value).then(res => {
        if (res) {
          resetForm()
          closeModalPlane.click()
        }
      })
    },
    [createPlane],
  )

  return (
    <Formik initialValues={initialValue} onSubmit={onSubmit} enableReinitialize>
      {formik => {
        return (
          <Form>
            <div
              className="modal fade"
              id="modalCreatePlane"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Create new plane
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-12 mb-4">
                        <label>Airline</label>
                        <Field
                          component="select"
                          name="airlineId"
                          className="form-control">
                          {airline.map((airline, i) => (
                            <option value={airline.airlineId} key={i}>
                              {airline.airlineName}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="col-12 mb-4">
                        <label>Plane Name</label>
                        <Field
                          name="planeName"
                          className="form-control"
                          type="text"
                        />
                      </div>
                      <div className="col-12 mb-4">
                        <div className="row d-flex align-items-center">
                          <div className="col-6">Total First Class Chair</div>
                          <div className="col-6">
                            <Field
                              name="totalFirstClassChair"
                              className="form-control"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="row d-flex align-items-center">
                          <div className="col-6">Total Business Chair</div>
                          <div className="col-6">
                            <Field
                              name="totalBusinessChair"
                              className="form-control"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="row d-flex align-items-center">
                          <div className="col-6">
                            Total Premium Economy Chair
                          </div>
                          <div className="col-6">
                            <Field
                              name="totalPremiumEconomyChair"
                              className="form-control"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mb-4">
                        <div className="row d-flex align-items-center">
                          <div className="col-6">Total Economy Chair</div>
                          <div className="col-6">
                            <Field
                              name="totalEconomyChair"
                              className="form-control"
                              type="number"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      id="closeModalPlane">
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary text-white">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
