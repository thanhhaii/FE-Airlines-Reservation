import * as yup from "yup"

export const validation = (): yup.ObjectSchema<any> =>
  yup.object().shape({
    // departing: yup.date().min(new Date()),
  })
