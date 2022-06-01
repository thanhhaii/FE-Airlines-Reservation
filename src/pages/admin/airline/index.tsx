import { useCallback, useState } from "react"
import { Airline } from "src/models"
import apiService from "src/services/api"
import ManageAirlineComponent from "src/components/pages/manage/airline/AirlineComponent"
import useSWR from "swr"

export default function ManageAirlineContainer() {
  const [isLoading, setLoading] = useState<boolean>(false)
  const { data: airlines, mutate } = useSWR("/airline", () =>
    apiService.getAirline(),
  )

  const onHandleCreate = useCallback(
    async (value: Airline): Promise<boolean> => {
      setLoading(true)
      const resp = await apiService.createAirline(value.airlineName)
      setLoading(false)
      if (resp.status === 201) {
        mutate()
        return true
      }
      return false
    },
    [mutate],
  )

  const onHandleUpdate = useCallback(
    async (value: Airline): Promise<boolean> => {
      setLoading(true)
      const resp = await apiService.updateAirline(value)
      setLoading(false)
      if (resp.status === 200) {
        mutate()
        return true
      }
      return false
    },
    [mutate],
  )
  
  return (
    <ManageAirlineComponent
      airline={airlines?.items}
      onHandleUpdate={onHandleUpdate}
      onHandleCreate={onHandleCreate}
      loading={isLoading}
    />
  )
}
