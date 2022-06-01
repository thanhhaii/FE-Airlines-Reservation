import { HomeComponent } from "src/components/pages/home"
import apiService from "src/services/api"
import useSWR from "swr"

export default function HomePageContainer() {
  const { data: airport } = useSWR("/Airport/getAll", () =>
    apiService.getAllAirport(),
  )  
  
  return <HomeComponent airports={airport} />
}
