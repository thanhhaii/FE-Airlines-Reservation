export interface Airline{
  airlineId?: number
  airlineName: string
}

export interface AirlineResult{
  items: Airline[]
  totalRecord: number
}

