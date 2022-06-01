import { useCallback, useMemo } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import classnames from "classnames"
import { LoginRequest } from "src/services/api/models"
import * as yup from "yup"

export interface LoginComponentProps {
  onSubmitLogin: (value: LoginRequest) => Promise<void>
}
const initialValue = {
  username: "",
  password: "",
  rememberMe: false,
} as LoginRequest

const createValidationSchema = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    username: yup.string().required("Username cannot be blank"),
    password: yup
      .string()
      .required("Please Enter your password")
      .min(8, "Password must be more than 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain Uppercase Number and special case Character",
      ),
  })

export function LoginComponent(props: LoginComponentProps) {
  const { onSubmitLogin } = props
  const validationSchema = useMemo(() => createValidationSchema, [])

  const handleShowPassword = () => {
    var el = document.getElementById("password")
    var cb = document.getElementById("checkbox") as HTMLInputElement
    if (cb.checked === true) {
      el?.setAttribute("type", "text")
    } else {
      el?.setAttribute("type", "password")
    }
  }

  const onSubmit = useCallback(
    (value: LoginRequest) => {
      onSubmitLogin(value)
    },
    [onSubmitLogin],
  )

  return (
    <div className="login-page h-100">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-4">
            <Formik
              initialValues={initialValue}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              {formik => {
                return (
                  <Form className="shadow p-4 mb-5 bg-body rounded">
                    <h1>Login</h1>
                    <p className="fs-4">Quick and easy...</p>
                    <div className="mb-4">
                      <Field
                        type="text"
                        autoComplete="username"
                        className={classnames("form-control", {
                          "is-valid":
                            formik.touched.username && !formik.errors.username,
                          "is-invalid":
                            formik.touched.username && !!formik.errors.username,
                        })}
                        placeholder="Username"
                        name="username"
                      />
                      <small className="text-danger position-absolute">
                        <ErrorMessage name="username" />
                      </small>
                    </div>
                    <div className="mb-4">
                      <Field
                        type="password"
                        id="password"
                        className={classnames("form-control", {
                          "is-valid":
                            formik.touched.password && !formik.errors.password,
                          "is-invalid":
                            formik.touched.password && !!formik.errors.password,
                        })}
                        placeholder="Password"
                        name="password"
                        autoComplete="current-password"
                      />
                      <small className="text-danger position-absolute">
                        <ErrorMessage name="password" />
                      </small>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="checkbox"
                        onClick={handleShowPassword}
                      />
                      <label className="form-check-label" htmlFor="checkbox">
                        Show password
                      </label>
                    </div>
                    <button className="btn btn-primary w-100" type="submit">
                      Login
                    </button>
                    <p className="mt-3">
                      Not a member?
                      {/* <a className="fw-bold text-dark"></a> */}
                    </p>
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
