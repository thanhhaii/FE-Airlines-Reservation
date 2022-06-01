import classnames from "classnames"
import { ErrorMessage, Field, useFormikContext } from "formik"
import { UserRegister } from "src/models"

export interface TextFieldProps {
  name: keyof UserRegister
  placeholder?: string
  type: "text" | "password" | "email" | "date" | "number"
}

export function TextFieldComponent(props: TextFieldProps) {
  const { name, placeholder, type } = props
  const formik = useFormikContext<UserRegister>()
  const isInvalid = formik.touched[name] && !!formik.errors[name]
  const isValid = formik.touched[name] && !!!formik.errors[name]
  return (
    <div className="mb-4 position-relative">
      <Field
        type={type}
        className={classnames("form-control", {
          "is-valid": isValid,
          "is-invalid": isInvalid,
        })}
        placeholder={placeholder}
        name={name}
      />
      <small className="text-danger position-absolute start-0">
        <ErrorMessage name={name} />
      </small>
    </div>
  )
}
