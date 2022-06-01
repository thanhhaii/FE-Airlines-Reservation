export interface PlaneSelected {
  planeId: number
  planeName: string
  airlineName: string
}

export interface PlaneCreate {
  airlineId: number
  planeName: string
  totalFirstClassChair: number
  totalBusinessChair: number
  totalPremiumEconomyChair: number
  totalEconomyChair: number
}

export interface PlaneDetail {
  planeId: number
  airlineName: string
  planeName: string
  totalFirstClassChair: number
  totalBusinessChair: number
  totalPremiumEconomyChair: number
  totalEconomyChair: number
}
