import { TicketType } from "./Ticket"

export interface FindFlight {
  typeFlight: string
  flyingForm: number
  flyingTo: number
  departing: string
  returning: string
  adults: number
  children: number
  baby: number
  ticketClass: number
}

export interface FindFlightRequest {
  flyingFrom: number
  flyingTo: number
  departing: string
  returning: string
  adults: number
  children: number
  baby: number
  ticketType: TicketType
}

export interface FindFlightResponse {
  flightId: string
  planeName: string
  flightTime: Date
  arrivalTime: Date
  airportGo: string
  cityGo: string
  destinationAirport: string
  destinationCity: string
  priceTicket?: number
  priceNet: number
  airlineName: string
}

export interface FlightCreate {
  planeId: number
  flightTime: string
  arrivalTime: string
  airportGo: number
  destinationAirport: number
  priceNet: number
}

export interface FlightDetailAll extends FindFlightResponse {
  priceTicketFirstClass: number
  priceTicketBusinessClass: number
  pricePremiumEconomyClass: number
  priceEconomyClass: number
  restTicketFirstClass: number
  restTicketBusinessClass: number
  restTicketPremiumEconomyClass: number
  restTicketEconomyClass: number
  priceNet: number
}