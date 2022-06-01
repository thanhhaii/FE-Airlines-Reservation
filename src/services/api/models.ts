export interface LoginRequest {
  username: string
  password: string
  rememberMe: boolean
}

export interface BaseResult {
  message: string
  status: boolean
}

export interface GetPagingResponse<T> {
  items: T[]
  totalRecord: number
}

export interface AirportRequest {
  airportName: string
  cityId: number
}
