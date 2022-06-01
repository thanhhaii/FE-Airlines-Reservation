import { useCallback, useState } from "react"
import ManagePlaneComponent from "src/components/pages/manage/plane"
import { PlaneCreate } from "src/models/Plane"
import apiService from "src/services/api"
import useSWR from "swr"

export default function ManagePlaneContainer() {
  const [currentIndex] = useState<number>(1)
  const { data: plane, mutate } = useSWR(
    `/Plane?PageIndex=${currentIndex}&PageSize=${10}}`,
    () => apiService.getPlanePaging(10, currentIndex),
  )

  const { data: airline } = useSWR("/Airline", () => apiService.getAirline())

  const createPlane = useCallback(
    async (value: PlaneCreate): Promise<boolean> => {
      const resp = await apiService.createPlane(value)
      if (resp.status === 201) {
        mutate()
        return true
      } else {
        return false
      }
    },
    [mutate],
  )

  if (plane === undefined || airline === undefined) {
    return <></>
  }

  return (
    <ManagePlaneComponent
      plane={plane.items}
      airline={airline.items}
      createPlane={createPlane}
    />
  )
}
