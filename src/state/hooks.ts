import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store"
import { IAppState } from "./models"
import { User } from "src/models"
import { selectUser } from "./userSlice"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector

export const useUser = (): User | null => {
  return useAppSelector(selectUser)
}
