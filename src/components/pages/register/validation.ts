import * as yup from "yup"

const validationSchemaRegister = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    firstName: yup.string().required("FirstName cannot be empty"),
    lastName: yup.string().required("LastName cannot be empty"),
    dob: yup.date().required("Dob cannot be empty"),
    email: yup
      .string()
      .email("Email invalidate")
      .required("Email cannot be empty"),
    phone: yup.number().required("Phone cannot be empty"),
    username: yup.string().required("Username cannot be empty"),
    password: yup
      .string()
      .required("Password cannot be empty")
      .min(8, "Password must be more than 8 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must contain uppercase number and special character",
      ),
  })

export default validationSchemaRegister
