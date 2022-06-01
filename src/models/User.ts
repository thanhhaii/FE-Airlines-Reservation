export interface User {
  id: string
  userName: string
  firstName: string
  lastName: string
  roles?: string[]
  email?: string
  phoneNumber: string
  dob: Date
  emailVerified?: boolean
}

export interface UserRegister {
  firstName: string
  lastName: string
  dob: Date
  email: string
  phone: string
  username: string
  password: string
}
