import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "src/models"
import { IAppState, UserState } from "./models"

const initialState: UserState = {
  value: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIdentify: (_, action: PayloadAction<User | null>) => {
      return {
        value: action.payload,
      }
    },
  },
})

export const { userIdentify } = userSlice.actions

export const selectUserState = (state: IAppState) => state.user

export const selectUser = createSelector(
  selectUserState,
  userState => userState.value,
)

export const isSelectUser = createSelector(selectUserState, userState => {
  return userState.value?.roles
})

export const isAdmin = createSelector(selectUserState, userState => {
  const roles = userState.value?.roles
  if (roles?.includes("admin")) {
    return true
  }
  return false
})

export default userSlice.reducer
