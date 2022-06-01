import { Formik, Form, Field, ErrorMessage } from "formik"
import { useCallback, useMemo, useState } from "react"
import classnames from "classnames"
import { Airline } from "src/models"
import * as yup from "yup"
import ButtonLoader from "src/components/common/ButtonLoader"

export interface EditAddAirlineComponentProps {
  airline: Airline | null
  isLoading: boolean
  isShowForm: boolean
  closeForm: () => void
  onHandleUpdate: (value: Airline) => Promise<boolean>
  onHandleCreate: (value: Airline) => Promise<boolean>
}

const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    airlineName: yup.string().required("Airline name cannot be empty"),
  })

export default function EditAddAirlineComponent(
  props: EditAddAirlineComponentProps,
) {
  const {
    isLoading,
    isShowForm,
    closeForm,
    airline,
    onHandleUpdate,
    onHandleCreate,
  } = props
  const validationSchema = useMemo(() => validation, [])
  const [status, setStatus] = useState<boolean | null>(null)
  const initialValues = {
    airlineId: airline ? airline.airlineId : 0,
    airlineName: airline ? airline.airlineName : "",
  } as Airline

  const onSubmit = useCallback(
    (value: Airline) => {
      setStatus(null)
      if (airline) {
        onHandleUpdate(value).then(res => {
          setStatus(res)
        })
      } else {
        onHandleCreate(value).then(res => {
          setStatus(res)
        })
      }
    },
    [airline, onHandleCreate, onHandleUpdate],
  )

  if (!isShowForm) {
    return <></>
  }

  return (
    <div>
      <div className="text-center p-2 bg-secondary rounded-top">
        <h4 className="mb-0 fw-normal text-white">
          {airline ? "Edit Airline" : "Add Airline"}
        </h4>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize>
        {formik => {
          return (
            <Form className="p-4">
              {status !== null && (
                <div
                  className={classnames("rounded p-2 text-white mb-3",{
                    "bg-danger": !status,
                    "bg-success": status,
                  })}>
                  {status
                    ? airline
                      ? "Update success"
                      : "Create success"
                    : airline
                    ? "An error occurred while creating, please try again!"
                    : "An error occurred while updating, please try again!"}
                </div>
              )}
              <div className="mb-4">
                <label>Airline Name</label>
                <Field
                  type="text"
                  autoComplete="username"
                  className={classnames("form-control", {
                    "is-valid":
                      formik.touched.airlineName && !formik.errors.airlineName,
                    "is-invalid":
                      formik.touched.airlineName && !!formik.errors.airlineName,
                  })}
                  name="airlineName"
                />
                <small className="text-danger position-absolute mt-1">
                  <ErrorMessage name="airlineName" />
                </small>
              </div>
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-danger w-100"
                    type="button"
                    onClick={closeForm}>
                    Close
                  </button>
                </div>
                <div className="col">
                  <ButtonLoader
                    loading={isLoading}
                    className="btn btn-primary w-100">
                    Add airline
                  </ButtonLoader>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
