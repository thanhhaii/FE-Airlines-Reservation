import { useCallback, useMemo, useState } from "react"
import ManageFlightComponent from "src/components/pages/manage/flight"
import { FlightCreate } from "src/models/Flight"
import apiService from "src/services/api"
import useSWR from "swr"

export default function ManageFlightContainers() {
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState<number>(1)
  const { data: plane } = useSWR("/Plane/getAll", () =>
    apiService.getPlaneSelected(),
  )
  const { data: airport } = useSWR("/Airport/getAll", () =>
    apiService.getAllAirport(),
  )

  const { data: flight, mutate } = useSWR(
    `/Flight/get-flight-paging?PageIndex=${currentPage}&PageSize=${pageSize}`,
    () => apiService.getListFlight(pageSize, currentPage),
  )

  const onHandleCreateFlight = useCallback(
    async (value: FlightCreate): Promise<boolean> => {
      const resp = await apiService.createFlight(value)
      if (resp.status === 201) {
        mutate()
        return true
      }
      return false
    },
    [mutate],
  )

  const totalPages = useMemo((): number[] => {
    if (flight?.totalRecord === undefined) return []
    const total: number[] = []
    for (let i = 1; i < Math.ceil(flight?.totalRecord / pageSize); i++) {
      total.push(i)
    }
    return total
  }, [flight?.totalRecord])

  return (
    <ManageFlightComponent
      plane={plane}
      airport={airport}
      flights={flight?.items}
      totalPages={totalPages}
      createFlight={onHandleCreateFlight}
      changePage={(value) => setCurrentPage(value)} 
    />
  )
}
