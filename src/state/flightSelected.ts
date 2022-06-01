import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FlightSelectedState, IAppState } from "./models"

const initialState: FlightSelectedState = {
  flightId: "",
  adults: 0,
  baby: 0,
  children: 0,
  ticketType: 0,
  ticketPrice: 0,
}

export const userSlice = createSlice({
  name: "flightSelected",
  initialState,
  reducers: {
    setFlightSelected: (_, action: PayloadAction<FlightSelectedState>) => {
      return action.payload
    },
  },
})

export const { setFlightSelected } = userSlice.actions

export const selectFlightSelectedState = (state: IAppState) =>
  state.flightSelected

export const getFlightSelected = createSelector(
  selectFlightSelectedState,
  state => {
    if (state.flightId === "") {
      return null
    }
    return state
  },
)

export default userSlice.reducer
