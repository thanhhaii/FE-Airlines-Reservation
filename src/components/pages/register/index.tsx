import { Form, Formik } from "formik"
import { useCallback, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { UserRegister } from "src/models"
import { BaseResult } from "src/services/api/models"
import { TextFieldComponent } from "./TextField"
import validationSchemaRegister from "./validation"

export interface RegisterComponentProps {
  onHandleRegister: (value: UserRegister) => Promise<BaseResult>
  isLoading: boolean
}

const initialValue: UserRegister = {
  firstName: "",
  lastName: "",
  dob: new Date(),
  email: "",
  phone: "",
  username: "",
  password: "",
}

export function RegisterComponent(props: RegisterComponentProps) {
  const { onHandleRegister } = props
  const validationSchema = useMemo(() => validationSchemaRegister(), [])
  const [result, setResult] = useState<BaseResult | null>(null)
  const onSubmit = useCallback(
    (value: UserRegister) => {
      setResult(null)
      onHandleRegister({ ...value, phone: value.phone.toString() }).then(
        result => {
          setResult(result)
        },
      )
    },
    [onHandleRegister],
  )

  return (
    <div className="register h-100">
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-xxl-5">
            <Formik
              initialValues={initialValue}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              {formik => {
                return (
                  <Form className="bg-white text-center p-4 rounded">
                    <h3 className="text-uppercase mb-4">Create account</h3>
                    <div className="row">
                      <div className="col-12">
                        {result !== null &&
                          (result.status === true ? (
                            <p className="bg-danger rounded p-2 text-white fw-regular">
                              {result.message}
                            </p>
                          ) : (
                            <p className="bg-success rounded p-2 text-white fw-regular">
                              Create account success
                            </p>
                          ))}
                      </div>
                      <div className="col-6">
                        <TextFieldComponent
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                        />
                      </div>
                      <div className="col-6">
                        <TextFieldComponent
                          name="lastName"
                          placeholder="Last Name"
                          type="text"
                        />
                      </div>
                      <div className="col-12">
                        <TextFieldComponent
                          name="username"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                      <div className="col-6">
                        <TextFieldComponent name="dob" type="date" />
                      </div>
                      <div className="col-6">
                        <TextFieldComponent
                          name="phone"
                          type="number"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="col-12">
                        <TextFieldComponent
                          name="email"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-12">
                        <TextFieldComponent
                          name="password"
                          type="password"
                          placeholder="Password"
                        />
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Register
                        </button>
                        <p className="mt-4">
                          Have already an account?&nbsp;
                          <Link
                            to="/login"
                            className="text-decoration-underline fw-bold">
                            Login here
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
