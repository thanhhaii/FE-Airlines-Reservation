export interface Airport {
  airportId: number
  airportName: string
  cityName: string
  countryName: string
  cityId: number
}

export interface AirportRequest {
  airportName: string
  cityId: number
}