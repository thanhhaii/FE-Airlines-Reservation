export enum TicketType {
  firstClass = 1,
  businessClass = 2,
  primeiumEconomyClass = 3,
  economyClass = 4,
}

export interface CustomerInfo {
  firstName: string
  lastName: string
  ticketPrice: number
  birthday: string
}

export interface Tickets {
  flightId: string
  userId: string
  ticketType: number
  note: string
  firstName: string
  lastName: string
  phoneNumber: string
  totalPrice: number
  totalTicket: number
  email: string
  paymentMethod: string
  customerInfos: CustomerInfo[]
}

export interface TicketCreate extends Omit<Tickets, "customerInfos"> {
  adults: CustomerInfo[]
  children: CustomerInfo[]
  baby: CustomerInfo[]
}

export interface OrderComplete {
  airportGo: string
  arrivalAirport: string
  timeFlight: string
  arrivalTime: string
  flightId: string
  airlineName: string
  planeName: string
}

export interface MyTicketDetail {
  timeFlight: string
  airportGo: string
  arrivalAirport: string
  airlineName: string
  arrivalTime: string
  ticketId: string
  cityGo: string
  arrivalCity: string
  planeName: string
}

export interface TicketDetailAll extends MyTicketDetail {
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  totalPrice: number
  bookingDate: string
  people: CustomerInfo[]
}
