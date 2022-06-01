import { useCallback, useMemo, useState } from "react"
import AirportComponent from "src/components/pages/manage/city-airport/AirportComponent"
import { CityComponent } from "src/components/pages/manage/city-airport/CityComponent"
import { City } from "src/models"
import { AirportRequest } from "src/models/Airport"
import apiService from "src/services/api"
import useSWR from "swr"

export default function ManageCityContainer() {
  const pageSize = 10
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>("")
  const [pageIndexAirport, setPageIndexAirport] = useState<number>(1)
  const [keywordAirport, setKeywordAirport] = useState<string>("")

  const { data: city, mutate: mutateCity } = useSWR(
    `/City?Keyword=${keyword}&PageIndex=${pageIndex}&PageSize=${pageSize}`,
    () => apiService.getCity(keyword, pageIndex, pageSize),
  )

  const { data: airport, mutate: mutateAirport } = useSWR(
    `/Airport?Keyword=${keywordAirport}&PageIndex=${pageIndexAirport}&PageSize=${pageSize}`,
    () => apiService.getAirport(keywordAirport, pageIndexAirport, pageSize),
  )

  const totalPages = useMemo((): number[] => {
    if (city?.totalRecord === undefined) return []
    const total: number[] = []
    for (let i = 1; i < Math.ceil(city?.totalRecord / pageSize); i++) {
      total.push(i)
    }
    return total
  }, [city?.totalRecord])

  const totalPagesAirport = useMemo((): number[] => {
    if (airport?.totalRecord === undefined) return []
    const total: number[] = []
    for (let i = 1; i < Math.ceil(airport?.totalRecord / pageSize); i++) {
      total.push(i)
    }
    return total
  }, [airport?.totalRecord])

  const onHandleCreateCity = useCallback(
    async (value: City): Promise<boolean> => {
      const resp = await apiService.createCity(value)
      if (resp.status === 201) {
        mutateCity()
        return true
      }
      return false
    },
    [mutateCity],
  )

  const onHandleUpdateCity = useCallback(
    async (value: City): Promise<boolean> => {
      const resp = await apiService.updateCity(value)
      if (resp.status === 200) {
        mutateCity()
        return true
      }
      return false
    },
    [mutateCity],
  )

  const onHandleCreateAirport = useCallback(
    async (value: AirportRequest): Promise<boolean> => {
      const resp = await apiService.createAirport(value)
      if (resp.status === 201) {
        mutateAirport()
        return true
      }
      return false
    },
    [mutateAirport],
  )

  const onHandleUpdateAirport = useCallback(
    async (id: number, value: AirportRequest): Promise<boolean> => {
      const resp = await apiService.updateAirport(id, value)
      if (resp.status === 200) {
        mutateAirport()
        return true
      }
      return false
    },
    [mutateAirport],
  )

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12 col-xxl-6">
          <CityComponent
            cities={city?.items}
            totalPage={totalPages}
            currentPage={pageIndex}
            goToPage={(value: number) => setPageIndex(value)}
            search={(value: string) => setKeyword(value)}
            viewChildren={(value: string) => setKeywordAirport(value)}
            createCity={onHandleCreateCity}
            updateCity={onHandleUpdateCity}
          />
        </div>
        <div className="col-12 col-xxl-6">
          <AirportComponent
            airport={airport?.items}
            totalPage={totalPagesAirport}
            currentPage={pageIndexAirport}
            goToPage={(value: number) => setPageIndexAirport(value)}
            search={(value: string) => setKeywordAirport(value)}
            createAirport={onHandleCreateAirport}
            updateAirport={onHandleUpdateAirport}
            listCity={city?.items}
          />
        </div>
      </div>
    </div>
  )
}
