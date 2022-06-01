import { Action, ThunkAction } from "@reduxjs/toolkit"
import { User } from "src/models"

export interface UserState {
  value: User | null
}

export interface FlightSelectedState {
  flightId: string
  adults: number
  children: number
  baby: number
  ticketType: number
  ticketPrice: number
}
export interface IAppState {
  user: UserState
  flightSelected: FlightSelectedState
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IAppState,
  unknown,
  Action<string>
>
