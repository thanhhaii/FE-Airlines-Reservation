import { configureStore } from "@reduxjs/toolkit"
import { IAppState } from "./models"
import userReducer from "./userSlice"
import flightSelectedReducer from "./flightSelected"

export function makeStore() {
  return configureStore<IAppState>({
    reducer: {
      user: userReducer,
      flightSelected: flightSelectedReducer,
    },
  })
}

const store = makeStore()

export type AppDispatch = typeof store.dispatch

export default store
